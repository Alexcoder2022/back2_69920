import passport from "passport";
import local from "passport-local";
import  { hashPassword, comparePassword } from "../utils/hashFunctions.js";
import jwt from 'jsonwebtoken'
import { UserModel }from '../models/user.model.js'

// importtar el modelo de usuario del service 

// instanciamos la estrategia 

const LocalStrategy = local.Strategy;

//creamos una función 
const initializePassport = () =>{
    passport.use("login", new LocalStrategy ({ usernameField: "email",
        passReqToCallback: true}, async (req, username, password, done )=>{
           
            try {
            const user = await UserModel.findOne({ email: username });

            if (!user) {
                return done(null, false, { message: "User not found" });
            }

            if(!(await comparePassword(password, user.password))){
                return done(null, false, {menssage: "Incorrect password"})
            }
            return done(null, user);  
              //para poder enviar usamos serialize
            

            }catch (error){
                done(error); 
            }
        })
    );


    // Register strategy
    passport.use("register", new LocalStrategy({ usernameField: "email",
        passReqToCallback: true }, async (req, username, password, done) => {

            const { first_name, last_name, age } = req.body;  
            //validamos si falta información 

            if (!first_name || !last_name || !age) {
            return res.status(400).json({ error: "Falta información" });
            }
            try {
            const user = await UserModel.findOne({ email: username });

            if (user) {
                return done(null, false, { message: "El usuario ya existe" });
                
            }

            const hashPassword = createHash(password);

            // Se  guarda en la colección de usuarios
            const newUser = await UserModel.create({
                first_name,
                last_name,
                email: username,
                age,
                password: hashPassword,
            });

            return done(null, newUser);
            } catch (error) {
            done(error);
            }
        }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserModel.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
}

export { initializePassport}; 


