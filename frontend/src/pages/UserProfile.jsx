import { useState } from 'react';
import api from '../services/api';
import { FaUserCircle } from 'react-icons/fa';

const UserProfile = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [formData, setFormData] = useState({
        education: user.education || '',
        interests: user.interests?.join(', ') || ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...user,
            education: formData.education,
            interests: formData.interests.split(',').map(i => i.trim())
        };

        try {
            const res = await api.put(`/users/${user.id}`, payload);
            localStorage.setItem('user', JSON.stringify(res.data));
            setUser(res.data);
            alert('Profile updated successfully!');
        } catch (err) {
            alert('Update failed');
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <div className="bg-[#282828] rounded-2xl shadow-xl border border-[#3e3e3e] overflow-hidden">
                <div className="bg-[#1a1a1a]/50 px-6 py-10 border-b border-[#3e3e3e] flex flex-col items-center">
                    <FaUserCircle className="text-7xl text-[#3e3e3e] mb-5 shadow-inner" />
                    <h2 className="text-3xl font-bold text-[#eff2f6] tracking-tight">{user.username}</h2>
                    <p className="text-gray-400 font-medium mt-1">{user.email}</p>
                    <span className="mt-4 px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-widest border border-primary/20">
                        {user.role}
                    </span>
                </div>


                <div className="p-10">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Education</label>
                            <input
                                name="education"
                                value={formData.education}
                                onChange={handleChange}
                                placeholder="e.g. B.Tech in Computer Science"
                                className="w-full px-5 py-3 bg-[#1a1a1a] border border-[#3e3e3e] text-[#eff2f6] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none placeholder-gray-600 font-medium"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Interests (comma separated)</label>
                            <input
                                name="interests"
                                value={formData.interests}
                                onChange={handleChange}
                                placeholder="e.g. Coding, Design, Marketing"
                                className="w-full px-5 py-3 bg-[#1a1a1a] border border-[#3e3e3e] text-[#eff2f6] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none placeholder-gray-600 font-medium"
                            />
                        </div>
                        <div className="pt-6">
                            <button type="submit" className="w-full bg-primary text-black font-bold py-3.5 rounded-xl hover:bg-opacity-90 transition-all shadow-lg active:scale-95">
                                Save Profile Changes
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
