import React from 'react';

function Navbar() {
    return (
        <nav className="bg-gradient-to-r from-[#1F2937] via-[#2D3748] to-[#4A5568] text-[#F9FAFB] shadow-lg sticky top-0 w-full z-10">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-[#FF8C00]">Course Enrollment App</div>
                <ul className="flex space-x-6 text-base font-medium">
                    <li className="hover:text-[#FF8C00] cursor-pointer transition duration-200">Home</li>
                    <li className="hover:text-[#FF8C00] cursor-pointer transition duration-200">Courses</li>
                    <li className="hover:text-[#FF8C00] cursor-pointer transition duration-200">Students</li>
                    <li className="hover:text-[#FF8C00] cursor-pointer transition duration-200">About</li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
