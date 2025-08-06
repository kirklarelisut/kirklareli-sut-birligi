import React, { useState } from 'react';

const ManageHomepage = ({ data, onSave, onBack }) => {
  const [homepageData, setHomepageData] = useState(data);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
      if(e.target.files[0]) {
          const file = e.target.files[0];
          const formData = new FormData();
          formData.append('image', file);
          setUploading(true);
          try {
              const res = await fetch('/api/upload', {
                  method: 'POST',
                  body: formData
              });
              const result = await res.json();
              if(res.ok) {
                  const updatedHero = { ...homepageData.hero, imageUrl: result.imageUrl };
                  setHomepageData({ ...homepageData, hero: updatedHero });
              } else {
                  throw new Error(result.message || 'Yükleme başarısız.');
              }
          } catch (error) {
              alert(`Hata: ${error.message}`);
          } finally {
              setUploading(false);
          }
      }
  }

  const handleChange = (e, section, index) => {
    const { name, value } = e.target;
    if (section) {
      const updatedSection = [...homepageData[section]];
      updatedSection[index] = { ...updatedSection[index], [name]: value };
      setHomepageData({ ...homepageData, [section]: updatedSection });
    } else {
      const updatedHero = { ...homepageData.hero, [name]: value };
      setHomepageData({ ...homepageData, hero: updatedHero });
    }
  };

  const handleSaveAll = () => {
    onSave('homepage', homepageData);
    alert('Ana sayfa içeriği başarıyla kaydedildi!');
  };

  return (
    <div>
      <button onClick={onBack} className="mb-6 text-sm text-blue-600 hover:underline">&larr; Geri Dön</button>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Ana Sayfa İçeriğini Düzenle</h2>
        <button onClick={handleSaveAll} className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700">Tüm Değişiklikleri Kaydet</button>
      </div>

      {/* Hero Section */}
      <div className="p-6 border rounded-lg bg-white mb-6">
        <h3 className="text-xl font-semibold mb-4">Karşılama Bölümü</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Ana Başlık</label>
            <input type="text" name="title" value={homepageData.hero.title} onChange={(e) => handleChange(e)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
          </div>
          <div>
            <label className="block text-sm font-medium">Alt Başlık</label>
            <textarea name="subtitle" rows="3" value={homepageData.hero.subtitle} onChange={(e) => handleChange(e)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
          </div>
          <div>
            <label className="block text-sm font-medium">Buton Yazısı</label>
            <input type="text" name="buttonText" value={homepageData.hero.buttonText} onChange={(e) => handleChange(e)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
          </div>
           <div>
            <label className="block text-sm font-medium">Görsel URL</label>
            <input type="text" name="imageUrl" value={homepageData.hero.imageUrl} onChange={(e) => handleChange(e)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
          </div>
          <div>
            <label className="block text-sm font-medium">Veya Bilgisayardan Yükle</label>
            <input type="file" onChange={handleFileChange} className="mt-1 block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
            {uploading && <p className="text-sm text-blue-600 mt-2">Yükleniyor...</p>}
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="p-6 border rounded-lg bg-white mb-6">
          <h3 className="text-xl font-semibold mb-4">Sayaçlar</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {homepageData.stats.map((stat, index) => (
                  <div key={index}>
                      <label className="block text-sm font-medium">Değer</label>
                      <input type="text" name="value" value={stat.value} onChange={(e) => handleChange(e, 'stats', index)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
                       <label className="block text-sm font-medium mt-2">Etiket</label>
                      <input type="text" name="label" value={stat.label} onChange={(e) => handleChange(e, 'stats', index)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
                  </div>
              ))}
          </div>
      </div>

      {/* Features Section */}
      <div className="p-6 border rounded-lg bg-white">
          <h3 className="text-xl font-semibold mb-4">Özellikler</h3>
          <div className="space-y-4">
              {homepageData.features.map((feature, index) => (
                  <div key={index} className="p-4 border rounded-md">
                      <label className="block text-sm font-medium">Başlık</label>
                      <input type="text" name="title" value={feature.title} onChange={(e) => handleChange(e, 'features', index)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
                       <label className="block text-sm font-medium mt-2">Açıklama</label>
                      <textarea name="description" rows="3" value={feature.description} onChange={(e) => handleChange(e, 'features', index)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
                  </div>
              ))}
          </div>
      </div>

    </div>
  );
};

export default ManageHomepage; 