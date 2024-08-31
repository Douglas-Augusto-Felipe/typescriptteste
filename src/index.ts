import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
const port = 3000;
const app = express();
app.use((req: Request, res: Response, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.use(bodyParser.json());

app.post('/upload', async (req: Request, res: Response) => {
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});