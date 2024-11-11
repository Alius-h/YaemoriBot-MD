// By Jtxs 🐢
// https://whatsapp.com/channel/0029Vanjyqb2f3ERifCpGT0W

import axios from 'axios';
const { proto, generateWAMessageFromContent, generateWAMessageContent } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, '🚩 Ingresa el texto de lo que quieres buscar', m, rcanal);

async function createImage(url) {
const { imageMessage } = await generateWAMessageContent({image: { url }}, { upload: conn.waUploadToServer })
return imageMessage
}

try {
let Free = []
let { data } = await axios.get(`https://api.ryzendesu.vip/api/search/gimage?query=${encodeURIComponent(text)}`)
let YL = data
let imgs = YT.slice(0, 7)

for (let result of imgs) {
Free.push({
header: proto.Message.InteractiveMessage.Header.fromObject({ title: ``, hasMediaAttachment: true, imageMessage: await createImage(result) }),
body: proto.Message.InteractiveMessage.Body.fromObject({ text: `${text}` }),
footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: `` }),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] })
})
}

const msg = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
},
interactiveMessage: proto.Message.InteractiveMessage.fromObject({contextInfo: {mentionedJid: [m.sender]},
body: proto.Message.InteractiveMessage.Body.create({ text: dev }),
footer: proto.Message.InteractiveMessage.Footer.create({ text: 'Imagen Busqueda' }),
header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...Free] })
})
}}}, { quoted: m })

await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
} catch (error) {
console.error(error) 
}}

handler.tags = ['descargas']
handler.help = ['imagen']
handler.command = ['imagen']
handler.register = true

export default handler