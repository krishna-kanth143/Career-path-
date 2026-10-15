import { useState } from 'react';
import { FaClock, FaArrowRight, FaPlayCircle } from 'react-icons/fa';
import VideoModal from './VideoModal';

const CourseCard = ({ course }) => {
    const [showVideo, setShowVideo] = useState(false);

    return (
        <>
            <div className="bg-[#282828] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#3e3e3e] hover:border-primary/50 flex flex-col h-full group">
                {/* Visual Header/Thumbnail Placeholder */}
                <div
                    className="relative h-48 bg-[#1a1a1a] flex items-center justify-center cursor-pointer group/thumb"
                    onClick={() => setShowVideo(true)}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#282828] to-transparent opacity-60"></div>
                    <FaPlayCircle className="text-6xl text-primary/40 group-hover/thumb:text-primary group-hover/thumb:scale-110 transition-all duration-300 z-10" />
                    <div className="absolute bottom-4 left-4 z-10">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider 
                            ${course.level === 'Beginner' ? 'bg-green-500/20 text-green-500 border border-green-500/30' :
                                course.level === 'Intermediate' ? 'bg-[#ffa116]/20 text-[#ffa116] border border-[#ffa116]/30' :
                                    'bg-red-500/20 text-red-500 border border-red-500/30'}`}>
                            {course.level}
                        </span>
                    </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-4">
                        <span className="flex items-center text-gray-500 text-xs font-bold uppercase tracking-widest">
                            <FaClock className="mr-1.5 text-primary" />
                            {course.duration}
                        </span>
                    </div>

                    <div
                        className="cursor-pointer group/content"
                        onClick={() => window.open(course.link, '_blank', 'noopener,noreferrer')}
                    >
                        <h3 className="text-xl font-bold text-[#eff2f6] mb-3 line-clamp-2 group-hover/content:text-primary transition-colors leading-tight">
                            {course.title}
                        </h3>

                        <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed font-medium">
                            {course.description}
                        </p>
                    </div>

                    <div className="flex gap-3 mt-auto pt-6 border-t border-[#3e3e3e]">
                        <button
                            onClick={() => setShowVideo(true)}
                            className="flex-1 flex items-center justify-center px-4 py-3 bg-[#3e3e3e] text-[#eff2f6] text-sm font-bold rounded-xl hover:bg-[#4e4e4e] transition-all"
                        >
                            Preview
                        </button>
                        <a
                            href={course.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-[1.5] flex items-center justify-center px-4 py-3 bg-primary text-black text-sm font-bold rounded-xl hover:bg-opacity-90 transition-all shadow-lg active:scale-95"
                        >
                            Start Learning
                            <FaArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>

            {showVideo && (
                <VideoModal
                    videoLink={course.link}
                    onClose={() => setShowVideo(false)}
                    title={course.title}
                />
            )}
        </>
    );
};

export default CourseCard;

