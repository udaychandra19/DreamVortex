import React, { useState, useEffect } from 'react';

export default function About(props) {
    const [mode, setMode] = useState(props.mode);

    useEffect(() => {
        setMode(props.mode);
        document.body.style.backgroundColor = props.mode === "light" ? '#fff' : '#2c2c2c';
    }, [props.mode]);

    const styles = {
        container: {
            maxWidth: '1500px',
            margin: '0 auto',
            padding: '40px',
            marginTop: '80px',
            fontFamily: 'Roboto, sans-serif',
            backgroundColor: mode === 'light' ? '#f0f4f8' : '#333',
            color: mode === 'light' ? '#333' : '#fdf6e4',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            animation: 'fadeIn 1s ease-in-out',
        },
        heading: {
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '20px',
            color: mode === 'light' ? '#2c3e50' : '#fdf6e4',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '3px',
        },
        subHeading: {
            fontSize: '24px',
            fontWeight: '600',
            marginTop: '30px',
            marginBottom: '15px',
            color: '#16a085',
            borderBottom: `2px solid ${mode === 'light' ? '#16a085' : '#fdf6e4'}`,
            paddingBottom: '10px',
        },
        paragraph: {
            fontSize: '18px',
            marginBottom: '20px',
            lineHeight: '1.8',
            color: mode === 'light' ? '#555' : '#dcdcdc',
        },
        list: {
            listStyleType: 'disc',
            paddingLeft: '20px',
            fontSize: '18px',
            marginBottom: '20px',
            color: mode === 'light' ? '#333' : '#dcdcdc',
        },
        listItem: {
            marginBottom: '10px',
        },
        highlight: {
            backgroundColor: mode === 'light' ? '#ecf0f1' : '#444',
            padding: '20px',
            borderRadius: '10px',
            marginBottom: '20px',
            borderLeft: `5px solid ${mode === 'light' ? '#16a085' : '#fdf6e4'}`
        },
        thankYou: {
            marginTop: '40px',
            fontSize: '16px',
            fontStyle: 'italic',
            color: '#e67e22',
            textAlign: 'center',
        },
        accent: {
            color: '#16a085',
            fontWeight: 'bold',
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
            <h1 style={styles.heading}>Dream Vortex - Realm of Infinite Imaginations</h1>
            <h2 style={styles.subHeading}>Our Vision</h2>
            <p style={styles.paragraph}>
                <span style={styles.accent}>Dream Vortex Creations</span> is a platform that enables users to upload their photos and apply customized Deep Dream effects. Our vision is to provide a seamless and creative experience where users can explore endless artistic possibilities.
            </p>

            <h2 style={styles.subHeading}>Key Features</h2>
            <div style={styles.highlight}>
                <p style={styles.paragraph}>Discover the exciting features of Dream Vortex Creations:</p>
                <ul style={styles.list}>
                    <li style={styles.listItem}>Upload Your Photos: Seamlessly upload your photos to the platform and apply unique Deep Dream effects.</li>
                    <li style={styles.listItem}>Customize Effects: Choose from a range of styles and parameters to create stunning and personalized artworks.</li>
                    <li style={styles.listItem}>Purchase Options: Explore options to purchase prints or digital copies of your creations, making it easy to showcase and share your artwork.</li>
                    <li style={styles.listItem}>Community Engagement: Connect with a community of artists, share your creations, and discover inspiration from others.</li>
                </ul>
            </div>

            <h2 style={styles.subHeading}>Explore Endless Creativity</h2>
            <div style={styles.highlight}>
                <p style={styles.paragraph}>Dream Vortex Creations offers a dynamic platform for artistic exploration:</p>
                <ul style={styles.list}>
                    <li style={styles.listItem}><strong>Style Variety:</strong> Choose from a diverse range of Deep Dream styles to create unique and captivating artworks.</li>
                    <li style={styles.listItem}><strong>Parameter Control:</strong> Adjust parameters such as intensity, color palette, and dream-like distortions to achieve your desired artistic expression.</li>
                    <li style={styles.listItem}><strong>Artwork Purchase:</strong> Purchase prints or digital copies of your creations to showcase your artwork in various formats.</li>
                    <li style={styles.listItem}><strong>Artistic Community:</strong> Engage with fellow artists, share techniques, and explore new ideas within a supportive community.</li>
                </ul>
            </div>

            <h2 style={styles.subHeading}>Join the Dream Vortex Revolution</h2>
            <p style={styles.paragraph}>Experience the fusion of art and technology with Dream Vortex Creations. Unleash your imagination, create captivating artworks, and embark on a journey of artistic discovery.</p>

            <p style={styles.thankYou}>Thank you for joining us on this creative journey with Dream Vortex Creations. Let&apos;s explore and celebrate the limitless possibilities of digital artistry together.</p>
        </div>
    );
}
