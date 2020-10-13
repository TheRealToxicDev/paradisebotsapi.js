# Paradise Bot List API Wrapper

An official NPM Module for interacting with the  Paradise API

---

## Support

* [Discord](https://paradisebots.net/join)

* [Docs](https://docs.paradisebots.net/internal)

* [Website](https://paradisebots.net)

* [Bug Report](https://paradisebots.net/bug)

---

## Installation
`npm i paradiseapi.js@latest`

or

`npm i paradiseapi.js@latest`

or

`npm i paradiseapi.js --save`

## Hard Coded Install
Append the Line below to your package.json
```
    "paradiseapi.js": "^1.0.3",
```

• Save and profit

---

## Ratelimits
You can POST Server and Shard Count stats once every 5 minutes

## Response

> [ Error ] 429 : `[PBL] (429): Your are being ratelimited, 1 request per 5 mins.`

> [ Error ] 404 : `[PBL] (404): Can't find server_count.`

> [ Error ] 404 : `[PBL] (404): Authorization header not found.`

> [ Error ] 400 : `[PBL] (400): server_count not integer.`

> [ Error ] 404 : `[PBL] (404): Bot not found!`

> [ Error ] 400 : `[PBL] (400): Incorrect authorization token.`

> [ Error ] 404 : `[PBL] (404): Go generate auth token for your bot!`

> [ Error ] 400 : `[PBL] (400): shard_count not integer.`


> [ Success ] 200 : **[200]: Your Stats Has Been Posted.**

---

## Example (Discord.js v12)
```js
const Discord = require("discord.js")
const client = new Discord.Client()
const prefix = "!";
const PBL = require("paradisebotsapi.js")
const pbl = new PBL.get(client.user.id,"bot-auth-token")

client.on("ready", () => {
console.log(`Logged in as ${client.user.tag}.`)
setInterval(() => {
/* Here is where we Post the stats to the Site (Only use one of these) */
   pbl.post(client.guilds.cache.size) /* Will `POST` server count*/
   //pbl.post(client.shard.count) /* Will `POST` shard count*/
   //pbl.post(client.guilds.cache.size, client.shard.count) /* Will `POST` server and shard count*/
  })
}, 300000) //5 Minutes in MS

client.on("message", message => {
    if(message.author.bot) return
    if(message.content == prefix + "ping"){
        message.reply(`Pong! it took ${client.ws.ping}`)
    }
})

client.login("token")

```

---

## Example (Discord.js v12 With Event Handler)
```js
module.exports = class extends EventClass {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
  const PBL = require("paradiseapi.js")
  const pbl = new PBL.get("BOT_ID_HERE","AUTH_TOKEN_HERE")
  
/* Here is where we Post the stats to the Site (Only use one of these) */
   pbl.post(client.guilds.cache.size) /* Will `POST` server count*/
   //pbl.post(client.shard.count) /* Will `POST` shard count*/
   //pbl.post(client.guilds.cache.size, client.shard.count) /* Will `POST` server and shard count*/
    }
}
```

## Example ([Discord Akairo](https://www.npmjs.com/package/discord-akairo))
```js
const Discord = require('discord.js');
const { Listener } = require('discord-akairo');
const request = require('superagent');
const fetch = require("node-fetch")
const Client = new Discord.Client()


module.exports = class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
  const PBL = require("paradiseapi.js")
  const pbl = new PBL.get("BOT_ID_HERE","AUTH_TOKEN_HERE")
  
/* Here is where we Post the stats to the Site (Only use one of these) */
   pbl.post(client.guilds.cache.size) /* Will `POST` server count*/
   //pbl.post(client.shard.count) /* Will `POST` shard count*/
   //pbl.post(client.guilds.cache.size, client.shard.count) /* Will `POST` server and shard count*/
    }
}
```

## Fetching Stats (Example)
```js
const Discord = require("discord.js")
const client = new Discord.Client()
const prefix = "!";
const PBL = require("paradisebotsapi.js")
const stats = new PBL.get()
 
client.on("ready", () => { // ready listenerconsole.log(`Logged in as ${client.user.tag}`)}) 
client.on("message", message => { // message listener
    if(message.author.bot) return;
    if(message.channel.type !== "text") return;
    if(!message.content.toLowerCase().startsWith(prefix)) return;
    if(message.content == (prefix + "ping")){
        message.reply(`Pong ${client.ws.ping}ms`)
    }
     if(message.content == (prefix + "stats")){
        stats.get(client.user.id, function(data){ // ID should be string
        let embed = new MessageEmbed()
        .setTitle(data.bot_name)
        .setDescription(`
        Votes: ${data.votes},
        Support: ${data.server},
        Website: ${data.website},
        Donate: ${data.donate},
        Tags: ${data.tags}
        Prefix: ${data.prefix},
        Library: ${data.library},
        Description: ${data.shortDescription},
        Servers: ${data.servers},
        Shards: ${data.shards},
        Staff: ${data.additionalOwners},
        `)
        .setFooter(`Bot created by ${data.owner}`)
        })
        message.channel.send(embed)
    }
})
 
 
client.login("token")
```
