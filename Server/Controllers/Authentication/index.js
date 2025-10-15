const User = require("../../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register
const registerTheUser = async (req, res) => {
  // get the username, email, password from req.body
  const { username, email, password } = req.body;

  try {
    // check the user using email
    const checkTheUser = await User.findOne({ email });

    // when the email is used before
    if (checkTheUser) {
      return res.json({
        success: false,
        message: "User exits with the same email. Please try again!",
    });
}

      // to protect the password we use bcryptjs
      const hashPassword = await bcrypt.hash(password, 12);

      // now create the new user and replace the password with hashPassword
      const newUser = new User({
        username,
        email,
        password: hashPassword,
      });

      // save the user
      await newUser.save();

      // return the success message
      res.status(200).json({
        success: true,
        message: "Registered Successfully",
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// login
const loginTheUser = async(req,res) => {
    // get the email and password from form data
    const {email,password} = req.body

    try{
        // check the email if it is registered or not
        const checkTheUser = await User.findOne({email})

        // if the email is not registered
        if(!checkTheUser){
           return res.json({
                success: false,
                message: 'User is not registered with this email. Please create an account firsts'
            })
        }

        // match the password you have entered with the registered password with the use of (bcrypt.compare)
        const matchThePassword = await bcrypt.compare( 
            password,
            checkTheUser.password
        )

        // if the password is not matched
        if(!matchThePassword){
            return res.json({
                success: false,
                message: 'Invalid Password'
            })
        }


        // now create the token using jwt.sign
        const token = jwt.sign(
            // now get the user data
            {
                id: checkTheUser._id,
                role: checkTheUser.role,
                username: checkTheUser.username,
                email: checkTheUser.email
            },
            "CLIENT_KEY", // secret key
            {expiresIn: '60m'} // expire time
        )


        // save the token in cookies with the user data
        res.cookie("token", token, {httpOnly: true, secure: false}).json({
            success: true,
            message: "Logged In Successfully",
            user: {
                email: checkTheUser.email,
                role: checkTheUser.role,
                id: checkTheUser._id,
                username: checkTheUser.username
            }
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Some error occured'
        })
    }
}



// logout
const logoutTheUser =  (req,res) =>{
    res.clearCookie('token').json({
        success: true,
        message: 'Logged Out Successfully'
    })
}


// auth middleware

const  authMiddleware = async(req,res,next) =>{
    
    // get the token from the cookies  
    const token = req.cookies.token 

    // if the token is false then the user is not authorized
    if(!token){
     return res.status(401).json({
            success: false,
            message: 'User is not authorized'
        })
    }

    try{
        // to decode the token 
        const decoded = jwt.verify(token,'CLIENT_KEY')
        req.user = decoded
        next()
    }catch(err){
        res.status(401).json({
            success: false,
            message: 'user is not authorized'
        })
    }


}


module.exports = { registerTheUser, loginTheUser, logoutTheUser, authMiddleware};

