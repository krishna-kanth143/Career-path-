import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { FaLock, FaEnvelope } from 'react-icons/fa';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/users/login', { email, password });
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-[#282828] p-10 rounded-3xl shadow-2xl border border-[#3e3e3e]">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-[#eff2f6] tracking-tight mb-2">Sign In</h2>
                    <p className="text-gray-400 font-medium">
                        To continue to <span className="text-primary font-bold">CareerPath</span>
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl mb-6 text-sm font-medium animate-shake" role="alert">
                        {error}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email</label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="your@email.com"
                                    className="w-full pl-12 pr-4 py-3.5 bg-[#1a1a1a] border border-[#3e3e3e] text-[#eff2f6] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none placeholder-gray-600"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Password</label>
                            <div className="relative">
                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-3.5 bg-[#1a1a1a] border border-[#3e3e3e] text-[#eff2f6] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none placeholder-gray-600"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-4 bg-primary text-black text-lg font-bold rounded-xl hover:bg-opacity-90 transition-all shadow-lg active:scale-95"
                    >
                        Login
                    </button>

                    <p className="text-center text-gray-400 text-sm font-medium mt-8">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary hover:text-[#ffa116]/80 transition-colors font-bold">
                            Create one now
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
