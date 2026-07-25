import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, PlusCircle } from 'lucide-react';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Dynamically routes to Workspace if signed in, or Public Catalog if guest */}
                <Link to={isLoggedIn ? "/my-recipes" : "/"} className="navbar-brand">
                    <ChefHat size={28} />
                    <span>RecipeFinder</span>
                </Link>
            </div>
            <div className="navbar-links">
                {isLoggedIn ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {/* Fixed: Forced explicit color: '#ffffff' on both icon and text */}
                        <button 
                            onClick={() => navigate('/add-recipe')} 
                            className="navbar-link navbar-add-btn"
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '4px', 
                                background: 'none', 
                                border: 'none', 
                                cursor: 'pointer', 
                                font: 'inherit',
                                color: '#ffffff' /* 👈 Added explicit white text */
                            }}
                        >
                            <PlusCircle size={16} style={{ marginRight: '4px', verticalAlign: 'middle', color: '#ffffff' }} />
                            Add Recipe
                        </button>
                        
                        <button 
                            onClick={handleLogout} 
                            className="navbar-link"
                            style={{ 
                                background: 'none', 
                                border: 'none', 
                                cursor: 'pointer', 
                                font: 'inherit',
                                color: '#ffffff' /* 👈 Added explicit white text */
                            }}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    /* Buttons shown to logged-out users/guests */
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Link to="/" className="navbar-link" style={{ color: '#ffffff' }}>Catalog</Link>
                        <Link to="/signin" className="navbar-link" style={{ color: '#ffffff' }}>Sign In</Link>
                        <Link to="/signup" className="navbar-link" style={{ color: '#ffffff' }}>Sign Up</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;