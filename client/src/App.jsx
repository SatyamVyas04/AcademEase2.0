import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SetupPage from "./pages/SetupPage/SetupPage.jsx";

const clientIdAuth = import.meta.env.VITE_AUTH0_CLIENT_ID;

function App() {
    return (
        <GoogleOAuthProvider clientId={clientIdAuth}>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/setup" element={<SetupPage/>} />
                    </Routes>
                </div>
            </Router>
        </GoogleOAuthProvider>
    );
}

export default App;
