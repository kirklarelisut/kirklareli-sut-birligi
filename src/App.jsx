import React, { useState, useEffect } from 'react';
// Swiper.js importları
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';


import AdminPage from './pages/AdminPage';
import ComingSoonModal from './components/ComingSoonModal';

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

const ChevronDownIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

const FacebookIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const InstagramIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);


// --- Page Components ---

const PageHeader = ({ title, subtitle }) => (
    <div className="bg-gray-100 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl" style={{fontFamily: "'Merriweather', serif"}}>{title}</h1>
            {subtitle && <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
        </div>
    </div>
);

const HomePage = ({ news, onNavigate }) => {
    const headlineNews = (news || []).filter(item => item.isHeadline);

    // Fallback haber - eğer hiç haber yoksa
    const fallbackNews = {
        id: 'fallback',
        title: 'Kırklareli Süt Üreticileri Birliği',
        summary: 'Üreticilerin güçlenmesi ve sektörün gelişimi için çalışıyoruz. Modern teknoloji ve kaliteli üretim ile geleceğe yürüyoruz.',
        imageUrl: 'https://images.unsplash.com/photo-1455278692843-63ddd00b2165?q=80&w=2070&auto=format&fit=crop',
        date: null
    };

    const displayNews = headlineNews.length > 0 ? headlineNews : [fallbackNews];

    return (
        <div className="bg-gray-100 min-h-[calc(100vh-6rem)] flex items-center justify-center py-12">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative h-[60vh] w-full shadow-2xl rounded-lg overflow-hidden border-4 border-white">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay, EffectFade]}
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                            renderBullet: function (index, className) {
                                return '<span class="' + className + ' !bg-white !w-3 !h-3">' + '</span>';
                            },
                        }}
                        loop={displayNews.length > 1}
                        autoplay={displayNews.length > 1 ? {
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        } : false}
                        effect="fade"
                        fadeEffect={{
                            crossFade: true
                        }}
                        className="h-full w-full"
                    >
                        {displayNews.map(item => (
                             <SwiperSlide key={item.id}>
                                <div className="relative h-full w-full">
                                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover"/>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end">
                                        <div className="w-full p-6 md:p-8 text-white">
                                            <div className="max-w-4xl">
                                                {item.date && (
                                                    <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">
                                                        {new Date(item.date).toLocaleDateString('tr-TR', { 
                                                            day: 'numeric', 
                                                            month: 'long', 
                                                            year: 'numeric' 
                                                        })}
                                                    </span>
                                                )}
                                                <h2 
                                                    className="text-2xl md:text-4xl font-bold mb-3 cursor-pointer hover:text-blue-300 transition-colors leading-tight"
                                                    onClick={() => onNavigate('Duyurular')}
                                                    style={{fontFamily: "'Merriweather', serif"}}
                                                >
                                                    {item.title}
                                                </h2>
                                                {item.summary && (
                                                    <p className="text-gray-100 text-lg md:text-xl leading-relaxed max-w-3xl">
                                                        {item.summary}
                                                    </p>
                                                )}
                                                <button
                                                    onClick={() => onNavigate('Duyurular')}
                                                    className="mt-4 inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                                >
                                                    Detayları Gör
                                                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};


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

const GalleryPage = ({ images }) => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setIsLightboxOpen(true);
    };

    const closeLightbox = () => {
        setIsLightboxOpen(false);
    };

    const showNext = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const showPrev = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };


    return (
        <>
            <PageHeader title="Fotoğraf Galerisi" />
            <div className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {images.map((image, index) => (
                            <div key={image.id || index} onClick={() => openLightbox(index)} className="group cursor-pointer">
                                <div className="overflow-hidden rounded-xl shadow-lg">
                                    <img src={image.src} alt={image.alt} className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <p className="text-sm text-gray-700 mt-2 truncate group-hover:text-blue-600">{image.alt}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isLightboxOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={closeLightbox}>
                    <button onClick={showPrev} className="absolute left-4 text-white text-5xl p-4 focus:outline-none">&lsaquo;</button>
                    <div className="text-center">
                        <img src={images[currentImageIndex].src} alt={images[currentImageIndex].alt} className="max-w-[90vw] max-h-[80vh] object-contain" />
                        <p className="text-white text-lg mt-4">{images[currentImageIndex].alt}</p>
                    </div>
                    <button onClick={showNext} className="absolute right-4 text-white text-5xl p-4 focus:outline-none">&rsaquo;</button>
                </div>
            )}
        </>
    )
};

const CollectionCentersPage = ({ centers }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const filteredCenters = centers.filter(center => 
        center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        center.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        center.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCenters.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredCenters.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <PageHeader title="Süt Toplama Merkezlerimiz" subtitle="Size en yakın toplama merkezimizi bulmak için arama yapabilirsiniz." />
            <div className="bg-white py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="mb-8">
                        <input 
                            type="text"
                            placeholder="Merkez adı, ilçe veya yetkili adı ile arayın..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {currentItems.map(center => (
                            <div key={center.id} className="bg-gray-50 p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{center.name}</h3>
                                <p className="text-gray-600 flex items-start mb-2 min-h-[60px]"><MapPinIcon className="h-5 w-5 mr-3 mt-1 flex-shrink-0 text-gray-400" />{center.address}</p>
                                <p className="text-gray-600 flex items-center"><PhoneIcon className="h-5 w-5 mr-3 flex-shrink-0 text-gray-400" />{center.contactPerson} - {center.phone}</p>
                            </div>
                        ))}
                    </div>
                    
                    {totalPages > 1 && (
                        <div className="mt-12 flex justify-center items-center space-x-2">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => paginate(i + 1)}
                                    className={`py-2 px-4 rounded-md text-sm font-medium ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </>
    );
};


const ContactPage = ({ contact }) => (
    <>
        <PageHeader title="Bizimle İletişime Geçin" />
        <div className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {contact.branches.map((branch, index) => (
                        <div key={branch.name} className="space-y-8">
                            <h2 className="text-3xl font-bold text-gray-800" style={{fontFamily: "'Merriweather', serif"}}>{branch.name}</h2>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <MapPinIcon className="h-7 w-7 text-blue-600 mt-1 flex-shrink-0" />
                                    <p className="text-lg text-gray-600">{branch.address}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <PhoneIcon className="h-6 w-6 text-blue-600" />
                                    <p className="text-lg text-gray-600">{branch.phone}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <MailIcon className="h-6 w-6 text-blue-600" />
                                    <p className="text-lg text-gray-600">{branch.email}</p>
                                </div>
                            </div>
                            <div className="pt-6">
                                <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-lg h-64">
                                    <iframe 
                                        src={branch.mapUrl}
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
                    ))}
                </div>
            </div>
        </div>
    </>
);

// Mevzuat sayfaları
const LawPage = ({ data }) => (
    <>
        <PageHeader title={data?.title || "5200 Sayılı Üretici Birlikleri Kanunu"} />
        <div className="bg-white py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="prose prose-lg max-w-none">
                    {data?.content?.map((paragraph, index) => (
                        <p key={index} className="text-lg text-gray-700 leading-relaxed mt-6 first:mt-0">
                            {paragraph}
                        </p>
                    ))}
                    {data?.downloadUrl && (
                        <div className="mt-8">
                            <a 
                                href={data.downloadUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Kanun Metnini İndir
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </>
);

const RegulationPage = ({ data }) => (
    <>
        <PageHeader title={data?.title || "Üretici Birlikleri Tüzüğü"} />
        <div className="bg-white py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="prose prose-lg max-w-none">
                    {data?.content?.map((paragraph, index) => (
                        <p key={index} className="text-lg text-gray-700 leading-relaxed mt-6 first:mt-0">
                            {paragraph}
                        </p>
                    ))}
                    {data?.downloadUrl && (
                        <div className="mt-8">
                            <a 
                                href={data.downloadUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Tüzük Metnini İndir
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </>
);

const SupportDecreesPage = ({ data }) => (
    <>
        <PageHeader title={data?.title || "Destekleme Kararnameleri"} />
        <div className="bg-white py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-8">
                    {data?.content?.map((decree, index) => (
                        <div key={index} className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{decree.title}</h3>
                            <ul className="space-y-3 text-gray-700">
                                {decree.items?.map((item, itemIndex) => (
                                    <li key={itemIndex}>• {item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    {data?.downloadUrl && data.downloadUrl !== '#' && (
                        <div className="mt-8">
                            <a 
                                href={data.downloadUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Tüm Kararnameleri İndir
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </>
);

const MembershipPage = () => (
    <>
        <PageHeader title="Üyelik İşlemleri" />
        <div className="bg-white py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900">Üyelik Şartları</h2>
                        <ul className="space-y-3 text-gray-700">
                            <li>• Kırklareli ili sınırları içinde süt üretimi yapıyor olmak</li>
                            <li>• En az 5 baş süt ineğine sahip olmak</li>
                            <li>• Hayvancılık ruhsatına sahip olmak</li>
                            <li>• Veteriner hekim kontrolü belgesi</li>
                        </ul>
                        
                        <h3 className="text-xl font-bold text-gray-900 mt-8">Gerekli Belgeler</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li>• Kimlik fotokopisi</li>
                            <li>• İkametgah belgesi</li>
                            <li>• Hayvancılık ruhsatı</li>
                            <li>• Veteriner raporu</li>
                            <li>• 2 adet vesikalık fotoğraf</li>
                        </ul>
                    </div>
                    
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900">Üye Avantajları</h2>
                        <ul className="space-y-3 text-gray-700">
                            <li>• Garantili süt alımı</li>
                            <li>• Piyasa ortalamasının üzerinde fiyat</li>
                            <li>• Teknik danışmanlık hizmetleri</li>
                            <li>• Eğitim programları</li>
                            <li>• Veteriner hekim desteği</li>
                            <li>• Hibe programlarına öncelikli erişim</li>
                        </ul>
                        
                        <div className="bg-blue-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">Başvuru İçin</h3>
                            <p className="text-blue-800">
                                Birlik merkezimizi ziyaret ederek üyelik başvuru formunu doldurabilir 
                                veya telefonla randevu alarak bilgi alabilirsiniz.
                            </p>
                        </div>
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
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdowns, setMobileDropdowns] = useState({});

  // Verileri backend'den çek
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Production ve development için farklı endpoint'ler
        const apiUrl = process.env.NODE_ENV === 'production' 
          ? './api.php' 
          : 'http://localhost:3008/api/sitedata';
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSiteData(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  // Sayfa değiştiğinde mobil menüyü kapat ve en üste scroll yap
  useEffect(() => {
    if(!loading) { // Sadece ilk yükleme bittikten sonra çalışsın
        setIsMenuOpen(false);
        setMobileDropdowns({});
        setActiveDropdown(null);
        window.scrollTo(0, 0);
    }
  }, [currentPage, loading]);

  // Dropdown'ları kapatmak için click event listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container') && !event.target.closest('.dropdown-menu')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'Ana Sayfa':
        return <HomePage news={siteData.headlines} onNavigate={setCurrentPage} />;
      case 'Hakkımızda':
        return <AboutPage data={siteData.about} />;
      case 'Yönetim Kurulu':
        return <BoardPage members={siteData.boardMembers} />;
      case '5200 Sayılı Üretici Birlikleri Kanunu':
        return <LawPage data={siteData?.legal?.law5200} />;
      case 'Üretici Birlikleri Tüzüğü':
        return <RegulationPage data={siteData?.legal?.regulation} />;
      case 'Destekleme Kararnameleri':
        return <SupportDecreesPage data={siteData?.legal?.supportDecrees} />;
      case 'Galeri':
        return <GalleryPage images={siteData.gallery} />;
      case 'Süt Toplama Merkezlerimiz':
        return <CollectionCentersPage centers={siteData.collectionCenters} />;
      case 'Üyelik İşlemleri':
        return <MembershipPage />;
      case 'İletişim':
        return <ContactPage contact={siteData.contact} />;
      default:
        return <HomePage news={siteData.headlines} onNavigate={setCurrentPage} />;
    }
  };
  
  const handleSaveData = async (newData) => {
    try {
      // Production ve development için farklı endpoint'ler
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? './api.php' 
        : 'http://localhost:3008/api/sitedata';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(process.env.NODE_ENV === 'production' ? newData : { password: '12345', data: newData }),
      });
      if (!response.ok) {
        throw new Error('Kaydetme başarısız oldu.');
      }
      // Veriyi yeniden çekerek state'i güncelle
      const updatedData = await response.json();
      setSiteData(newData); // Optimistic update
      alert('Veriler başarıyla kaydedildi!');
      return updatedData;
    } catch (error) {
      alert(error.message);
      throw error;
    }
  };

  if (currentPage === 'Admin') {
    return <AdminPage data={siteData} onSave={handleSaveData} />;
  }


  if (loading) {
    return <div className="flex justify-center items-center h-screen text-2xl">İçerik Yükleniyor...</div>;
  }

  if (error) {
    return <div className="flex flex-col justify-center items-center h-screen text-red-600">
        <h2 className="text-2xl mb-4">Bir Hata Oluştu</h2>
        <p>Veriler sunucudan alınamadı.</p>
        <p className="text-sm mt-2">Lütfen backend sunucusunun çalıştığından emin olun.</p>
        <pre className="mt-4 bg-gray-100 p-4 rounded text-sm">{error}</pre>
    </div>;
  }


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
                <img className="h-16 w-auto" src={siteData.general.logoUrl.startsWith('http') ? siteData.general.logoUrl : `http://localhost:3008${siteData.general.logoUrl}`} alt={siteData.general.siteName} />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {siteData.navigation.map((item) => (
                <div 
                  key={item.name} 
                  className="relative dropdown-container"
                >
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        className={`font-semibold transition-colors px-4 py-2 rounded-md flex items-center gap-1 ${
                          item.dropdown.some(sub => sub.name === currentPage) ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                      >
                        {item.name}
                        <ChevronDownIcon className={`transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      {activeDropdown === item.name && (
                        <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-[60] dropdown-menu">
                          {item.dropdown.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              onClick={(e) => { 
                                e.preventDefault(); 
                                e.stopPropagation();
                                setCurrentPage(subItem.name);
                                setActiveDropdown(null);
                              }}
                              className={`block px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-50 ${
                                currentPage === subItem.name ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-blue-600'
                              }`}
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => { e.preventDefault(); setCurrentPage(item.name); }}
                      className={`font-semibold transition-colors px-4 py-2 rounded-md ${currentPage === item.name ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
                className="font-semibold text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Borç Sorgula / Öde
              </a>
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
                <div key={item.name}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => {
                          setMobileDropdowns(prev => ({
                            ...prev,
                            [item.name]: !prev[item.name]
                          }));
                        }}
                        className={`w-full flex items-center justify-between px-3 py-3 rounded-md text-base font-semibold transition-colors ${
                          item.dropdown.some(sub => sub.name === currentPage) ? 'bg-green-100 text-green-800' : 'text-gray-700 hover:bg-green-50'
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDownIcon 
                          className={`transition-transform duration-200 ${mobileDropdowns[item.name] ? 'rotate-180' : ''}`} 
                        />
                      </button>
                      {mobileDropdowns[item.name] && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.dropdown.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              onClick={(e) => { 
                                e.preventDefault(); 
                                setCurrentPage(subItem.name);
                                setMobileDropdowns({});
                              }}
                              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                currentPage === subItem.name ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                              }`}
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => { e.preventDefault(); setCurrentPage(item.name); }}
                      className={`block px-3 py-3 rounded-md text-base font-semibold transition-colors ${currentPage === item.name ? 'bg-green-100 text-green-800' : 'text-gray-700 hover:bg-green-50'}`}
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
               <a
                href="#"
                onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
                className="block px-3 py-3 rounded-md text-base font-semibold text-white bg-blue-600 hover:bg-blue-700"
              >
                Borç Sorgula / Öde
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        {renderPage()}
      </main>

      <ComingSoonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Footer */}
      <footer className="bg-gray-800 text-white border-t-4 border-blue-500">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Logo & Socials */}
                <div className="md:col-span-4">
                    <img src={siteData.general.logoUrl.startsWith('http') ? siteData.general.logoUrl : `http://localhost:3008${siteData.general.logoUrl}`} alt={siteData.general.siteName} className="h-12 mb-4" />
                     <div className="mt-6 flex space-x-4">
                        <a href={siteData.footer.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FacebookIcon className="h-6 w-6"/></a>
                        <a href={siteData.footer.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><InstagramIcon className="h-6 w-6"/></a>
                    </div>
                </div>
                
                {/* Contact */}
                <div className="md:col-span-8">
                     <h3 className="text-lg font-semibold tracking-wider">İletişim</h3>
                     <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {siteData.contact.branches.map((branch) => (
                             <div key={branch.name}>
                                <h4 className="font-semibold text-white mb-2 text-base">{branch.name}</h4>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li className="flex items-start"><MapPinIcon className="h-4 w-4 mr-2 mt-1 flex-shrink-0" /><span>{branch.address}</span></li>
                                    <li className="flex items-start"><PhoneIcon className="h-4 w-4 mr-2 mt-1 flex-shrink-0" /><span>{branch.phone}</span></li>
                                    <li className="flex items-start"><MailIcon className="h-4 w-4 mr-2 mt-1 flex-shrink-0" /><span>{branch.email}</span></li>
                                </ul>
                            </div>
                        ))}
                     </div>
                </div>
            </div>
            <div className="mt-12 border-t border-gray-700 pt-8 text-center text-xs text-gray-400">
                <p>© {new Date().getFullYear()} {siteData.footer.copyright}</p>
                <div className="mt-2">
                    <span 
                        onDoubleClick={() => setCurrentPage('Admin')}
                        className="cursor-default select-none"
                        title="Çift tıklayın"
                    >
                        .
                    </span>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
 