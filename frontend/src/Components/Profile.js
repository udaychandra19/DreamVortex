import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Profile(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [path1, setPath1] = useState([]);
    const [path2, setPath2] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:5500/info?username=${props.user}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setName(data.name);
                setEmail(data.email);
                setPath1(data.path1 || []);
                setPath2(data.path2 || []);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
        document.body.style.backgroundColor = props.mode === "light" ? "#f7f7f7" : "#333";
    }, [props.user, props.mode]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5500/delete?username=${props.user}`, {
                method: "DELETE"
            });
            if (response.ok) {
                props.loggedout();
                console.log("Account Successfully Deleted");
            }
        } catch (error) {
            console.log("Error Deleting an Account", error);
        }
    };

    const styles = {
        container: {
            maxWidth: '1600px',
            margin: '0 auto',
            padding: '40px',
            marginTop: '80px',
            marginBottom: '20px',
            fontFamily: 'Roboto, sans-serif',
            backgroundColor: props.mode === 'light' ? '#f0f4f9' : '#333',
            color: props.mode === 'light' ? '#333' : '#fdf6e4',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            animation: 'fadeIn 1s ease-in-out',
        },
        card: {
            backgroundColor: props.mode === 'light' ? '#ffffff' : '#444',
            color: props.mode === 'light' ? '#333' : '#f0f0f0',
            borderRadius: '10px',
            boxShadow: props.mode === 'light' ? '0 4px 8px rgba(0, 0, 0, 0.1)' : '0 4px 12px rgba(0, 0, 0, 0.3)',
            padding: '6px',
            marginBottom: '20px',
        },
        cardTitle: {
            margin: '0 0 15px',
            fontSize: '1.6rem',
            fontWeight: '600',
            color: props.mode === 'light' ? '#222' : '#eee',
        },
        listGroupItem: {
            backgroundColor: props.mode === "light" ? "grey" : "#333",
            color: props.mode === "light" ? "black" : "#f0f0f0",
            padding: "15px",
            border: `1px solid ${props.mode === "light" ? "#ddd" : "#444"}`,
            borderRadius: "8px",
            marginTop: "7px",
            marginBottom: "7px",
            transition: "background-color 0.3s ease, color 0.3s ease",
        },
        listGroupItemHover: {
            backgroundColor: props.mode === "light" ? "#f5f5f5" : "#444",
            color: props.mode === "light" ? "#000" : "#f0f0f0",
        },
        button: {
            backgroundColor: '#FF6F61',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            margin: '0 10px',
        },
        buttonHover: {
            backgroundColor: '#FF4F3A',
        },
        accordionButton: {
            backgroundColor: props.mode === 'light' ? 'grey' : '#555',
            color: props.mode === 'light' ? 'black' : '#f0f0f0',
        },
        accordionBody: {
            backgroundColor: props.mode === 'light' ? '#bbb' : '#555',
        },
        imageGallery: {
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '10px',
            padding: '15px'
        },
        image: {
            height: '250px',
            width: '250px',
            borderRadius: '10px',
            padding: "10px",
            margin: "10px",
            boxShadow: props.mode === 'light' ? '0 4px 8px rgba(0, 0, 0, 0.1)' : '0 4px 12px rgba(0, 0, 0, 0.3)',
            backgroundColor: props.mode === 'light' ? '#fff' : '#999',
        },
        '@keyframes fadeIn': {
            from: { opacity: 0 },
            to: { opacity: 1 },
        },
        '@media (max-width: 768px)': {
            container: {
                padding: '20px',
                marginTop: '40px',
            },
            heading: {
                fontSize: '28px',
            },
            subHeading: {
                fontSize: '20px',
            },
            paragraph: {
                fontSize: '16px',
            },
            list: {
                fontSize: '16px',
            },
        },
    };

    return (
        <div style={styles.container}>
            <div className="row text-center justify-content-center" style={{ marginBottom: "20px" }}>
                <div className="col-md-8">
                    <div className="card" style={styles.card}>
                        <div className="card-body" style={styles.cardBody}>
                            <h5 className="card-title" style={styles.cardTitle}>
                                {name.toUpperCase()}
                            </h5>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button className='btn' onClick={props.loggedout} style={styles.button}>LogOut</button>
                                <button className='btn' onClick={handleDelete} style={styles.button}>Delete Account</button>
                            </div>
                        </div>
                    </div>
                    <div className="card" style={styles.card}>
                        <div className="card-body" style={styles.cardBody}>
                            <h5 className="card-title" style={styles.cardTitle}>
                                PROFILE
                            </h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item" style={styles.listGroupItem}>
                                    <strong>Name:</strong> {name}
                                </li>
                                <li className="list-group-item" style={styles.listGroupItem}>
                                    <strong>Email:</strong> {email}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card mt-3" style={styles.card}>
                        <div className="card-body" style={styles.cardBody}>
                            <div id="accordionExample" className="accordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" style={styles.accordionButton} data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <h6 style={{ margin: '0px' }}>Style Transfer Activity</h6>
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample" style={styles.accordionBody}>
                                        <div className="accordion-body">
                                            <div className="image-gallery" style={styles.imageGallery}>
                                                {path1.map((path, index) => (
                                                    <img key={index} src={`http://localhost:5500/${path}`} alt="" style={styles.image} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="accordionExample2" className="accordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" style={styles.accordionButton} data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                            <h6>DeepDream Activity</h6>
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample2" style={styles.accordionBody}>
                                        <div className="accordion-body">
                                            <div className="image-gallery" style={styles.imageGallery}>
                                                {path2.map((path, index) => (
                                                    <img key={index} src={`http://localhost:5500/${path}`} alt="" style={styles.image} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
