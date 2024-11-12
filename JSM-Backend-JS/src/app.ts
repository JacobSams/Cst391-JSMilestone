import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import videogamesRouter from "./videogames/videogames.route";

dotenv.config();

const app = express();

//enable CORS request
app.use(cors({
    origin: 'http://localhost:4200', // Allow requests from the Angular app
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
}));

app.use(express.json(), express.urlencoded({ extended: true }));

const port = 3000;

app.use('/', videogamesRouter);

app.listen(port, () => {

console.log(`Example app listening at http://localhost:${port}`)

});