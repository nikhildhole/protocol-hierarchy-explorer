import React from "react";

const RTCPComponent = ({ onClose }) => {
    const description = {
        name: "RTCP",
        fullName: "Real-time Transport Control Protocol",
        description: "Companion to RTP that provides monitoring and feedback on quality of service for real-time media streams.",

        packetStructure: {
            version: "2 bits - RTCP protocol version",
            padding: "1 bit - Padding indicator",
            reportCount: "5 bits - Number of reports in packet",
            payloadType: "8 bits - Report type (SR, RR, SDES, BYE, APP)",
            length: "16 bits - RTCP packet length in 32-bit words",
            ssrc: "32 bits - Synchronization source of sender",
            reportBlocks: "Variable - Reception reports from participants"
        },

        compareWith: {
            RTP: "RTP carries media; RTCP provides control and statistics",
            TFRC: "TFRC provides TCP-friendly congestion control",
            REMB: "REMB (used in WebRTC) is feedback mechanism similar to RTCP",
            QoS: "RTCP monitors QoS; DiffServ marks packets for QoS"
        }
    };

    const { name, fullName, description: desc, packetStructure, compareWith } = description;

    return (
        <div className="p-6 bg-transparent rounded-lg shadow-lg max-w-4xl relative">
            <button onClick={onClose} className="absolute top-2 right-2 text-white text-2xl hover:text-gray-300">×</button>
            {/* Heading */}
            <div className="border-b-2 border-blue-500 pb-4 mb-6">
                <h1 className="text-4xl font-bold text-white">{name}</h1>
                <h2 className="text-lg text-white mt-2">{fullName}</h2>
            </div>

            {/* Description */}
            <section className="mb-8">
                <h3 className="text-2xl font-semibold text-white mb-3">Description</h3>
                <p className="text-white leading-relaxed text-lg">{desc}</p>
            </section>

            {/* Packet Structure */}
            <section className="mb-8">
                <h3 className="text-2xl font-semibold text-white mb-4">Data Packet Structure</h3>
                <div className="bg-transparent border-l-4 border-blue-500 p-4 rounded overflow-x-auto">
                    {typeof packetStructure === "object" && typeof packetStructure !== "null" ? (
                        <div className="space-y-3">
                            {Object.entries(packetStructure).map(([key, value], index) => (
                                <div key={index} className="flex flex-col sm:flex-row gap-2">
                                    <span className="font-semibold text-blue-600 min-w-fit sm:min-w-[150px]">{key}:</span>
                                    <span className="text-white">{value}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-white">{packetStructure}</p>
                    )}
                </div>
            </section>

            {/* Comparison */}
            <section>
                <h3 className="text-2xl font-semibold text-white mb-4">Comparison with Other Protocols</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {typeof compareWith === "object" && typeof compareWith !== "null" ? (
                        Object.entries(compareWith).map(([protocol, comparison], index) => (
                            <div key={index} className="bg-transparent p-4 rounded-lg border border-blue-200">
                                <h4 className="text-lg font-bold text-white mb-2">{protocol}</h4>
                                <p className="text-white">{comparison}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-white col-span-full">{compareWith}</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default RTCPComponent;
