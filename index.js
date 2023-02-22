const qrcode = require("qrcode-terminal");

const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on("ready", async () => {
    console.log("Client is ready!");
});

client.on("message", async (msg) => {
    const chat = await msg.getChat();
    const contact = await msg.getContact();
    await chat.sendMessage(`Hello @${contact.id.user} Thanks for messaging, Please checkout https://anshusharma.me 
   ${await contact.getProfilePicUrl() ?? ` Here is your Profile Link ${await contact.getProfilePicUrl()}`}  ${await contact.getAbout() ?? `and your bio is ${await contact.getAbout()}`}`, {
        mentions: [contact],
    });
});

client.on("call", async (call) => {
    try {
        console.log(call.from);
        await call.reject();
        const contact = await client.getContactById(call.from);
        const msg = await contact.getChat()
        await msg.sendMessage("Please call on 9518008087")

    } catch (error) {
        console.log(error);
    }
});

client.initialize();
