
export const productValidator = (req, res, next) => {
    if (
        req.body.title === undefined ||
        req.body.description === undefined ||
        req.body.code === undefined ||
        req.body.price === undefined ||
        req.body.stock === undefined ||
        req.body.category === undefined
    ) {
        res.status(400).json({ msg: 'Enter all the data.' });
    } else {
        next();
    }
};

//el estatus(400) es para avisar que los datos enviados no cumplen con los requisitos esperados.
// cuando vamos al router post agregamos el productValidator (para validar estos datos )
//!importante!!!!! hay que importarlo 