"use client";

import { dracoInitialize, TEXTURETYPE_RGBP } from "playcanvas"
import { useApp } from "@playcanvas/react/hooks"
import { useQuery } from "@tanstack/react-query";
import { fetchAsset } from "@playcanvas/react/utils"

const base = "https://www.gstatic.com/draco/versioned/decoders/1.5.7/";
dracoInitialize({
  jsUrl: base + 'draco_wasm_wrapper.js',
  wasmUrl: base + 'draco_decoder.wasm',
  numWorkers: 2,
  lazyInit: true
});

/**
 * Loads an asset using react-query
 */
export const useAsset = (src: string, type: string, props: any = {}) => {
    const app = useApp();
    const queryKey = [app.root?.getGuid(), src, type, props];

    // Construct a query for the asset
    return useQuery({ 
        queryKey,
        queryFn: () => app && fetchAsset({ app, url: src, type, props })
    })
}

/**
 * Loads a texture asset as an environment atlas
 */
export const useEnvAtlas = (src : string, props = {}) => useAsset(src, 'texture', { 
    ...props, 
    type: TEXTURETYPE_RGBP, mipmaps: false
});

/**
 * Loads a glb asset 
 */
export const useModel = (src : string, props = {}) => useAsset(src, 'container', props);
