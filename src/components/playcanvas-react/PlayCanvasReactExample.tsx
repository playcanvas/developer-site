"use client";
import './PlayCanvasReactExample.css';
import React from 'react';
import { Application } from '@playcanvas/react';
import HomePageExample from './HomePageExample';


const PlayCanvasReactExample = () => {
    return (
        <div className='example'>
            <Application>
                <HomePageExample />
            </Application>
        </div>
    );
};

export default PlayCanvasReactExample;
