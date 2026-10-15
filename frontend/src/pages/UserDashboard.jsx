import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { FaBook, FaUserEdit, FaChartLine, FaGraduationCap } from 'react-icons/fa';

const UserDashboard = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [progress, setProgress] = useState([]);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                if (user && user.id) {
                    const res = await api.get(`/progress/user/${user.id}`);
                    setProgress(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch progress", err);
            }
        };
        fetchProgress();
    }, [user]);

    if (!user) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-[#282828] p-8 rounded-2xl shadow-md border border-[#3e3e3e]">
                <div>
                    <h1 className="text-3xl font-bold text-[#eff2f6] tracking-tight">Welcome back, {user.username}!</h1>
                    <p className="text-gray-400 mt-2 font-medium">Track your progress and find your next career path.</p>
                </div>
                <Link to="/recommendations" className="mt-6 md:mt-0 flex items-center bg-primary text-black px-8 py-3 rounded-xl hover:bg-opacity-90 transition-all shadow-lg font-bold">
                    <FaGraduationCap className="mr-3 text-lg" />
                    Find New Careers
                </Link>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                    { label: 'Skills Mastered', value: progress.filter(p => p.status === 'COMPLETED').length, icon: '🏆', color: 'text-green-500' },
                    { label: 'Learning Hours', value: (progress.reduce((acc, p) => acc + p.timeSpentMinutes, 0) / 60).toFixed(1), icon: '⏱️', color: 'text-blue-500' },
                    { label: 'Active Skills', value: progress.filter(p => p.status !== 'COMPLETED').length, icon: '🚀', color: 'text-primary' },
                    { label: 'Readiness Index', value: `${Math.min(100, (progress.filter(p => p.status === 'COMPLETED').length * 20))}%`, icon: '📈', color: 'text-purple-500' }
                ].map((stat, i) => (
                    <div key={i} className="bg-[#282828] p-6 rounded-2xl border border-[#3e3e3e] shadow-sm flex flex-col items-center justify-center text-center">
                        <span className="text-3xl mb-3">{stat.icon}</span>
                        <div className={`text-2xl font-black ${stat.color} mb-1`}>{stat.value}</div>
                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
                    </div>
                ))}
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Summary Card */}
                <div className="bg-[#282828] p-6 rounded-2xl shadow-md border border-[#3e3e3e]">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-[#eff2f6] flex items-center tracking-tight">
                            <FaUserEdit className="mr-2 text-primary" /> Profile
                        </h3>
                        <Link to="/profile" className="text-sm text-primary hover:text-[#ffa116]/80 font-bold transition-colors">Edit</Link>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.1em]">Education</span>
                            <p className="text-[#eff2f6] font-medium mt-0.5">{user.education || 'Not set'}</p>
                        </div>

                        <div>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.1em]">Interests</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {user.interests && user.interests.length > 0 ? (
                                    user.interests.map((interest, idx) => (
                                        <span key={idx} className="bg-primary/10 text-primary px-2.5 py-1 rounded-lg text-xs font-bold border border-primary/20">
                                            {interest}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-500 italic text-sm">No interests added</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>


                {/* Progress Card */}
                <div className="md:col-span-2 bg-[#282828] p-6 rounded-2xl shadow-md border border-[#3e3e3e]">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-bold text-[#eff2f6] flex items-center tracking-tight">
                            <FaChartLine className="mr-2 text-primary" /> Active Learning
                        </h3>
                        <Link to="/progress" className="text-sm text-primary hover:text-[#ffa116]/80 font-bold transition-colors">View All</Link>
                    </div>


                    {progress.length === 0 ? (
                        <div className="text-center py-12 bg-[#1a1a1a] rounded-xl border border-dashed border-[#3e3e3e]">
                            <FaBook className="mx-auto text-[#3e3e3e] text-4xl mb-4" />
                            <p className="text-gray-400 font-medium">No active courses or skills tracked yet.</p>
                            <Link to="/courses" className="mt-4 inline-block text-primary font-bold hover:text-[#ffa116]/80 transition-colors">Browse Courses</Link>
                        </div>

                    ) : (
                        <div className="space-y-4">
                            {progress.slice(0, 3).map(p => (
                                <div key={p.id} className="flex items-center justify-between p-5 bg-[#1a1a1a] rounded-xl border border-[#3e3e3e] hover:border-primary/30 transition-all group">
                                    <div className="flex items-center">
                                        <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold mr-5 border border-primary/20 group-hover:bg-primary group-hover:text-black transition-all">
                                            {p.skill.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#eff2f6] text-lg leading-tight">{p.skill.name}</h4>
                                            <p className="text-xs text-gray-500 mt-1 font-medium">In Progress • Active</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-[#eff2f6] tracking-tight">{p.timeSpentMinutes} min</div>
                                        <span className={`inline-block mt-2 text-[10px] px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider ${p.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500' : 'bg-[#ffa116]/10 text-[#ffa116]'}`}>
                                            {p.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
