import { useState } from "react";
import image from "../../assets/AcademEaseBlue.svg";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SetupPage = () => {
    var localStorageData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    const userData = localStorageData || {};

    const navigate = useNavigate();
    const academicInterestsList = [
        "REACT",
        "MERN",
        "Nodejs",
        "NEXTjs",
        "AI/ML",
        "Cyber Security",
        "Blockchain",
        "Cloud computing",
        "Robotics",
        "Data Science",
        "AR/VR",
        "IoT"
    ];

    const [formData, setFormData] = useState({
        name: userData.username || userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        year: userData.year || '',
        college: userData.college || '',
        program: userData.program || '',
        cgpa: userData.cgpa || '',
        academicInterests: userData.academicInterests || [],
        goals: userData.goals || '',
        password: userData.password || ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            let updatedInterests = [...formData.academicInterests];
            if (checked) {
                updatedInterests.push(value);
            } else {
                updatedInterests = updatedInterests.filter(interest => interest !== value);
            }
            setFormData((prevState) => ({
                ...prevState,
                academicInterests: updatedInterests
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8000/setup/submit', formData);
            if(response){
                console.log(response);
                navigate("/home")
            }
            
        }
        catch(error){
            console.log("Details update failed: ", error);
        }
        localStorage.setItem('currentUser', JSON.stringify(formData));
        console.log(formData);
    };

    const [selectedYear, setSelectedYear] = useState(null);

    const handleYearChange = (date) => {
        setSelectedYear(date);
        setFormData((prevState) => ({
            ...prevState,
            year: date.getFullYear()
        }));
    };

    return (
        <div className="min-h-full flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8 bg-gray-100">
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

            <div className="sm:mx-auto sm:w-full sm:max-w-3xl rounded-b-xl">
                <div className="bg-white py-10 px-6 shadow-lg rounded-lg sm:px-12 sm:py-12 grid grid-cols-3 gap-6 flex-wrap">
                    <div className="col-span-1">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <div className="mt-1">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="col-span-1">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email address
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="col-span-1">
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Phone number
                        </label>
                        <div className="mt-1">
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                autoComplete="tel"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="col-span-1">
                        <label
                            htmlFor="year"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Year of passing
                        </label>
                        <div className="mt-1">
                            <DatePicker
                                selected={selectedYear}
                                onChange={handleYearChange}
                                showYearPicker
                                dateFormat="yyyy"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="col-span-1">
                        <label
                            htmlFor="college"
                            className="block text-sm font-medium text-gray-700"
                        >
                            College
                        </label>
                        <div className="mt-1">
                            <select
                                id="college"
                                name="college"
                                autoComplete="college"
                                required
                                value={formData.college}
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select College</option>
                                <option value="college1">Sardar Patel Institute of Technology</option>
                                <option value="college2">SVKMs Dwarkadas J. Sanghvi College of Engineering</option>
                                <option value="college3">Thadomal Shahani Engineering College</option>
                                <option value="college4">Thakur College of Engineering and Technology</option>
                                <option value="college5">Veermata Jijabai Technological Institute</option>
                                <option value="college6">K. J. Somaiya College of Engineering</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <label
                            htmlFor="program"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Program of study
                        </label>
                        <div className="mt-1">
                            <select
                                id="program"
                                name="program"
                                autoComplete="program"
                                required
                                value={formData.program}
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select Program</option>
                                <option value="program1">B.Tech</option>
                                <option value="program2">M.Tech</option>
                                <option value="program3">MCA</option>
                                <option value="program4">BSC</option>
                                <option value="program5">MSC</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <label
                            htmlFor="cgpa"
                            className="block text-sm font-medium text-gray-700"
                        >
                            CGPA
                        </label>
                        <div className="mt-1">
                            <input
                                id="cgpa"
                                name="cgpa"
                                type="number"
                                step="0.01"
                                autoComplete="cgpa"
                                required
                                value={formData.cgpa}
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="col-span-3">
                        <fieldset>
                            <legend className="block text-sm font-medium text-gray-700">
                                Academic interests
                            </legend>
                            <div className="mt-2 grid grid-cols-6 gap-2">
                                {academicInterestsList.map((interest, index) => (
                                    <div key={index} className="flex items-center">
                                        <input
                                            id={`interest${index + 1}`}
                                            name="academicInterests"
                                            type="checkbox"
                                            value={interest}
                                            checked={formData.academicInterests.includes(interest)}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <label
                                            htmlFor={`interest${index + 1}`}
                                            className="ml-2 block text-sm text-gray-900"
                                        >
                                            {interest}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </fieldset>
                    </div>

                    <div className="col-span-1">
                        <label
                            htmlFor="goals"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Goals
                        </label>
                        <div className="mt-1">
                            <select
                                id="goals"
                                name="goals"
                                autoComplete="goals"
                                required
                                value={formData.goals}
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select Goals</option>
                                <option value="placement">Placement</option>
                                <option value="higher_study">Higher Study</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <div className="mt-1">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="col-span-3 sm:col-span-3">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Start Contributing
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SetupPage;
