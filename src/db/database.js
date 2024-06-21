
import { connect }from 'mongoose'

const MONGO_URL = "mongodb+srv://SoniaVertz24:250305Sol@cluster0.7cbswsw.mongodb.net/coder69900?retryWrites=true&w=majority&appName=Cluster0";

export const initMongoDB = async ()=>{
    try {
        await connect(MONGO_URL); 
        console.log("conectado a la base de datos");   
    } catch (error) {
        console.log(error); 
    }
}