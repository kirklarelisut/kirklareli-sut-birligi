import fs from 'fs/promises';
import path from 'path';
import siteDataJson from '../../db.json' assert { type: 'json' };

// Static data backup
let siteData = siteDataJson;

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
    try {
      // Önce static data'yı döndür
      res.status(200).json(siteData);
    } catch (error) {
      console.error('GET Error:', error);
      res.status(500).json({ 
        message: 'Veriler okunamadı.', 
        error: error.message 
      });
    }
  } else if (req.method === 'POST') {
    // Site verilerini güncelle
    try {
      const { password, data } = req.body;
      if (password !== '12345') {
        return res.status(401).json({ message: 'Yetkisiz işlem' });
      }

      // Memory'de güncelle
      siteData = data;
      
      // Vercel'de file write denemeyin - read-only filesystem
      res.status(200).json({ message: 'Veriler başarıyla güncellendi! (Memory)' });
    } catch (error) {
      console.error('POST Error:', error);
      res.status(500).json({ 
        message: 'Veriler yazılamadı.', 
        error: error.message 
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
} 