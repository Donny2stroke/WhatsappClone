function saveToLocalStorage(item, data){
    try {
        const serializeData = JSON.stringify(data)
        localStorage.setItem(item, serializeData)
    } catch (error) {
        console.warn(error)
    }
}

function loadFromLocalStorage(item){
    try {
        const serializeData = localStorage.getItem(item)
        if(serializeData === null) return undefined
        return JSON.parse(serializeData)
    } catch (error) {
        console.warn(error)
        return undefined
    }
}

export {saveToLocalStorage, loadFromLocalStorage}