// src/components/CustomCursor.jsx

import React, { useEffect, useRef } from 'react';
import './CustomCursor.css'; // Import the CSS for cursor styles

const CustomCursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.pageX}px`;
                cursorRef.current.style.top = `${e.pageY}px`;
                createSmoke(e.pageX, e.pageY);
            }
        };

        const createSmoke = (x, y) => {
            const smoke = document.createElement('div');
            smoke.classList.add('smoke');
            document.body.appendChild(smoke);
            smoke.style.left = `${x}px`;
            smoke.style.top = `${y}px`;

            setTimeout(() => {
                smoke.style.transform = 'translateY(-50px) scale(1.5)';
                smoke.style.opacity = '0';
            }, 10);

            setTimeout(() => {
                smoke.remove();
            }, 500);
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return <div className="cursor" ref={cursorRef}></div>;
};

export default CustomCursor;
