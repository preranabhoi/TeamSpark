import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import db from "./utils/db.js"

//import all routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from "./routes/user.routes.js";



dotenv.config()

const app = express();

app.use(cors({
    origin:process.env.BASE_URL,
    credentials:true,
    methods:['GET','POST','DELETE','OPTIONS'],
    allowedHeaders:['Content-Type','Authorization']
}));


app.use(express.json());

app.use(express.urlencoded({extended:true}));



const port = process.env.PORT||3000;

//connect to db
db();

//user routes
app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/users", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
