import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Eye, EyeOff } from 'lucide-react';

const SignUp = () => {
    const [formData, setFormData] = useState({ userName: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await api.register(formData);
            navigate('/signin');
        } catch (err) {
            setError(err.message || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">Sign Up</h2>
            {error && <p style={{ color: '#ef4444', textAlign: 'center', marginBottom: '12px' }}>{error}</p>}
            
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-group">
                    <label className="auth-label">Full Name</label>
                    <input
                        type="text"
                        name="userName"
                        placeholder="Enter your full name"
                        className="auth-input"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="auth-group">
                    <label className="auth-label">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="auth-input"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="auth-group">
                    <label className="auth-label">Password</label>
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Create a password"
                            className="auth-input"
                            style={{ paddingRight: '2.5rem' }}
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="password-toggle-btn"
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                    </div>
                </div>

                <button type="submit" disabled={loading} className="auth-btn">
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
            </form>

            <p className="auth-toggle-text">
                Already have an account? <Link to="/signin" className="auth-link">Sign In</Link>
            </p>
        </div>
    );
};

export default SignUp;