import { useState } from "react";
import "./Login.css";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "../../components/axiosInstance";

function Login() {
	const navigate = useNavigate();
	const [rightPanelActive, setRightPanelActive] = useState(false);

	const loginAuth = useGoogleLogin({
		onSuccess: async (codeResponse) => {
			try {
				const response = await axios.post("/api/auth/google", {
					code: codeResponse.code,
				});

				console.log(response);

				const { refreshToken, accessToken, user } = response.data.data;
                console.log(user)
                localStorage.removeItem('persist:root');
                // Store tokens in local storage or cookies
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('currentUser', JSON.stringify(user));

				// Manually set cookies on the frontend
				document.cookie = `accessToken=${accessToken}; path=/;`;
				document.cookie = `refreshToken=${refreshToken}; path=/;`;

				console.log("Google authentication successful:", user);
				navigate("/setup");
			} catch (error) {
				console.error("Google authentication failed:", error);
			}
		},
		flow: "auth-code",
	});

	const handleSignUpClick = () => {
		setRightPanelActive(true);
	};

	const handleSignInClick = () => {
		setRightPanelActive(false);
	};

	return (
		<div id="loginForm">
			<div
				className={`custom-container ${
					rightPanelActive ? "right-panel-active" : ""
				}`}
				id="login-container"
			>
				<div className="form-container sign-up-container">
					<form action="#">
						<h1>Create Account</h1>
						<div className="social-container">
							<a
								href="#"
								className="social"
								onClick={() => loginAuth()}
							>
								<i className="fab fa-google-plus-g"></i>
							</a>
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
							<a
								href="#"
								className="social"
								onClick={() => loginAuth()}
							>
								<i className="fab fa-google-plus-g"></i>
							</a>
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
							<p>
								To keep connected with us please login with your
								personal info
							</p>
							<button
								className="ghost"
								id="signIn"
								onClick={handleSignInClick}
							>
								Sign In
							</button>
						</div>
						<div className="overlay-panel overlay-right">
							<h1>Hello, Friend!</h1>
							<p>
								Enter your personal details and start journey
								with us
							</p>
							<button
								className="ghost"
								id="signUp"
								onClick={handleSignUpClick}
							>
								Sign Up
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
