"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const database_1 = require("./database");
// Routes
const gameRoute_1 = __importDefault(require("./routes/gameRoute"));
const port = config_1.default.PORT;
const app = (0, express_1.default)();
const corsConfig = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};
app.use((0, cors_1.default)(corsConfig));
(0, database_1.startPostgresConnection)()
    .then(() => {
    app.listen(port, () => {
        console.log(`Servidor escuchando en el puerto: ${port}`);
    });
})
    .catch((error) => {
    console.log(error);
});
app.use(express_1.default.json());
app.get('/status', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: 'El server esta OK' });
}));
app.use('/game', gameRoute_1.default);
