import fs from 'fs/promises';
import path from 'path';

const DB_PATH = './db.json';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // Tüm site verilerini getir
    try {
      const data = await fs.readFile(DB_PATH, 'utf-8');
      res.status(200).json(JSON.parse(data));
    } catch (error) {
      res.status(500).json({ message: 'Veriler okunamadı.' });
    }
  } else if (req.method === 'POST') {
    // Site verilerini güncelle
    const { password, data } = req.body;
    if (password !== '12345') {
      return res.status(401).json({ message: 'Yetkisiz işlem' });
    }

    try {
      await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
      res.status(200).json({ message: 'Veriler başarıyla güncellendi!' });
    } catch (error) {
      res.status(500).json({ message: 'Veriler yazılamadı.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
} 