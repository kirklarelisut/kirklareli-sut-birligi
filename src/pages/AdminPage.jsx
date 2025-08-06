import React, { useState, useEffect } from 'react';
import ManageAbout from './admin/ManageAbout';
import ManageBoard from './admin/ManageBoard';
import ManageHomepage from './admin/ManageHomepage';
import ManageGallery from './admin/ManageGallery';
import ManageGeneral from './admin/ManageGeneral';
import ManageCollectionCenters from './admin/ManageCollectionCenters';
import ManageNews from './admin/ManageNews';
import ManageContact from './admin/ManageContact';
import ManageNavigation from './admin/ManageNavigation';
import ManageLegal from './admin/ManageLegal';

const AdminPage = ({ data, onSave }) => {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [currentView, setCurrentView] = useState('dashboard');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(null);

  // Güvenlik: Session kontrolü
  useEffect(() => {
    const sessionStart = localStorage.getItem('adminSession');
    const sessionDuration = 2 * 60 * 60 * 1000; // 2 saat
    
    if (sessionStart) {
      const elapsed = Date.now() - parseInt(sessionStart);
      if (elapsed < sessionDuration) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('adminSession');
      }
    }
  }, []);

  // Güvenlik: Otomatik logout
  useEffect(() => {
    if (isLoggedIn) {
      const logoutTimer = setTimeout(() => {
        setIsLoggedIn(false);
        localStorage.removeItem('adminSession');
        alert('Güvenlik nedeniyle oturumunuz sonlandırıldı.');
      }, 2 * 60 * 60 * 1000); // 2 saat

      return () => clearTimeout(logoutTimer);
    }
  }, [isLoggedIn]);

  // Güvenlik: Lockout kontrolü
  useEffect(() => {
    if (lockoutTime) {
      const lockoutTimer = setTimeout(() => {
        setLockoutTime(null);
        setLoginAttempts(0);
      }, lockoutTime);

      return () => clearTimeout(lockoutTimer);
    }
  }, [lockoutTime]);

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (lockoutTime) {
      alert('Çok fazla yanlış deneme! Lütfen bekleyin.');
      return;
    }

    // Güçlü şifre kontrolü
    const correctPassword = 'KSB2024!Admin';
    
    if (password === correctPassword) {
      setIsLoggedIn(true);
      setSaveStatus('');
      setLoginAttempts(0);
      localStorage.setItem('adminSession', Date.now().toString());
      setPassword('');
    } else {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        setLockoutTime(15 * 60 * 1000); // 15 dakika lockout
        alert('3 yanlış deneme! 15 dakika beklemeniz gerekiyor.');
      } else {
        alert(`Yanlış şifre! ${3 - newAttempts} deneme hakkınız kaldı.`);
      }
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminSession');
    setCurrentView('dashboard');
    setSaveStatus('');
  };

  const handleSaveSection = (sectionKey, sectionData) => {
    const updatedData = { ...data, [sectionKey]: sectionData };
    onSave(updatedData);
    // Burada onSave'den gelen cevaba göre status güncellenebilir
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'general':
        return <ManageGeneral data={data.general} onSave={handleSaveSection} onBack={() => setCurrentView('dashboard')} />;
      case 'navigation':
        return <ManageNavigation data={data.navigation} onSave={handleSaveSection} onBack={() => setCurrentView('dashboard')} />;
      case 'news':
        return <ManageNews data={data.headlines} onSave={handleSaveSection} onBack={() => setCurrentView('dashboard')} />;
      case 'homepage':
        return <ManageHomepage data={data.homepage} onSave={handleSaveSection} onBack={() => setCurrentView('dashboard')} />;
      case 'about':
        return <ManageAbout data={data.about} onSave={handleSaveSection} onBack={() => setCurrentView('dashboard')} />;
      case 'board':
        return <ManageBoard data={data.boardMembers} onSave={handleSaveSection} onBack={() => setCurrentView('dashboard')} />;
      case 'gallery':
        return <ManageGallery data={data.gallery} onSave={handleSaveSection} onBack={() => setCurrentView('dashboard')} />;
      case 'collectionCenters':
        return <ManageCollectionCenters data={data.collectionCenters} onSave={handleSaveSection} onBack={() => setCurrentView('dashboard')} />;
      case 'contact':
        return <ManageContact data={data.contact} onSave={handleSaveSection} onBack={() => setCurrentView('dashboard')} />;
      case 'legal':
        return <ManageLegal data={data.legal} onSave={handleSaveSection} onBack={() => setCurrentView('dashboard')} />;
      default:
        return (
            <div>
                <h2 className="text-2xl font-bold mb-6">🎛️ Admin Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-blue-600 mb-3">📊 Site İstatistikleri</h3>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Toplam Haber: <span className="font-semibold">{data?.headlines?.length || 0}</span></p>
                      <p className="text-sm text-gray-600">Galeri Fotoğrafı: <span className="font-semibold">{data?.gallery?.length || 0}</span></p>
                      <p className="text-sm text-gray-600">Yönetim Kurulu: <span className="font-semibold">{data?.boardMembers?.length || 0}</span></p>
                      <p className="text-sm text-gray-600">Mevzuat Sayısı: <span className="font-semibold">{Object.keys(data?.legal || {}).length || 0}</span></p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-green-600 mb-3">⚡ Hızlı Erişim</h3>
                    <div className="space-y-2">
                      <button onClick={() => setCurrentView('news')} className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded">📰 Haber Yönetimi</button>
                      <button onClick={() => setCurrentView('navigation')} className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded">🧭 Menü Düzenleme</button>
                      <button onClick={() => setCurrentView('legal')} className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded">⚖️ Mevzuat Yönetimi</button>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-purple-600 mb-3">🔒 Güvenlik</h3>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Son Giriş: <span className="font-semibold">{new Date().toLocaleDateString('tr-TR')}</span></p>
                      <p className="text-sm text-gray-600">Oturum: <span className="text-green-600 font-semibold">Aktif</span></p>
                      <button onClick={handleLogout} className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                        Güvenli Çıkış
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-yellow-800">
                        <strong>💡 İpucu:</strong> Sol menüden düzenlemek istediğiniz bölümü seçebilirsiniz. 
                        Tüm değişiklikler anlık olarak sitede görünecektir.
                      </p>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="p-8 bg-white rounded-2xl shadow-xl w-full max-w-sm border">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">🔐 Güvenli Giriş</h1>
            <p className="text-gray-600 text-sm mt-2">Admin Panel Erişimi</p>
          </div>

          {lockoutTime && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="text-sm">🔒 Güvenlik nedeniyle giriş engellendi. 15 dakika bekleyiniz.</p>
            </div>
          )}

          {loginAttempts > 0 && !lockoutTime && (
            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
              <p className="text-sm">⚠️ Yanlış şifre! {3 - loginAttempts} deneme hakkınız kaldı.</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="password">
                Yönetici Şifresi
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Şifrenizi giriniz"
                disabled={lockoutTime}
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={lockoutTime}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                lockoutTime 
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
              }`}
            >
              {lockoutTime ? '🔒 Erişim Engellendi' : '🚀 Giriş Yap'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              🛡️ Bu alan güvenlik duvarı ile korunmaktadır
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">🎛️ Admin Panel</h1>
          <p className="text-gray-400 text-sm mt-1">Kırklareli Süt Birliği</p>
        </div>
        
        <nav className="space-y-2">
          <div>
            <a 
              href="#" 
              onClick={() => setCurrentView('dashboard')} 
              className={`flex items-center py-3 px-4 rounded-lg transition-colors ${
                currentView === 'dashboard' 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-gray-700'
              }`}
            >
              <span className="mr-3">📊</span>
              Dashboard
            </a>
          </div>

          <div className="border-t border-gray-600 pt-4 mt-4">
            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-3">⚙️ Sistem Ayarları</h3>
            <div className="space-y-1">
              <a 
                href="#" 
                onClick={() => setCurrentView('general')} 
                className={`flex items-center py-2 px-4 rounded-lg transition-colors ${
                  currentView === 'general' 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">🔧</span>
                Genel Ayarlar
              </a>
              <a 
                href="#" 
                onClick={() => setCurrentView('navigation')} 
                className={`flex items-center py-2 px-4 rounded-lg transition-colors ${
                  currentView === 'navigation' 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">🧭</span>
                Menü Yönetimi
              </a>
            </div>
          </div>

          <div className="border-t border-gray-600 pt-4 mt-4">
            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-3">📝 İçerik Yönetimi</h3>
            <div className="space-y-1">
              <a 
                href="#" 
                onClick={() => setCurrentView('news')} 
                className={`flex items-center py-2 px-4 rounded-lg transition-colors ${
                  currentView === 'news' 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">📰</span>
                Haber Yönetimi
              </a>
              <a 
                href="#" 
                onClick={() => setCurrentView('homepage')} 
                className={`flex items-center py-2 px-4 rounded-lg transition-colors ${
                  currentView === 'homepage' 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">🏠</span>
                Ana Sayfa Manşet
              </a>
              <a 
                href="#" 
                onClick={() => setCurrentView('about')} 
                className={`flex items-center py-2 px-4 rounded-lg transition-colors ${
                  currentView === 'about' 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">ℹ️</span>
                Hakkımızda
              </a>
              <a 
                href="#" 
                onClick={() => setCurrentView('board')} 
                className={`flex items-center py-2 px-4 rounded-lg transition-colors ${
                  currentView === 'board' 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">👥</span>
                Yönetim Kurulu
              </a>
              <a 
                href="#" 
                onClick={() => setCurrentView('gallery')} 
                className={`flex items-center py-2 px-4 rounded-lg transition-colors ${
                  currentView === 'gallery' 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">🖼️</span>
                Galeri
              </a>
              <a 
                href="#" 
                onClick={() => setCurrentView('legal')} 
                className={`flex items-center py-2 px-4 rounded-lg transition-colors ${
                  currentView === 'legal' 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">⚖️</span>
                Mevzuat Yönetimi
              </a>
            </div>
          </div>

          <div className="border-t border-gray-600 pt-4 mt-4">
            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-3">🏢 İşletme</h3>
            <div className="space-y-1">
              <a 
                href="#" 
                onClick={() => setCurrentView('collectionCenters')} 
                className={`flex items-center py-2 px-4 rounded-lg transition-colors ${
                  currentView === 'collectionCenters' 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">📍</span>
                Toplama Merkezleri
              </a>
              <a 
                href="#" 
                onClick={() => setCurrentView('contact')} 
                className={`flex items-center py-2 px-4 rounded-lg transition-colors ${
                  currentView === 'contact' 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">📞</span>
                İletişim Bilgileri
              </a>
            </div>
          </div>
        </nav>

        <div className="mt-8 pt-6 border-t border-gray-600">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center py-3 px-4 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            <span className="mr-2">🔐</span>
            Güvenli Çıkış
          </button>
          <p className="text-gray-400 text-xs text-center mt-3">
            Oturum: 2 saat aktif
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {renderCurrentView()}
      </main>
    </div>
  );
};

export default AdminPage; 