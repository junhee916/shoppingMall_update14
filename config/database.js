const mongoose = require('mongoose')

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

mongoose
    .connect(process.env.MONGODB_URI, options)
    .then(_ => console.log("connected mongodb..."))
    .catch(err => console.log(err))