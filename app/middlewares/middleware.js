import jwt from 'jsonwebtoken'

export const validateToken = (req, res, next)=>{
     try {
        const token = jwt.verify(req.cookies.SWF, process.env.SECRET_KEY)
        if (token) {
            //console.log(req.cookies);
            next()
         }
         else{
            res.redirect("registroUsuario")
         }
     } catch (error) {
         console.log(error);
     }
};
