const Router = require('express');
const router = new Router();
const StationRouter = require('./StationRouter');
const przonesRouter = require('./przonesRouter');
const FileUploadRouter = require('./FileUploadRouter');
const FileUploadRouterZONE = require('./FileUploadRouterZONE');

router.use(StationRouter);
router.use(przonesRouter);
router.use(FileUploadRouter); // Добавьте строку для использования маршрута загрузки файлов
router.use(FileUploadRouterZONE);

module.exports = router;
