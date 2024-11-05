import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Neural(props) {
    const [Image1, setImage1] = useState(null);
    const [Image2, setImage2] = useState(null);
    const [preview1, setPreview1] = useState(null);
    const [preview2, setPreview2] = useState(null);
    const [final, setFinal] = useState(null);
    const [spin, setSpin] = useState(false);
    const [alert, setAlert] = useState("");
    const [filename, setfilename] = useState("")
    const fileInputRef1 = useRef(null);
    const fileInputRef2 = useRef(null);


    const handleImageUpload = async () => {
        try {
            setSpin(true);
            if (!Image1 || !Image2) {
                console.log('Please upload both images');
                setAlert("Please Upload the Images");
                setTimeout(() => {
                    setAlert("");
                }, 2000);
                setSpin(false);
                return;
            }
            const formData = new FormData();
            formData.append('file1', Image1);
            formData.append('file2', Image2);
            formData.append('username', props.user);

            if (!preview1 || !preview2) {
                return;
            }

            const response = await fetch('http://localhost:5500/nst', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                console.log('Images uploaded:', result.message);
                setImage1(null);
                setImage2(null);
                setFinal(result.imageUrl);
                setSpin(false);
                fileInputRef1.current.value = '';
                fileInputRef2.current.value = '';
                setPreview1(null);
                setPreview2(null);
            } else {
                console.error('Upload failed:', result.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleImageUpload1 = (event) => {
        const file = event.target.files[0];
        setfilename(file.name);
        setImage1(file);
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview1(objectUrl);
        } else {
            setPreview1(null);
        }
    };


    const handleImageUpload2 = (event) => {
        const file = event.target.files[0];
        setImage2(file);
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview2(objectUrl);
        } else {
            setPreview2(null);
        }
    };


    const handleImageDeload1 = () => {
        setImage1(null);
        setSpin(false);
        setPreview1(null);
        fileInputRef1.current.value = '';
    };


    const handleImageDeload2 = () => {
        setImage2(null);
        setSpin(false);
        setPreview2(null);
        fileInputRef2.current.value = '';
    };


    const handleRemove = () => {
        setFinal(null);
    };


    const handleDownload = async () => {
        if (final) {
            try {
                const response = await fetch(`http://localhost:5500${final}`);
                const blob = await response.blob();

                const downloadLink = document.createElement('a');
                downloadLink.href = window.URL.createObjectURL(blob);
                downloadLink.download = `Stylized_${filename}`;
                downloadLink.click();
            } catch (error) {
                console.error('Download error:', error);
            }
        }
    };

    const styles = {
        maincontainer: {
            padding: '45px',
            backgroundColor: props.mode === 'light' ? '#f0f4f8' : '#444',
            color: props.mode === 'light' ? '#333' : '#fdf6e4',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0.1, 0, 0.6, 0.2)',
            fontFamily: 'Roboto, sans-serif',
            animation: 'fadeIn 1s ease-in-out',
            marginTop: "80px",
            marginBottom: "20px"
        },
        container: {
            padding: '20px',
            backgroundColor: props.mode === 'light' ? '#f0f4f8' : '#333',
            color: props.mode === 'light' ? '#333' : '#fdf6e4',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Roboto, sans-serif',
            animation: 'fadeIn 1s ease-in-out',
            marginTop: "20px",
            marginBottom: "20px"
        },
        heading: {
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '20px',
            color: props.mode === 'light' ? '#2c3e50' : '#fdf6d2',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '2px',
        },
        paragraph: {
            fontSize: '18px',
            marginBottom: '20px',
            lineHeight: '1.8',
            color: props.mode === 'light' ? '#555' : '#fdf6d2',
            textAlign: 'justify',
        },
        '@keyframes fadeIn': {
            from: { opacity: 0 },
            to: { opacity: 1 },
        },
    };

    useEffect(() => {
        document.body.style.backgroundColor = props.mode === "light" ? "#f2f2f2" : "#333";
    }, [props.mode]);


    return (
        <div className="container" style={styles.maincontainer}>
            {alert && <div className="alert alert-danger text-center" role="alert" style={{ height: "50px", backgroundColor: "#f8d7da", color: "#721c24", border: "1px solid #f5c6cb", borderRadius: "5px" }}>{alert}</div>}
            <strong className="text-center" style={{ color: props.mode === "light" ? "#2c3e50" : "#fdf6a2", marginBottom: '15px', marginLeft: "280px", fontSize: "1.9rem" }}>Crafting Unique Visuals with Neural Style Magic</strong>
            <div style={styles.container}>
                <h2 style={styles.heading}>What is Neural Style Transfer?</h2>
                <p style={styles.paragraph}>
                    Neural Style Transfer (NST) is an algorithm that blends two images—a content image and a style image—so that the output maintains the content of the first image while adopting the artistic style of the second.
                </p>
                <p style={styles.paragraph}>
                    The process leverages deep convolutional neural networks (CNNs) to extract and merge the distinct features of the content and style images. This combination results in unique, visually stunning works of art that embody the characteristics of both input images.
                </p>
                <p style={styles.paragraph}>
                    NST is widely used in digital art creation, enabling artists and enthusiasts to easily apply famous painting styles or custom artistic effects to their own photos, creating a blend of realism and artistry.
                </p>
            </div>
            <strong className="text-center" style={{ color: props.mode === "light" ? "#2c3e50" : "#fdf6a2", marginBottom: '15px', marginLeft: "325px", fontSize: "1.4rem" }}>Upload two images below to start your style journey!</strong>
            <div className="d-flex justify-content-center">
                <div className="custom-file" style={{ marginRight: "10px" }}>
                    <label htmlFor="ContentImage" style={{ fontSize: '18px', fontWeight: 'bold', color: props.mode === 'light' ? '#2c3e50' : '#fdf6d2', display: 'block', marginBottom: "10px", marginTop: "15px" }}>📸 Content Image:</label>
                    <input
                        type="file" onChange={handleImageUpload1} style={{ color: "green" }} ref={fileInputRef1} accept='image/*'
                        className="form-control"
                    />
                    {
                        preview1 && (
                            <div className="text-center">
                                <img src={preview1} alt="Preview 1" className="img-thumbnail" style={{ width: '175px', height: "175px", marginTop: "20px", marginBottom: "15px" }} />
                                <div><button className="btn btn-danger" onClick={handleImageDeload1}>Delete</button></div>
                            </div>
                        )
                    }
                </div >
                <div className="custom-file" style={{ marginLeft: "10px" }}>
                    <label htmlFor="StyleImage" style={{ fontSize: '18px', fontWeight: 'bold', color: props.mode === 'light' ? '#2c3e50' : '#fdf6d2', display: 'block', marginBottom: "10px", marginTop: "15px" }}>🎨 Style Image:</label>
                    <input
                        type="file" onChange={handleImageUpload2} style={{ color: "green" }} ref={fileInputRef2} accept='image/*'
                        className="form-control"
                    />
                    {preview2 && (
                        <div className="text-center">
                            <img src={preview2} alt="Preview 2" className="img-thumbnail" style={{ width: '175px', height: "175px", marginTop: "20px", marginBottom: "15px" }} />
                            <div><button className="btn btn-danger" onClick={handleImageDeload2}>Delete</button></div>
                        </div>
                    )}
                </div>
            </div >
            <div className="text-center" style={{ marginTop: "18px" }}>
                {!alert && spin && <div className={props.mode === "light" ? "spinner-border text-dark" : "spinner-border text-light"} style={{ marginTop: "10px" }} role="status"></div>}
                {!spin && !final && <button className="btn btn-success" onClick={handleImageUpload}>Generate</button>}
            </div>
            {
                final && (
                    <div className='text-center'>
                        <div className="text-center mt-4">
                            <h3 color={props.mode === "light" ? "black" : "white"}>Stylized Image</h3>
                            <img src={`http://localhost:5500${final}`} alt="Stylized" className="img-thumbnail" style={{ width: '300px' }} />
                        </div>
                        <button className="btn btn-success" style={{ marginTop: "15px" }} onClick={handleDownload}>Download</button>
                        <button className="btn btn-danger" style={{ marginTop: "15px", marginLeft: "7px" }} onClick={handleRemove}>Close</button>
                    </div>
                )
            }
        </div >
    );
}
