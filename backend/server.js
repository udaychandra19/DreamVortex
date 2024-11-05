const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const Validator = require('validator');
const multer = require('multer');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const app = express();
const port = 5500;
const saltRounds = 10;

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'build'), {
    setHeaders: (res, path, stat) => {
        res.set('Cache-Control', 'no-store');
    },
}));

mongoose.connect('mongodb://localhost:27017/admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

const DreamSchema = new mongoose.Schema({
    username: { type: String, required: true },
    filePath: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now }
});
const Dream = mongoose.model('Dream', DreamSchema);

const neuralSchema = new mongoose.Schema({
    username: { type: String, required: true },
    filePath: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now }
});
const Neural = mongoose.model('Neural', neuralSchema);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/dd', upload.fields([{ name: 'file', maxCount: 1 }]), async (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ error: 'image is required' });
        }
        console.log("Image saved successfully");
        const timestamp = Date.now();
        const outputImagePath = `uploads/deepdreamed_image_${timestamp}.jpg`;
        const newImage = new Dream({
            username: req.body.username,
            filePath: outputImagePath,
        });

        exec(`python Deepdream.py ${req.files.file[0].path} ${outputImagePath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return res.status(500).json({ error: 'Internal server error' });
            }

            console.log("Deep Dreamed Image Generated Successfully");

            res.status(200).json({ message: 'Images uploaded and processed successfully', imageUrl: `/uploads/deepdreamed_image_${timestamp}.jpg` });
        });

        await newImage.save();

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/nst', upload.fields([{ name: 'file1', maxCount: 1 }, { name: 'file2', maxCount: 1 }]), async (req, res) => {
    try {
        if (!req.files || !req.files.file1 || !req.files.file2) {
            return res.status(400).json({ error: 'Both images are required' });
        }
        console.log("Image saved successfully");
        const timestamp = Date.now();
        const outputImagePath = `uploads/stylized_image_${timestamp}.jpg`;
        const newImage = new Neural({
            username: req.body.username,
            filePath: outputImagePath
        });

        exec(`python Neuralstyle.py ${req.files.file1[0].path} ${req.files.file2[0].path} ${outputImagePath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return res.status(500).json({ error: 'Internal server error' });
            }

            console.log("Neural Styled Image Generated Successfully");

            res.status(200).json({ message: 'Images uploaded and processed successfully', imageUrl: `/uploads/stylized_image_${timestamp}.jpg` });
        });

        await newImage.save();

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/info', async (req, res) => {
    try {
        const { username } = req.query;
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const ddImages = await Dream.find({ username });
        const nsImages = await Neural.find({ username });

        res.status(200).json({
            message: "Successful Retrieval of info",
            name: user.username,
            email: user.email,
            path1: nsImages.map(image => image.filePath),
            path2: ddImages.map(image => image.filePath)
        });
    } catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        if (!Validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid Email Address' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/reset', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/delete', async (req, res) => {
    const { username } = req.query;
    if (!username) {
        return res.status(400).json({ error: "Invalid Username" });
    }
    try {
        const result1 = await User.deleteOne({ username: username.toString() });
        const result2 = await Dream.deleteMany({ username: username.toString() });
        const result3 = await Neural.deleteMany({ username: username.toString() });
        if (result1.deletedCount + result2.deletedCount + result3.deletedCount === 0) {
            return res.status(404).json({ error: "Account Not Found" });
        }
        res.status(200).json({ message: "Account Deleted Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(400).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
