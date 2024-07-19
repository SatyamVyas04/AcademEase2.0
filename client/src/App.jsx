import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, HomePage, SetupPage } from "./pages";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientIdAuth = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
    return (
        <GoogleOAuthProvider clientId={clientIdAuth}>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/setup" element={<SetupPage />} />
                    </Routes>
                </div>
            </Router>
        </GoogleOAuthProvider>
    );
}

export default App;
