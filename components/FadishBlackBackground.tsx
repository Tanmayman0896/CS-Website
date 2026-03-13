"use client";

interface FadishBlackBackgroundProps {
    className?: string;
}


export default function FadishBlackBackground({ className = "" }: FadishBlackBackgroundProps) {
    return (
        <div
            className={className}
            aria-hidden="true"
            style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, #030303ff 0%, #0d0c0cff 70%, #302f2fff 100%)",
            }}
        />
    );
}
