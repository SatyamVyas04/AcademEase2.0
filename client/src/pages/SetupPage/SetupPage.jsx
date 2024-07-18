import { useState } from "react";
import image from "../../assets/AcademEaseBlue.svg";
const SetupPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        year: "",
        college: "",
        program: "",
        cgpa: "",
        academicInterests: "",
        goals: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Handle form submission logic here
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-full mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl"
        >
			<div className="sm:mx-auto sm:w-full sm:max-w-3xl bg-white p-4 rounded-t-xl">
				<img
					className="mx-auto h-12 w-auto"
					src={image}
					alt="AcademEase"
				/>
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					Setup your account
				</h2>
			</div>
            <div className="mb-4">
                <label
                    htmlFor="name"
                    className=" block mb-2 text-sm font-medium text-gray-700"
                >
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-80 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="email"
                    className=" mb-2 text-sm font-medium text-gray-700"
                >
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="phoneNumber"
                    className=" mb-2 text-sm font-medium text-gray-700"
                >
                    Phone Number
                </label>
                <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="year"
                    className=" mb-2 text-sm font-medium text-gray-700"
                >
                    Year
                </label>
                <input
                    type="text"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="college"
                    className=" mb-2 text-sm font-medium text-gray-700"
                >
                    College
                </label>
                <input
                    type="text"
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="program"
                    className=" mb-2 text-sm font-medium text-gray-700"
                >
                    Program
                </label>
                <select
                    id="program"
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    required               
				>
                    <option value="option1">B.Tech</option>
                    <option value="option2">M.Tech</option>
                    <option value="option3">MCA</option>
                    <option value="option4">Option 4</option>
                </select>
            </div>

            <div className="mb-4">
                <label
                    htmlFor="cgpa"
                    className=" mb-2 text-sm font-medium text-gray-700"
                >
                    CGPA
                </label>
                <input
                    type="text"
                    id="cgpa"
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="academicInterests"
                    className=" mb-2 text-sm font-medium text-gray-700"
                >
                    Academic Interests
                </label>
                <input
                    type="text"
                    id="academicInterests"
                    name="academicInterests"
                    value={formData.academicInterests}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="goals"
                    className=" mb-2 text-sm font-medium text-gray-700"
                >
                    Goals
                </label>
                <input
                    type="text"
                    id="goals"
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-4000"
                    required
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="password"
                    className=" mb-2 text-sm font-medium text-gray-700"
                >
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
                Submit
            </button>
        </form>
    );
};

export default SetupPage;
