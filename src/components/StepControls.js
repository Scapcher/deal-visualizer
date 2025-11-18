import React from "react";
import { FaPlay, FaPause, FaStop, FaRedo } from "react-icons/fa";

export default function StepControls({
                                         playState,
                                         timeMs,
                                         onPlay,
                                         onPause,
                                         onStop,
                                         onReplay,
                                         stepDuration,
                                     }) {
    const formatTime = (ms) => {
        const seconds = Math.floor(ms / 1000);
        const centis = Math.floor((ms % 1000) / 10);
        return `${seconds.toString().padStart(2, "0")}:${centis
            .toString()
            .padStart(2, "0")}`;
    };

    const progressPct = Math.min(100, Math.round((timeMs / stepDuration) * 100));

    return (
        <div className="flex flex-col items-center space-y-4">
            {/* Timer + progress bar */}
            <div className="w-full max-w-2xl">
                <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-mono text-gray-800">
                        {formatTime(timeMs)}
                    </div>
                    <div className="text-xs text-gray-500">step progress</div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-green-500 transition-all"
                        style={{ width: `${progressPct}%` }}
                    />
                </div>
            </div>

            {/* Control buttons */}
            <div className="flex items-center justify-center gap-4">
                {playState !== "playing" && (
                    <button
                        onClick={onPlay}
                        className="p-3 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
                        title="Play"
                    >
                        <FaPlay />
                    </button>
                )}

                {playState === "playing" && (
                    <button
                        onClick={onPause}
                        className="p-3 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition"
                        title="Pause"
                    >
                        <FaPause />
                    </button>
                )}

                <button
                    onClick={onStop}
                    className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                    title="Stop"
                >
                    <FaStop />
                </button>

                <button
                    onClick={onReplay}
                    className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
                    title="Replay"
                >
                    <FaRedo />
                </button>
            </div>
        </div>
    );
}
