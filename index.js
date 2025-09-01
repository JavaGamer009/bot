import BotApi from 'node-telegram-bot-api'
const token = '7892238734:AAE7M-OdGIqp9ZrnMcSisTVwDnKSUsbtLaw'
const bot = new BotApi(token, {polling: true})
import {instagramGetUrl } from "instagram-url-direct"

function isUrl(url) {
    try{
        const result = new URL(url)
        return true
    } catch (err) {
        return false
    }
}

bot.on('message', async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text

    try{
        if(isUrl(text)) {
                    bot.sendMessage(chatId, '⏳')
        let data = await instagramGetUrl(text)
        if (data.media_details.length > 1) {
            const medias = data.media_details.map((item) => {
                return {
                    type: item.type == 'image' ? 'photo' : item.type,
                    media: item.url
                }
            });
           return bot.sendMediaGroup(chatId, medias);
        };

        bot.sendVideo(chatId, data.media_details[0].url, {
            caption: `❤️; ${data.post_info.likes}\n👀: ${data.media_details[0].video_view_count}\n👨🏿: ${data.post_info.owner_fullname}\n👤: https://www.instagram.com/${data.post_info.owner_username} `
        });
        } else {
            bot.sendMessage(chatId, "Haqiqiy havola yuboring.")
        };
    } catch (err) {
        bot.sendMessage(chatId, 'Xatolik')
    };
    console.log(text)
});