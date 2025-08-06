import React, { useState, useEffect } from 'react';

const ManageGeneral = ({ data, onSave, onBack }) => {
  const [generalData, setGeneralData] = useState(data);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setGeneralData(data);
  }, [data]);

  const handleChange = (e, section) => {
    const { name, value } = e.target;
    if(section) {
        setGeneralData({ ...generalData, [section]: {...generalData[section], [name]: value} });
    } else {
        setGeneralData({ ...generalData, [name]: value });
    }
  };

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
                  setGeneralData({...generalData, logoUrl: result.imageUrl });
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

  const handleSave = () => {
    onSave('general', generalData);
    alert('Genel ayarlar kaydedildi!');
  };

  return (
    <div>
      <button onClick={onBack} className="mb-6 text-sm text-blue-600 hover:underline">
        &larr; Geri Dön
      </button>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Genel Site Ayarları</h2>
        <button onClick={handleSave} className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700">Değişiklikleri Kaydet</button>
      </div>
      
      <div className="p-6 border rounded-lg bg-white space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Site Adı</label>
          <input
            type="text"
            name="siteName"
            value={generalData.siteName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Logo URL</label>
          <input
            type="text"
            name="logoUrl"
            value={generalData.logoUrl}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Veya Bilgisayardan Logo Yükle</label>
            <input type="file" onChange={handleFileChange} className="mt-1 block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
            {uploading && <p className="text-sm text-blue-600 mt-2">Yükleniyor...</p>}
                            {generalData.logoUrl && <img src={generalData.logoUrl.startsWith('http') ? generalData.logoUrl : generalData.logoUrl} alt="Mevcut Logo" className="mt-4 h-16 bg-gray-100 p-2 rounded"/>}
        </div>
        <hr/>
        <div>
          <h4 className="text-md font-semibold text-gray-800">Sosyal Medya Linkleri</h4>
        </div>
         <div>
          <label className="block text-sm font-medium text-gray-700">Facebook URL</label>
          <input
            type="text"
            name="facebook"
            value={generalData.socials?.facebook || ''}
            onChange={(e) => handleChange(e, 'socials')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
          />
        </div>
         <div>
          <label className="block text-sm font-medium text-gray-700">Instagram URL</label>
          <input
            type="text"
            name="instagram"
            value={generalData.socials?.instagram || ''}
            onChange={(e) => handleChange(e, 'socials')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ManageGeneral; 