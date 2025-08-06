// Site verileri için basit in-memory storage
const siteData = {
  "general": {
    "siteName": "Kırklareli Süt Üreticileri Birliği",
    "logoUrl": "/uploads/image-1752261076634-964726850.png"
  },
  "navigation": [
    {
      "name": "Ana Sayfa",
      "href": "#"
    },
    {
      "name": "Kurumsal",
      "href": "#",
      "dropdown": [
        {
          "name": "Hakkımızda",
          "href": "#"
        },
        {
          "name": "Yönetim Kurulu",
          "href": "#"
        },
        {
          "name": "Tüzük",
          "href": "#"
        }
      ]
    },
    {
      "name": "Hizmetlerimiz",
      "href": "#"
    },
    {
      "name": "Üyelik",
      "href": "#"
    },
    {
      "name": "Haberler",
      "href": "#"
    },
    {
      "name": "Galeri",
      "href": "#"
    },
    {
      "name": "İletişim",
      "href": "#"
    }
  ],
  "homepage": {
    "hero": {
      "title": "Kırklareli Süt Üreticileri Birliği",
      "subtitle": "Kaliteli süt üretimi ve güvenilir hizmet anlayışımızla üreticilerimizin yanındayız.",
      "buttonText": "Detaylı Bilgi",
      "imageUrl": "/uploads/image-1752261111057-586150913.png"
    },
    "services": [
      {
        "title": "Süt Toplama Hizmeti",
        "description": "Günlük süt toplama hizmetimizle üreticilerimizden kaliteli sütleri toplayıp işleme tesislerimize ulaştırıyoruz."
      },
      {
        "title": "Teknik Destek",
        "description": "Deneyimli teknik personelimizle üreticilerimize hayvancılık konusunda profesyonel destek sağlıyoruz."
      },
      {
        "title": "Eğitim Programları",
        "description": "Süt kalitesini artırmak ve verimli hayvancılık için düzenli eğitim programları düzenliyoruz."
      }
    ]
  }
};

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
      console.log('GET request received');
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
      console.log('POST request received');
      const { password, data } = req.body;
      if (password !== '12345') {
        return res.status(401).json({ message: 'Yetkisiz işlem' });
      }

      // Memory'de güncelle (geçici)
      Object.assign(siteData, data);
      
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