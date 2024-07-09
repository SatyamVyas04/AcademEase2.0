import React, { useState, useEffect } from 'react';
import './Login.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    const [rightPanelActive, setRightPanelActive] = useState(false);

    const handleSignUpClick = () => {
        setRightPanelActive(true);
    };

    const handleSignInClick = () => {
        setRightPanelActive(false);
    };

    const handleLogin = (connection) => {
        loginWithRedirect({ connection });
    };

    return (
        <div>
            <div className={`container ${rightPanelActive ? 'right-panel-active' : ''}`} id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <a href="#" className="social" onClick={() => handleLogin('facebook')}><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social" onClick={() => handleLogin('google-oauth2')}><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social" onClick={() => handleLogin('github')}><i className="fab fa-github"></i></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <a href="#" className="social" onClick={() => handleLogin('facebook')}><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social" onClick={() => handleLogin('google-oauth2')}><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social" onClick={() => handleLogin('github')}><i className="fab fa-github"></i></a>
                        </div>
                        <span>or use your account</span>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <a href="#">Forgot your password?</a>
                        <button>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn" onClick={handleSignInClick}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
