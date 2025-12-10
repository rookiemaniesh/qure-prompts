'use client'
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router=useRouter()

    const handleSubmit = async () => {
        if (!email || !password || !firstName|| !lastName) {
            setError("Please fill in all fields");
            return;
        }
        
        try {
            const res=await fetch('api/auth/signup',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email,password,lastName,firstName})
            })
            const data=await res.json()
            if(!res.ok){
                setError(data.error || 'An Error Occured') 
                return
            }
            if(data.error){
                setError(data.error)
                return
            }
            router.push('/login');
            router.refresh()
        } catch (error) {
           
        }
    };
    return (
        <div className="min-h-screen bg-white text-black flex  relative p-8 md:p-16 lg:p-20">
            <div className="w-full max-w-md space-y-12">
                {/* Header */}
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-8">Qure Guidelines</p>
                    <h1 className="text-6xl font-bold tracking-tight">Register</h1>
                </div>

                {/* Form */}
                <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-500" htmlFor="firstname">
                                First Name
                            </label>
                            <input
                                id="firstname"
                                type="text"
                                className="w-full bg-transparent border-b border-gray-300 py-2 text-lg focus:outline-none focus:border-black transition-colors"
                                placeholder=""
                                value={firstName}
                                onChange={(e)=>{
                                    setFirstName(e.target.value)
                                }}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-500" htmlFor="lastname">
                                Last Name
                            </label>
                            <input
                                id="lastname"
                                type="text"
                                className="w-full bg-transparent border-b border-gray-300 py-2 text-lg focus:outline-none focus:border-black transition-colors"
                                placeholder=""
                                value={lastName}
                                onChange={(e)=>{
                                    setLastName(e.target.value)
                                }}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full bg-transparent border-b border-gray-300 py-2 text-lg focus:outline-none focus:border-black transition-colors"
                            placeholder=""
                            value={email}
                                onChange={(e)=>{
                                    setEmail(e.target.value)
                                }}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full bg-transparent border-b border-gray-300 py-2 text-lg focus:outline-none focus:border-black transition-colors"
                            placeholder=""
                            value={password}
                                onChange={(e)=>{
                                    setPassword(e.target.value)
                                }}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <button className="px-8 py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors"
                        onClick={handleSubmit}>
                            Sign Up
                        </button>
                        <span className="text-gray-400 text-sm">or</span>
                        <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                            onClick={() => signIn("google")}>
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            <span className="text-sm font-medium">Sign up with Google</span>
                        </button>
                    </div>
                    <div>
                        <Link href="/login" className="text-sm text-gray-500 hover:text-black transition-colors">
                            Already have an account? Login
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer Vevo Logo */}
            <div className="absolute bottom-8 right-8">
                <span className="text-5xl font-bold tracking-tighter">Qure</span>
            </div>
        </div>
    );
}
