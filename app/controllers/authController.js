import userModel from "../models/userModel.js";
import { body, validationResult } from "express-validator";
import { hashPassword, passComparison } from "../utility/passUtility.js";
import { generateToken } from "../utility/tokenUtility.js";



//validation rules for registration
export const validateRegistration = [
  // Validate Email
  body("email")
    .isEmail()
    .withMessage("Invalid email format"),
   

  // Validate First Name
  body("firstname")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters"),

  // Validate Last Name
  body("lastname")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters"),



  // Validate Password
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[0-9]/)
    .withMessage("Must contain at least one number")
    .matches(/[A-Z]/)
    .withMessage("Must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Must contain at least one lowercase letter")
    .matches(/[\W]/)
    .withMessage("Must contain at least one special character")
    .trim(),

  // Validate Confirm Password
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm Password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];



//user registration controller
export const registration = async function (req, res) {
  try {


    //validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const groupedErrors = errors.array().reduce((acc, error) => {
        if (!acc[error.path]) {
          acc[error.path] = [];
        }
        acc[error.path].push(error.msg);
        return acc;
      }, {});

      return res.status(401).json({status:"failed", message: groupedErrors}); 
    }
    const { email, firstname, lastname, password } = req.body;



    // Hash password before saving
    const hashedPassword = await hashPassword(password);

    console.log(hashPassword);
    
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      // Check if user is already verified
      if (existingUser.email) {
        
        return res.status(400).json({ status:"failed", message: "Email is already registered and verified. Please log in." });
      }
    }
    
    
    // Create new user
    let createdUser = await userModel.create({
      email,
      firstname,
      lastname,
      password: hashedPassword,
    });
    
    res.status(201).json({
        status: 'success',
        message: "Registration successful",
        data: {
            id: createdUser._id,
            email: createdUser.email,
            firstname: createdUser.firstname,
            lastname: createdUser.lastname,
          
        },
    })
  } catch (error) {
    console.log("Registration : "+ error.message);
    return res.status(500).json({
        status: "failed",
        message: "Internal Server Error",
   });
  }
};

//user login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });

    // console.log(user)
    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid email or password",
      });
    }

    // Compare passwords
    const isPasswordValid = await passComparison(password, user.password);
    
    // console.log(isPasswordValid);
    if (!isPasswordValid) {
        return res.status(401).json({
            status: "failed",
            message: "Invalid email or password",
        });
    }
  
    // Generate JWT token
    const token = generateToken(user.email, user._id);
    
    return res.status(200).json({
        status:"success",
        message:"Successfully Login",
        token
    });
    
  } catch (error) {
    console.error("Login error:", error.message);
    return res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};




