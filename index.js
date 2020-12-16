const fetch = require("node-fetch");

/**
* PARADISE BOT LIST API
*
* CHANGING ANYTHING HERE WILL NOT AFFECT HOW THE API WORKS
* ALL ACTIONS AND LOGS ARE EXECUTED FROM THE WEBSITE API
* THIS IS JUST A MODULE TO INTERACT WITH IT
*
*/

class PBL {
    constructor(id, auth){
        this.id = id
        this.auth = auth
    }
    async post(server_count, shard_count){
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

    async getUser(userID, response) {
        if(!userID) throw new Error('Missing User ID, Should be a string')
        fetch(`https://paradisebots.net/api/v1/users/${userID}`, {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
        }).then(async res => {
            response(await res.json())
        })
    }
}

module.exports = PBL;
