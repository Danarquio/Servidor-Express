import UserManager from "../controllers/UserManager.js"
import { Router } from "express"
import passport from "passport"
import jwt from "jsonwebtoken"
import __dirname, { authorization, passportCall } from "../utils.js"
import { generateAndSetToken } from "../../jwt/token.js"
import CartManager from "../controllers/CartManager.js"
const router = Router()

const users = new UserManager()
const cart = new CartManager()





router.post("/login", async (req,res)=>{
    const {email, password} = req.body
    const emailToFind = email
    const user = await users.findEmail({ email: emailToFind})
    if(!user || user.password !== password){
        return res.status(401).json({message: "Error de autenticacion"})
    }
    const token = generateAndSetToken(res, email, password)
    res.json({token, user: {email: user.email, rol: user.rol}})   
})


router.get("/faillogin",async(req,res)=>{
    res.send({error: "Failed Login"})
})

router.post("/register", async (req, res) => {
    const { first_name, last_name, email, age, password, rol }= req.body
    const emailToFind = email
    const exist = await users.findEmail({email: emailToFind})
    if (exist)  return res.status(400).send({ status: "error", error: 'Usuario ya existe' })
    const newUser = {
        first_name,
        last_name,
        email,
        age,
        password,
        cart, //carts.addCart(),
        rol
    }
    users.addUser(newUser)
    const token = generateAndSetToken(res,email, password)
    res.send({token})
})



router.get("/logout", async (req, res) => {
    req.session.destroy((error) =>{
        if(error)
        {
            return res.json({ status: 'Logout Error', body: error})
        }
        res.redirect('../../login')
    })    
})

router.get("/github", passport.authenticate("github", {scope:["user:email"]}), async(req,res) => { })

router.get("/githubcallback", passport.authenticate("github", {failureRedirect: "/login"}), async(req,res) => {
    req.session.user = req.user
    res.redirect("/profile")
})

router.get("/login", async (req, res) => {
    res.render("login", {
        title: "Vista Login",
    });
    
})

router.get('/current', passportCall('jwt'), authorization('user'), (req,res) =>{
    res.send(req.user)
})

export default router