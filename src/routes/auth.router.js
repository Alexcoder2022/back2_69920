import { Router } from "express";
import { UserModel } from "../daos/models/user.model";
import { session } from "passport";
import { generateToken } from "../utils/jwt";

const router = Router();

router.post("/register", async(req, res)=>{
    const { first_name, last_name, email, age, role, password } = req.body;

    if(!first_name || !last_name || !email || !password ){
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        //hasheamos la contraseña 
        const hashPassword = await createPassword(password);

        //creamos el usuario 
        const user = await UserModel.create({
            first_name,
            last_name,
            email,
            age,
            role,
            password: hashPassword
        })
        res.status(201).json(user);

    } catch (error) {
        res.status(500).json({ error: "Error creating user", detail: error.message });
        
    }
})
//implementación de la estrategia de login 
//failureRedirect:  si pasa algo redireccionamos, RUTA ABSOLUTA!!
router.post("/login", passport.authenticate("login", { session: false,
    failureRedirect: "/api/auth/login"}), async (req, res)=>{
        const payload = {
            email : req.user.email,
            role : req.user.role,
        }
        //si todo va bien, le damos la cookie con el token
        const token = generateToken(payload);
        res.cookie("token", token, { httpOnly: true, expiresIn: "1d" });  //1d = 1 day

        res.status(200).json({ menssage: "Login successful", token});
    }
);