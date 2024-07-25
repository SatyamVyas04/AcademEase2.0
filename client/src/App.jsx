import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, SetupPage } from "./pages";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProfilePage from "./pages/pfp/ProfilePage";

const clientIdAuth = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
    return (
        <GoogleOAuthProvider clientId={clientIdAuth}>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/setup" element={<SetupPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Routes>
                </div>
            </Router>
        </GoogleOAuthProvider>
    );
}

export default App;
