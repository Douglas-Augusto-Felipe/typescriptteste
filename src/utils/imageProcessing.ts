import Jimp from 'jimp';

export async function validateImage(base64Image: string) {
    try {
        await Jimp.read(Buffer.from(base64Image, 'base64'));
        return true;
    } catch (error) {
        console.error('Error processing image:', error);
        return false;
    }
}