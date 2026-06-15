import React, {useState, useContext} from "react";
import { Link , useNavigate} from "react-router-dom";
import '../style/auth.css';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: name, email, password }),
                credentials: 'include',
            });
            const data = await res.json();
            if (res.ok) {
                alert('Registration successful! Please check your email for the OTP.');
                navigate('/login');
            }
            else {
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Register on ShopNest</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input  
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />  
                <input
                    type="password"
                    placeholder="Password"
                    value={password}    
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="btn">Register</button> 
                <p style={{ marginTop: '15px' }}>
                    Already have an account? <Link to="/login" style={{ color: '#f97316' }}>Login here</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;

