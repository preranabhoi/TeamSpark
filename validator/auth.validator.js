import { body } from "express-validator";

const registerValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

const loginValidator = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),];


  const forgotPasswordValidator = [
    body("email").isEmail().withMessage("Valid email is required"),];
  
  
  const resetPasswordValidator = [
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ];


export{registerValidator,loginValidator,forgotPasswordValidator,resetPasswordValidator}
