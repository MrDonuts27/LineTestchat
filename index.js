const express = require('express');
const { Client } = require('@line/bot-sdk');

const config = {
  channelAccessToken: 'f6ac38628188c6cabf248144a395f3d5',
  channelSecret: 'ApsoSnOFZ9XbdS3OsWAUHQ2bvL9o3NeLpF7mQQwWPcXfvjShq6OyeNwTU+WrMKn8EAn4GuTi32OSlW5VSId++I7xnymcMrkxuxKtZagwqzxMrdJdwSVIs6fz+Bdi67zpkJnPkw7pZMXNBPmj1F2CegdB04t89/1O/w1cDnyilFU=',
};

const client = new Client(config);
const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

function handleEvent(event) {
  if (event.type === 'message' && event.message.type === 'text') {
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: event.message.text,
    });
  }
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
