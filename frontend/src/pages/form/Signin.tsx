import {Github ,Chrome} from "lucide-react";
import IridescenceMemo from "./IridescenceMemo.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Google} from "./Google.tsx";

function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [welcome, setWelcome] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        fetch("http://localhost:8080/auth/signin", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response: Response) => {
                if (!response.ok) throw new Error("Network error");
                return response.text(); // 👈 parse JSON body
            })
            .then((data) => {
                if (data === "email not found" || data === "invalid password") {
                    setWelcome(false);
                    setInvalidEmail(true);
                }
                else
                {
                    setInvalidEmail(false);
                    setWelcome(true);
                    setTimeout(() => {
                        navigate("/workflow");
                    }, 2000);
                }
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
                <div className=" bg-white/90 backdrop-blur-lg w-150 h-140 rounded-4xl">
                    <div className="h-20  flex items-center justify-center ">
                        <h1 className=" mt-20 text-blue-500 text-4xl font-bold ">Sign In</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="h-30  flex items-center justify-center  ">
                                <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-110 mt-10 pl-5  py-2 rounded-lg bg-white/100 text-blue-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg ring-2 ring-blue-500"
                                />
                        </div>
                        <div className="mt-5 flex items-center justify-center ">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-110 pl-5  py-2 rounded-lg bg-white/100 text-blue-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg ring-2 ring-blue-500"
                                />
                        </div>
                        <div className="mt-2">
                            <div className="flex items-center justify-center gap-33 mb-5 text-blue-950">
                                <div className="flex items-center gap-1">
                                    <input type="checkbox" id="remember" className="w-4 h-4" />
                                    <label htmlFor="remember" className="text-blue-900">Remember me</label>
                                </div>
                                <h1>forgot password</h1>
                            </div>
                        </div>
                        <div className="flex items-center justify-center mb-5">
                            <h1 className="text-blue-900 cursor-pointer" onClick={() => {navigate("/register")}}>don't have an account?</h1>
                        </div>
                        <div className="flex items-center justify-center ">
                            <button
                                type="submit"
                                className="w-108 h-10 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md ring-1 ring-blue-300 transition duration-300 ease-in-out">
                                Sign in
                            </button>
                        </div>
                        <div className="flex items-center justify-center mt-3">
                            {invalidEmail && (<h1 className="text-red-500">Invalid email or password</h1>)}
                            {welcome && (<h1 className="text-green-500">Welcome</h1>)}
                        </div>
                    </form>
                    <div className="flex items-center justify-center mt-3 gap-1.5 text-gray-500">
                        <div className="h-0.5 bg-gray-400 w-40"></div>
                        <h1>or</h1>
                        <div className="h-0.5 bg-gray-400 w-40"></div>
                    </div>
                    <div className="flex items-center justify-center gap-5 mt-3 text-blue-900">
                        <Google />

                    </div>
                </div>
            </div>

        </div>
    );
}
export default Signin;