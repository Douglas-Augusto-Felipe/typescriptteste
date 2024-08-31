"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const uuid = __importStar(require("uuid"));
const axios_1 = __importDefault(require("axios"));
const base64 = require('js-base64').Base64;
const app = (0, express_1.default)();
const port = 3000;
// Função para verificar se o dado está no formato base64
function isValidBase64(str) {
    try {
        base64.decode(str);
        return true;
    }
    catch (err) {
        return false;
    }
}
// Simulando a verificação de duplicidade (substituir por sua lógica real)
function hasDuplicateReading(readingType, month) {
    // Lógica para verificar no banco de dados ou outro repositório
    return false; // Exemplo: retorna false se não houver duplicata
}
// Simulando a chamada à API do Gemini (substituir por sua lógica real)
function callGeminiAPI(imageData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post('AIzaSyCcEg8chTpMW8m6b5d-vjKJjFPfEH0TfK4', { imageData });
            return response.data.value;
        }
        catch (error) {
            console.error('Error calling Gemini API:', error);
            throw error;
        }
    });
}
// Endpoint POST /upload
app.post('/upload', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { image } = req.body;
    // Validação dos dados
    if (!image || !isValidBase64(image)) {
        return res.status(400).json({ error: 'Invalid image data' });
    }
    // Verificação de duplicidade (substituir pela sua lógica)
    const readingType = 'temperature'; // Exemplo: obter o tipo da imagem de algum lugar
    const month = new Date().getMonth() + 1;
    if (hasDuplicateReading(readingType, month)) {
        return res.status(409).json({ error: 'Duplicate reading for this month' });
    }
    // Chamada à API do Gemini
    try {
        const value = yield callGeminiAPI(image);
        // Gerar GUID e link temporário (substituir pela sua lógica)
        const guid = uuid.v4();
        const temporaryLink = `https://your-storage/images/${guid}.jpg`; // Exemplo
        return res.json({ guid, value, link: temporaryLink });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error processing image' });
    }
}));
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
