import { Router } from "express"

const plan = Router();

plan.get('/planes', (req, res)=>{res.render("planes")})

export default plan;