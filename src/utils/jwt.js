import jwt from 'jsonwebtoken';


const PRIVATE_KEY ="cod3er"; //debe ir en un archivo .env

//generateToken: se envia lo q se llama un user o payload=> info que va a contener nuestro token  
//sub: user.id, : campo optativo buena practica 
//retorna un jwt sifrado con los datos que le enviamos x parámetro 

//middleware para chequer el q el token exista y sea válido 

export const generateToken = (user)=> {
    const payload = {
        user,
        sub: user.id, 
    }
    return jwt.sign(payload, PRIVATE_KEY, {
        expiresIn: "2m",
    }); 
}; 

export const authToken = (req, res, next) =>{
    //chequeamos que exista el token x headers
    const token = req.headers.authorization;  

    if(!token){
        return res.status(401).json({
            error: "Falta token",
        });
    }
    try {
        //funcion para chequear el token 
        const decoded = jwt.verify(token, PRIVATE_KEY);
        //enviamos en el req 
        req.user = decoded.user;  
        next();
    }catch (error) {
        res.estatus(401).json({
            error: "Token no valido",
        });
    }
}; 


//en el server los importo 