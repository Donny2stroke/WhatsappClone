import express from "express";
import mongoose from "mongoose";
//import Messages from "./model/dbMessages.mjs";
import Rooms from "./model/dbRooms.mjs";
import cors from "cors"
import Pusher from "pusher";

const pusher = new Pusher({
    appId: "1366134",
    key: "4d8d1056a1b8902a2444",
    secret: "8b6c1a38f09aa30671ab",
    cluster: "eu",
    useTLS: true
});

const app = express()
const port = process.env.NODE_PORT || 9000;

//middleware già scritto per l'elaborazione dei json
app.use(express.json())
//middleware cors
app.use(cors())

//DATABASE
const connectionDbUrl = "mongodb+srv://admin:Igb9ACZoFLVhcb00@cluster0.klh0p.mongodb.net/whatsappwebdb?retryWrites=true&w=majority"

mongoose.connect(connectionDbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (error) =>{
    //if(!error) console.log("Connessione al db avvenuta con successo")
    if(error) console.log("Errore di connessione al db")
})

const db = mongoose.connection
db.once("open",  () =>{
    console.log("Connessione al db avvenuta con successo")


    const msgRoom = db.collection("rooms")
    var filter = []
    var options = {fullDocument:"updateLookup"}
    const changeStream = msgRoom.watch(filter, options)




    //l'evento change lo lancia direttamente il db di mongo
    changeStream.on("change", (change) =>{
        if(change.operationType === 'update'){
            let messages = change.fullDocument.messages
            let roomId = change.fullDocument._id
            let lastMessage = messages[messages.length -1]
            pusher.trigger(`room_${roomId}`, "inserted", {
                'name'      : lastMessage.name,
                'message'   : lastMessage.message,
                'timestamp' : lastMessage.timestamp,
                'uid'       : lastMessage.uid,
                '_id'       : lastMessage._id,
                'room_id'   : roomId
            });
        }else{
            console.log("Non è stata fatta una update")
        }
    })
})


app.get('/', (req, res) => {
    res.status(200).send('Benvenuto sul server')
})


//ROOMS
//GET  - api/v1/rooms
//POST - api/v1/rooms
//GET  - api/v1/rooms/:id

app.get('/api/v1/rooms', (req, res) => {
    Rooms.find((err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.post('/api/v1/rooms', (req, res)=>{
    const dbRoom = req.body

    Rooms.create(dbRoom, (err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.get('/api/v1/rooms/:id', (req, res) => {
    const roomId = req.params.id
    Rooms.findById(roomId).then((room)=>{
        if(!room){
            res.status(404).json({message:"Stanza non trovata"})
        }else{
            res.status(200).json({room:room})
        }
    }).catch((err)=>{
        res.status(404).json({message:"Errore ID"})
    })
})



//MESSAGES
//GET  - api/v1/rooms/:id/messages
//POST - api/v1/rooms/:id/messages

app.get('/api/v1/rooms/:id/messages', (req, res) => {
    const roomId = req.params.id
    Rooms.findById(roomId)
    .then((room)=>{
        if(!room){
            res.status(404).json({
                messages:"Stanza non trovata"
            })
        }else{
            res.status(200).send(room.messages)
        }
    }).catch( err => { 
        res.status(404).json({
            messages:"Stanza non trovata"
        })
    })
})


app.post('/api/v1/rooms/:id/messages', (req, res)=>{
    const dbMessage = req.body
    const roomId = req.params.id
    Rooms.findById(roomId)
    .then((room)=>{
        if(!room){
            res.status(404).json({
                messages:"Stanza non trovata"
            })
        }else{
            room.messages.push(dbMessage)
            room.save(err =>{
                if(err) res.status(500).send(err)
                else res.status(200).send(dbMessage)
            })
        }
    }).catch( err => { 
        res.status(500).json({
            messages:"Errore id"
        })
    })
})








app.listen(port, ()=>{
    console.log(`Server in ascolto sulla porta ${port}`)
})