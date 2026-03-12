"use client";

interface FadishBlackBackgroundProps {
    className?: string;
}

/**
 * Full-screen background: simple 2-colour linear gradient
 * from #15141a (top) to #3f3f3f (bottom).
 */
export default function FadishBlackBackground({ className = "" }: FadishBlackBackgroundProps) {
    return (
        <div
            className={className}
            aria-hidden="true"
            style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, #15141a 0%, #15141a 70%, #3f3f3f 100%)",
            }}
        />
    );
}
