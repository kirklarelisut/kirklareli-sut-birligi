// Tamamen hardcoded site data - hiç dependency yok
const siteData = {
  general: {
    siteName: "Kırklareli Süt Üreticileri Birliği",
    logoUrl: "/uploads/logo.png"
  },
  navigation: [
    { name: "Ana Sayfa", href: "#" },
    { 
      name: "Kurumsal", 
      href: "#",
      dropdown: [
        { name: "Hakkımızda", href: "#" },
        { name: "Yönetim Kurulu", href: "#" },
        { name: "Tüzük", href: "#" }
      ]
    },
    { name: "Hizmetlerimiz", href: "#" },
    { name: "Üyelik", href: "#" },
    { name: "Haberler", href: "#" },
    { name: "Galeri", href: "#" },
    { name: "İletişim", href: "#" }
  ],
  homepage: {
    hero: {
      title: "Kırklareli Süt Üreticileri Birliği",
      subtitle: "Kaliteli süt üretimi için bir aradayız",
      buttonText: "Detaylı Bilgi",
      imageUrl: "/uploads/hero.jpg"
    },
    services: [
      { title: "Süt Toplama", description: "Günlük süt toplama hizmeti" },
      { title: "Teknik Destek", description: "Hayvancılık desteği" },
      { title: "Eğitim", description: "Üretici eğitimleri" }
    ]
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
      console.log('GET request - returning siteData');
      return res.status(200).json(siteData);
    }

    if (req.method === 'POST') {
      console.log('POST request - simulated update');
      return res.status(200).json({ message: 'Data updated!' });
    }

    console.log('Unsupported method:', req.method);
    return res.status(405).json({ message: 'Method not allowed' });

  } catch (error) {
    console.error('Sitedata API error:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
} 