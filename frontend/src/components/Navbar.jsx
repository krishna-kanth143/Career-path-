import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const getUser = () => {
        try {
            const userStr = localStorage.getItem('user');
            return userStr ? JSON.parse(userStr) : null;
        } catch (e) {
            console.error("Failed to parse user from localStorage", e);
            return null;
        }
    };
    const user = getUser();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="bg-[#282828] border-b border-[#3e3e3e] shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold text-primary tracking-tight">CareerPath</Link>
                    </div>
                    <div className="hidden sm:flex sm:items-center sm:space-x-8">
                        {!user ? (
                            <>
                                <Link to="/login" className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Login</Link>
                                <Link to="/register" className="bg-primary text-white hover:bg-opacity-90 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">Register</Link>
                            </>
                        ) : (
                            <>
                                {user.role === 'ADMIN' && (
                                    <Link to="/admin" className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors border-r border-[#3e3e3e] pr-8 mr-4 leading-relaxed">Admin</Link>
                                )}
                                <Link to="/dashboard" className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Dashboard</Link>
                                <Link to="/courses" className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Courses</Link>
                                <Link to="/recommendations" className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Careers</Link>
                                <Link to="/progress" className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Progress</Link>
                                <Link to="/profile" className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Profile</Link>
                                <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ml-4">
                                    Logout
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button could go here */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
