const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

app.post('/webhook', (req, res) => {
  const payload = JSON.stringify(req.body);
  const sig = 'sha1=' + crypto.createHmac('sha1', process.env.WEBHOOK_SECRET).update(payload).digest('hex');

  if (req.headers['x-hub-signature'] === sig) {
    const alert = req.body?.alert;

    if (alert) {
      console.log('Code scanning alert status:', alert.status);
    }
  }

  res.status(200).end();
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
