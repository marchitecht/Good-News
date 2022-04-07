require('dotenv').config();

const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const path = require('path');
const hbs = require('hbs');

// подключаю сессии
const session = require('express-session');
const FileStore = require('session-file-store')(session);

// ROUTES
const indexRouter = require('./routes/index.router');
const userRouter = require('./routes/user.router');
const authRouter = require('./routes/auth.router')

// ВЫЗЫВАЕМ EXPRESS
const app = express();
const PORT = process.env.PORT ?? 3001;
hbs.registerPartials(path.join(process.env.PWD, 'views/partials'));
// Сообщаем express, что в качестве шаблонизатора используется "hbs".
app.set('view engine', 'hbs');
// Сообщаем express, что шаблона шаблонизаторая (вью) находятся в папке "ПапкаПроекта/views".
app.set('views', path.join(process.env.PWD, 'views'));

// Подключаем middleware morgan с режимом логирования "dev",
// чтобы для каждого HTTP-запроса на сервер в консоль выводилась информация об этом запросе.
app.use(logger('dev'));
// Подключаем middleware, которое сообщает epxress, что в папке "ПапкаПроекта/public" будут находится
// статические файлы, т.е. файлы доступные для скачивания из других приложений.
app.use(express.static(path.join(process.env.PWD, 'public')));
// Подключаем middleware, которое позволяет читать
// содержимое body из HTTP-запросов типа POST, PUT и DELETE.
app.use(express.urlencoded({ extended: true }));
// Подключаем middleware, которое позволяет читать переменные JavaScript,
// сохранённые в формате JSON в body HTTP-запроса.
app.use(express.json());

// мидлвара которая сохраняет куки
app.use(session({
  name: 'sid',
  store: new FileStore(),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));
// ЗАПИСЫВАЕТ В ЛОКАЛСЫ ЮЗЕРА
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// ROUTERS
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter)

// ERRORS
// Если HTTP-запрос дошёл до этой строчки, значит ни один из ранее встречаемых рутов не ответил на запрос.
// Это значит, что искомого раздела просто нет на сайте. Для таких ситуаций используется код ошибки 404.
// Создаём небольшое middleware, которое генерирует соответствующую ошибку.
app.use((req, res, next) => {
  const error = createError(404, 'Запрашиваемой страницы не существует на сервере.');
  next(error);
});

// Отлавливаем HTTP-запрос с ошибкой и отправляем на него ответ.
app.use((err, req, res, next) => {
// Получаем текущий ражим работы приложения.
  const appMode = req.app.get('env');
  // Создаём объект, в котором будет храниться ошибка.
  let error;

  // Если мы находимся в режиме разработки, то отправим в ответе настоящую ошибку.
  // В противно случае отправим пустой объект.
  if (appMode === 'development') {
    error = err;
  } else {
    error = {};
  }

  // Записываем информацию об ошибке и сам объект ошибки в специальные переменные,
  // доступные на сервере глобально, но только в рамках одного HTTP-запроса.
  res.locals.message = err.message;
  res.locals.error = error;

  // Задаём в будущем ответе статус ошибки. Берём его из объекта ошибки, если он там есть.
  // В противно случае записываем универсальный стату ошибки на сервере - 500.
  res.status(err.status || 500);
  // Формируем HTML-текст из шаблона "error.hbs" и отправляем его на клиент в качестве ответа.
  res.render('error');
});
// ПОДКЛЮЧАЕМ ПОРТ
app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
});
