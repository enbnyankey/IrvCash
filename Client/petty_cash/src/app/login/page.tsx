"use client";
import Inputfields from "../components/Inpufields/inputfields";
import Button from "../components/buttons/buttons";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { on } from "events";
import { useRouter } from 'next/navigation';

export default function Login() {
    const [opened, setopened] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginData, setLoginData] = useState("");
    const route = useRouter();
    const fields = [
        { label: "Email", type: "email", placeholder: "Enter Email", value: email, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value) },
        { label: "Password", type: "password", placeholder: "Enter Password", value: password, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value) },
    ];
    const buttons = [
        { label: "Sign Up with Google", icon: <FcGoogle size={20} />, type: "button" },
        { label: "Sign Up  with Email", icon: <MdEmail size={20} color="blue" />, type: "button" },
    ];
    // const handleLogin = async () => {


    const clearFields = () => {
        setEmail('');
        setPassword('');
    }
    //     try {
    //         const response = await axios.post("{{baseURL}}/api/v1/login",{
    //         // ('http://localhost:5000/api/v1/login', {
    //             email, password},
    //             { headers: { "Content-Type": "application/json" } });
    //             if (response.status === 200) {
    //         console.log("Login successful:", response.data);
    //         // Save response data (e.g., token, user info)
    //         setLoginData(response.data);
    //         console.log("response data ", response.data);
    //             }
    //         // Do NOT reset email/password from backend response
    //         // Just clear the fields if you want
    //     } catch (error) {
    //         console.error("Login failed:", error);
    //     }
    // };
    const handleLogin = async () => {
        // Debug: Check if email and password have values
        console.log("Email value:", email);
        console.log("Password value:", password);

        if (!email || !password) {
            console.error("Email or password is empty");
            alert("Please fill in both email and password");
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/api/v1/login", {
                email,
                password
            }, {
                headers: { "Content-Type": "application/json" }
            });
            if (response.status === 200) {
                console.log("Login successful:", response.data);
                toast.success('User Successfully logged In!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    style: {
                        backgroundColor: '#c9e6f2',
                        color :'#000038'
                    }
                    // transition: Bounce,
                });

                setLoginData(response.data);
                // Log the response data directly, not the state
                console.log("Response data:", response.data);
            };
            clearFields();
            route.push('/');
        } catch (error) {
            console.error("Login failed:", error);
            toast.error('Login Failed', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        // transition: Bounce,
});
        }
    };
    return (
        <div className="flex h-full w-full bg-gray-50">
            {/* Left side - Animation */}
            <div className="hidden lg:flex w-1/2 justify-center items-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
                <div className="w-[600px] h-[600px]">
                    <DotLottieReact
                        src="/images/login screen (1).lottie"
                        loop
                        autoplay
                        className="w-full h-full"
                    />
                </div>
            </div>
            {/* Right side - Login form */}
            <div className="flex w-full lg:w-1/2 justify-center items-center px-6">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                    <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">
                        Welcome Back 👋
                    </h2>
                    <p className="text-gray-500 text-center mb-8">
                        Please login to your account
                    </p>
                    <div className="flex flex-col gap-4">
                        {fields.map((field) => (
                            <Inputfields
                                key={field.label}
                                label={field.label}
                                type={field.type}
                                value={field.value}
                                classname="text-gray-700 rounded-lg border p-3 border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder={field.placeholder}
                                onChange={field.onChange}
                            />
                        ))}
                    </div>
                    <div className="flex justify-end items-center mt-4">
                        {/* <label className="flex items-center text-sm text-gray-600">
                            <input
                                type="checkbox"
                                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            Remember me
                        </label> */}
                        <a href="#" className="text-sm text-blue-600 hover:underline">
                            Forgot Password?
                        </a>
                    </div>
                    <Button
                        label={"Login"}
                        onClick={handleLogin}
                        classname="cursor-pointer mt-6 bg-blue-900 w-full text-white p-3 rounded-lg font-medium hover:bg-blue-800 transition"
                    />
                    <div>
                        <div>
                            <div className="flex items-center ">
                                <div className="flex-1 h-px bg-gray-100"></div>
                                <span className="px-3 text-gray-400 font-medium my-4">OR</span>
                                <div className="flex-1 h-px bg-gray-100"></div>
                            </div>
                        </div>
                        <div>
                            {buttons.map((button) => (
                                <button
                                    key={button.label}
                                    className="cursor-pointer text-gray-500 my-2 rounded-lg border p-3 border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center gap-3"
                                >
                                    {button.icon}
                                    {button.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 text-center mt-6">
                        Don’t have an account?{" "}
                        <a href="/signup" className="text-blue-600 hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
            <div>
                 <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    //  transition={Bounce}
                />
            </div>
        </div>
    );
}
