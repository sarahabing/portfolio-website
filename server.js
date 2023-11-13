const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

app.post('/', (req, res) => {
  const payload = req.body;
  // const sig = 'sha1=' + crypto.createHmac('sha1', process.env.WEBHOOK_SECRET).update(payload).digest('hex');
  // if (req.headers['x-hub-signature'] === sig) {
    // const alert = req.action

    // if (alert) {

      console.log('Code scanning alert action:', payload.action);
      // console.log('code scanning alert actual alert', req.alert.url);
    // }
  // }

  res.status(200).end();
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
