"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const chalk_1 = __importDefault(require("chalk"));
const routes_1 = __importDefault(require("./routes/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(routes_1.default);
app.get('/', (req, res) => {
    res.send('Hello');
});
const runServer = (port, server) => {
    server.listen(port, () => {
        console.log(chalk_1.default.bgGreenBright.black(`Server running: http://localhost:${process.env.PORT}`));
    });
};
const regularServer = http_1.default.createServer(app);
if (process.env.NODE_ENV === 'production') {
    const options = {
        key: fs_1.default.readFileSync(process.env.SSL_KEY),
        cert: fs_1.default.readFileSync(process.env.SSL_CERT)
    };
    const secServer = https_1.default.createServer(options, app);
    runServer(80, regularServer);
    runServer(443, secServer);
}
else {
    const serverPort = process.env.PORT ? parseInt(process.env.PORT) : 9000;
    runServer(serverPort, regularServer);
}
