
import { Router } from "express"
import { addUserController } from "./testeController.js"

const router = Router()

router.post("/users", addUserController)

export default router