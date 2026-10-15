import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { FaChartBar, FaClock, FaCheckCircle, FaPlay, FaHistory } from 'react-icons/fa';
import QuizModal from '../components/QuizModal';

const UserProgressPage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [progressList, setProgressList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeQuizSkill, setActiveQuizSkill] = useState(null);

    const fetchProgress = async () => {
        try {
            const res = await api.get(`/progress/user/${user.id}`);
            setProgressList(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProgress();
    }, []);

    const logTime = async (skillId) => {
        const minutes = prompt("Enter minutes spent learning:");
        if (minutes) {
            try {
                await api.post('/progress/update-time', { userId: user.id, skillId, minutes });
                fetchProgress();
            } catch (err) {
                alert("Failed to update time");
            }
        }
    };

    const handleQuizComplete = async (score) => {
        try {
            await api.post('/progress/complete', {
                userId: user.id,
                skillId: activeQuizSkill.id,
                score
            });
            fetchProgress();
            setActiveQuizSkill(null);
        } catch (err) {
            alert("Assessment failed to save");
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            {activeQuizSkill && (
                <QuizModal
                    skill={activeQuizSkill}
                    onClose={() => setActiveQuizSkill(null)}
                    onComplete={handleQuizComplete}
                />
            )}
            <div className="flex items-center gap-4 mb-12">
                <div className="bg-primary/10 p-4 rounded-2xl border border-primary/20">
                    <FaChartBar className="text-3xl text-primary" />
                </div>
                <div>
                    <h1 className="text-4xl font-extrabold text-[#eff2f6] tracking-tight">Your Learning Progress</h1>
                    <p className="text-gray-400 mt-2 font-medium">Track your skill mastery and validate your journey.</p>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid gap-6">
                    {progressList.map(p => (
                        <div key={p.id} className="bg-[#282828] p-8 rounded-3xl border border-[#3e3e3e] shadow-lg transition-all hover:border-primary/30 group">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                                <div className="flex-grow">
                                    <div className="flex items-center gap-4 mb-3">
                                        <h3 className="text-2xl font-bold text-[#eff2f6] group-hover:text-primary transition-colors">{p.skill.name}</h3>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${p.status === 'COMPLETED'
                                            ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                            : 'bg-[#ffa116]/10 text-[#ffa116] border-[#ffa116]/20'
                                            }`}>
                                            {p.status}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <FaClock className="text-primary" />
                                            <span>Time Spent: <b className="text-[#eff2f6]">{p.timeSpentMinutes}</b> / {p.skill.minDurationMinutes} mins</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaHistory className="text-primary" />
                                            <span>Required: <b className="text-[#eff2f6]">{Math.max(0, p.skill.minDurationMinutes - p.timeSpentMinutes)}</b> mins left</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 w-full bg-[#1a1a1a] h-2 rounded-full overflow-hidden border border-[#3e3e3e]">
                                        <div
                                            className={`h-full transition-all duration-1000 ${p.status === 'COMPLETED' ? 'bg-green-500' : 'bg-primary'}`}
                                            style={{ width: `${Math.min(100, (p.timeSpentMinutes / p.skill.minDurationMinutes) * 100)}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="flex gap-4 w-full md:w-auto">
                                    {p.status !== 'COMPLETED' ? (
                                        <>
                                            <button
                                                onClick={() => logTime(p.skill.id)}
                                                className="flex-grow md:flex-none flex items-center justify-center gap-2 bg-[#1a1a1a] text-[#eff2f6] px-6 py-3 rounded-xl border border-[#3e3e3e] hover:bg-[#3e3e3e] transition-all font-bold text-sm shadow-md"
                                            >
                                                <FaClock className="text-xs" />
                                                Log Time
                                            </button>
                                            <button
                                                onClick={() => setActiveQuizSkill(p.skill)}
                                                disabled={p.timeSpentMinutes < p.skill.minDurationMinutes}
                                                className="flex-grow md:flex-none flex items-center justify-center gap-2 bg-primary text-black px-6 py-3 rounded-xl hover:bg-opacity-90 transition-all font-bold text-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
                                            >
                                                <FaPlay className="text-[10px]" />
                                                Assessment
                                            </button>
                                        </>
                                    ) : (
                                        <div className="flex items-center gap-3 text-green-500 font-bold bg-green-500/10 px-6 py-3 rounded-xl border border-green-500/20">
                                            <FaCheckCircle className="text-lg" />
                                            Mastered
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {!loading && progressList.length === 0 && (
                        <div className="bg-[#282828] rounded-3xl p-20 text-center border-2 border-dashed border-[#3e3e3e]">
                            <div className="text-6xl mb-8 opacity-50">🧭</div>
                            <h3 className="text-2xl font-bold text-[#eff2f6] mb-4">No active skills found</h3>
                            <p className="text-gray-400 max-w-md mx-auto mb-10 leading-relaxed font-medium">
                                Your journey to mastery hasn't started yet. Browse our curated courses to begin building your professional path.
                            </p>
                            <Link to="/courses" className="inline-flex items-center px-10 py-4 bg-primary text-black rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-xl">
                                Explore Courses
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserProgressPage;
