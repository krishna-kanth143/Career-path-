import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FaBookOpen, FaSave } from 'react-icons/fa';

const AddCoursePage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        level: 'Beginner',
        duration: '',
        link: '',
        skills: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            skills: formData.skills.split(',').map(s => s.trim())
        };

        try {
            await api.post('/courses/add', payload);
            alert('Course added successfully!');
            navigate('/admin');
        } catch (err) {
            console.error(err);
            alert('Failed to add course');
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
                <FaBookOpen className="text-primary" />
                Add New Course
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Course Title</label>
                    <input
                        name="title"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="e.g. Full Stack Web Development"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        rows="4"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="What will students learn in this course?"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Level</label>
                        <select
                            name="level"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                        >
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                        <input
                            name="duration"
                            placeholder="e.g. 4 Weeks"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Course Resource Link (YouTube/External)</label>
                    <input
                        type="url"
                        name="link"
                        placeholder="https://youtube.com/..."
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-blue-600"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Skills (comma separated)</label>
                    <input
                        name="skills"
                        onChange={handleChange}
                        placeholder="e.g. React, Java, Spring Boot"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    >
                        <FaSave /> Create Course
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCoursePage;
