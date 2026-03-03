import { GraphStore } from "../graph/GraphStore";
import { Registry } from "../graph/Registry";
import { SimpleNode } from "../graph/nodes/Node";
import { SimpleEdge } from "../graph/edges/Edge";

const graph = new GraphStore();
const registry = new Registry();

registry.registerNode("protocol", SimpleNode);
registry.registerEdge("line", SimpleEdge);

graph.addNode("ip", { type: "protocol", label: "IP" });
graph.addNode("tcp", { type: "protocol", label: "TCP" });
graph.addNode("udp", { type: "protocol", label: "UDP" });
graph.addNode("http", { type: "protocol", label: "HTTP" });
graph.addNode("sip", { type: "protocol", label: "SIP" });
graph.addNode("rtp", { type: "protocol", label: "RTP" });
graph.addNode("rtcp", { type: "protocol", label: "RTCP" });
graph.addNode("grpc", { type: "protocol", label: "gRPC" });
graph.addNode("https", { type: "protocol", label: "HTTPS" });
graph.addNode("tls", { type: "protocol", label: "TLS" });
graph.addNode("ftp", { type: "protocol", label: "FTP" });


graph.addEdge({ source: "ip", target: "tcp", type: "line" });
graph.addEdge({ source: "ip", target: "udp", type: "line" });
graph.addEdge({ source: "tcp", target: "http", type: "line" });
graph.addEdge({ source: "udp", target: "sip", type: "line" });
graph.addEdge({ source: "tcp", target: "sip", type: "line" });
graph.addEdge({ source: "udp", target: "rtp", type: "line" });
graph.addEdge({ source: "udp", target: "rtcp", type: "line" });
graph.addEdge({ source: "tcp", target: "tls", type: "line" });
graph.addEdge({ source: "tls", target: "https", type: "line" });
graph.addEdge({ source: "tls", target: "grpc", type: "line" });
graph.addEdge({ source: "tcp", target: "ftp", type: "line" });


export { graph, registry };