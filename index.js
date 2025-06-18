import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import db from "./utils/db.js"
import cookieParser from "cookie-parser"
import { errorHandler } from "./middleware/error.middleware.js";

//import all routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import projectRoutes from "./routes/project.routes.js";
import taskRoutes from "./routes/task.routes.js";




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

app.use(cookieParser());




const port = process.env.PORT||3000;

//connect to db
db();

//user routes
app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/tasks", taskRoutes); 



app.use(errorHandler);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
