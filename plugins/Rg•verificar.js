import { createHash } from 'crypto'  
import fetch from 'node-fetch'
import PhoneNumber from 'awesome-phonenumber'
import moment from 'moment-timezone'
import axios from 'axios'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i 
let msg, user, userNationality, tag, aa, pp, ppch, codigo, nombre, edad, finalizar, codigosIdiomas, nombresIdiomas
let handler = async function (m, { conn, text, usedPrefix, command }) {
codigosIdiomas = ['es', 'en']
nombresIdiomas = {
'es': 'Español',
'en': 'English'
}
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let api = await axios.get(`${apis}/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`)
let userNationalityData = api.data.result
userNationality = userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : 'Desconocido' 

pp = await conn.profilePictureUrl(who, 'image').catch(_ => icons)
ppch = await conn.profilePictureUrl(who, 'image').catch(_ => icons)

tag = `${m.sender.split("@")[0]}`
aa = tag + '@s.whatsapp.net'
user = global.db.data.users[m.sender]

if (/^(verify|verificar|reg(ister)?)$/i.test(command)) {
if (user.registered === true) return m.reply('🍭 Ya estás registrado.\n\n*¿Quiere volver a registrarse?*\n\nUse este comando para eliminar su registro.\n*${usedPrefix}unreg*')
if (!Reg.test(text)) return m.reply('🌹 Formato incorrecto.\n\nUso del comamdo: *${usedPrefix + command} nombre.edad*\nEjemplo : *${usedPrefix + command} ${name2}.666*')
let [_, name, splitter, age] = text.match(Reg)  
if (!name) return m.reply('🚩 El nombre no puede estar vacío.')
if (!age) return m.reply('🚩 La edad no puede estar vacía.')
age = parseInt(age)

if (age > 100) return m.reply('👴🏻 Wow el abuelo quiere jugar al bot.') 
if (age < 10) return m.reply('🚼  hay un abuelo bebé jsjsj.')
if (name.length >= 30) return m.reply('🚩 El nombre es demasiado largo.')  
edad = age
nombre = name

let texto = 'Elije Tu Idioma 🚩\n\n```[ 1 ] » Español```\n```[ 2 ] » English```'    
await conn.sendMessage(m.chat, { text: texto }, { quoted: m })        
finalizar = true
}
handler.before = async function (m, { conn }) {
if (user?.registered === true || user?.registered === undefined) return
if (!finalizar) return
if (m.quoted && m.quoted.id == msg.key.id) {
if (!/^\d+$/.test(m.text)) return conn.reply(m.chat, '🌺 Solo se permiten números del `1` al `2` de acuerdo con el orden de idiomas disponibles', m)
}
const numero = parseInt(m.text, 10)
let isVerified = m.quoted ? (m.quoted.id == msg.key.id && !isNaN(numero) && numero >= 1 && numero <= codigosIdiomas.length) : false
if (isVerified) {
user.Language = codigosIdiomas[numero - 1]
nombresIdiomas = nombresIdiomas[user.Language]
user.name = nombre + '✓'.trim()
user.age = edad
user.regTime = + new Date
user.registered = true
let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6)        
let regbot = `👤 𝗥 𝗘 𝗚 𝗜 𝗦 𝗧 𝗥 𝗢 👤\n`
regbot += `•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•\n`
regbot += `「💭」𝗡𝗼𝗺𝗯𝗿𝗲: ${name}\n`
regbot += `「✨️」𝗘𝗱𝗮𝗱: ${age} años\n`
regbot += `•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•\n`
regbot += `「🎁」𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗮𝘀:\n`
regbot += `• 15 Cookies 🍪\n`
regbot += `• 5 MiniCoins 🪙\n`
regbot += `• 245 Experiencia 💸\n`
regbot += `• 12 Tokens 💰\n`
regbot += `•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•\n`
regbot += `${packname}`
await conn.sendMini(m.chat, '⊱『✅𝆺𝅥 𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗔𝗗𝗢(𝗔) 𝆹𝅥✅』⊰', textbot, regbot, imagen1, imagen1, channel, m)  
let chtxt = `🌐 *Idioma:* ${nombresIdiomas}\n👤 *Usuario* » ${m.pushName || 'Anónimo'}\n🌎 *Pais* » ${global.userNationality}\n🗃 *Verificación* » ${user.name}\n🌺 *Edad* » ${user.age} años\n📆 *Fecha* » ${moment.tz('America/Bogota').format('DD/MM/YY')}`.trim()
await conn.sendMessage(global.channelid, { text: chtxt, contextInfo: {
externalAdReply: {
title: "【 🔔 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗖𝗜𝗢́𝗡 🔔 】",
body: '🥳 ¡Un usuario nuevo en mi base de datos!',
thumbnailUrl: pp,
sourceUrl: redes,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null })
}
finalizar = '' 
return
}}}
handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register'] 
export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));}