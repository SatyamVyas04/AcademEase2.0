import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage, Login, SetupPage } from "./pages";
import { GoogleOAuthProvider } from "@react-oauth/google";
import NavBar from "./components/NavBar";
import Sidebar from "./components/SideNav";
import ProfilePage from "./pages/pfp/ProfilePage";
import HomePage from "./pages/HomePage/HomePage";

const clientIdAuth = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
	return (
		<GoogleOAuthProvider clientId={clientIdAuth}>
			<Router>
				<div className="App">
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/setup" element={<SetupPage />} />
						<Route path="/profile" element={<HomePageWrapper><ProfilePage /></HomePageWrapper>} />
						<Route
							path="/home"
							element={
								<HomePageWrapper>
									<HomePage />
								</HomePageWrapper>
							}
						/>
					</Routes>
				</div>
			</Router>
		</GoogleOAuthProvider>
	);
}

function HomePageWrapper({ children, requests, setRequests }) {
	return (
		<div className="bg-gray-100 min-h-full">
			<NavBar requests={requests} setRequests={setRequests} />
			<div className="py-10">
				<div className="max-w-3xl mx-auto sm:px-6 lg:max-w-[100dvw] lg:px-16 lg:grid lg:grid-cols-12 lg:gap-8">
					<Sidebar />
					{children}
				</div>
			</div>
		</div>
	);
}

export default App;
