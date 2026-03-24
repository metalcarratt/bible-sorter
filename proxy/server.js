import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing ?url=');

  try {
    const response = await fetch(url);
    const text = await response.text();

    res.set('Content-Type', 'text/html; charset=utf-8');
    res.send(text);
  } catch (err) {
    res.status(500).send('Proxy error: ' + err.message);
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log('Proxy running on http://localhost:' + PORT);
});
