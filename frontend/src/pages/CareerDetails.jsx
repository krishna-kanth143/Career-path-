import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { FaChevronLeft, FaPlay, FaCheckCircle, FaProjectDiagram } from 'react-icons/fa';

const CareerDetails = () => {
    const { id } = useParams();
    const [career, setCareer] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCareer = async () => {
            try {
                const res = await api.get(`/careers/${id}`);
                setCareer(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCareer();
    }, [id]);


    const [userProgress, setUserProgress] = useState([]);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const res = await api.get(`/progress/user/${user.id}`);
                setUserProgress(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProgress();
    }, [user.id]);

    const isSkillStarted = (skillId) => userProgress.some(p => p.skill.id === skillId);

    const startSkill = async (skillId) => {
        if (isSkillStarted(skillId)) {
            navigate('/progress');
            return;
        }
        try {
            await api.post('/progress/start', { userId: user.id, skillId });
            navigate('/progress');
        } catch (err) {
            alert('Failed to start skill');
        }
    };

    if (!career) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto py-8">
            <Link to="/recommendations" className="inline-flex items-center text-gray-400 hover:text-primary mb-8 transition-colors group font-medium">
                <FaChevronLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Recommendations
            </Link>


            <div className="bg-[#282828] rounded-3xl p-8 md:p-12 shadow-md border border-[#3e3e3e] mb-12">
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-[#eff2f6] mb-4 tracking-tight">{career.title}</h1>
                        <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                            {career.description}
                        </p>
                    </div>
                </div>
            </div>


            <div className="flex items-center gap-4 mb-10">
                <div className="bg-primary/10 p-2 rounded-lg">
                    <FaProjectDiagram className="text-xl text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-[#eff2f6] tracking-tight">Step-by-Step Learning Path</h2>
            </div>


            <div className="relative space-y-12 ml-6">
                {/* Visual Line */}
                <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-[#3e3e3e] -z-10"></div>

                {career.requiredSkills?.map((skill, index) => (
                    <div key={skill.id} className="relative bg-[#282828] rounded-2xl p-6 shadow-md border border-[#3e3e3e] hover:border-primary/50 transition-all flex flex-col md:flex-row gap-6 items-start md:items-center group">
                        {/* Step Circle */}
                        <div className="absolute -left-[35px] top-1/2 -translate-y-1/2 w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center text-lg font-bold text-primary border-4 border-[#282828] shadow-lg group-hover:scale-110 transition-transform">
                            {index + 1}
                        </div>

                        <div className="flex-grow pl-4 md:pl-0">
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-lg font-bold text-[#eff2f6] group-hover:text-primary transition-colors">{skill.name}</h3>
                                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-bold uppercase tracking-wide whitespace-nowrap">
                                    ~{Math.ceil(skill.minDurationMinutes / 60)} Hours
                                </span>
                                {isSkillStarted(skill.id) && (
                                    <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded font-black uppercase tracking-widest border border-green-500/20">In Progress</span>
                                )}
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {skill.description}
                            </p>
                        </div>

                        <button
                            onClick={() => startSkill(skill.id)}
                            className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95 whitespace-nowrap ${isSkillStarted(skill.id)
                                ? 'bg-[#3e3e3e] text-gray-300 hover:bg-[#4e4e4e]'
                                : 'bg-primary text-black hover:bg-opacity-90'
                                }`}
                        >
                            <FaPlay className="text-xs" />
                            {isSkillStarted(skill.id) ? 'Continue Path' : 'Start Skill'}
                        </button>
                    </div>
                ))}
            </div>


            <div className="mt-16 bg-[#282828] rounded-3xl p-10 text-center border border-[#3e3e3e] shadow-lg">
                <div className="bg-[#3e3e3e] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                    <FaCheckCircle className="text-2xl text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-[#eff2f6] mb-3 leading-tight">Begin Your Success Story</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                    Each skill you master brings you one step closer to your goal of becoming a <span className="text-primary font-bold">{career.title}</span>.
                </p>
            </div>

        </div>
    );
};

export default CareerDetails;
