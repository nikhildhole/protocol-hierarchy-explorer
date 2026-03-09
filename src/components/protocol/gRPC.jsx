import React from "react";

const gRPCComponent = ({ onClose }) => {
    const description = {
        name: "gRPC",
        fullName: "Google Remote Procedure Call",
        description: "A high-performance, open-source RPC framework that uses Protocol Buffers as serialization format and HTTP/2 as transport.",

        packetStructure: {
            protobufs: "Binary serialized messages using Protocol Buffers",
            http2Header: "HTTP/2 pseudo-headers and regular headers",
            serviceMethod: "Service name and method name specification",
            metadata: "Optional headers with request context",
            messageFrame: "Length-delimited protobuf message"
        },

        compareWith: {
            REST: "gRPC is binary and streaming; REST is text-based request-response",
            GraphQL: "Both are alternatives to REST; GraphQL offers more query flexibility",
            Protobuf: "Protobuf is serialization format; gRPC is framework using it",
            SOAP: "SOAP is XML-based RPC; gRPC is modern binary alternative",
            "HTTP/ 2": "gRPC runs on HTTP/ 2; REST typically uses HTTP / 1.1"
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

export default gRPCComponent;
