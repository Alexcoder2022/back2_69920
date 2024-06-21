
export const productValidator = (req, res, next) => {
    const { title, description, code, price, stock, category, thumbnails}= req.body;

    const expectedProperties = ['title', 'description', 'code', 'price', 'stock', 'category', 'status', 'thumbnails'];
    
    //verificar que no existan prop adicionales 
    for (const key in req.body){
        if (!expectedProperties.includes(key)) {
            return res.status(400).json({ msg: `invalid property ${key}` });
        }
    }
    if (req.method === 'POST'){
        //verificar que todas las propiedades necesarias esten definidas
        if (title === undefined ||
           description === undefined ||
           code === undefined ||
           price === undefined ||
           stock === undefined ||
           category === undefined ) {
            return res.status(400).json({ msg: 'Enter all the data.' });
        }
        //verificar que el id no este definido en la creacion de prod 
        if (req.body.id !== undefined) {
            return res.status(400).json({ msg: 'ID cannot be created!.' });   // No funciona este if 
        }
    }
    //verificar los tipos de datos 
    if ((title !== undefined && typeof title !== "string") ||
    (description !== undefined && typeof description !== "string") ||
    (code !== undefined && typeof code !== "string") ||
    (price !== undefined && typeof price !== "number") ||
    (stock !== undefined && typeof stock !== "number") ||
    (category !== undefined && typeof category !== "string") ||
    (thumbnails!== undefined && typeof !Array.isArray(thumbnails))) {
        return res.status(400).json({ msg: 'Invalid data type.' });
    }

    if (req.method === 'POST'){
        req.body.status = true ; 
    }
    next();
}
            
