require("dotenv").config()
const knex=require("knex")({
    client:"mysql",
    connection:{
        host:process.env.host,
        user:process.env.user,
        database:process.env.database,
        password:process.env.password
    }
})

knex.schema.createTable("user",(table)=>{
    table.increments("id").primary()
    table.string("name")
    table.string("email")
    table.string("password")
}).then((data)=>{
    console.log({massage:"table create"});
}).catch((err)=>{
    console.log({massage:"table already created"});
})

module.exports=knex
