const Router = require('express');
const multer = require('multer');
const path = require('path');
const { insertDataFromFile } = require('../addButtonZONE');

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Убедитесь, что папка 'uploads' существует
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

router.post('/upload2', upload.single('file'), async (req, res) => {
  console.log(req.file);
  const filePath = path.join(req.file.path);
  
  try {
    await insertDataFromFile(filePath);
    res.status(200).send({ message: 'Файл успешно загружен и обработан.' });
  } catch (error) {
    console.error('Ошибка при обработке файла:', error);
    res.status(500).send({ message: 'Ошибка при обработке файла.' });
  }
});

module.exports = router;
