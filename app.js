import express from 'express';
import path from 'path';
import exphbs from 'express-handlebars';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import session from 'express-session';
import moment from 'moment';
import { generateDate } from './generateDate.js';

mongoose.connect('mongodb://127.0.0.1/demo_', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

import MongoStore from 'connect-mongo';

const app = express();
const port = 3000;

app.use(
  session({
    secret: 'test',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/demo_' }),
  })
);

app.use(express.static('public'));

app.engine(
  'handlebars',
  exphbs.engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
    helpers: { generateDate: generateDate },
  })
);

app.set('view engine', 'handlebars');

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

import mainRouter from './routes/main.js';
import categoryRouter from './routes/category.js';
import postsRouter from './routes/posts.js';
import usersRouter from './routes/users.js';

app.use('/', mainRouter);
app.use('/posts', postsRouter);
app.use('/', categoryRouter);
app.use('/', usersRouter);

app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı portta çalışıyor`);
});
