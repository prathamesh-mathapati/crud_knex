const knex =require("../config/index")
const bcrypt=require("bcrypt")
const {generateToken,authenticateToken}=require('../auth/index')

exports.insertdata=(req,res)=>{
    knex.select("*").from("user").where('email',req.body.email).then((data)=>{
        if (data.length<1){
            knex('user').insert({name:req.body.email,email:req.body.email,password:bcrypt.hashSync(req.body.password,10)}).then((data)=>{
                res.send({massage:'data inserted'})
            }).catch((err)=>{
                res.send({error:err.massage})
            })
        }else{
            res.send("data already exist")
        }
    }).catch((err)=>{
        res.send({error:err.massage})
    })
}
exports.logindata=(req,res)=>{
    knex.select("*").from("user").where({'email':req.body.email}).then((data) => {
        // console.log(data);
        var password=bcrypt.compareSync(req.body.password,data[0].password)
        // console.log(password)
        if (password){
            const token=generateToken(req.body)
            res.cookie("token",token)
            res.send(data)
        }else{
            res.send("Invalid email or password")
        }
    }).catch((err) => {
        res.send({error:err.massage})
    })
}

exports.updatedatabyid=(req, res)=>{
        knex.select("*").from("user").where('id',req.params.id ).update({name:req.body.email,email:req.body.email,password:bcrypt.hashSync(req.body.password,10)}).then((data)=>{
            res.send({massage:"data update"})
        }).catch((err)=>{
            res.send({error:err.massage})      
          })       
}
exports.getAll=(req,res)=>{
    knex.select("*").from("user").then((data)=>{
        res.send(req.usedata)
    }).catch((err)=>{
        res.send({error:err.massage})
    })
}
exports.getbyid=(req,res)=>{
    knex.select("*").from("user").where('id',req.params.id).then((data)=>{
        res.send(req.usedata)
        console.log(req.usedata);
    }).catch((err)=>{
        res.send({error:err.massage})
    })
}



exports.deletebyid=(req,res)=>{
    knex.select("*").from("user").where('id',req.params.id).del().then((data)=>{
        res.send("data delete   ")
    }).catch((err)=>{
        res.send({error:err.massage})
    })
}