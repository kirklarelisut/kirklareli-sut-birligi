import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import multer from 'multer';

const app = express();
const port = 3008;

// Sunucunun bulunduğu dizin
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
// Yüklenen dosyaları public olarak erişilebilir yap
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


// --- Multer (Dosya Yükleme) Ayarları ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, 'public/uploads');
    fs.mkdir(uploadPath, { recursive: true }).then(() => {
        cb(null, uploadPath);
    })
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Dosya yükleme endpoint'i
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Dosya yüklenmedi.' });
    }
    // Yüklendikten sonra erişilebilecek URL'i geri gönder
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
});


// --- Site Veri API'leri ---
const DB_PATH = './db.json';

// Tüm site verilerini getir
app.get('/api/sitedata', async (req, res) => {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ message: 'Veriler okunamadı.' });
  }
});

// Site verilerini güncelle
app.post('/api/sitedata', async (req, res) => {
    // Basit bir şifre kontrolü
    const { password, data } = req.body;
    if (password !== '12345') { // Şimdilik basit bir şifre, daha sonra güvenli hale getirilecek
        return res.status(401).json({ message: 'Yetkisiz işlem' });
    }

    try {
        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
        res.json({ message: 'Veriler başarıyla güncellendi!' });
    } catch (error) {
        res.status(500).json({ message: 'Veriler yazılamadı.' });
    }
});


app.listen(port, () => {
  console.log(`Backend sunucusu http://localhost:${port} adresinde çalışıyor.`);
}); 