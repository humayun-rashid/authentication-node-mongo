const mongoose = require('mongoose')
const authSchema = new mongoose.Schema (
    {
        name:{
            type: String,
            required: true

        },
        email:{
            type: String,
            required: true

        },
        password:{
            type: String,
            required: true

        },
        date:{
            type: Date,
            required: true,
            default: Date.now

        }
    }
) 

module.exports = mongoose.model('Auth',authSchema)