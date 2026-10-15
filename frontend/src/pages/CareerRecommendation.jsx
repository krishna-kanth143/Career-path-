import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { FaGraduationCap, FaArrowRight, FaLightbulb } from 'react-icons/fa';

const CareerRecommendation = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [careers, setCareers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCareers = async () => {
            try {
                const res = await api.get(`/careers/recommend/${user.id}`);
                setCareers(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCareers();
    }, [user.id]);

    return (
        <div className="max-w-7xl mx-auto py-8">
            <div className="flex items-center gap-4 mb-10">
                <div className="bg-primary/10 p-3 rounded-2xl">
                    <FaGraduationCap className="text-3xl text-primary" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-[#eff2f6]">Recommended Careers for You</h1>
                    <p className="text-gray-400 mt-1 font-medium">Based on your interests in {user.interests?.join(', ') || 'various fields'}</p>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <p className="mt-4 text-gray-400 font-medium">Analyzing your profile...</p>
                </div>
            ) : (
                <>
                    {careers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {careers.map(career => (
                                <div key={career.id} className="bg-[#282828] rounded-2xl shadow-md border border-[#3e3e3e] hover:border-primary/50 transition-all duration-300 flex flex-col group overflow-hidden">
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="w-12 h-12 bg-[#3e3e3e] rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                                                <FaLightbulb className="text-xl text-primary group-hover:text-black transition-colors duration-300" />
                                            </div>
                                            <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">Top Match</span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-[#eff2f6] mb-4 group-hover:text-primary transition-colors leading-tight">
                                            {career.title}
                                        </h3>

                                        <p className="text-gray-400 leading-relaxed mb-8 flex-grow">
                                            {career.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {career.requiredSkills?.map(skill => (
                                                <span key={skill.id} className="text-xs bg-[#3e3e3e] text-gray-300 px-3 py-1 rounded-lg border border-[#3e3e3e]">
                                                    {skill.name}
                                                </span>
                                            ))}
                                        </div>

                                        <Link
                                            to={`/career/${career.id}`}
                                            className="inline-flex items-center justify-center w-full bg-primary text-black py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all duration-300 shadow-lg"
                                        >
                                            Explore Career Path
                                            <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-[#282828] rounded-3xl p-12 text-center border-2 border-dashed border-[#3e3e3e] max-w-2xl mx-auto shadow-md">
                            <div className="bg-[#3e3e3e] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                                🔭
                            </div>
                            <h3 className="text-2xl font-bold text-[#eff2f6] mb-4">No specific recommendations yet</h3>
                            <p className="text-gray-400 leading-relaxed mb-8">
                                We couldn't find an exact match based on your current interests.
                                Try adding more interests or skills to your profile to unlock personalized career paths!
                            </p>
                            <Link
                                to="/profile"
                                className="inline-flex items-center px-8 py-4 bg-primary text-black rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg"
                            >
                                Update Profile Interests
                            </Link>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CareerRecommendation;
