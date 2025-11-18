
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaSave, FaDollarSign, FaUser, FaBuilding, FaFileContract, FaCalendar } from "react-icons/fa";

// Helper function to parse currency string to number
const parseCurrency = (currencyString) => {
    return parseFloat(currencyString.replace(/[$,]/g, '')) || 0;
};

// Helper function to format number as currency
const formatCurrency = (number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(number);
};

export default function DealDataEditor({ dealData, onUpdate, onClose }) {
    const [formData, setFormData] = useState(dealData);
    const [stepDuration, setStepDuration] = useState(3000);

    // Calculate derived values when deal amount changes
    useEffect(() => {
        const dealAmount = parseCurrency(formData.dealAmount);
        const platformFee = dealAmount * 0.10;
        const disbursementFee = dealAmount * 0.01;
        const totalAmount = dealAmount + platformFee + disbursementFee;

        setFormData(prev => ({
            ...prev,
            platformFee: formatCurrency(platformFee),
            disbursementFee: formatCurrency(disbursementFee),
            totalAmount: formatCurrency(totalAmount)
        }));
    }, [formData.dealAmount]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Generate new IDs to maintain consistency
        const updatedData = {
            ...formData,
            transactionId: Math.floor(100000 + Math.random() * 900000),
            receiptId: Math.floor(100000 + Math.random() * 900000)
        };
        onUpdate(updatedData);
        onClose();
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleNumberChange = (field, value) => {
        // Remove any non-numeric characters except decimal point
        const numericValue = value.replace(/[^\d.]/g, '');
        if (numericValue === '') {
            handleInputChange(field, formatCurrency(0));
            return;
        }

        const number = parseFloat(numericValue);
        if (!isNaN(number)) {
            handleInputChange(field, formatCurrency(number));
        }
    };

    const presetDeals = [
        { name: "Small Deal", amount: 8500000, company: "Tech Startup Inc.", asset: "Mobile App Platform" },
        { name: "Medium Deal", amount: 12750000, company: "Growth Studios", asset: "Game Development Studio" },
        { name: "Large Deal", amount: 21200000, company: "Enterprise Solutions", asset: "SaaS Platform" },
        { name: "Mega Deal", amount: 50000000, company: "Global Innovations", asset: "AI Technology Portfolio" }
    ];

    const applyPreset = (preset) => {
        setFormData(prev => ({
            ...prev,
            dealAmount: formatCurrency(preset.amount),
            company: preset.company,
            asset: preset.asset
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FaBuilding className="text-2xl" />
                            <div>
                                <h2 className="text-xl font-bold">Deal Data Editor</h2>
                                <p className="text-blue-100">Customize your M&A deal scenario</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-lg transition"
                        >
                            <FaTimes className="text-xl" />
                        </button>
                    </div>
                </div>

                <div className="max-h-[70vh] overflow-y-auto p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Quick Presets */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <FaSave className="text-blue-500" />
                                Quick Presets
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {presetDeals.map((preset, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => applyPreset(preset)}
                                        className="p-2 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-left"
                                    >
                                        <div className="text-xs font-semibold text-gray-800">{preset.name}</div>
                                        <div className="text-xs text-gray-600">{formatCurrency(preset.amount)}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Deal Parties */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    <FaUser className="text-blue-500" />
                                    Deal Parties
                                </h3>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Buyer</label>
                                    <input
                                        type="text"
                                        value={formData.buyer}
                                        onChange={(e) => handleInputChange('buyer', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Buyer name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Seller</label>
                                    <input
                                        type="text"
                                        value={formData.seller}
                                        onChange={(e) => handleInputChange('seller', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Seller name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Company</label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => handleInputChange('company', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Company name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Asset</label>
                                    <input
                                        type="text"
                                        value={formData.asset}
                                        onChange={(e) => handleInputChange('asset', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Asset description"
                                    />
                                </div>
                            </div>

                            {/* Financial Details */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    <FaDollarSign className="text-green-500" />
                                    Financial Details
                                </h3>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Deal Amount</label>
                                    <input
                                        type="text"
                                        value={formData.dealAmount}
                                        onChange={(e) => handleNumberChange('dealAmount', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        placeholder="$0.00"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Platform Fee (10%)</label>
                                        <input
                                            type="text"
                                            value={formData.platformFee}
                                            readOnly
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Disbursement Fee (1%)</label>
                                        <input
                                            type="text"
                                            value={formData.disbursementFee}
                                            readOnly
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                                    <input
                                        type="text"
                                        value={formData.totalAmount}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 font-semibold text-green-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Dates and Additional Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    <FaCalendar className="text-purple-500" />
                                    Dates
                                </h3>

                                {['paymentDate', 'transferDate', 'completionDate', 'effectiveDate'].map((dateField) => (
                                    <div key={dateField}>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                                            {dateField.replace(/([A-Z])/g, ' $1').trim()}
                                        </label>
                                        <input
                                            type="text"
                                            value={formData[dateField]}
                                            onChange={(e) => handleInputChange(dateField, e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    <FaFileContract className="text-orange-500" />
                                    Contract Details
                                </h3>

                                {['agreementType', 'jurisdiction', 'assetType', 'deliveryMedium'].map((field) => (
                                    <div key={field}>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                                            {field.replace(/([A-Z])/g, ' $1').trim()}
                                        </label>
                                        <input
                                            type="text"
                                            value={formData[field]}
                                            onChange={(e) => handleInputChange(field, e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Step Duration Control */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-800 mb-3">Animation Settings</h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Step Duration: {stepDuration}ms
                                </label>
                                <input
                                    type="range"
                                    min="1000"
                                    max="10000"
                                    step="500"
                                    value={stepDuration}
                                    onChange={(e) => setStepDuration(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>1s</span>
                                    <span>Fast</span>
                                    <span>Slow</span>
                                    <span>10s</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer Actions */}
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setFormData(dealData)}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
                            >
                                Reset
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                            >
                                <FaSave />
                                Apply Changes
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}