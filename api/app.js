const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: './.env' });
const { InitDB } = require('./models');

const authRouter = require('./routes/auth.routes');
const companyRouter = require('./routes/company.routes');
const commentRouter = require('./routes/comment.routes');
const userRouter = require('./routes/user.routes');
const eventRouter = require('./routes/event.routes');

const errorMiddleware = require('./middlewares/apiError.middleware');
const { populateCategories } = require('./utils/CategoryCreation');

const app = express();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

app.use('/api/auth', authRouter);
app.use('/api/company', companyRouter);
app.use('/api/comment', commentRouter);
app.use('/api/users', userRouter);
app.use('/api/event', eventRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('OK');
});

const start = async () => {
  try {
    await InitDB();
    populateCategories();
    app.listen(PORT, () => {
      console.log(`server is running on http://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
