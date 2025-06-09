import React from 'react';
import Footer from './footer';
import { Outlet } from 'react-router-dom';

const LayoutWithFooter = () => {
    return (
        <div className="app-wrapper">
            <main style={{ flex: 1 }}>
                <Outlet /> 
        </main>
        <Footer />
    </div>
    );
};

export default LayoutWithFooter;