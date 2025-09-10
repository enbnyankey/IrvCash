"use client";
import Inputfields from "../components/Inpufields/inputfields";
import Button from "../components/buttons/buttons";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
export default function SignUp() {
    const [opened, setopened] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpData, setSignUpData] = useState("");

    const Route = useRouter();
    const ClearFields =() =>{
        setFirstName('');
        setLastName('');
        setDepartment('');
        setPosition('');
        setEmail('');
        setPassword('');
    }
    const fields = [
        { label: "First", type: "text", placeholder: "First Name", value: firstName, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value) },
        { label: "Last", type: "text", placeholder: "Last Name", value: lastName, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value) },
        { label: "Department", type: "text", placeholder: "Department", value: department, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setDepartment(e.target.value) },
        { label: "Position", type: "text", placeholder: "Position", value: position, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPosition(e.target.value) },
        { label: "Email", type: "email", placeholder: "Enter Email", value: email, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value) },
        { label: "Password", type: "password", placeholder: "Enter Password", value: password, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value) },
    ];
    const buttons = [
        { label: "Sign Up with Google", icon: <FcGoogle size={20} />, type: "button" },
        { label: "Sign Up  with Email", icon: <MdEmail size={20} color="blue" />, type: "button" },
    ];


    const handleSignUp = async() => {
        try {

            const response = await axios.post("http://localhost:5000/api/v1/signup",
                { firstName, lastName, department, position, email, password },
                { headers: { "Content-Type": "application/json" } }
            );
            if(response.status ===200){
                 toast.error('Login Succesfull', {
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
            console.log("Sign Up successful", response.data);
            setSignUpData(response.data);
            console.log("Response data:", response.data);
            }
        } catch (error) {
            
            console.log("Error during sign up:", error);
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
    }

return (
    <div className="flex h-full w-full bg-gray-50">
        {/* Left side - Animation */}
        <div className="hidden lg:flex w-1/2 justify-center items-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
            <div className="w-[800px] h-[800px]">
                <DotLottieReact
                    src="/images/Login.lottie"
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
                    Create Account 👋
                </h2>
                <p className="text-gray-500 text-center mb-4">
                    Please sign up to get started!
                </p>

                <div className="flex flex-col gap-2">
                    {fields.map((field) => (
                        <Inputfields
                            key={field.label}
                            label={field.label}
                            type={field.type}
                            value={field.value}
                            onChange={field.onChange}
                            classname="text-gray-700 rounded-lg border p-3 border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={field.placeholder}
                        />
                    ))}
                </div>

                <div className="flex justify-between items-center mt-4">
                    <label className="flex items-center text-sm text-gray-600">
                        <input
                            type="checkbox"
                            className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        Remember me
                    </label>
                    <a href="#" className="text-sm text-blue-600 hover:underline">
                        Forgot Password?
                    </a>
                </div>

                <Button
                    label={"Sign Up"}
                    onClick={handleSignUp}
                    classname="mt-6 font-semibold bg-blue-900 w-full text-white p-3 rounded-lg hover:bg-blue-800 transition"
                />

                <p className="text-sm text-gray-500 text-center mt-6">
                    Already Have An Exisiting Account{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                        Log In
                    </a>
                </p>
                <div>
                    {buttons.map((button) => (
                        <button
                            key={button.label}
                            className="cursor-pointer text-gray-500 my-2 rounded-lg border p-3 border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center gap-3">
                            {button.icon}
                            {button.label}
                        </button>
                    ))}
                </div>

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
