import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {FaCheckCircle, FaCreditCard, FaEdit, FaArrowCircleRight} from "react-icons/fa";

import Payment from "../steps/Payment";
import Contract from "../steps/Contract";
import Transfer from "../steps/Transfer";
import Receipt from "../steps/Receipt";
import StepControls from "./StepControls";
import DealDataEditor from "./DealDataEditorComponent"; // We'll create this component
import {FaFilePen} from "react-icons/fa6";

const steps = [
    { label: "Contract", icon: <FaFilePen />, type: "contract" },
    { label: "Payment", icon: <FaCreditCard />, type: "payment" },
    { label: "Transfer", icon: <FaArrowCircleRight />, type: "transfer" },
    { label: "Receipt", icon: <FaCheckCircle />, type: "receipt" },
];

// Helper function to format currency properly
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

export default function DealProcess() {
    const [current, setCurrent] = useState(0);
    const [playState, setPlayState] = useState("stopped");
    const [timeMs, setTimeMs] = useState(0);
    const [showEditor, setShowEditor] = useState(false); // Editor popup state

    // Centralized deal data - control all variables from here
    const [dealData, setDealData] = useState(() => {
        const baseAmount = 12750000;
        const platformFee = baseAmount * 0.10;
        const disbursementFee = baseAmount * 0.01;
        const totalAmount = baseAmount + platformFee + disbursementFee;

        return {
            // Transaction IDs
            transactionId: Math.floor(100000 + Math.random() * 900000),
            receiptId: Math.floor(100000 + Math.random() * 900000),

            // Deal Parties (blurred for privacy)
            buyer: "██████████",
            seller: "██████████",
            company: "███████████████",
            asset: "██████████████████",

            // Financial Details
            dealAmount: formatCurrency(baseAmount),
            platformFee: formatCurrency(platformFee),
            disbursementFee: formatCurrency(disbursementFee),
            totalAmount: formatCurrency(totalAmount),

            // Dates
            paymentDate: "Nov 6, 2025",
            transferDate: "Nov 7, 2025",
            completionDate: "Nov 8, 2025",
            effectiveDate: "Nov 6, 2025",

            // Contract Details
            agreementType: "Asset Purchase Agreement",
            jurisdiction: "Delaware, USA",
            assetType: "Mobile Game Project",
            deliveryMedium: "Git Repository + Legal Docs",

            // Status Messages
            transferStatus: "In Progress",
            paymentStatus: "Confirmed",
            contractStatus: "Fully Executed",
            receiptStatus: "Closed"
        };
    });

    // refs to avoid closure/stale-state issues inside interval
    const currentRef = useRef(current);
    const timeRef = useRef(timeMs);
    const playStateRef = useRef(playState);
    const tickRef = useRef(null);

    // keep refs synced with state
    useEffect(() => {
        currentRef.current = current;
    }, [current]);
    useEffect(() => {
        timeRef.current = timeMs;
    }, [timeMs]);
    useEffect(() => {
        playStateRef.current = playState;
    }, [playState]);

    const stepDuration = 3000; // ms per step
    const tickInterval = 50; // ms tick resolution

    // clear interval helper
    const clearTick = () => {
        if (tickRef.current) {
            clearInterval(tickRef.current);
            tickRef.current = null;
        }
    };

    // Function to generate new deal data for replay
    const generateNewDealData = () => {
        const newTransactionId = Math.floor(100000 + Math.random() * 900000);
        const newReceiptId = Math.floor(100000 + Math.random() * 900000);

        // Different deal scenarios
        const dealScenarios = [
            { baseAmount: 8500000, company: "███████████████", asset: "██████████████████" },
            { baseAmount: 12750000, company: "███████████", asset: "██████████████" },
            { baseAmount: 21200000, company: "████████████████", asset: "███████████████████" },
            { baseAmount: 15800000, company: "██████████", asset: "████████████" }
        ];

        const randomDeal = Math.floor(Math.random() * dealScenarios.length);
        const { baseAmount, company, asset } = dealScenarios[randomDeal];

        const platformFee = baseAmount * 0.10;
        const disbursementFee = baseAmount * 0.01;
        const totalAmount = baseAmount + platformFee + disbursementFee;

        return {
            ...dealData,
            transactionId: newTransactionId,
            receiptId: newReceiptId,
            dealAmount: formatCurrency(baseAmount),
            platformFee: formatCurrency(platformFee),
            disbursementFee: formatCurrency(disbursementFee),
            totalAmount: formatCurrency(totalAmount),
            company: company,
            asset: asset
        };
    };

    // Function to update deal data from editor
    const updateDealData = (newData) => {
        setDealData(newData);
    };

    // interval loop uses refs to avoid double-advances
    useEffect(() => {
        // start ticking only when playing
        if (playStateRef.current === "playing") {
            clearTick();
            tickRef.current = setInterval(() => {
                // update time ref
                timeRef.current += tickInterval;

                if (timeRef.current >= stepDuration) {
                    // advance exactly once
                    timeRef.current = 0;

                    // advance step safely via ref
                    if (currentRef.current < steps.length - 1) {
                        currentRef.current = currentRef.current + 1;
                        // push to React state once per advance
                        setCurrent(currentRef.current);
                        setTimeMs(0);
                    } else {
                        // reached final step -> stop playback and clear
                        clearTick();
                        setPlayState("stopped");
                        setTimeMs(0);
                        // keep current at last index
                        currentRef.current = steps.length - 1;
                        setCurrent(steps.length - 1);
                    }
                } else {
                    // just update UI time
                    setTimeMs(timeRef.current);
                }
            }, tickInterval);
        } else {
            // paused or stopped -> clear interval but don't mutate refs (stop keeps current)
            clearTick();
        }

        return () => clearTick();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playState]); // only restart interval when playState changes

    // control handlers (single source of truth in this component)
    const handlePlay = () => {
        // if we're at final step, reset to start before playing
        if (currentRef.current >= steps.length - 1) {
            currentRef.current = 0;
            setCurrent(0);
            timeRef.current = 0;
            setTimeMs(0);
        }
        setPlayState("playing");
    };

    const handlePause = () => {
        setPlayState("paused");
    };

    const handleStop = () => {
        // immediate jump to Receipt (last) and stop
        clearTick();
        currentRef.current = steps.length - 1;
        setCurrent(steps.length - 1);
        timeRef.current = 0;
        setTimeMs(0);
        setPlayState("stopped");
    };

    const handleReplay = () => {
        // restart from 0 and play with new deal data
        clearTick();
        currentRef.current = 0;
        setCurrent(0);
        timeRef.current = 0;
        setTimeMs(0);
        setDealData(generateNewDealData());
        setPlayState("playing");
    };

    const renderVisual = (type) => {
        switch (type) {
            case "contract":
                return <Contract dealData={dealData} />;
            case "payment":
                return <Payment dealData={dealData} />;
            case "transfer":
                return <Transfer dealData={dealData} />;
            case "receipt":
                return <Receipt dealData={dealData} />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full max-w-4xl bg-gray-50 p-6">
            {/* Header with Edit Button */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="rounded-full shadow-sm bg-black">
                        <img
                            src="/logo512.png"
                            alt="Scapcher Logo"
                            className="w-12 h-12 p-1.5 rounded-full"
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Scapcher Deal Room</h1>
                        <p className="text-gray-500 text-sm">Transaction #{dealData.transactionId}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Deal Summary Badge */}
                    <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
                        <p className="text-sm font-semibold text-blue-700">{dealData.dealAmount} Deal</p>
                        <p className="text-xs text-blue-500">M&A Transaction</p>
                    </div>

                    {/* Edit Deal Data Button */}
                    <button
                        onClick={() => setShowEditor(true)}
                        className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition flex items-center gap-2"
                        title="Edit Deal Data"
                    >
                        <FaEdit className="text-gray-600" />
                        <span className="text-sm font-medium">Edit Deal</span>
                    </button>
                </div>
            </div>

            {/* Step indicators */}
            <div className="flex justify-between items-start w-full mt-8">
                {steps.map((step, index) => {
                    const isActive = index <= current;
                    return (
                        <div
                            key={index}
                            className="flex flex-col items-center select-none transition-all"
                        >
                            <div
                                className={`flex items-center justify-center w-12 h-12 rounded-full shadow-sm border text-lg transition-all duration-300 ${
                                    isActive
                                        ? "bg-green-500 border-green-500 text-white"
                                        : "bg-gray-100 border-gray-300 text-gray-400"
                                }`}
                            >
                                {step.icon}
                            </div>

                            <div className="flex items-center justify-center mt-2 h-10 w-24">
                                <span
                                    className={`text-xs font-medium text-center leading-tight ${
                                        isActive ? "text-green-600" : "text-gray-400"
                                    }`}
                                >
                                    {step.label}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Active visual */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={steps[current].type + "-" + current}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.45 }}
                >
                    {renderVisual(steps[current].type)}
                </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-10">
                <StepControls
                    playState={playState}
                    timeMs={timeMs}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onStop={handleStop}
                    onReplay={handleReplay}
                    stepDuration={stepDuration}
                />
            </div>

            {/* Deal Data Editor Popup */}
            {showEditor && (
                <DealDataEditor
                    dealData={dealData}
                    onUpdate={updateDealData}
                    onClose={() => setShowEditor(false)}
                />
            )}

            {/* Demo Note */}
            <div className="mt-6 text-center">
                <p className="text-xs text-gray-400">
                    Demo Content • All sensitive information is blurred for privacy
                </p>
            </div>
        </div>
    );
}