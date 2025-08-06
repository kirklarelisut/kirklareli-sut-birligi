import siteDataJson from '../db.json';

// Çalışan data kopyası
let siteData = JSON.parse(JSON.stringify(siteDataJson));

export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      console.log('GET /api/sitedata - Success');
      return res.status(200).json(siteData);
    }

    if (req.method === 'POST') {
      const { password, data } = req.body || {};
      
      if (password !== '12345') {
        return res.status(401).json({ message: 'Yetkisiz işlem' });
      }

      // Memory'de update
      siteData = { ...data };
      console.log('POST /api/sitedata - Updated');
      return res.status(200).json({ message: 'Veriler başarıyla güncellendi!' });
    }

    return res.status(405).json({ message: 'Method not allowed' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      message: 'Sunucu hatası',
      error: error.message 
    });
  }
} 