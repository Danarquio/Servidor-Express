import UserManager from "../controllers/UserManager.js"
import { Router } from "express"
import passport from "passport"

const router = Router()
const user = new UserManager()



router.post("/register", passport.authenticate("register", {failureRedirect:"/failregister"}), async (req, res) => {
    try 
    {
        const { first_name, last_name, email, age, password, rol }= req.body
        if (!first_name || !last_name || !email || !age)  return res.status(400).send({ status: 400, error: 'Faltan datos' })
        res.redirect("/login")
    } catch (error) 
    {
        res.status(500).send("Error al acceder al registrar: " + error.message);
    }
})

router.get("/failregister",async(req,res)=>{
    console.log("Failed Strategy")
    res.send({error: "Failed"})
})



router.post("/login", passport.authenticate("login", {failureRedirect:"/faillogin"}),async (req, res) => {
    try 
    {
        if(!req.user) return res.status(400).send({status:"error", error: "Credenciales invalidas"})

            if(req.user.rol === 'admin'){
            req.session.emailUsuario = req.user.email
            req.session.nomUsuario = req.user.first_name
            req.session.apeUsuario = req.user.last_name
            req.session.rolUsuario = req.user.rol
            res.redirect("/profile")
        }
        else{
            req.session.emailUsuario = req.user.email
            req.session.rolUsuario = req.user.rol
            res.redirect("/products")
        }
        
        }
        catch (error) 
    {
        res.status(500).send("Error al acceder al perfil: " + error.message);
    }
}) 


router.get("/faillogin",async(req,res)=>{
    res.send({error: "Failed Login"})
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

router.get("/current", async (req, res) => { 
    if (!req.session.emailUsuario) 
    {
        return res.redirect("/login")
    }
    res.render("profile", {
        title: "Vista Profile Admin",
        first_name: req.session.nomUsuario,
        last_name: req.session.apeUsuario,
        email: req.session.emailUsuario,
        rol: req.session.rolUsuario,

    });
})

export default router