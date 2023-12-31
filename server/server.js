const express =require("express");
const mongoose =require("mongoose");
const cors =require("cors");
const usersData=require("./model/userdetails");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const middleware=require("./middleware")


const app = express();
 const port =3006

 const mongURI="mongodb+srv://suneelkumar29590:UfuEaPytFV46FbTr@cluster0.37lou9p.mongodb.net/apitoken?retryWrites=true&w=majority"

 app.use(express.json());
 app.use(cors({origin: "*"}))



//  initializing mango to node
mongoose.connect(mongURI)
.then(()=>console.log("db connected"))
.catch((e)=>console.log(e.message))

// Home api

app.get("/", (req,res)=>{
    res.send("welcome to developer hub server")
})

// register api

app.post("/register", async(req,res)=>{

    try{
        
    const{fullname,email,mobile,skills,password, confirmPassword}=req.body
 

// checking user whether it is exist or not

    const isUserExist=await usersData.findOne({email: email});
    if (isUserExist){
       return res.send("user already registered")
    }

    if(password !==  confirmPassword){
       return res.send("password not matched")
    }


const hashedpassword=await bcrypt.hash(password, 10)   //generating encrypted password for user

let newUser = new usersData({
    fullname,
    email,
    mobile,
    skills,
    password:hashedpassword,
    confirmPassword:hashedpassword
})
newUser.save();       //saving to mongodb collections
res.send("user created succesfully");

    }catch(e){
        console.log(e.message)
        res.send("internal server error")
    }

    
})

// login api
app.post("/login", async(req,res)=>{
    const {email,password} = req.body
    const isUserExist= await usersData.findOne({email})
   
    if (isUserExist){
        const ispasswordmatched=await bcrypt.compare(password, isUserExist.password)  //compare to two passwords
        if(ispasswordmatched){
            let payload = {
                user:isUserExist.id
            }
            jwt.sign(payload,'jwtpassword',{expiresIn:36000000},
            (err,token)=>{
                if(err) throw err
                return res.json({token})
            })
             
        }else{
            return res.send("password not matched")
        }
    }
})

// get all developers data

app.get("/alldevelopers",  middleware,async(req,res)=>{
    const alldevelopers=await usersData.find({});
    return res.json(alldevelopers);
})

// get inviduval profile
app.get("/individualprofile/:id", middleware, async(req,res)=>{
    const {id}= req.params;
    const individualuser= await usersData.findById({_id: id});
    if(!individualuser){
        return res.send("user not found")
    }
    return res.send(individualuser)
})











 app.listen(port, ()=>{
    console.log(`server running at ${port}`)
    
 })