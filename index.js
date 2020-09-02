const Discord = require('discord.js');
const { prefix,token } = require('./config.json')
const client = new Discord.Client();
const Jikan = require('jikan-node');
const mal = new Jikan();
 


client.once('ready', () => {
    console.log('Bot online');
});

function emoji(id){
    return client.emojis.cache.get(id).toString();
}
//TODO: make a helper function that initializes a temp list, selects an anime that was rated high enough from the list, and sends the selection to chat
//to replace the current "send the first item" issue


let genreList ={
    "action": 1,
    "adventure": 2,
    "cars": 3,
    "comedy": 4,
    "dementia": 5,
    "demons": 6,
    "mystery": 7,
    "drama": 8,
    "ecchi": 9,
    "fantasy":10,
    "game":11,
    "hentai":12,
    "historical":13,
    "horror":14,
    "kids":15,
    "magic":16,
    "martial arts":17,
    "mecha":18,
    "music":19,
    "parody":20,
    "samurai":21,
    "romance":22,
    "school":23,
    "sci fi":24,
    "shoujo":25,
    "shoujo ai":26,
    "shounen":27,
    "shounen ai":28,
    "space":29,
    "sports":30,
    "super power":31,
    "vampire":32,
    "yaoi":33,
    "yuri":34,
    "harem":35,
    "slice of life":36,
    "supernatural":37,
    "military":38,
    "police":39,
    "psychological":40,
    "thriller":41,
    "seinen":42,
    "josei":43
}

client.on('message', message =>{
    if(!message.content.startsWith(prefix)||message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
   
    if(genreList[command]!= undefined){
         mal.findGenre('anime', genreList[command])
         .then(info => {
             //initialize empty list
             let tmpList=[];
             for (i=0; i<info.anime.length;i++){
                 //push anime into list only if they have high community scores
                if (info.anime[i].score>=7){
                    tmpList.push(info.anime[i]);
                }
             }
                // generate a random number within the bounds of the list and send the url of that index of tmplist to chat
                let index = Math.floor(Math.random()*tmpList.length);
                message.channel.send(tmpList[index].url);
               //console.log(info);
               
         })
         .catch(err => console.log(err)); 
    }
    

    if(command ==='list'){
        let listString = 'available genres include:';
        for(genre in genreList){
            listString+= "\n" + genre;
        }
        message.channel.send(listString);
    }else if(command === 'pog'){
        message.channel.send(emoji ("643065894138019840") );
    }else if (command === 'help'){
        message.channel.send('!pog: pog in the chat\n![genre]: get an anime recommendation of the given genre\n!list: list the genres supported on MAL')
    }
});

client.login(token);
