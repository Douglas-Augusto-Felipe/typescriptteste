import express, { Request, Response } from 'express';
import * as uuid from 'uuid';
import axios from 'axios';


const base64 = require('js-base64').Base64
const app = express();
const port = 3000;
// Função para verificar se o dado está no formato base64
function isValidBase64(str: string) {
    try {
        base64.decode(str);
        return true;
    } catch (err) {
        return false;
    }
}

// Simulando a verificação de duplicidade (substituir por sua lógica real)
function hasDuplicateReading(readingType: string, month: number) {
    // Lógica para verificar no banco de dados ou outro repositório
    return false; // Exemplo: retorna false se não houver duplicata
}

// Simulando a chamada à API do Gemini 
async function callGeminiAPI(imageData: string): Promise<number> {
    try {
        const response = await axios.post('AIzaSyCcEg8chTpMW8m6b5d-vjKJjFPfEH0TfK4', { imageData });
        return response.data.value;
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        throw error;
    }
}

// Endpoint POST /upload
app.post('/upload', async (req: Request, res: Response) => {
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
        const value = await callGeminiAPI(image);

        // Gerar GUID e link temporário (substituir pela sua lógica)
        const guid = uuid.v4();
        const temporaryLink = `https://your-storage/images/${guid}.jpg`; // Exemplo

        return res.json({ guid, value, link: temporaryLink });
    } catch (error) {
        return res.status(500).json({ error: 'Error processing image' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});