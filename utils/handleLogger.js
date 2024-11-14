const { IncomingWebhook } = require('@slack/webhook');

// const log = fs.createWriteStream(
//     path.join(__dirname, "logs", "express.log"), { flags: "a" }
// );

const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK);

const loggerStream = {
    write: message => {
        webhook.send({
            text: message,
        });
        console.log('log', message);
    },
};

module.exports = loggerStream;
