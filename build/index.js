"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageapi_1 = __importDefault(require("./routes/imageapi"));
const app = (0, express_1.default)();
const port = 2022;
app.get('/', (_req, res) => {
    res.send("<h1 style='font-size: 3em; text-align: center;'>Welcome to the image processing API</h1> <p style='font-size: 2em; font-weight:500; text-align: center;'> Go to (localhost:" +
        port +
        '/image?filename=<em>filename here</em>&width=<em>width in munbers here</em>&height=<em>height in numbers here</em>) to resize desired image </p>');
});
app.use(imageapi_1.default);
app.listen(port, () => {
    console.log('Server listening to Port:' + port);
});
exports.default = app;
