import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = 3005;

// Allow all origins (simplest)
app.use(cors());

// Serve the zip file from a folder outside your repo
app.use('/bible', express.static('C:/code/rcv-data'));

app.listen(PORT, () => {
  console.log(
    `Bible ZIP server running at http://LAPTOP-7L9KQ37O.local:${PORT}/bible/rcv.zip`,
  );
});
