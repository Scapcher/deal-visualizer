import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaCreditCard, FaFileAlt, FaLock, FaTruck, FaStripe, FaUser, FaBuilding } from "react-icons/fa";

export default function Payment({ dealData }) {

    return (
        <div className="w-full">
            <motion.div
                className="flex flex-col items-center mt-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-lg shadow-gray-200/50 p-6 space-y-5">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <FaCheckCircle className="text-green-500 text-xl" />
                            <div>
                                <p className="text-sm font-semibold text-green-600">Payment Confirmed</p>
                                <p className="text-xs text-gray-500">Transaction ID #{dealData.transactionId}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-lg">
                            <FaStripe className="text-green-500 text-lg h-8 w-8" />
                            <span className="text-xs font-medium text-gray-700">Payment Secured</span>
                        </div>
                    </div>

                    {/* Deal Parties */}
                    <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                        <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                            Deal Parties
                            <FaStripe className="text-green-500 ml-2 text-sm h-8 w-8" />
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-500 mb-1 flex items-center">
                                    <FaUser className="mr-1 text-gray-400" /> Buyer
                                </p>
                                <div className="bg-white px-3 py-2 rounded-lg border border-gray-200">
                                    <span className="text-sm font-medium blur-sm select-none">{dealData.buyer}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1 flex items-center">
                                    <FaUser className="mr-1 text-gray-400" /> Seller
                                </p>
                                <div className="bg-white px-3 py-2 rounded-lg border border-gray-200">
                                    <span className="text-sm font-medium blur-sm select-none">{dealData.seller}</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-xs text-gray-500 mb-1 flex items-center">
                                <FaBuilding className="mr-1 text-gray-400" /> Target Company
                            </p>
                            <div className="bg-white px-3 py-2 rounded-lg border border-gray-200">
                                <span className="text-sm font-medium blur-sm select-none">{dealData.company}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 shadow-sm">
                        <p className="text-sm font-semibold text-gray-800 mb-2">Payment Breakdown</p>

                        <div className="flex justify-between text-sm text-gray-700">
                            <span>Deal Amount</span>
                            <span className="font-semibold">{dealData.dealAmount}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-700">
                            <span>Scapcher.com Fee (10%)</span>
                            <span>{dealData.platformFee}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-700">
                            <span>Disbursement Fee (1%)</span>
                            <span>{dealData.disbursementFee}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-gray-900">
                            <span>Total Amount</span>
                            <span className="text-green-600">{dealData.totalAmount}</span>
                        </div>
                    </div>

                    {/* Payment Method & Security */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-50 rounded-2xl border border-green-100 p-4 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-700">Payment Method</p>
                                <p className="text-xs text-gray-500 mt-1 flex items-center">
                                    <FaStripe className="mr-1 text-green-500" />
                                    Stripe •••• 5402
                                </p>
                            </div>
                            <FaLock className="text-green-500 text-lg" />
                        </div>

                        <div className="bg-blue-50 rounded-2xl border border-blue-100 p-4 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-700">Escrow Status</p>
                                <p className="text-xs text-gray-500 mt-1">Funds Secured</p>
                            </div>
                            <FaCheckCircle className="text-blue-500 text-lg" />
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}