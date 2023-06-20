import jwt from 'jsonwebtoken'

export const validateToken = (req, res, next)=>{
     try {
        const token = jwt.verify(req.cookies.SWF, process.env.SECRET_KEY)
         if (token) {
            console.log("Holaaaa");
            res.render("inicio",{
                "menu":1
            })
         }else{
            res.redirect("login")
         }
         next()
     } catch (error) {
        console.log("error verificando"+error);
     }
};
//export default validateToken;