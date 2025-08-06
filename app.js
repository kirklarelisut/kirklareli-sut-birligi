import React, { useState, useEffect } from 'react';

// --- ICONS (SVG) ---
const MenuIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const XIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const PhoneIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const MailIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

const MapPinIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

const QualityIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
);

const SupportIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4m0 4h.01M21.17 13.17a2.39 2.39 0 0 0-3.38 0L12 19.5l-5.79-6.33a2.39 2.39 0 0 0-3.38 0 2.39 2.39 0 0 0 0 3.38L12 21l8.17-8.83a2.39 2.39 0 0 0 1-1.68c0-.63-.25-1.24-.7-1.72Z"/></svg>
);

const NetworkIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2Z"/><path d="M6 8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Z"/><path d="M12 14v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-2"/><path d="M12 14v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2"/><path d="M12 4V2"/><path d="M12 22v-2"/></svg>
);

// --- DEMO CONTENT (KURUMSAL - MAVİ/YEŞİL TEMA) ---
const siteData = {
  general: {
    siteName: "Kırklareli Süt Üreticileri Birliği",
    logoUrl: "https://placehold.co/180x50/3B82F6/FFFFFF?text=KIRKLARELİ+BİRLİK",
  },
  navigation: [
    { name: "Ana Sayfa", href: "#" },
    { name: "Hakkımızda", href: "#" },
    { name: "Yönetim Kurulu", href: "#" },
    { name: "Duyurular", href: "#" },
    { name: "Destekler", href: "#" },
    { name: "Galeri", href: "#" },
    { name: "Üyelik", href: "#" },
    { name: "İletişim", href: "#" },
  ],
  homepage: {
    hero: {
      title: "Üreticinin Gücü, Sektörün Geleceği",
      subtitle: "Bölgemizdeki süt üreticilerinin haklarını korumak, üretim kalitesini ve verimliliği artırmak, ürünlerin pazarlanmasında ortak çözümler sunmak için çalışıyoruz.",
      buttonText: "Üyelik ve Avantajlar",
      imageUrl: "https://images.unsplash.com/photo-1599057108105-4f73356e616e?q=80&w=1974&auto=format&fit=crop",
    },
    stats: [
        { value: "500+", label: "Kayıtlı Üye" },
        { value: "20 Ton", label: "Günlük Toplanan Süt" },
        { value: "19 Yıl", label: "Sektörde Tecrübe" },
    ],
    features: [
      { title: "Kalite ve Denetim", description: "Üyelerimizden toplanan sütün kalite standartlarını belirliyor, laboratuvar analizleri ile denetliyor ve sütün değerinde satılmasına öncülük ediyoruz.", icon: <QualityIcon className="text-green-600"/> },
      { title: "Eğitim ve Danışmanlık", description: "Hayvan sağlığı, besleme ve modern çiftlik yönetimi konularında teknik danışmanlık ve eğitimler düzenliyor, hibe programlarına erişimi kolaylaştırıyoruz.", icon: <SupportIcon className="text-green-600"/> },
      { title: "Ortak Pazarlama", description: "Üyelerimizin ürettiği sütün en iyi koşullarda pazarlanması için sanayicilerle güçlü ilişkiler kuruyor ve ortak stratejiler geliştiriyoruz.", icon: <NetworkIcon className="text-green-600"/> },
    ],
    recentNews: {
        title: "Birlikten Haberler",
    }
  },
  about: {
    title: "Misyon ve Vizyonumuz",
    content: [
      "Kırklareli Süt Üreticileri Birliği, 5200 sayılı Tarımsal Üretici Birlikleri Kanunu kapsamında, bölgedeki süt üreticilerini tek çatı altında toplayarak onların ekonomik ve sosyal menfaatlerini korumak, mesleki faaliyetlerini kolaylaştırmak ve ürünlerini daha iyi değerlendirmek amacıyla 2005 yılında kurulmuştur.",
      "Vizyonumuz; üyelerimizin ürettiği sütün kalitesini Avrupa Birliği standartlarına ulaştırmak, sürdürülebilir ve karlı bir üretim modeli oluşturmalarına destek olmak, Kırklareli hayvancılığını ulusal ve uluslararası düzeyde rekabet edebilir bir konuma getirmektir. Şeffaflık, adalet ve üye memnuniyeti temel ilkelerimizdir."
    ],
    imageUrl: "https://images.unsplash.com/photo-1570122249903-6036154c5a32?q=80&w=1964&auto=format&fit=crop",
  },
  boardMembers: [
    { name: "Ahmet Yılmaz", title: "Yönetim Kurulu Başkanı", imageUrl: "https://placehold.co/400x400/EFF6FF/1D4ED8?text=A.Y." },
    { name: "Ayşe Kaya", title: "Başkan Yardımcısı", imageUrl: "https://placehold.co/400x400/EFF6FF/1D4ED8?text=A.K." },
    { name: "Mehmet Öztürk", title: "Muhasip Üye", imageUrl: "https://placehold.co/400x400/EFF6FF/1D4ED8?text=M.Ö." },
    { name: "Fatma Demir", title: "Sekreter Üye", imageUrl: "https://placehold.co/400x400/EFF6FF/1D4ED8?text=F.D." },
    { name: "Hasan Çelik", title: "Yönetim Kurulu Üyesi", imageUrl: "https://placehold.co/400x400/EFF6FF/1D4ED8?text=H.Ç." },
    { name: "Zeynep Arslan", title: "Yönetim Kurulu Üyesi", imageUrl: "https://placehold.co/400x400/EFF6FF/1D4ED8?text=Z.A." },
  ],
  news: [
    { id: 1, title: "Yeni Soğuk Süt Tankı Desteği Başvuruları Başladı", date: "11.07.2025", summary: "Tarım ve Orman Bakanlığı'nın yeni hibe programı kapsamında, birlik üyelerimize özel soğuk süt tankı desteği sağlanacaktır. Son başvuru tarihi 30 Ağustos.", imageUrl: "https://images.unsplash.com/photo-1455278692843-63ddd00b2165?q=80&w=2070&auto=format&fit=crop" },
    { id: 2, title: "Birlik Genel Kurul Toplantısı Gerçekleştirildi", date: "21.06.2025", summary: "2025 yılı olağan genel kurul toplantımız, üyelerimizin yoğun katılımıyla birlik merkezimizde yapıldı. Yeni dönem kararları oy birliği ile alındı.", imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop" },
    { id: 3, title: "Buzağı Desteklemeleri İçin Bilgilendirme Toplantısı", date: "15.05.2025", summary: "2025 yılı buzağı desteklemeleri hakkında üyelerimizi bilgilendirmek amacıyla ziraat mühendislerimizin katılımıyla bir seminer düzenlenecektir.", imageUrl: "https://images.unsplash.com/photo-1600953149503-45f6b15b4a69?q=80&w=2070&auto=format&fit=crop" },
  ],
  supports: {
      title: "Üyelerimize Sağlanan Destekler ve Hibeler",
      description: "Birliğimiz, üyelerinin üretim kapasitelerini ve kalitelerini artırmaları için çeşitli kamu ve özel sektör destek programlarına erişimlerini kolaylaştırır. Aşağıda güncel destek programları hakkında bilgi bulabilirsiniz.",
      supportList: [
          { title: "Genç Çiftçi Hibe Programı", details: "30 yaş altı genç çiftçilere yönelik, hayvan alımı ve ahır modernizasyonu için sağlanan geri ödemesiz destekler." },
          { title: "Yem Bitkileri Desteği", details: "Kaliteli kaba yem üretimi için yonca, mısır silajı gibi yem bitkilerinin ekimini teşvik eden destek programı." },
          { title: "Ekipman ve Makine Desteği", details: "Süt sağım makineleri, yem karma makineleri gibi modern tarım aletlerinin alımında %50'ye varan hibe imkanı." },
          { title: "Organik Tarım Desteği", details: "Organik süt üretimi yapan veya yapmak isteyen üyelerimize yönelik özel sertifikasyon ve pazarlama destekleri." }
      ]
  },
  gallery: [
    { src: "https://images.unsplash.com/photo-1563514255355-8c5839e7a7a3?q=80&w=2070&auto=format&fit=crop", alt: "Birlik üyesi çiftlikten bir görünüm" },
    { src: "https://images.unsplash.com/photo-1455278692843-63ddd00b2165?q=80&w=2070&auto=format&fit=crop", alt: "Modern süt sağım ünitesi" },
    { src: "https://images.unsplash.com/photo-1556761175-b413da4b248a?q=80&w=1974&auto=format&fit=crop", alt: "Üyelere yönelik eğitim toplantısı" },
    { src: "https://images.unsplash.com/photo-1584910309923-018788a1011a?q=80&w=1998&auto=format&fit=crop", alt: "Yem bitkisi ekili tarla" },
    { src: "https://images.unsplash.com/photo-1559591637-2835f3a0a1a3?q=80&w=2070&auto=format&fit=crop", alt: "Kalite kontrol için alınan süt numunesi" },
    { src: "https://images.unsplash.com/photo-1516285589-727225187422?q=80&w=2070&auto=format&fit=crop", alt: "Birlik yönetimi toplantısı" },
    { src: "https://images.unsplash.com/photo-1564562333499-f203493e8eab?q=80&w=1974&auto=format&fit=crop", alt: "Kırklareli'nden bir tarım arazisi manzarası" },
    { src: "https://images.unsplash.com/photo-1600953149503-45f6b15b4a69?q=80&w=2070&auto=format&fit=crop", alt: "Sağlıklı bir buzağı" },
  ],
  contact: {
    address: "Kocahıdır Mah. Paşa Çeşme Cad. No:123, 39100 Merkez/Kırklareli",
    phone: "0 (288) 123 45 67",
    email: "bilgi@kirklarelisutbirlik.org.tr",
  },
  footer: {
      copyright: `© ${new Date().getFullYear()} Kırklareli Süt Üreticileri Birliği. Tüm Hakları Saklıdır.`
  }
};

// --- Page Components ---

const PageHeader = ({ title, subtitle }) => (
    <div className="bg-gray-100 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl" style={{fontFamily: "'Merriweather', serif"}}>{title}</h1>
            {subtitle && <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
        </div>
    </div>
);

const HomePage = ({ data, onNavigate }) => (
  <>
    {/* Hero Section */}
    <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20 md:py-32">
                <div className="text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900" style={{fontFamily: "'Merriweather', serif"}}>
                        {data.hero.title}
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
                        {data.hero.subtitle}
                    </p>
                    <div className="mt-10">
                        <button onClick={() => onNavigate('Üyelik')} className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-full text-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            {data.hero.buttonText}
                        </button>
                    </div>
                </div>
                <div className="flex justify-center">
                    <img src={data.hero.imageUrl} alt="Kırklareli'de tarım" className="rounded-3xl shadow-2xl w-full max-w-md object-cover"/>
                </div>
            </div>
        </div>
    </div>

    {/* Stats Section */}
    <div className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center py-12">
                {data.stats.map(stat => (
                    <div key={stat.label}>
                        <p className="text-4xl font-bold">{stat.value}</p>
                        <p className="text-lg text-blue-200">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>


    {/* Features Section */}
    <div className="bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {data.features.map((feature, index) => (
            <div key={index} className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 transition-shadow duration-300">
              <div className="flex justify-center items-center h-20 w-20 mx-auto bg-green-100 rounded-full mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2" style={{fontFamily: "'Merriweather', serif"}}>{feature.title}</h3>
              <p className="text-base text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Recent News Section */}
    <div className="bg-gray-50 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12" style={{fontFamily: "'Merriweather', serif"}}>{data.recentNews.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {siteData.news.slice(0, 3).map(item => (
                    <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
                        <div className="overflow-hidden">
                            <img className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300" src={item.imageUrl} alt={item.title} />
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                            <h3 className="font-bold text-lg text-gray-800 mb-3 h-16" style={{fontFamily: "'Merriweather', serif"}}>{item.title}</h3>
                            <button onClick={() => onNavigate('Duyurular')} className="font-semibold text-blue-600 hover:text-blue-700 transition">Detaylı Bilgi →</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-16">
                <button onClick={() => onNavigate('Duyurular')} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors">
                    Tüm Haberler
                </button>
            </div>
        </div>
    </div>
  </>
);

const AboutPage = ({ data }) => (
  <>
    <PageHeader title={data.title} />
    <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                    {data.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                </div>
                <div className="order-first md:order-last">
                    <img className="rounded-2xl shadow-xl" src={data.imageUrl} alt="Hakkımızda görseli"/>
                </div>
            </div>
        </div>
    </div>
  </>
);

const BoardPage = ({ members }) => (
    <>
        <PageHeader title="Yönetim Kurulumuz" subtitle="Birliğimizin başarısı için çalışan değerli ekibimiz." />
        <div className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {members.map(member => (
                        <div key={member.name} className="text-center bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
                            <img className="w-44 h-44 rounded-full mx-auto mb-5 object-cover ring-4 ring-white" src={member.imageUrl} alt={member.name} />
                            <h3 className="text-xl font-bold text-gray-900" style={{fontFamily: "'Merriweather', serif"}}>{member.name}</h3>
                            <p className="text-blue-600 font-semibold">{member.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
);

const NewsPage = ({ news }) => (
    <>
        <PageHeader title="Duyurular & Haberler" />
        <div className="bg-white py-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-16">
                    {news.map(item => (
                        <div key={item.id} className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                            <div className="md:col-span-2">
                                <img className="rounded-2xl shadow-lg w-full h-auto object-cover" src={item.imageUrl} alt={item.title} />
                            </div>
                            <div className="md:col-span-3">
                                <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3" style={{fontFamily: "'Merriweather', serif"}}>{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.summary}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
);

const SupportsPage = ({ data }) => (
    <>
        <PageHeader title={data.title} subtitle={data.description} />
        <div className="bg-white py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-8">
                    {data.supportList.map((support, index) => (
                        <div key={index} className="bg-green-50 p-8 rounded-2xl border-l-4 border-green-500">
                            <h3 className="text-xl font-bold text-green-900" style={{fontFamily: "'Merriweather', serif"}}>{support.title}</h3>
                            <p className="mt-2 text-gray-700 leading-relaxed">{support.details}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
);

const GalleryPage = ({ images }) => (
    <>
        <PageHeader title="Fotoğraf Galerisi" />
        <div className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                        <div key={index} className="overflow-hidden rounded-xl shadow-lg aspect-w-1 aspect-h-1 group">
                            <img src={image.src} alt={image.alt} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
);

const FormField = ({ label, type = 'text', name, placeholder, required = true }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input type={type} name={name} id={name} placeholder={placeholder} required={required} className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
    </div>
);

const MembershipPage = () => (
    <>
        <PageHeader title="Üyelik Başvuru Formu" />
        <div className="bg-white py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gray-50 p-8 sm:p-12 rounded-2xl shadow-lg">
                    <p className="text-gray-600 mb-8 text-center">Birliğimize üye olarak avantajlarımızdan yararlanmak için lütfen aşağıdaki formu eksiksiz doldurunuz. Başvurunuz incelendikten sonra sizinle iletişime geçilecektir.</p>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField label="Adınız" name="firstname" placeholder="Ahmet" />
                            <FormField label="Soyadınız" name="lastname" placeholder="Yılmaz" />
                        </div>
                        <FormField label="T.C. Kimlik Numarası" name="tcno" placeholder="12345678901" />
                        <FormField label="Telefon Numaranız" name="phone" type="tel" placeholder="0 (5xx) xxx xx xx" />
                        <FormField label="E-posta Adresiniz" name="email" type="email" placeholder="ornek@mail.com" required={false} />
                        <FormField label="İkametgah Adresiniz" name="address" placeholder="Mahalle, cadde, sokak, no..." />
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Eklemek İstedikleriniz (varsa)</label>
                            <textarea id="message" name="message" rows="4" className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Hayvan sayınız, günlük süt miktarınız vb. bilgileri ekleyebilirsiniz."></textarea>
                        </div>
                        <div className="text-right pt-4">
                            <button type="submit" className="inline-flex justify-center py-3 px-8 border border-transparent shadow-md text-base font-medium rounded-full text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition">
                                Başvuruyu Gönder
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
);


const ContactPage = ({ contact }) => (
    <>
        <PageHeader title="Bizimle İletişime Geçin" />
        <div className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info & Map */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-gray-800" style={{fontFamily: "'Merriweather', serif"}}>İletişim Bilgilerimiz</h2>
                        <div className="flex items-start space-x-4">
                            <MapPinIcon className="h-7 w-7 text-blue-600 mt-1 flex-shrink-0" />
                            <p className="text-lg text-gray-600">{contact.address}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <PhoneIcon className="h-6 w-6 text-blue-600" />
                            <p className="text-lg text-gray-600">{contact.phone}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <MailIcon className="h-6 w-6 text-blue-600" />
                            <p className="text-lg text-gray-600">{contact.email}</p>
                        </div>
                         <div className="pt-6">
                            <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-lg">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48205.28825601134!2d27.187313848632808!3d41.734027400000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b30c1312f45599%3A0x4a4f354366052f75!2sK%C4%B1rklareli%2C%20K%C4%B1rklareli%20Merkez%2FK%C4%B1rklareli!5e0!3m2!1str!2str!4v1689456789123!5m2!1str!2str" 
                                    width="100%" 
                                    height="100%" 
                                    style={{border:0}} 
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade">
                                </iframe>
                            </div>
                        </div>
                    </div>
                    {/* Contact Form */}
                    <div className="bg-gray-50 p-8 sm:p-12 rounded-2xl shadow-lg">
                         <h2 className="text-3xl font-bold text-gray-800 mb-8" style={{fontFamily: "'Merriweather', serif"}}>Bize Mesaj Gönderin</h2>
                         <form className="space-y-6">
                            <FormField label="Adınız Soyadınız" name="fullname" placeholder="Adınız Soyadınız" />
                            <FormField label="E-posta Adresiniz" name="contact_email" type="email" placeholder="ornek@mail.com" />
                            <FormField label="Konu" name="subject" placeholder="Mesajınızın konusu" />
                            <div>
                                <label htmlFor="contact_message" className="block text-sm font-medium text-gray-700 mb-1">Mesajınız</label>
                                <textarea id="contact_message" name="contact_message" rows="5" className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Mesajınızı buraya yazın..."></textarea>
                            </div>
                            <div className="text-right pt-4">
                                <button type="submit" className="inline-flex justify-center py-3 px-8 border border-transparent shadow-md text-base font-medium rounded-full text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition">
                                    Mesajı Gönder
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
);


// --- Main App Component ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('Ana Sayfa');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sayfa değiştiğinde mobil menüyü kapat ve en üste scroll yap
  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'Ana Sayfa':
        return <HomePage data={siteData.homepage} onNavigate={setCurrentPage} />;
      case 'Hakkımızda':
        return <AboutPage data={siteData.about} />;
      case 'Yönetim Kurulu':
        return <BoardPage members={siteData.boardMembers} />;
      case 'Duyurular':
        return <NewsPage news={siteData.news} />;
      case 'Destekler':
        return <SupportsPage data={siteData.supports} />;
      case 'Galeri':
        return <GalleryPage images={siteData.gallery} />;
      case 'Üyelik':
        return <MembershipPage />;
      case 'İletişim':
        return <ContactPage contact={siteData.contact} />;
      default:
        return <HomePage data={siteData.homepage} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="bg-white" style={{fontFamily: "'Lato', sans-serif"}}>
      {/* Google Fonts Import */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Lato:wght@400;700&display=swap');
        `}
      </style>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#" onClick={() => setCurrentPage('Ana Sayfa')} className="block">
                <img className="h-12 w-auto" src={siteData.general.logoUrl} alt={siteData.general.siteName} />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {siteData.navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); setCurrentPage(item.name); }}
                  className={`font-semibold transition-colors pb-1 ${currentPage === item.name ? 'text-blue-600 border-b-2 border-green-500' : 'text-gray-700 hover:text-blue-600'}`}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-blue-600 focus:outline-none">
                <span className="sr-only">Menüyü aç</span>
                {isMenuOpen ? <XIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {siteData.navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); setCurrentPage(item.name); }}
                  className={`block px-3 py-3 rounded-md text-base font-semibold transition-colors ${currentPage === item.name ? 'bg-green-100 text-green-800' : 'text-gray-700 hover:bg-green-50'}`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* About */}
                <div className="md:col-span-1 lg:col-span-2">
                    <img src={siteData.general.logoUrl} alt={siteData.general.siteName} className="h-10 mb-4" />
                    <p className="text-gray-400 text-base leading-relaxed max-w-sm">Kırklareli Süt Üreticileri Birliği olarak, üyelerimizin gücünü birleştirerek sektörün gelişimine öncülük ediyoruz.</p>
                </div>
                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold tracking-wider" style={{fontFamily: "'Merriweather', serif"}}>Hızlı Erişim</h3>
                    <ul className="mt-4 space-y-2">
                        {siteData.navigation.map(item => (
                            <li key={item.name}>
                                <a href="#" onClick={e => {e.preventDefault(); setCurrentPage(item.name)}} className="text-base text-gray-300 hover:text-white transition-colors">{item.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Contact */}
                <div>
                    <h3 className="text-lg font-semibold tracking-wider" style={{fontFamily: "'Merriweather', serif"}}>İletişim</h3>
                    <ul className="mt-4 space-y-4 text-base text-gray-300">
                        <li className="flex items-start"><MapPinIcon className="h-5 w-5 mr-3 mt-1 flex-shrink-0" /><span>{siteData.contact.address}</span></li>
                        <li className="flex items-start"><PhoneIcon className="h-5 w-5 mr-3 mt-1 flex-shrink-0" /><span>{siteData.contact.phone}</span></li>
                        <li className="flex items-start"><MailIcon className="h-5 w-5 mr-3 mt-1 flex-shrink-0" /><span>{siteData.contact.email}</span></li>
                    </ul>
                </div>
            </div>
            <div className="mt-16 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
                <p>{siteData.footer.copyright}</p>
            </div>
        </div>
      </footer>
    </div>
  );
}
