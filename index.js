const fetch = require("node-fetch")

class get {
    constructor(id, auth){
        if(!auth)throw new Error("Missing authorization token.")
        if(!id)throw new Error("Missing Bot ID.")
        this.id = id
        this.auth = auth
    }
    async post(server_count, shard_count){
        /* In our api all actions logs is excuted from the bot list!, You can't change any logs */
        let body = shard_count ? { 'server_count': server_count, 'shard_count': shard_count } : { 'server_count': server_count, 'shard_count': 0 }
        await fetch(`https://paradisebots.net/api/v1/bot/${this.id}`, {
            method: 'POST',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json', 'authorization': this.auth },
        }).then(async (res) => {console.log(await res.json())})
    }
}

module.exports = {
    get
}
