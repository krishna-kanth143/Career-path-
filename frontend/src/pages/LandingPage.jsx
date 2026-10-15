import { Link } from 'react-router-dom';
import { FaRocket, FaCode, FaBrain } from 'react-icons/fa';

const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8 animate-bounce">
                <FaRocket className="text-[10px]" />
                New: AI Career Guidance
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-[#eff2f6] leading-tight mb-8 tracking-tighter max-w-4xl">
                Master Your Future with <span className="text-primary">CareerPath</span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed font-medium">
                The developer-first platform for personalized career recommendations,
                expert learning roadmaps, and real-time skill tracking.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
                <Link to="/register" className="w-full sm:w-auto px-10 py-4 bg-primary text-black text-lg font-bold rounded-2xl hover:bg-opacity-90 transition-all shadow-xl hover:shadow-primary/20 active:scale-95">
                    Start Your Journey
                </Link>
                <Link to="/login" className="text-gray-400 hover:text-[#eff2f6] font-bold transition-colors">
                    Already have an account? Login
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl w-full">
                <div className="p-8 bg-[#282828] rounded-2xl border border-[#3e3e3e] shadow-md">
                    <FaCode className="text-3xl text-primary mb-6 mx-auto" />
                    <h3 className="text-lg font-bold text-[#eff2f6] mb-3">Skill Roadmaps</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">Step-by-step guides curated by experts for every tech stack.</p>
                </div>
                <div className="p-8 bg-[#282828] rounded-2xl border border-[#3e3e3e] shadow-md">
                    <FaBrain className="text-3xl text-primary mb-6 mx-auto" />
                    <h3 className="text-lg font-bold text-[#eff2f6] mb-3">AI Suggestions</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">Personalized career options based on your unique interests.</p>
                </div>
                <div className="p-8 bg-[#282828] rounded-2xl border border-[#3e3e3e] shadow-md">
                    <FaRocket className="text-3xl text-primary mb-6 mx-auto" />
                    <h3 className="text-lg font-bold text-[#eff2f6] mb-3">Goal Tracking</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">Visualize your growth and stay motivated on your path.</p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
