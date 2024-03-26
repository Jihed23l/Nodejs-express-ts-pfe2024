"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log('softy education');
console.log(process.env.PORT);
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/', (req, res) => {
    //Request : object contain useful information about the request (req.body)
    //Res : response will contain the response of the request message: res.send({})
    res.send('RESPONSE FROM API : Express + Javascript server');
});
app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});
