import React, { useState, useEffect } from 'react';

const ManageAbout = ({ data, onSave, onBack }) => {
  const [aboutData, setAboutData] = useState(data);
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
                  setAboutData({...aboutData, imageUrl: result.imageUrl });
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

  useEffect(() => {
    setAboutData(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'content') {
      // İçerik bir dizi olduğu için, textarea'dan gelen string'i satırlara bölerek diziye çevir
      setAboutData({ ...aboutData, content: value.split('\n') });
    } else {
      setAboutData({ ...aboutData, [name]: value });
    }
  };

  const handleSave = () => {
    onSave('about', aboutData);
  };

  return (
    <div>
      <button onClick={onBack} className="mb-6 text-sm text-blue-600 hover:underline">
        &larr; Geri Dön
      </button>
      <h2 className="text-2xl font-bold mb-4">Hakkımızda Sayfasını Düzenle</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Başlık</label>
          <input
            type="text"
            name="title"
            value={aboutData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">İçerik</label>
          <textarea
            name="content"
            rows="10"
            value={aboutData.content.join('\n')}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
            placeholder="Her paragrafı yeni bir satıra yazın."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Görsel URL</label>
          <input
            type="text"
            name="imageUrl"
            value={aboutData.imageUrl}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Veya Bilgisayardan Yükle</label>
            <input type="file" onChange={handleFileChange} className="mt-1 block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
            {uploading && <p className="text-sm text-blue-600 mt-2">Yükleniyor...</p>}
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700"
        >
          Değişiklikleri Kaydet
        </button>
      </div>
    </div>
  );
};

export default ManageAbout; 