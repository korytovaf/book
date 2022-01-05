const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/book', require('./routes/book.routes'))

if (process.env.NODE_ENV === "production") {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = config.get('port') || 8000;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error =>', e.message);
    process.exit(1)
  }
}

start();


