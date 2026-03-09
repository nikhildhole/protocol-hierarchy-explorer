import { GraphStore } from "../graph/GraphStore";
import { Registry } from "../graph/Registry";
import { SimpleNode } from "../graph/nodes/Node";
import { SimpleEdge } from "../graph/edges/Edge";
import IPProtocol from "../components/protocol/ip";
import TCPProtocol from "../components/protocol/TCP";
import UDPProtocol from "../components/protocol/UDP";
import HTTPProtocol from "../components/protocol/HTTP";
import HTTPSProtocol from "../components/protocol/HTTPS";
import GRPCProtocol from "../components/protocol/gRPC";
import TLSProtocol from "../components/protocol/TLS";
import FTPProtocol from "../components/protocol/FTP";
import SIPProtocol from "../components/protocol/SIP";
import RTPProtocol from "../components/protocol/RTP";
import RTCPProtocol from "../components/protocol/RTCP";
import WebSocketProtocol from "../components/protocol/WebSocket";
import WebRTCProtocol from "../components/protocol/WebRTC";

const graph = new GraphStore();
const registry = new Registry();

registry.registerNode("protocol", SimpleNode);
registry.registerEdge("line", SimpleEdge);

graph.addNode("ip", {
    type: "protocol",
    label: "IP - Internet packet routing",
    description: IPProtocol
});

graph.addNode("tcp", {
    type: "protocol",
    label: "TCP - Reliable transport protocol",
    description: TCPProtocol
});

graph.addNode("udp", {
    type: "protocol",
    label: "UDP - Fast connectionless transport",
    description: UDPProtocol
});

graph.addNode("http", {
    type: "protocol",
    label: "HTTP - Web request response protocol",
    description: HTTPProtocol
});

graph.addNode("https", {
    type: "protocol",
    label: "HTTPS - Secure HTTP over TLS",
    description: HTTPSProtocol
});

graph.addNode("grpc", {
    type: "protocol",
    label: "gRPC - High performance RPC protocol",
    description: GRPCProtocol
});

graph.addNode("tls", {
    type: "protocol",
    label: "TLS - Transport encryption protocol",
    description: TLSProtocol
});

graph.addNode("ftp", {
    type: "protocol",
    label: "FTP - File transfer protocol",
    description: FTPProtocol
});

graph.addNode("sip", {
    type: "protocol",
    label: "SIP - VoIP session signaling protocol",
    description: SIPProtocol
});

graph.addNode("rtp", {
    type: "protocol",
    label: "RTP - Real time media streaming",
    description: RTPProtocol
});

graph.addNode("rtcp", {
    type: "protocol",
    label: "RTCP - RTP control protocol",
    description: RTCPProtocol
});

graph.addNode("websocket", {
    type: "protocol",
    label: "WebSocket - Persistent bidirectional communication",
    description: WebSocketProtocol
});

graph.addNode("webrtc", {
    type: "protocol",
    label: "WebRTC - Real time peer to peer communication",
    description: WebRTCProtocol
});


graph.addEdge({ source: "ip", target: "tcp", type: "line" });
graph.addEdge({ source: "ip", target: "udp", type: "line" });

graph.addEdge({ source: "tcp", target: "http", type: "line" });
graph.addEdge({ source: "tcp", target: "ftp", type: "line" });
graph.addEdge({ source: "tcp", target: "tls", type: "line" });
graph.addEdge({ source: "tcp", target: "sip", type: "line" });
graph.addEdge({ source: "tcp", target: "websocket", type: "line" });

graph.addEdge({ source: "tls", target: "https", type: "line" });
graph.addEdge({ source: "tls", target: "grpc", type: "line" });
graph.addEdge({ source: "tls", target: "websocket", type: "line" });

graph.addEdge({ source: "udp", target: "sip", type: "line" });
graph.addEdge({ source: "udp", target: "rtp", type: "line" });
graph.addEdge({ source: "udp", target: "rtcp", type: "line" });
graph.addEdge({ source: "udp", target: "webrtc", type: "line" });


export { graph, registry };