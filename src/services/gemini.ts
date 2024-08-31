import axios from "axios";

const GEMINI_API_URL = 'AIzaSyCcEg8chTpMW8m6b5d-vjKJjFPfEH0TfK4';

export async function uploadImage(image: string) {
    try {
        const response = await axios.post(GEMINI_API_URL, { image });
        return response.data.measurement;
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        throw error;
    }
}