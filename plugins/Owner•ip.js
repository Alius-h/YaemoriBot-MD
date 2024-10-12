
const { Client, LocalAuth } = require('whatsapp-web.js');
const axios = require('axios');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
    if (msg.body.startsWith('!ip ')) {
        const ip = msg.body.split(' ')[1];

        try {
            const response = await axios.get(`http://ip-api.com/json/${ip}`);
            const data = response.data;

            if (data.status === 'fail') {
                msg.reply(`No se encontró información para la IP: ${ip}`);
            } else {
                const info = `
                *Información para la IP:* ${ip}
                - 🌍 País: ${data.country}
                - 🏙️ Región: ${data.regionName}
                - 🌆 Ciudad: ${data.city}
                - 🕹️ Proveedor de Internet: ${data.isp}
                - 🌐 Organización: ${data.org}
                - 📡 ASN: ${data.as}
                - 📍 Latitud: ${data.lat}
                - 📍 Longitud: ${data.lon}
                - ⏲️ Zona Horaria: ${data.timezone}
                - 📅 Código Postal: ${data.zip}
                - 💻 Dirección IP: ${data.query}
                `;
                msg.reply(info);
            }
        } catch (error) {
            msg.reply('Hubo un error al buscar la IP. Inténtalo de nuevo más tarde.');
        }
    }

handler.help = ['ip <alamat ip>']
handler.tags = ['owner']
handler.command = ['ip']
handler.rowner = true
//export default client
client.initialize();