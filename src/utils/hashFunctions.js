import bcrypt from "bcrypt";

// función para crear Hash 
export async function createPassword (password){
    const hashPassword = await bcrypt.hash(password , bcrypt.genSaltSync(10));
    return hashPassword ;

}

//función para comparar la contraseña 
export async function comparePassword (password, hashPassword){
    const isPasswordCorrect = await bcrypt.compare(password, hashPassword);
    return isPasswordCorrect ;

}

//esto se implementará en la ruta de register 