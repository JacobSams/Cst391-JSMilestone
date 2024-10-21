import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import videogamesRouter from "./videogames/videogames.route";

dotenv.config();

const app = express();
app.use(express.json(), express.urlencoded({ extended: true }));

const port = 3000;

app.use('/', videogamesRouter);

app.listen(port, () => {

console.log(`Example app listening at http://localhost:${port}`)

});