import axios from "axios";

const getCookie = (name) => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(";").shift();
};

const accessToken = getCookie("accessToken");

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_SERVER_URL,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${accessToken}`,
	},
});

export default axiosInstance;
