import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.js";
import 'dotenv/config';

const app = express();
const port = 8800;

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);

console.log(port);

// app.get('/', (req, res) => {
//     res.send('Hello World! This is a test');
// });

app.listen(port, () => {
    console.log(`Exempla app listening on port ${port}`);
})