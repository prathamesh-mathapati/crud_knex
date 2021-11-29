const express=require("express")
const { authenticateToken}=require('../auth/index')
const {insertdata,logindata, updatedatabyid,getAll,getbyid,deletebyid,getbyname}=require('../controlar/index')
const router=express.Router()

router.post("/signup",insertdata)
router.post('/login',logindata)
router.put("/update/:id",updatedatabyid)
router.get("/getAll",authenticateToken,getAll)
router.get("/get/:id",authenticateToken,getbyid)
// router.get("/get/:name",getbyname)

router.delete("/del/:id", authenticateToken,deletebyid)
module.exports=router