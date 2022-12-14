const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = require("./app")

dotenv.config({path: "./config.env"})

//replace mongodb connectoin string
const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true 
})
.then(con =>{
    console.log("Database Connected Sucessfully ...")
})

const PORT = 3000 || process.env.PORT
app.listen(PORT, () => {
    console.log(`App sucessfully started on port ${PORT}`)
})