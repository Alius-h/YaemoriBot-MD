import yts from 'yt-search' 
const handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `🚩 *Ingrese el nombre de un video de YouTube*\n\nEjemplo, !${command} Distancia - Kimberly Contreraxx`,  m, rcanal);

try {
await m.react(rwait)
const randomReduction = Math.floor(Math.random() * 5) + 1;
let search = await yts(text);

let isVideo = /supervideo$/.test(command);
let urls = search.all[0].url;

let music = `*乂  Y O U T U B E  -  P L A Y  乂*\n\n`
    music += `🚩 *Titulo:*\n${search.all[0].title}\n\n`
    music += `📅 *Publicado:*\n${search.all[0].ago}\n\n`
    music += `👁 *Vistas:*\n${search.all[0].views}\n\n`
    music += `🕜 *Duración:*\n${search.all[0].timestamp}\n\n`
    music += `📎 *Url:*\n${urls}\n\n`
    music += `🕒 *Su ${type} se está enviando, espere un momento...*`

await conn.sendMessage(m.chat, { image: { url: search.all[0].thumbnail }, caption: music }, { quoted: fkontak });

let res = await dl_vid(urls)
let type = isVideo ? 'video' : 'audio';
let video = res.data.mp4;
let audio = res.data.mp3;
await conn.sendMessage(m.chat, { [type]: { url: isVideo ? video : audio }, gifPlayback: false, mimetype: isVideo ? "video/mp4" : "audio/mpeg" }, { quoted: fkontak });
await m.react(done)

} catch {
await conn.reply(m.chat, `✘ *Ocurrío un error*`, m, rcanal)
await m.react(error)
}}

handler.command = ['play', 'play2'];
export default handler;

async function dl_vid(url) {
const response = await fetch('https://shinoa.us.kg/api/download/ytdl', {
method: 'POST',
headers: {
'accept': '*/*',
'api_key': 'free',
'Content-Type': 'application/json'
},
body: JSON.stringify({
text: url,
})});

if (!response.ok) {
throw new Error(`HTTP error! status: ${response.status}`);
}
const data = await response.json();
return data;
}