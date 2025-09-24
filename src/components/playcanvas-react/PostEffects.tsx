"use client";

import { Script } from "@playcanvas/react/components";
import { CameraFrame } from "playcanvas/scripts/esm/camera-frame.mjs";

import { FC } from "react";

const StaticPostEffects: FC<Record<string, unknown>> = (props) => {
    const defaultPostSettings = {
        "lighting": {
            "exposure": 1.21,
            "skyBoxIntensity": 1.02
        },
        "rendering": {
            "renderFormat": 18,
            "renderTargetScale": 1,
            "sharpness": 0,
            "samples": 4,
            "toneMapping": 4,
            "fog": "none",
            "fogColor": {
                "r": 0,
                "g": 0,
                "b": 0,
                "a": 1
            },
            "fogRange": [0, 100],
            "fogDensity": 0.01,
            "renderFormatFallback0": 12,
            "renderFormatFallback1": 14,
            "sceneColorMap": false,
            "sceneDepthMap": false,
            "fogStart": 0,
            "fogEnd": 100
        },
        "bloom": {
            "enabled": true,
            "intensity": 0.1,
            "lastMipLevel": 1
        },
        "grading": {
            "enabled": true,
            "brightness": 0.83,
            "contrast": 1.1,
            "saturation": 1.2,
            "tint": {
                "r": 1,
                "g": 0.9333333333333333,
                "b": 0.8666666666666667,
                "a": 1
            }
        },
        "vignette": {
            "enabled": true,
            "intensity": 1,
            "inner": 0.25,
            "outer": 1.52,
            "curvature": 0.78
        },
        "fringing": {
            "enabled": true,
            "intensity": 10
        }
    };

    const settings = { ...defaultPostSettings, ...props };
    return <Script script={CameraFrame} {...settings} />
}

export default StaticPostEffects;
