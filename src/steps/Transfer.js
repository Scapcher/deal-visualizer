import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdHandshake } from "react-icons/md";
import { FaTruck, FaLock, FaCheckCircle, FaStripe } from "react-icons/fa";
import {TbTransferIn} from "react-icons/tb";

export default function Transfer({ dealData }) {

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
                            <MdHandshake className="text-blue-500 text-xl w-12 h-12" />
                            <div>
                                <p className="text-sm font-semibold text-blue-600">Business Transfer Completed</p>
                                <p className="text-xs text-gray-500">Transaction ID #{dealData.transactionId}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-lg">
                            <FaStripe className="text-blue-500 text-lg h-8 w-8" />
                            <span className="text-xs font-medium text-gray-700">Secure Payment</span>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="flex items-center justify-between text-xs font-medium text-gray-500 pt-2">
                        <span className="text-gray-800 flex items-center space-x-1">
                            <TbTransferIn className="text-blue-500" /> <span>Transfer Started</span>
                        </span>
                        <div className="flex-1 h-[1px] mx-2 bg-gray-200"></div>
                        <span className="text-gray-800 flex items-center space-x-1">
                            <FaLock className="text-green-500" /> <span>Secure Handover</span>
                        </span>
                        <div className="flex-1 h-[1px] mx-2 bg-gray-200"></div>
                        <span className="text-gray-800 flex items-center space-x-1">
                            <FaCheckCircle className="text-green-500" /> <span>Transferred</span>
                        </span>
                    </div>

                    {/* Deal Parties */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                        <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                            Deal Parties
                            <FaStripe className="text-blue-500 ml-2 text-sm w-8 h-8" />
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Buyer</p>
                                <div className="bg-white px-3 py-2 rounded-lg border border-gray-200">
                                    <span className="text-sm font-medium blur-sm select-none">{dealData.buyer}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Seller</p>
                                <div className="bg-white px-3 py-2 rounded-lg border border-gray-200">
                                    <span className="text-sm font-medium blur-sm select-none">{dealData.seller}</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-xs text-gray-500 mb-1">Company</p>
                            <div className="bg-white px-3 py-2 rounded-lg border border-gray-200">
                                <span className="text-sm font-medium blur-sm select-none">{dealData.company}</span>
                            </div>
                        </div>
                    </div>

                    {/* Transfer Details */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <p className="text-sm font-semibold text-gray-800 mb-3">Transfer Details</p>

                        <div className="flex justify-between text-sm text-gray-700 mb-2">
                            <span>Deal Amount</span>
                            <span className="font-semibold text-green-600">{dealData.amount}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-700 mb-2">
                            <span>Asset Type</span>
                            <span>{dealData.assetType}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-700 mb-2">
                            <span>Delivery Medium</span>
                            <span>{dealData.deliveryMedium}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-700 mb-2">
                            <span>Transfer Date</span>
                            <span>{dealData.transferDate}</span>
                        </div>

                        {/* Payment Method */}
                        <div className="border-t border-gray-200 pt-3 mt-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-700">Payment Method</span>
                                <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-lg border border-gray-200">
                                    <FaStripe className="text-blue-500 h-8 w-8" />
                                    <span className="font-medium text-gray-700">Stripe</span>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-2 mt-3 flex justify-between text-sm font-medium text-gray-900">
                            <span>Transfer Status</span>
                            <span className="text-green-600">Completed</span>
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}