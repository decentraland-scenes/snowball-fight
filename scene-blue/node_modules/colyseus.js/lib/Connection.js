"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
const WebSocketTransport_1 = require("./transport/WebSocketTransport");
class Connection {
    constructor() {
        this.events = {};
        this.transport = new WebSocketTransport_1.WebSocketTransport(this.events);
    }
    send(data) {
        this.transport.send(data);
    }
    connect(url) {
        this.transport.connect(url);
    }
    close(code, reason) {
        this.transport.close(code, reason);
    }
}
exports.Connection = Connection;
//# sourceMappingURL=Connection.js.map