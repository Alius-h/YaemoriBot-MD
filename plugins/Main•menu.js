import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
const { levelling } = '../lib/levelling.js'
import { promises } from 'fs'
import { join } from 'path'
let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, command }) => {
try {        
let vn = './media/menu.mp3'
let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
let { exp, cookies, level, role } = global.db.data.users[m.sender]
let { min, xp, max } = xpRange(level, global.multiplier)
let name = await conn.getName(m.sender)
let d = new Date(new Date + 3600000)
let locale = 'es'
let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
day: 'numeric',
month: 'long',
year: 'numeric'
}).format(d)
let time = d.toLocaleTimeString(locale, {
hour: 'numeric',
minute: 'numeric',
second: 'numeric'
})
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) {
process.send('uptime')
_muptime = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(resolve, 1000)
}) * 1000
}
let { money, joincount } = global.db.data.users[m.sender]
let user = global.db.data.users[m.sender]
let muptime = clockString(_muptime)
let uptime = clockString(_uptime)
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
let replace = {
'%': '%',
p: _p, uptime, muptime,
me: conn.getName(conn.user.jid),
npmname: _package.name,
npmdesc: _package.description,
version: _package.version,
exp: exp - min,
maxexp: xp,
totalexp: exp,
xp4levelup: max - exp,
github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
level, cookies, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
readmore: readMore
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
let username = conn.getName(who)
let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
let pp = './src/img/Menu.jpg'

let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

let menu = ` *˚₊·˚₊· ͟͟͞͞➳❥ ${taguser}*
*˚₊·˚₊· ͟͟͞͞➳❥* 𝙔𝙖𝙚𝙢𝙤𝙧𝙞𝘽𝙤𝙩-𝙈𝘿 🌻✨
 
*•/• Info User •/•*
 
👤 Cliente » \`\`\`${global.nombre}\`\`\`
🌍 Pais » \`\`\`${userNationality}\`\`\`
🍪 Galletas » \`\`\`${cookies}\`\`\`
💰 Experiencia » \`\`\`${exp}\`\`\`
⭐️ Rango » \`\`\`${role}\`\`\`
🧋 Nivel » \`\`\`${level}\`\`\`

*•/• Info Bot •/•*

👑 Creador » \`\`\`@DevDiego\`\`\`
🍟 Bot » \`\`\`${(conn.user.jid == global.conn.user.jid ? 'Oficial' : 'SubBot')}\`\`\`
☁️ Librería » \`\`\`Baileys\`\`\`
📆 Fecha » \`\`\`${moment.tz('America/Bogota').format('DD/MM/YY')}\`\`\`
🕑 Tiempo Activo » \`\`\`${uptime}\`\`\`
👥️️ Usuarios » \`\`\`${totalreg}\`\`\`

*•/• Información Bot •/•*

🍄 ${usedPrefix}afk 
🍄 ${usedPrefix}grupos
🍄 ${usedPrefix}skyplus
🍄 ${usedPrefix}instalaryaemori
🍄 ${usedPrefix}menu
🍄 ${usedPrefix}menu2
🍄 ${usedPrefix}hornymenu
🍄 ${usedPrefix}runtime
🍄 ${usedPrefix}script
🍄 ${usedPrefix}blocklist

*•/• Busquedas •/•*

🎋 ${usedPrefix}githubsearch
🎋 ${usedPrefix}google <búsqueda>
🎋 ${usedPrefix}mercadolibre <búsqueda>
🎋 ${usedPrefix}npmjs
🎋 ${usedPrefix}tiktoksearch <txt>
🎋 ${usedPrefix}tweetposts
🎋 ${usedPrefix}ytsearch
🎋 ${usedPrefix}imagen <query>
🎋 ${usedPrefix}pinterest

*•/• Juegos •/•*

🍧 ${usedPrefix}abrazar <@usuario>
🍧 ${usedPrefix}acertijo
🍧 ${usedPrefix}sonrojarse 
🍧 ${usedPrefix}gay 
🍧 ${usedPrefix}lesbiana 
🍧 ${usedPrefix}pajero 
🍧 ${usedPrefix}pajera 
🍧 ${usedPrefix}puto 
🍧 ${usedPrefix}puta 
🍧 ${usedPrefix}manco 
🍧 ${usedPrefix}manca 
🍧 ${usedPrefix}rata 
🍧 ${usedPrefix}prostituta 
🍧 ${usedPrefix}prostituto 
🍧 ${usedPrefix}apostar 
🍧 ${usedPrefix}cf
🍧 ${usedPrefix}consejo
🍧 ${usedPrefix}dance
🍧 ${usedPrefix}doxear
🍧 ${usedPrefix}formarpareja
🍧 ${usedPrefix}violar 
🍧 ${usedPrefix}enamorada 
🍧 ${usedPrefix}math
🍧 ${usedPrefix}meme
🍧 ${usedPrefix}acariciar 
🍧 ${usedPrefix}personalidad
🍧 ${usedPrefix}piropo
🍧 ${usedPrefix}pokedex 
🍧 ${usedPrefix}pucheros 
🍧 ${usedPrefix}ppt
🍧 ${usedPrefix}pregunta
🍧 ${usedPrefix}dormir 
🍧 ${usedPrefix}reto
🍧 ${usedPrefix}ruleta 
🍧 ${usedPrefix}triste 
🍧 ${usedPrefix}ship
🍧 ${usedPrefix}love
🍧 ${usedPrefix}simi
🍧 ${usedPrefix}bot
🍧 ${usedPrefix}top
🍧 ${usedPrefix}zodiac
🍧 ${usedPrefix}slot

*•/• Gacha •/•*

🌹 ${usedPrefix}character
🌹 ${usedPrefix}darrw
🌹 ${usedPrefix}obtenidos
🌹 ${usedPrefix}c
🌹 ${usedPrefix}robarpersonaje
🌹 ${usedPrefix}rw
🌹 ${usedPrefix}toprw

*•/• JadiBots •/•*

🌻 ${usedPrefix}serbot
🌻 ${usedPrefix}serbot --code
🌻 ${usedPrefix}pausarai
🌻 ${usedPrefix}bots
🌻 ${usedPrefix}deletebot

*•/• Rpg •/•*

🍁 ${usedPrefix}bank
🍁 ${usedPrefix}cookies
🍁 ${usedPrefix}crimen
🍁 ${usedPrefix}daily
🍁 ${usedPrefix}claim
🍁 ${usedPrefix}depositar
🍁 ${usedPrefix}lb
🍁 ${usedPrefix}levelup
🍁 ${usedPrefix}minar
🍁 ${usedPrefix}retirar
🍁 ${usedPrefix}rob2
🍁 ${usedPrefix}rob
🍁 ${usedPrefix}addprem 
🍁 ${usedPrefix}slut
🍁 ${usedPrefix}trabajar
🍁 ${usedPrefix}transfer

*•/• Registro •/•*

✨️ ${usedPrefix}perfil
✨️ ${usedPrefix}unreg
✨️ ${usedPrefix}reg

*•/• Exp •/•*

🌺 ${usedPrefix}daily
🌺 ${usedPrefix}Buy
🌺 ${usedPrefix}Buyall

*•/• Stickers •/•*

🍃 ${usedPrefix}qc
🍃 ${usedPrefix}stiker
🍃 ${usedPrefix}wm

*•/• Animes •/•*

💧 ${usedPrefix}animelink
💧 ${usedPrefix}akira
💧 ${usedPrefix}akiyama
💧 ${usedPrefix}anna
💧 ${usedPrefix}asuna
💧 ${usedPrefix}ayuzawa
💧 ${usedPrefix}boruto
💧 ${usedPrefix}chiho
💧 ${usedPrefix}chitoge
💧 ${usedPrefix}deidara
💧 ${usedPrefix}erza
💧 ${usedPrefix}elaina
💧 ${usedPrefix}eba
💧 ${usedPrefix}emilia
💧 ${usedPrefix}hestia
💧 ${usedPrefix}hinata
💧 ${usedPrefix}inori
💧 ${usedPrefix}isuzu
💧 ${usedPrefix}itachi
💧 ${usedPrefix}itori
💧 ${usedPrefix}kaga
💧 ${usedPrefix}kagura
💧 ${usedPrefix}kaori
💧 ${usedPrefix}keneki
💧 ${usedPrefix}kotori
💧 ${usedPrefix}kurumi
💧 ${usedPrefix}madara
💧 ${usedPrefix}mikasa
💧 ${usedPrefix}miku
💧 ${usedPrefix}minato
💧 ${usedPrefix}naruto
💧 ${usedPrefix}nezuko
💧 ${usedPrefix}sagiri
💧 ${usedPrefix}sasuke
💧 ${usedPrefix}sakura
💧 ${usedPrefix}cosplay
💧 ${usedPrefix}infoanime
💧 ${usedPrefix}lolice
💧 ${usedPrefix}waifu

*•/• Grupos •/•*

🍬 ${usedPrefix}add
🍬 ${usedPrefix}banchat 
🍬 ${usedPrefix}grupo abrir / cerrar
🍬 ${usedPrefix}delete
🍬 ${usedPrefix}demote
🍬 ${usedPrefix}encuesta 
🍬 ${usedPrefix}hidetag
🍬 ${usedPrefix}infogrupo
🍬 ${usedPrefix}invite 
🍬 ${usedPrefix}kick
🍬 ${usedPrefix}link
🍬 ${usedPrefix}listadv
🍬 ${usedPrefix}promote
🍬 ${usedPrefix}revoke
🍬 ${usedPrefix}tagall 
🍬 ${usedPrefix}invocar 
🍬 ${usedPrefix}unbanchat

*•/• Enable - Disable •/•*

🌸 ${usedPrefix}enable
🌸 ${usedPrefix}disable

*•/• Descargas •/•*

🍟 ${usedPrefix}fb
🍟 ${usedPrefix}gitclone 
🍟 ${usedPrefix}imagen 
🍟 ${usedPrefix}ig
🍟 ${usedPrefix}mediafire
🍟 ${usedPrefix}apkmod
🍟 ${usedPrefix}play3
🍟 ${usedPrefix}play4
🍟 ${usedPrefix}spotify
🍟 ${usedPrefix}tiktok
🍟 ${usedPrefix}ytmp4 

*•/• Herramientas •/•*

🪐 ${usedPrefix}toanime
🪐 ${usedPrefix}tts
🪐 ${usedPrefix}imagen
🪐 ${usedPrefix}spamwa 
🪐 ${usedPrefix}fake
🪐 ${usedPrefix}remini
🪐 ${usedPrefix}hd
🪐 ${usedPrefix}enhance
🪐 ${usedPrefix}ssweb
🪐 ${usedPrefix}trad
🪐 ${usedPrefix}nuevafotochannel
🪐 ${usedPrefix}nosilenciarcanal
🪐 ${usedPrefix}silenciarcanal
🪐 ${usedPrefix}noseguircanal
🪐 ${usedPrefix}seguircanal
🪐 ${usedPrefix}avisoschannel
🪐 ${usedPrefix}resiviravisos
🪐 ${usedPrefix}inspect
🪐 ${usedPrefix}inspeccionar
🪐 ${usedPrefix}eliminarfotochannel
🪐 ${usedPrefix}reactioneschannel
🪐 ${usedPrefix}reaccioneschannel
🪐 ${usedPrefix}nuevonombrecanal
🪐 ${usedPrefix}nuevadescchannel

*•/• Información •/•*

🌵 ${usedPrefix}creador
🌵 ${usedPrefix}ds
🌵 ${usedPrefix}dsowner
🌵 ${usedPrefix}fixmsgespera
🌵 ${usedPrefix}status
🌵 ${usedPrefix}info
🌵 ${usedPrefix}ping
🌵 ${usedPrefix}sistema
🌵 ${usedPrefix}speed
🌵 ${usedPrefix}speedtest
🌵 ${usedPrefix}reportar

*•/• Nsfw •/•*

🔥 ${usedPrefix}nsfwloli
🔥 ${usedPrefix}nsfwfoot
🔥 ${usedPrefix}nsfwass
🔥 ${usedPrefix}nsfwbdsm
🔥 ${usedPrefix}nsfwcum
🔥 ${usedPrefix}nsfwero
🔥 ${usedPrefix}nsfwfemdom
🔥 ${usedPrefix}nsfwfoot
🔥 ${usedPrefix}nsfwglass
🔥 ${usedPrefix}nsfworgy
🔥 ${usedPrefix}yuri
🔥 ${usedPrefix}yuri2
🔥 ${usedPrefix}yaoi
🔥 ${usedPrefix}yaoi2
🔥 ${usedPrefix}panties
🔥 ${usedPrefix}tetas
🔥 ${usedPrefix}booty
🔥 ${usedPrefix}ecchi
🔥 ${usedPrefix}furro
🔥 ${usedPrefix}hentai
🔥 ${usedPrefix}trapito
🔥 ${usedPrefix}imagenlesbians
🔥 ${usedPrefix}pene
🔥 ${usedPrefix}porno
🔥 ${usedPrefix}randomxxx
🔥 ${usedPrefix}pechos
🔥 ${usedPrefix}r34 <tag>
🔥 ${usedPrefix}rule34 <tag>

*•/• Propietario •/•*

🍿${usedPrefix}enable
🍿${usedPrefix}disable
🍿${usedPrefix}addcookies 
🍿${usedPrefix}addprem 
🍿${usedPrefix}autoadmin
🍿${usedPrefix}copia
🍿${usedPrefix}banuser 
🍿${usedPrefix}bc
🍿${usedPrefix}bcgc
🍿${usedPrefix}bcgc2
🍿 $
🍿 >
🍿 =>
🍿${usedPrefix}cheat
🍿${usedPrefix}cleartmp
🍿${usedPrefix}delprem 
🍿${usedPrefix}dsowner
🍿${usedPrefix}fetch
🍿${usedPrefix}get
🍿${usedPrefix}ip <alamat ip>
🍿${usedPrefix}join <link>
🍿${usedPrefix}grupocrear <nombre>
🍿${usedPrefix}nuevabiobot <teks>
🍿${usedPrefix}nuevafotobot *<imagen>*
🍿${usedPrefix}nuevonombrebot <teks>
🍿${usedPrefix}resetpersonajes
🍿${usedPrefix}restart
🍿${usedPrefix}unbanuser
🍿${usedPrefix}update

*•/• Audios •/•*

🐢 ${usedPrefix}bass
🐢 ${usedPrefix}blown
🐢 ${usedPrefix}deep
🐢 ${usedPrefix}earrape
🐢 ${usedPrefix}fast
🐢 ${usedPrefix}fat
🐢 ${usedPrefix}nightcore
🐢 ${usedPrefix}reverse
🐢 ${usedPrefix}robot 
🐢 ${usedPrefix}slow
🐢 ${usedPrefix}smooth
🐢 ${usedPrefix}tupai

*•/• Ai •/•*

🍘 ${usedPrefix}gemini
🍘 ${usedPrefix}chatgpt <texto>
🍘 ${usedPrefix}ia <texto>
🍘 ${usedPrefix}remini
🍘 ${usedPrefix}hd
🍘 ${usedPrefix}enhance

*•/• Convertidores •/•*

🍥 ${usedPrefix}togifaud
🍥 ${usedPrefix}toimg
🍥 ${usedPrefix}tourl
🍥 ${usedPrefix}tovideo

> © ⍴᥆ᥕᥱrᥱძ ᑲᥡ ძᥱ᥎ძіᥱg᥆ ⚡︎`.trim()
  
conn.sendFile(m.chat, pp, 'yaemori.jpg', menu, m, false, { contextInfo: { mentionedJid }})
await m.react(emojis)        
} catch (e) {
await m.react(error)
}}
handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'allmenu', 'allmenú', 'menucompleto']
//handler.register = true
handler.exp = 50
handler.fail = null
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}