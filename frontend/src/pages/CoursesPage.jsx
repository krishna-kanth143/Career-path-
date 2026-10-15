import { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import api from '../services/api';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await api.get('/courses');
                setCourses(res.data);
            } catch (err) {
                console.error("Failed to fetch courses", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    if (loading) return <div className="text-center py-20">Loading courses...</div>;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-4xl font-extrabold text-[#eff2f6] sm:text-5xl tracking-tight">
                    Explore Our Courses
                </h1>
                <p className="mt-6 text-lg text-gray-400 leading-relaxed font-medium">
                    Enhance your skills with our curated learning paths designed for your career growth.
                </p>
            </div>


            {courses.length === 0 ? (
                <div className="text-center text-gray-500 py-10">No courses available yet.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CoursesPage;
