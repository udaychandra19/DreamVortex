// import React, { useState, useRef, useEffect } from 'react';
// import { TiDownload } from "react-icons/ti";
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function Dream(props) {
//     const [Image, setImage] = useState(null);
//     const [preview, setPreview] = useState(null);
//     const [final, setFinal] = useState(null);
//     const [spin, setSpin] = useState(false);
//     const [alert, setAlert] = useState("");
//     const [filename, setfilename] = useState("")

//     const fileInputRef = useRef(null);

//     useEffect(() => {
//         document.body.style.backgroundColor = props.mode === "light" ? "#f2f2f2" : "#333";
//     }, [props.mode]);

//     const handleImageUpload = (event) => {
//         const file = event.target.files[0];
//         setfilename(file.name);
//         setImage(file);
//         if (file) {
//             const objectUrl = URL.createObjectURL(file);
//             setPreview(objectUrl);
//         } else {
//             setPreview(null);
//         }
//     };

//     const handleImageDelete = () => {
//         setImage(null);
//         setSpin(false);
//         setPreview(null);
//         fileInputRef.current.value = '';
//     };

//     const handleRemove = () => {
//         setFinal(null);
//     };

//     const handleDownload = async () => {
//         if (final) {
//             try {
//                 const response = await fetch(`http://localhost:5500${final}`);
//                 const blob = await response.blob();

//                 const downloadLink = document.createElement('a');
//                 downloadLink.href = window.URL.createObjectURL(blob);
//                 downloadLink.download = `Stylized_${filename}`;
//                 downloadLink.click();
//             } catch (error) {
//                 console.error('Download error:', error);
//             }
//         }
//     };

//     const handleImageUploadClick = async () => {
//         try {
//             setSpin(true);
//             if (!Image) {
//                 console.log('Please Upload the Image');
//                 setAlert("Please Upload the Image");
//                 setTimeout(() => {
//                     setAlert("");
//                 }, 2000);
//                 setSpin(false);
//                 return;
//             }
//             const formData = new FormData();
//             formData.append('file', Image);
//             formData.append('username', props.user);

//             if (!preview) {
//                 return;
//             }

//             const response = await fetch('http://localhost:5500/dd', {
//                 method: 'POST',
//                 body: formData
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 console.log('Images uploaded:', result.message);
//                 setImage(null);
//                 setFinal(result.imageUrl);
//                 setSpin(false);
//                 fileInputRef.current.value = '';
//                 setPreview(null);
//             } else {
//                 setSpin(false);
//                 console.error('Upload failed:', result.error);
//             }
//         } catch (error) {
//             setSpin(false);
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <div className="container" style={{ marginTop: "80px" }}>
//             {alert && <div className="alert alert-danger text-center" role="alert" style={{ height: "50px", backgroundColor: "#f8d7da", color: "#721c24", border: "1px solid #f5c6cb", borderRadius: "5px" }}>{alert}</div>}
//             <h2 className="text-center" style={{ color: props.mode === "light" ? "#333" : "#ccc" }}>Dreamy Creations through Deep Dream Alchemy</h2>
//             <p className="text-center" style={{ fontSize: '1.2rem', color: props.mode === "light" ? "#555" : "#999", marginTop: '15px' }}>Upload an image below to start your dream journey!</p>
//             <div className="d-flex justify-content-center">
//                 <div className="custom-file text-center" style={{ marginRight: "10px" }}>
//                     <label htmlFor="ContentImage" style={{ fontSize: '18px', fontWeight: 'bold', color: props.mode === "light" ? "#333" : "#ccc", display: 'block', marginBottom: "10px", marginRight: "20px" }}>💤 Dreaming Image:</label>
//                     <input
//                         type="file" onChange={handleImageUpload} style={{ color: "green" }} ref={fileInputRef} accept='image/*'
//                         className="form-control"
//                     />
//                     {
//                         preview && (
//                             <div className="mt-2 text-center">
//                                 <img src={preview} alt="Preview" className="img-thumbnail" style={{ width: '175px', height: "175px", marginTop: "10px" }} />
//                             </div>
//                         )
//                     }
//                     <div style={{ justifyContent: "space-evenly", display: "flex" }}>
//                         {preview && <button className="btn btn-danger" onClick={handleImageDelete} style={{ marginTop: "15px" }}>Delete</button>}
//                         {!spin && !final && <button className="btn btn-success" onClick={handleImageUploadClick} style={{ marginTop: "15px" }} >Generate</button>}
//                     </div>
//                     {spin && <div className={props.mode === "light" ? "spinner-border text-dark" : "spinner-border text-light"} style={{ marginTop: "20px" }} role="status"></div>}
//                 </div>
//             </div>
//             {
//                 final && (
//                     <div className='text-center'>
//                         <div className="text-center mt-4">
//                             <h3 color={props.mode === "light" ? "black" : "white"}>Stylized Image</h3>
//                             <img src={`http://localhost:5500${final}`} alt="Stylized" className="img-thumbnail" style={{ width: '300px' }} />
//                         </div>
//                         <button className="btn btn-success" style={{ marginTop: "15px" }} onClick={handleDownload}><TiDownload style={{ marginBottom: "4px" }} /> Download</button>
//                         <button className="btn btn-danger" style={{ marginTop: "15px", marginLeft: "7px" }} onClick={handleRemove}>Close</button>
//                     </div>
//                 )
//             }
//         </div >
//     );
// }


import React, { useState, useRef, useEffect } from 'react';
import { TiDownload } from "react-icons/ti";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Dream(props) {
    const [Image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [final, setFinal] = useState(null);
    const [spin, setSpin] = useState(false);
    const [alert, setAlert] = useState("");
    const [filename, setfilename] = useState("")

    const fileInputRef = useRef(null);

    useEffect(() => {
        document.body.style.backgroundColor = props.mode === "light" ? "#f2f2f2" : "#333";
    }, [props.mode]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setfilename(file.name);
        setImage(file);
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        } else {
            setPreview(null);
        }
    };

    const handleImageDelete = () => {
        setImage(null);
        setSpin(false);
        setPreview(null);
        fileInputRef.current.value = '';
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

    const handleImageUploadClick = async () => {
        try {
            setSpin(true);
            if (!Image) {
                console.log('Please Upload the Image');
                setAlert("Please Upload the Image");
                setTimeout(() => {
                    setAlert("");
                }, 2000);
                setSpin(false);
                return;
            }
            const formData = new FormData();
            formData.append('file', Image);
            formData.append('username', props.user);

            if (!preview) {
                return;
            }

            const response = await fetch('http://localhost:5500/dd', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                console.log('Images uploaded:', result.message);
                setImage(null);
                setFinal(result.imageUrl);
                setSpin(false);
                fileInputRef.current.value = '';
                setPreview(null);
            } else {
                setSpin(false);
                console.error('Upload failed:', result.error);
            }
        } catch (error) {
            setSpin(false);
            console.error('Error:', error);
        }
    };

    const styles = {
        maincontainer: {
            padding: '30px',
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

    return (
        <div className="container" style={styles.maincontainer}>
            {alert && <div className="alert alert-danger text-center" role="alert" style={{ height: "50px", backgroundColor: "#f8d7da", color: "#721c24", border: "1px solid #f5c6cb", borderRadius: "5px" }}>{alert}</div>}
            <strong className="text-center" style={{ color: props.mode === "light" ? "#2c3e50" : "#fdf6a2", marginBottom: '15px', marginLeft: "280px", fontSize: "1.9rem" }}>Dreamy Creations through Deep Dream Alchemy</strong>
            <div style={{
                padding: '20px',
                backgroundColor: props.mode === 'light' ? '#f0f4f8' : '#333',
                color: props.mode === 'light' ? '#333' : '#fdf6e4',
                borderRadius: '15px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                fontFamily: 'Roboto, sans-serif',
                animation: 'fadeIn 1s ease-in-out',
                marginTop: "20px",
                marginBottom: "20px"
            }}>
                <h2 style={styles.heading}>What is Deep Dream?</h2>
                <p style={styles.paragraph}>
                    Deep Dream is an image processing technique that uses a convolutional neural network (CNN) to enhance and modify images in a way that reveals hidden patterns, often leading to surreal, dream-like visuals. Originally developed by Google, Deep Dream was created to understand and visualize how neural networks interpret images.
                </p>
                <p style={styles.paragraph}>
                    The technique involves feeding an image through a neural network, which then "dreams" by amplifying features it identifies, such as patterns, textures, and objects. The result is a highly detailed and often bizarre transformation of the original image, filled with intricate and recursive elements.
                </p>
                <p style={styles.paragraph}>
                    Deep Dream is widely used in digital art and creative applications, allowing artists to generate unique, mesmerizing visuals that blend reality with abstract patterns. It&apos;s a powerful tool for exploring the imaginative possibilities of artificial intelligence.
                </p>
            </div>
            <strong className="text-center" style={{ color: props.mode === "light" ? "#2c3e50" : "#fdf6a2", marginBottom: '15px', marginLeft: "325px", fontSize: "1.4rem" }}>Upload an image below to start your dream journey!</strong>
            <div className="d-flex justify-content-center">
                <div className="custom-file text-center" style={{ marginRight: "10px" }}>
                    <label htmlFor="ContentImage" style={{ fontSize: '18px', fontWeight: 'bold', color: props.mode === "light" ? "#2c3e50" : "#fdf6d2", display: 'block', marginBottom: "10px", marginRight: "20px", marginTop: "15px" }}>💤 Dreaming Image:</label>
                    <input
                        type="file" onChange={handleImageUpload} style={{ color: "green" }} ref={fileInputRef} accept='image/*'
                        className="form-control"
                    />
                    {
                        preview && (
                            <div className="mt-2 text-center">
                                <img src={preview} alt="Preview" className="img-thumbnail" style={{ width: '175px', height: "175px", marginTop: "10px" }} />
                            </div>
                        )
                    }
                    <div style={{ justifyContent: "space-evenly", display: "flex" }}>
                        {preview && <button className="btn btn-danger" onClick={handleImageDelete} style={{ marginTop: "15px" }}>Delete</button>}
                        {!spin && !final && <button className="btn btn-success" onClick={handleImageUploadClick} style={{ marginTop: "15px" }} >Generate</button>}
                    </div>
                    {spin && <div className={props.mode === "light" ? "spinner-border text-dark" : "spinner-border text-light"} style={{ marginTop: "20px" }} role="status"></div>}
                </div>
            </div>
            {
                final && (
                    <div className='text-center'>
                        <div className="text-center mt-4">
                            <h3 color={props.mode === "light" ? "black" : "white"}>Stylized Image</h3>
                            <img src={`http://localhost:5500${final}`} alt="Stylized" className="img-thumbnail" style={{ width: '300px' }} />
                        </div>
                        <button className="btn btn-success" style={{ marginTop: "15px" }} onClick={handleDownload}><TiDownload style={{ marginBottom: "4px" }} /> Download</button>
                        <button className="btn btn-danger" style={{ marginTop: "15px", marginLeft: "7px" }} onClick={handleRemove}>Close</button>
                    </div>
                )
            }
        </div >
    );
}
