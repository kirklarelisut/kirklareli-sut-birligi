// COMPLETE site data - tüm required fields
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
  },
  footer: {
    socials: {
      facebook: "https://facebook.com/kirklarelisut",
      instagram: "https://instagram.com/kirklarelisut", 
      twitter: "https://twitter.com/kirklarelisut"
    },
    contact: {
      address: "Kırklareli Merkez",
      phone: "+90 288 XXX XX XX",
      email: "info@kirklarelisutbirligi.com"
    }
  },
  about: {
    title: "Hakkımızda",
    content: ["Kırklareli Süt Üreticileri Birliği olarak üreticilerimize hizmet veriyoruz."]
  },
  board: {
    title: "Yönetim Kurulu",
    members: [
      { name: "Başkan", position: "Yönetim Kurulu Başkanı", image: "/uploads/member1.jpg" }
    ]
  },
  services: {
    title: "Hizmetlerimiz", 
    content: ["Süt toplama", "Teknik destek", "Eğitim programları"]
  },
  membership: {
    title: "Üyelik",
    content: ["Üyelik başvurusu için iletişime geçin."]
  },
  news: {
    title: "Haberler",
    items: [
      { title: "Örnek Haber", date: "2024-01-01", content: "Haber içeriği" }
    ]
  },
  gallery: {
    title: "Galeri",
    images: [
      { src: "/uploads/gallery1.jpg", alt: "Galeri 1" }
    ]
  },
  contact: {
    title: "İletişim",
    address: "Kırklareli Merkez",
    phone: "+90 288 XXX XX XX", 
    email: "info@kirklarelisutbirligi.com"
  },
  legal: {
    privacy: "Gizlilik politikası...",
    terms: "Kullanım şartları..."
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
      console.log('GET request - returning COMPLETE siteData');
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