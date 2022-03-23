import express from "express";
import mongoose from "mongoose";
import Messages from "./model/dbMessages.mjs";

const app = express()
const port = process.env.PORT || 9000;

//middleware già scritto per l'elaborazione dei json
app.use(express.json())

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
        console.log(change)
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

app.listen(port, ()=>{
    console.log(`Server in ascolto sulla porta ${port}`)
})