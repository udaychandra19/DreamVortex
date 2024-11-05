import React from 'react';
import { TiUserOutline } from "react-icons/ti";
import { Link } from 'react-router-dom';

export default function NavBar(props) {
    const toggling = () => {
        props.toggle();
    }
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{ marginLeft: "3px", marginBottom: "5px" }}>DreamVortex</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/Creativity">Personalize</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Dreaming">Imagination</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <button onClick={toggling} style={{ padding: 'none', marginTop: "8px", border: "none", backgroundColor: "white", color: 'black', cursor: 'pointer', borderRadius: "20px", height: "30px", width: "30px", marginRight: "10px" }}>{props.mode === "dark" ? <i className="fas fa-sun" style={{ backgorundColor: "pink" }}></i> : <i className="fas fa-moon" style={{ backgorundColor: "#242424" }}></i>}</button>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Profile"><TiUserOutline style={{ color: "black", backgroundColor: "white", borderRadius: "10px", height: "30px", width: "30px" }} /></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
