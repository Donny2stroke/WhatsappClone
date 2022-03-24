import express from "express";
import mongoose from "mongoose";
import Messages from "./model/dbMessages.mjs";
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
const port = process.env.PORT || 9000;

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
    const msgCollection = db.collection("messagecontents")
    const changeStream = msgCollection.watch()
    //l'evento change lo lancia direttamente il db di mongo
    changeStream.on("change", (change) =>{
        if(change.operationType === 'insert'){
            const record = change.fullDocument
            pusher.trigger("messages", "inserted", {
                'name'      : record.name,
                'message'   : record.message,
                'timestamp' : record.timestamp,
                'received'  : record.received
            });
        }else{
            console.log("Non è stata fatta una insert")
        }
    })
})


app.get('/', (req, res) => {
    res.status(200).send('Benvenuto sul server')
})

app.get('/api/v1/messages/sync', (req, res) => {
    Messages.find((err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.post('/api/v1/messages', (req, res)=>{
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.get('/api/v1/rooms/sync', (req, res) => {
    Rooms.find((err, data)=>{
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
        res.status(500).json({message:"Errore ID"})
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



app.listen(port, ()=>{
    console.log(`Server in ascolto sulla porta ${port}`)
})