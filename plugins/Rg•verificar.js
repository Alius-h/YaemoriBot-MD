import { createHash } from 'crypto'  
import fetch from 'node-fetch'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i 
let handler = async function (m, { conn, text, usedPrefix, command }) {
let codigosIdiomas = ['es', 'en']
let nombresIdiomas = {
'es': 'Español',
'en': 'English'
}

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => icons)

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
} 
let tag = `${m.sender.split("@")[0]}`
let aa = tag + '@s.whatsapp.net'
let user = global.db.data.users[m.sender]

if (/^(verify|verificar|reg(ister)?)$/i.test(command)) {
if (user.registered === true) return m.reply('Ya está registrado.')
if (!Reg.test(text)) return m.reply('Y el nonbre')
let [_, name, splitter, age] = text.match(Reg)  
if (!name) return m.reply(lenguajeGB.smsVerify2())
if (!age) return m.reply(lenguajeGB.smsVerify3())
age = parseInt(age)
if (age > 50) return m.reply(lenguajeGB.smsVerify4()) 
if (age < 10) return m.reply(lenguajeGB.smsVerify5())
if (name.length >= 30) return m.reply(lenguajeGB.smsVerify6())
user.name = name + '✓ᚲ'.trim()
user.age = age
let listaIdiomasTexto = ''
listaIdiomasTexto += `🚩 Elije tu idioma.\n\n[ 1 ] Español\n[ 2 ] Ingles`
await conn.sendMessage(m.chat, { text: genText }, { quoted: m })        
} 

if (command == 'idioma') {        
if (!user.name || !user.age) return conn.sendMessage(m.chat, { text: `${lenguajeGB['smsAvisoFG']()}*REGISTRE SU NOMBRE Y EDAD PARA PODER USAR ESTE COMANDO*` }, { quoted: m })   
var emojiANumero = { "0️⃣": "0", "1️⃣": "1", "2️⃣": "2" }
text = text.replace(/[\u{0030}-\u{0039}]\u{FE0F}\u{20E3}/gu, function(match) {
return emojiANumero[match] || match
})
let idioma = ''
function asignarIdioma(text) { 
if (!text) return conn.sendMessage(m.chat, { text: `*ESCRIBA UN NÚMERO PARA ELEGIR EL IDIOMA, EJEMPLO:*\n\n✓ \`\`\`${usedPrefix}idiomagb 2️⃣\`\`\`\n✓ \`\`\`${usedPrefix}idiomagb 2\`\`\`` }, { quoted: m })          
if (text < 1 || (text > 5 && text)) {
conn.reply(m.chat, `*"${text}" NO ES VÁLIDO PARA ELEGIR, RECUERDE USAR EL EMOJI NUMÉRICO O TEXTO NUMÉRICO PARA SELECCIONAR EL IDIOMA, EJEMPLO:*\n\n✓ \`\`\`${usedPrefix}idiomagb 2️⃣\`\`\`\n✓ \`\`\`${usedPrefix}idiomagb 2\`\`\``, m) 
}
switch (text) {
case "1️⃣":
case "1":
idioma = 'es'
break
case "2️⃣":
case "2":
idioma = 'en'
break
default:
if (text == 0 || text > 5) return
return conn.reply(m.chat, `*RECUERDE USAR EL EMOJI NUMÉRICO O TEXTO NUMÉRICO PARA SELECCIONAR EL IDIOMA, EJEMPLO*\n\n✓ \`\`\`${usedPrefix}idiomagb 2️⃣\`\`\`\n✓ \`\`\`${usedPrefix}idiomagb 2\`\`\``, m)
}}
asignarIdioma(text)
user.Language = idioma
if (!user.Language) return m.reply(`*NO SE LOGRÓ CONFIGURAR EL IDIOMA, INTENTE DE NUEVO POR FAVOR*`)
if (codigosIdiomas.includes(user.Language)) {
nombresIdiomas = nombresIdiomas[user.Language]
} else {
nombresIdiomas = `IDIOMA NO DETECTADO`
}  
await m.reply(`*EN CASO QUE QUIERA CAMBIAR O ELIMINAR EL IDIOMA DEBE DE ELIMINAR SU REGISTRO PRIMERO*`)
user.regTime = + new Date
user.registered = true
let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6)        
let caption = `👤 𝗥 𝗘 𝗚 𝗜 𝗦 𝗧 𝗥 𝗢 👤
•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•
「💭」𝗡𝗼𝗺𝗯𝗿𝗲: ${user.name}
「✨️」𝗘𝗱𝗮𝗱: ${user.age} años
•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•
「🎁」𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗮𝘀:
• 15 Cookies 🍪
• 5 MiniCoins 🪙
• 245 Experiencia 💸
• 12 Tokens 💰
•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•
⪛✰ 𝐀𝐢 𝐘𝐚𝐞𝐦𝐨𝐫𝐢 - 𝐌𝐃 ✰⪜`.trim()
await conn.sendFile(m.chat, pp, 'gata.jpg', caption, m, false, { mentions: [aa] }) 
/*await conn.sendMessage(global.channelid, { text: chtxt, contextInfo: {
externalAdReply: {
title: "【 🔔 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗖𝗜𝗢́𝗡 🔔 】",
body: '🥳 ¡Un usuario nuevo en mi base de datos!',
thumbnailUrl: fotoperfil,
sourceUrl: redes,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null })*/
}
}
handler.command = ['verify', 'verificar', 'reg', 'register', 'idiomagb']
export default handler