import {loadFromLocalStorage} from './localStore'

export const initialState = {
    user : loadFromLocalStorage("user"),
    rooms: []
}

export const actionTypes = {
    SET_USER : "SET_USER",
    SET_ROOM : "SET_ROOM"
}

const reducer = (state, action) =>{
    switch(action.type){
        case actionTypes.SET_USER:
            return {
                ...state, 
                user : action.user
            }
        case actionTypes.SET_ROOM:
            if(action._id){
                let indexRoom = state.rooms.findIndex( (item) => 
                    item._id === action._id
                )
                let fMsg = action.lastMessage ? action.lastMessage : ""
                let lMsg = fMsg.length > 15 ? `${fMsg.substring(0,15)}...` : fMsg
                if(indexRoom < 0){
                    let newRoom = {
                        _id : action._id,
                        name: action.name ? action.name : "",
                        lastMessage: lMsg,
                        notify: action.notify ? action.notify : 0
                    }
                    state.rooms.push(newRoom)
                }else{
                    let room = state.rooms.find( (item) => item.id === action._id)
                    let notify = 0
                    if(action.notify === 1){
                        notify = 1
                    }
                    let lastMessage = lMsg == "" ? room.lastMessage : lMsg
                    state.rooms[indexRoom] = { ...room, notify, lastMessage }
                }
            }
            return {
                ...state, 
            }
        default:
            return state  
    }
}

export default reducer;