import { useGoogleLogin } from '@react-oauth/google'
import { Chrome } from 'lucide-react'
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export function Google() {
    const navigate = useNavigate();
    const [welcome, setWelcome] = useState(false);

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                })

                if (!res.ok) {
                    throw new Error('Failed to fetch user info')
                }

                const userInfo = await res.json()
                fetch('http://localhost:8080/auth/google-log', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        email: userInfo.email,
                    })
                }).then(res => {
                    if (res.ok) {
                        setWelcome(true);
                        setTimeout(() => {
                            navigate('/workflow');
                        }, 2000)
                    }
                })
            } catch (err) {
                console.error('Failed to fetch user info:', err)
            }
        },
        onError: () => console.log('Login Failed'),
    })

    return (
        <div className="flex flex-col items-center gap-5">
            <button
                onClick={() => login()}
                className="w-105 mt-2 h-10 cursor-pointer font-semibold rounded-lg shadow-md ring-1 flex justify-center items-center gap-1.5"
            >
                <Chrome size={20}/>
                Google
            </button>
            {welcome && (
                <h1 className="text-green-500">welcome</h1>
            )}
        </div>
    )
}
