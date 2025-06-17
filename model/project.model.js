import mongoose from "mongoose";
import bcrypt from "bcrypt";

const projectSchema=new mongoose.Schema(
{
    name:{
        type:String,
        required:[true,"Project name is required"],
    },
    description: {
        type: String,
        default: "",
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      members: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        }
      ],
    },

      {
        timestamps: true, 
      },
    )

      const Project = mongoose.model("Project", projectSchema);
      export default Project;

