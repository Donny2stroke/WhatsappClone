import mongoose from "mongoose";

const whatsappSchema = mongoose.Schema({
    message : String,
    name : String,
    timestamp : String,
    uid : String
})

export default mongoose.model("messageContent", whatsappSchema)