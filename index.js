const fetch = require("node-fetch");

class get {
    constructor(id, auth){
        if(!auth)throw new Error("Missing authorization token.")
        if(!id)throw new Error("Missing bot id.")
        this.id = id
        this.auth = auth
    }
    async post(server_count, shard_count){
        //At our api all actions logs is excuted from the bot list!
        //You can't change any logs
        //OH YEAH WHAT YOU ARE DOING HERE BITCH GET OUT NOW!
        let body = shard_count ? { 'server_count': server_count, 'shard_count': shard_count } : { 'server_count': server_count, 'shard_count': 0 }
        await fetch(`https://paradisebots.net/api/v1/bot/${this.id}`, {
            method: 'POST',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json', 'authorization': this.auth },
        }).then(async (res) => {console.log(await res.json())})
    }

    async get(botID, response){
        if(!botID) throw new Error("Missing Bot ID, Should be String")
        fetch(`https://paradisebots.net/api/v1/bots/${botID}`, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        }).then(async res => {
            response(await res.json())
        })
    }
}

module.exports = {
    get
}