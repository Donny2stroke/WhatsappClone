import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    name : String,
    messages: [{
        message : String,
        name : String,
        timestamp : String,
        uid : String
    }]
})

export default mongoose.model("rooms", roomSchema)