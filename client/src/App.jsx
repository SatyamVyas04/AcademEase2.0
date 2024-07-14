import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login.jsx';
import HomePage from './components/TestHome/HomePage.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientIdAuth = import.meta.env.VITE_AUTH0_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={clientIdAuth}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
