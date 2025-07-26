import { useGoogleLogin } from '@react-oauth/google'
import { Chrome } from 'lucide-react'

export function Google() {
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
                console.log('User Info:', userInfo) // Should include email
            } catch (err) {
                console.error('Failed to fetch user info:', err)
            }
        },
        onError: () => console.log('Login Failed'),
    })

    return (
        <button
            onClick={() => login()}
            className="w-50 h-10 cursor-pointer font-semibold rounded-lg shadow-md ring-1 flex justify-center items-center gap-1.5"
        >
            <Chrome size={20} />
            Google
        </button>
    )
}
