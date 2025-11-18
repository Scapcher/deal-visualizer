import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaFileAlt, FaDownload, FaCreditCard, FaStripe, FaUser, FaBuilding, FaLock } from "react-icons/fa";
import {FaUserShield} from "react-icons/fa6";

export default function Receipt({ dealData }) {
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
                                <p className="text-sm font-semibold text-green-600">Deal Completed Successfully</p>
                                <p className="text-xs text-gray-500">Receipt #{dealData.transactionId}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-lg">
                            <FaStripe className="text-green-500 text-lg h-8 w-8" />
                            <span className="text-xs font-medium text-gray-700">Payment Verified</span>
                        </div>
                    </div>

                    {/* Completion Message */}
                    <div className="bg-green-200 rounded-xl p-4 border border-green-200 text-center">
                        <FaCheckCircle className="text-green-500 text-2xl mx-auto mb-2" />
                        <p className="text-sm font-semibold text-gray-800">Deal Successfully Closed</p>
                        <p className="text-xs text-gray-500 mt-1">All assets have been transferred and payment has been settled</p>
                    </div>

                    {/* Deal Summary */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-3">
                        <p className="text-sm font-semibold text-gray-800 mb-2">Deal Summary</p>

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

                        <div>
                            <p className="text-xs text-gray-500 mb-1 flex items-center">
                                <FaBuilding className="mr-1 text-gray-400" /> Company
                            </p>
                            <div className="bg-white px-3 py-2 rounded-lg border border-gray-200">
                                <span className="text-sm font-medium blur-sm select-none">{dealData.company}</span>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 mb-1">Asset</p>
                            <div className="bg-white px-3 py-2 rounded-lg border border-gray-200">
                                <span className="text-sm font-medium blur-sm select-none">{dealData.asset}</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-3 space-y-2">
                            <div className="flex justify-between text-sm text-gray-700">
                                <span>Deal Value</span>
                                <span className="font-semibold">{dealData.dealAmount}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-700">
                                <span>Scapcher.com Fee</span>
                                <span>{dealData.platformFee}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-700">
                                <span>Disbursement Fee</span>
                                <span>{dealData.disbursementFee}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-700">
                                <span>Completed On</span>
                                <span>{dealData.completionDate}</span>
                            </div>
                            <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-gray-900">
                                <span>Total Amount</span>
                                <span className="text-green-600">{dealData.totalAmount}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}