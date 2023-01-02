const TelegramBot = require('node-telegram-bot-api');
const { messageTypes } = require('node-telegram-bot-api/src/telegram');
const Token="5939150053:AAGFWTehoALLgFN2a0PsV66QoZFWRQdGALI";

const bot = new TelegramBot(Token, {polling: true});

// youtube video api require
const fs = require('fs');
const ytdl = require('ytdl-core');
const { getInfo } = require('ytdl-core');
const { resolve } = require('path');
const { rejects } = require('assert');
const { send } = require('process');
const { resourceLimits } = require('worker_threads');



bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const fullName=msg.from.first_name
    if(msg.text==='/start'){
        // send a message to the chat acknowledging receipt of their message
        bot.sendMessage(chatId, `Assalomu alaykm <b> ${fullName} </b> , menga youtube video linkini yuboring men sizga yuklab beraman`, {parse_mode: 'HTML'});
    }
    else if(ytdl.validateURL(msg.text)){

        let infoVideo=await ytdl.getInfo(msg.text)
        let videoTitle=infoVideo.videoDetails.title
        size=infoVideo.formats[0].contentLength
        async  function getvideo(){
            await ytdl(msg.text)
            .pipe(fs.createWriteStream(`video/${videoTitle}.mp4`));
            bot.sendMessage(chatId, 'getvideo video');
                setTimeout(sendVideo, 15000)
                
                }   
               

         function sendVideo(){
             bot.sendVideo(chatId, `video/${videoTitle}.mp4`)
             bot.sendMessage(chatId, 'send video')
             console.log(videoTitle)
             console.log(size);
            }

           getvideo()
        

     }
  });




