import mongoose, { mongo } from "mongoose";
import path from "path";
require('dotenv').config({ path: path.join(process.cwd(), '.env') })


// Mongo connection
const CONNECTION = process.env.CONNECTION;
mongoose.connect(CONNECTION,{useUnifiedTopology:true, useNewURLParser:true});

const friendSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    gender: {
        type: String
    },
    language: {
        type: String
    },
    age: {
        type: Number
    },
    email: {
        type: String
    },
    contacts: {
        type: Array
    },
})

const Friends = mongoose.model("friends", friendSchema);

export { Friends };