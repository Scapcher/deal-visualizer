import React from "react";
import { motion } from "framer-motion";
import { FaFileContract, FaUser, FaBuilding, FaCheckCircle, FaSignature} from "react-icons/fa";
import {FaUserShield} from "react-icons/fa6";

export default function Contract({ dealData }) {

    return (
        <div className="w-full">
            <motion.div
                className="flex flex-col items-center mt-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-lg shadow-gray-200/50 p-6 space-y-5">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <FaFileContract className="text-green-600 w-12 h-12 text-xl" />
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Legal Agreement</h2>
                                <p className="text-xs text-gray-500">Fully Executed • Both Parties Signed</p>
                            </div>
                        </div>
                    </div>

                    {/* Contract Parties */}
                    <div className="rounded-xl p-4 bg-blue-50 border border-blue-100">
                        <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                            Contracting Parties
                            <FaUserShield className="text-blue-500 ml-2 text-sm" />
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-3">
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

                        <div className="grid grid-cols-2 gap-4">
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
                        </div>
                    </div>

                    {/* Agreement Details */}
                    <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
                        <p className="text-sm font-semibold text-gray-800 mb-2">Agreement Details</p>

                        <div className="flex justify-between text-sm text-gray-700">
                            <span>Agreement Type</span>
                            <span className="font-medium">{dealData.agreementType}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-700">
                            <span>Effective Date</span>
                            <span>{dealData.effectiveDate}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-700">
                            <span>Jurisdiction</span>
                            <span>{dealData.jurisdiction}</span>
                        </div>
                    </div>

                    {/* Signing Status */}
                    <div className="bg-green-50 rounded-xl border border-green-200 p-4">
                        <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                            <FaSignature className="text-green-500 mr-2" />
                            Signing Status
                        </p>

                        <div className="space-y-3">
                            {/* Buyer Signature */}
                            <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-green-100">
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Buyer</p>
                                    <div className="text-xs text-gray-500 mt-1">
                                        <span className="blur-sm select-none">{dealData.buyer}</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 text-green-600">
                                    <FaCheckCircle />
                                    <span className="text-sm font-medium">Signed</span>
                                </div>
                            </div>

                            {/* Seller Signature */}
                            <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-green-100">
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Seller</p>
                                    <div className="text-xs text-gray-500 mt-1">
                                        <span className="blur-sm select-none">{dealData.seller}</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 text-green-600">
                                    <FaCheckCircle />
                                    <span className="text-sm font-medium">Signed</span>
                                </div>
                            </div>
                        </div>

                        {/* Completion Badge */}
                        <div className="mt-3 p-3 bg-green-100 rounded-lg border border-green-200 flex items-center justify-center space-x-2">
                            <FaCheckCircle className="text-green-600" />
                            <span className="text-sm font-semibold text-green-700">Agreement Fully Executed</span>
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}
