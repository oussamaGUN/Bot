import {Github ,Chrome} from "lucide-react";
import {useState} from "react";
import IridescenceMemo from "./IridescenceMemo.tsx";
import { useNavigate } from 'react-router-dom';


function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailExists, setEmailExists] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [welcome, setWelcome] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        fetch("http://localhost:8080/auth/register", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                confirmPassword: confirmPassword,
            }),
        })
            .then((response: Response) => {
                if (!response.ok) throw new Error("Network error");
                return response.text(); // 👈 parse JSON body
            })
            .then((data) => {
                if (data === "email already exist")
                {
                    setPasswordMismatch(false);
                    setWelcome(false);
                    setEmailExists(true);
                }
                else if (data === "not matching passwords")
                {
                    setEmailExists(false);
                    setWelcome(false);
                    setPasswordMismatch(true);
                }
                else
                {
                    setEmailExists(false);
                    setPasswordMismatch(false);
                    setWelcome(true);
                    setTimeout(() => {
                        navigate("/signin");
                    }, 2000);
                }
                console.log(data); // your JSON response
            })
    }
    return (
        <div className="w-screen h-screen font-family">
            <div className="w-full h-full">
                <IridescenceMemo />
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-blue-950 opacity-50">
            </div>
            <div className="absolute flex items-center justify-center inset-0 z-20 opacity-80">
                <div className=" bg-white/90 backdrop-blur-lg w-150 h-150 rounded-4xl">
                    <div className="h-20  flex items-center justify-center ">
                        <h1 className=" mt-20 text-blue-500 text-4xl font-bold">Sign Up</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="h-30  flex items-center justify-center  ">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    onChange={(e) => {setEmail(e.target.value)}}
                                    className="w-100 mt-10 pl-5  py-2 rounded-lg bg-white/100 text-blue-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg ring-2 ring-blue-500"
                                />
                        </div>
                        <div className="mt-5 flex items-center justify-center ">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-100 pl-5  py-2 rounded-lg bg-white/100 text-blue-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg ring-2 ring-blue-500"
                                />
                        </div>
                        <div className="mt-10 flex items-center justify-center ">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Confirm Password"
                                    required
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-100 pl-5  py-2 rounded-lg bg-white/100 text-blue-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg ring-2 ring-blue-500"
                                />
                        </div>
                        <div className="mt-5 flex items-center justify-center text-blue-900">
                            <h1 className="cursor-pointer" onClick={() => navigate("/signin")}>already have an account?</h1>
                        </div>
                        <div className="flex items-center justify-center mt-3">
                            <button
                                className="w-102 h-10 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md ring-1 ring-blue-300 transition duration-300 ease-in-out">
                                Sign Up
                            </button>
                        </div>
                        <div className="flex items-center justify-center mt-3">
                            {emailExists && (<h1 className="text-red-500">Email already exists</h1>)}
                            {passwordMismatch && (<h1 className="text-red-500">Passwords not matching</h1>)}
                            {welcome && (<h1 className="text-green-500">Registered successfully</h1>)}
                        </div>
                    </form>
                    <div className="flex items-center justify-center mt-3 gap-1.5 text-gray-500">
                        <div className="h-0.5 bg-gray-400 w-40"></div>
                        <h1>or</h1>
                        <div className="h-0.5 bg-gray-400 w-40"></div>
                    </div>
                    <div className="flex items-center justify-center gap-5 mt-3 text-blue-900">
                        <button
                            className="w-50 h-10 cursor-pointer  font-semibold rounded-lg shadow-md ring-1 flex justify-center items-center gap-1.5">
                            <Chrome size={20}/>
                            Google
                        </button>
                        <button
                            className="w-50 h-10 cursor-pointer  font-semibold rounded-lg shadow-md ring-1 flex justify-center items-center gap-1.5">
                            <Github size={20}/> GitHub
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default Register;