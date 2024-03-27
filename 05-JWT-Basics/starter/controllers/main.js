//check username,password in post(login) request

//if exist create new JWT
//send back front-end
//setupauthentication so only request with JWT can access the dashboard
const JWT = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");
const login = async (req, res) => {
  const { username, password } = req.body;
  //mongoose
  //joi
  //check in the controller
  if (!username || !password) {
    throw new CustomAPIError("please provide email and password", 400);
  }
  //just for Demo ,normally provided by DB  
  const id=new Date().getDate()
  //try to keep payload small ,better experience for user
  //just  for demo , in production use long ,complex and unguessable string value!!!!!
const token = JWT.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
  console.log(username, password);
  res.status(200).json({msg:'user created',token})
};

const dashboard = async (req,res) => {
    const authHeader = req.headers.authorization;
    //console.log('Authorization header:', authHeader);
    if(!authHeader  || !authHeader.startsWith('Bearer')){
        throw new CustomAPIError("No token Provided", 401);
    }
const token = authHeader.split(' ')[1]
//console.log('Token:',token)
try {
    const decoded = JWT.verify(token,process.env.JWT_SECRET)
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({msg: `Hello,${decoded.username}`,secret: `Here is your authorized data,your lucky number is ${luckyNumber}`,
});  
} catch (error) {
    throw new CustomAPIError("Not authorized to access the route ", 401);   
}
  
//   res.status(200).json({msg: `Hello,${decoded.username}`,secret: `Here is your authorized data,your lucky number is ${luckyNumber}`,
//     });
}
module.exports = {
  login,
  dashboard,
};
