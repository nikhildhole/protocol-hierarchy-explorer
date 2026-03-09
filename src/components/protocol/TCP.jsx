import React from "react";

const TCPComponent = ({ onClose }) => {
    const description = {
        name: "TCP",
        fullName: "Transmission Control Protocol",
        description: "A reliable, connection-oriented protocol that ensures data delivery in order and without errors using a three-way handshake.",

        packetStructure: {
            sourcePort: "16 bits - Source port number",
            destinationPort: "16 bits - Destination port number",
            sequenceNumber: "32 bits - Sequence number for ordering packets",
            acknowledgmentNumber: "32 bits - Acknowledgment number for received data",
            headerLength: "4 bits - Length of TCP header in 32-bit words",
            reserved: "3 bits - Reserved for future use",
            flags: "9 bits - Control flags (SYN, ACK, FIN, RST, PSH, URG, ECE, CWR, NS)",
            windowSize: "16 bits - Flow control window size",
            checksum: "16 bits - Checksum for error detection",
            urgentPointer: "16 bits - Points to urgent data if URG flag is set",
            options: "Variable - Optional TCP options"
        },

        compareWith: {
            UDP: "UDP is faster but unreliable; TCP prioritizes reliability over speed",
            HTTP: "HTTP runs on top of TCP, using its reliable delivery",
            TLS: "TLS adds encryption on top of TCP for secure communication",
            QUIC: "Newer protocol attempting to combine UDP speed with TCP reliability"
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

export default TCPComponent;
