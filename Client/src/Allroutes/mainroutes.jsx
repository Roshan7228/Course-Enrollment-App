import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../page/Home';
import Description from '../page/discription';

function MainRoutes() {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/description/:pid" element={<Description />} />
            </Routes>
    );
}

export default MainRoutes;
