// EXACT COPY from db.json - tüm array field'lar dahil
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
        }
      ]
    },
    {
      "name": "Mevzuat",
      "href": "#",
      "dropdown": [
        {
          "name": "5200 Sayılı Üretici Birlikleri Kanunu",
          "href": "#"
        },
        {
          "name": "Üretici Birlikleri Tüzüğü",
          "href": "#"
        },
        {
          "name": "Destekleme Kararnameleri",
          "href": "#"
        }
      ]
    },
    {
      "name": "Galeri",
      "href": "#"
    },
    {
      "name": "Süt Toplama Merkezlerimiz",
      "href": "#"
    },
    {
      "name": "Üyelik İşlemleri",
      "href": "#"
    },
    {
      "name": "İletişim",
      "href": "#"
    }
  ],
  "collectionCenters": [
    {
      "id": "uuid1",
      "name": "Kırklareli Merkez Toplama",
      "address": "Sanayi Bölgesi, 1. Cadde No: 5, Merkez/Kırklareli",
      "contactPerson": "Hasan Veli",
      "phone": "0555 111 2233"
    },
    {
      "id": "uuid2", 
      "name": "Babaeski Soğutma Tankı",
      "address": "Gazi Kemal Mahallesi, Fatih Cad. No: 112, Babaeski/Kırklareli",
      "contactPerson": "Ayşe Güneş",
      "phone": "0555 222 3344"
    }
  ],
  "homepage": {
    "hero": {
      "title": "Üreticinin Gücü, Sektörün Geleceği",
      "subtitle": "Bölgemizdeki süt üreticilerinin haklarını korumak, üretim kalitesini ve verimliliği artırmak için çalışıyoruz.",
      "buttonText": "Bizimle İletişime Geçin",
      "imageUrl": "/uploads/image-1752259757636-20681881.png"
    },
    "stats": [
      {
        "value": "500+",
        "label": "Kayıtlı Üye"
      },
      {
        "value": "20 Ton",
        "label": "Günlük Toplanan Süt"
      },
      {
        "value": "19 Yıl",
        "label": "Sektörde Tecrübe"
      }
    ],
    "features": [
      {
        "title": "Kalite ve Denetim",
        "description": "Üyelerimizden toplanan sütün kalite standartlarını belirliyor ve denetliyoruz."
      },
      {
        "title": "Eğitim ve Danışmanlık", 
        "description": "Hayvan sağlığı, besleme ve modern çiftlik yönetimi konularında danışmanlık veriyoruz."
      },
      {
        "title": "Ortak Pazarlama",
        "description": "Üyelerimizin sütün en iyi koşullarda pazarlanması için çalışıyoruz."
      }
    ],
    "recentNews": {
      "title": "Birlikten Haberler"
    }
  },
  "about": {
    "title": "Misyon ve Vizyonumuz",
    "content": [
      "Kırklareli Süt Üreticileri Birliği, 5200 sayılı Tarımsal Üretici Birlikleri Kanunu kapsamında 2005 yılında kurulmuştur.",
      "Vizyonumuz; üretim kalitesini Avrupa Birliği standartlarına ulaştırmak ve rekabet edebilir konuma getirmektir."
    ],
    "imageUrl": "/uploads/image-1752261111057-586150913.png"
  },
  "boardMembers": [
    {
      "name": "Ahmet Yılmaz", 
      "title": "Yönetim Kurulu Başkanı",
      "imageUrl": "https://placehold.co/400x400/EFF6FF/1D4ED8?text=A.Y."
    },
    {
      "name": "Ayşe Kaya",
      "title": "Başkan Yardımcısı", 
      "imageUrl": "https://placehold.co/400x400/EFF6FF/1D4ED8?text=A.K."
    }
  ],
  "headlines": [
    {
      "id": 1,
      "title": "Yeni Soğuk Süt Tankı Desteği Başvuruları Başladı",
      "imageUrl": "https://images.unsplash.com/photo-1455278692843-63ddd00b2165",
      "isHeadline": true,
      "date": "2025-01-15",
      "summary": "2024 yılı soğuk süt tankı desteği başvuruları başlamıştır."
    }
  ],
  "gallery": [
    {
      "id": "uuid1",
      "src": "https://images.unsplash.com/photo-1455278692843-63ddd00b2165",
      "alt": "Galeri fotoğrafı"
    }
  ],
  "contact": {
    "branches": [
      {
        "name": "Merkez Şube",
        "address": "Kocahıdır Mah. Paşa Çeşme Cad. No:123, 39100 Merkez/Kırklareli",
        "phone": "0 (288) 123 45 67",
        "email": "bilgi@kirklarelisutbirlik.org.tr"
      }
    ]
  },
  "legal": {
    "law5200": {
      "title": "5200 Sayılı Üretici Birlikleri Kanunu",
      "content": [
        "5200 sayılı Tarımsal Üretici Birlikleri Hakkında Kanun 2004 yılında yürürlüğe girmiştir."
      ]
    }
  },
  "footer": {
    "copyright": "Kırklareli Süt Üreticileri Birliği. Tüm Hakları Saklıdır.",
    "socials": {
      "facebook": "https://facebook.com",
      "instagram": "https://instagram.com"
    }
  }
};

export default function handler(req, res) {
  console.log(`${req.method} /api/sitedata called`);
  
  try {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      console.log('OPTIONS request - returning 200');
      return res.status(200).end();
    }

    if (req.method === 'GET') {
      console.log('GET request - returning EXACT db.json structure');
      return res.status(200).json(siteData);
    }

    if (req.method === 'POST') {
      console.log('POST request - simulated update');
      return res.status(200).json({ message: 'Data updated!' });
    }

    return res.status(405).json({ message: 'Method not allowed' });

  } catch (error) {
    console.error('Sitedata API error:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
} 