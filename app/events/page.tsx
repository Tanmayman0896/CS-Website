"use client";

import React from 'react'
import LineBackground from "@/components/LineBackground";
import TiltedPhotoGrid from "@/src/components/common/TiltedPhotoGrid";
import Eventcard from "@/src/components/common/Eventcard"

export default function Event() {
    return (
        <>
        <div className="relative min-h-screen bg-gradient-to-b from-gray-500 to-black overflow-hidden">
          

            <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                <TiltedPhotoGrid />
            </div>

            
            
        </div>
        <div className="overflow-hidden"><Eventcard/></div>
        </>
    )
}
