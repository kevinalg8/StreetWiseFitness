import jwt from 'jsonwebtoken'

export const validateToken = (req, res, next)=>{
    if (req.cookies.SWF) {
        try {
        const token = jwt.verify(req.cookies.SWF, process.env.SECRET_KEY)
            next()
        } catch (error) {
        console.log(error);  
        //res.redirect("registroUsuario")     
        }
    }else{
        res.redirect("/registroUsuario")
    }
};
