# NewsExplorer API
*v1.1.0*
## О проекте:
API проекта [NewsExplorer](https://github.com/neomedved/news-explorer-frontend), сервиса, в котором можно найти новости по запросу и сохранить в личном кабинете.\
Стек: *Node.js, Express, MongoDB*.\
**[URL](https://api.news.neomedved.site)**
### Развёртывание проекта:
* Установка зависмостей: `npm install`
* Запуск в dev-режиме: `npm run dev`
* Запуск в production-режиме: `npm run start`
### Работа с API:
* Регистрация: `POST /signup`
* Авторизация: `POST /signin`
* Получение информации о пользователе: `GET /users/me`
* Получение списка всех сохранённых статей: `GET /articles`
* Создание статьи: `POST /articles`
* Удаление статьи по id: `DELETE /articles/:articleId`
