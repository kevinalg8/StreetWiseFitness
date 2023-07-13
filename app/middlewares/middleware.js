import jwt from 'jsonwebtoken'

/*
Este middleware se puede utilizar en una ruta para protegerla y asegurarse de que solo los usuarios autenticados puedan acceder a ella. 
*/

export const validateToken = (req, res, next)=>{
    if (req.cookies.SWF) {
        try {
        // Verificar el token utilizando la clave secreta
        const token = jwt.verify(req.cookies.SWF, process.env.SECRET_KEY)
        next() // Continuar con la siguiente función de middleware
        } catch (error) {
        console.log(error);// Si hay un error al verificar el token, puedes redirigir al usuario a una página de registro o realizar otra acción apropiada    
        }
    }else{
        // Si no hay un token en las cookies, puedes redirigir al usuario a una página de registro o realizar otra acción apropiada
        res.redirect("/registroUsuario")
    }
};


