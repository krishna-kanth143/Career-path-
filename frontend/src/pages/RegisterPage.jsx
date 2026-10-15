import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { FaUser, FaEnvelope, FaLock, FaGraduationCap, FaStar } from 'react-icons/fa';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'STUDENT',
        education: '',
        interests: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            interests: formData.interests.split(',').map(i => i.trim()),
            skills: []
        };

        try {
            await api.post('/users/register', payload);
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            alert('Registration failed');
        }
    };

    return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4">
            <div className="max-w-lg w-full bg-[#282828] p-10 rounded-3xl shadow-2xl border border-[#3e3e3e]">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-[#eff2f6] tracking-tight mb-2">Create Account</h2>
                    <p className="text-gray-400 font-medium">Join the next generation of tech leaders</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                            <div className="relative">
                                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    name="username"
                                    type="text"
                                    required
                                    placeholder="Enter your name"
                                    className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#3e3e3e] text-[#eff2f6] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="your@email.com"
                                    className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#3e3e3e] text-[#eff2f6] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Password</label>
                            <div className="relative">
                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Min. 8 characters"
                                    className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#3e3e3e] text-[#eff2f6] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Role</label>
                            <select
                                name="role"
                                className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3e3e3e] text-[#eff2f6] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none"
                                onChange={handleChange}
                                defaultValue="STUDENT"
                            >
                                <option value="STUDENT">🚀 Student</option>
                                <option value="ADMIN">🛡️ Admin</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Education</label>
                            <div className="relative">
                                <FaGraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    name="education"
                                    type="text"
                                    placeholder="e.g. B.Tech"
                                    className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#3e3e3e] text-[#eff2f6] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Interests (comma separated)</label>
                            <div className="relative">
                                <FaStar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    name="interests"
                                    type="text"
                                    placeholder="Coding, AI, Design..."
                                    className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#3e3e3e] text-[#eff2f6] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-4 bg-primary text-black text-lg font-bold rounded-xl hover:bg-opacity-90 transition-all shadow-lg active:scale-95 mt-4"
                    >
                        Create Account
                    </button>

                    <p className="text-center text-gray-400 text-sm font-medium">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:text-[#ffa116]/80 transition-colors font-bold">
                            Login here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
