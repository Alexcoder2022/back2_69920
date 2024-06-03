export const idValidator =(req, res, next)=>{
    
    const { id } = req.params; 
    
    if ( (req.body.id && req.body.id !== id)){
        res.status(400).json({ msg: 'ID cannot change!.' });
    }else{
        next();
    }

};


