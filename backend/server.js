const express = require('express');
const cors = require('cors');
const { networkInterfaces } = require('os');

const app = express();
const port = 5000;
app.use(cors());

app.get('/get-ip', (req, res) => {
  const nets = networkInterfaces();
  const results = Object.create(null);

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }

  res.json(results);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
