import jwt from 'jsonwebtoken'

export const validateToken = (req, res, next)=>{
     try {
        const token = jwt.verify(req.cookies.SWF, process.env.SECRET_KEY)
         if (token) {
            console.log("Holaaaa");
            res.render("productos",{
                "menu":1
            })
            next()
         }else{
            res.redirect("login")
         }
     } catch (error) {
        console.log("error verificando"+error);
     }
};
//export default validateToken;