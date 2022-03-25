# WhatsappClone
Whatsapp Clone with Node.js, React.js, Mongodb e firebase

Una volta clonato il repository andare in whatsapp-clone-fe e eseguire il comando npm i per installare le dipendenze.
Fare lo stesso nella cartella whatsapp-clone-be

Il db è ostato su https://cloud.mongodb.com/

Il frontend è hostato su firebase
(Per aggiornare il frontend su firebase eseguire prima il comando npm run build e poi firebase deploy)

Il backend è hostato su hiroku 
(Per aggiornare il backend seguire la procedura di commit e push presente su hiroku)

Per far partire il progetto in locale 
Andare nella cartella whatsapp-clone-fe e digitare il comando npm run start (localhost:3000)
Andare nella cartella whatsapp-clone-be e digitare il comando npm run start (localhost:9000)
Andare a modificare nel seguente file /whatsapp-clone-fe/src/axios.js la variabile "baseURL" decommentando il localhost e commentando quella di hiroku

Link progetto funzionante: https://whatsappclone-1eaf8.web.app/
