import React, { useState } from 'react';

const ManageContact = ({ data, onSave, onBack }) => {
  const [contactData, setContactData] = useState(data || { branches: [] });

  const handleSave = () => {
    onSave('contact', contactData);
  };

  const addBranch = () => {
    const newBranch = {
      name: 'Yeni Şube',
      address: '',
      phone: '',
      email: '',
      mapUrl: ''
    };
    setContactData({
      ...contactData,
      branches: [...contactData.branches, newBranch]
    });
  };

  const updateBranch = (index, field, value) => {
    const updatedBranches = contactData.branches.map((branch, idx) =>
      idx === index ? { ...branch, [field]: value } : branch
    );
    setContactData({ ...contactData, branches: updatedBranches });
  };

  const deleteBranch = (index) => {
    if (window.confirm('Bu şubeyi silmek istediğinizden emin misiniz?')) {
      const updatedBranches = contactData.branches.filter((_, idx) => idx !== index);
      setContactData({ ...contactData, branches: updatedBranches });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <button onClick={onBack} className="text-blue-600 hover:text-blue-800 mb-2">← Geri</button>
          <h2 className="text-2xl font-bold">İletişim Yönetimi</h2>
        </div>
        <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Değişiklikleri Kaydet
        </button>
      </div>

      {/* Şubeler */}
      <div className="space-y-6">
        {contactData.branches.map((branch, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Şube #{index + 1}</h3>
              <button
                onClick={() => deleteBranch(index)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Şubeyi Sil
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Şube Adı</label>
                <input
                  type="text"
                  value={branch.name}
                  onChange={(e) => updateBranch(index, 'name', e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Merkez Şube"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                <input
                  type="text"
                  value={branch.phone}
                  onChange={(e) => updateBranch(index, 'phone', e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="0 (288) 123 45 67"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                <input
                  type="email"
                  value={branch.email}
                  onChange={(e) => updateBranch(index, 'email', e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="info@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adres</label>
                <textarea
                  value={branch.address}
                  onChange={(e) => updateBranch(index, 'address', e.target.value)}
                  className="w-full border rounded px-3 py-2 h-24"
                  placeholder="Mahalle, Sokak, No: XX, İlçe/İl"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Maps Embed URL
                  <span className="text-xs text-gray-500 block">
                    (Google Maps'ten "Embed a map" linkini buraya yapıştırın)
                  </span>
                </label>
                <input
                  type="url"
                  value={branch.mapUrl}
                  onChange={(e) => updateBranch(index, 'mapUrl', e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="https://www.google.com/maps/embed?pb=..."
                />
              </div>
            </div>

            {/* Harita Önizlemesi */}
            {branch.mapUrl && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Harita Önizlemesi</label>
                <div className="w-full h-64 bg-gray-100 rounded border">
                  <iframe 
                    src={branch.mapUrl}
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded"
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Yeni Şube Ekleme Butonu */}
        <div className="text-center">
          <button
            onClick={addBranch}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            + Yeni Şube Ekle
          </button>
        </div>
      </div>

      {/* Örnekler ve Yardım */}
      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Google Maps Embed URL Nasıl Alınır?</h4>
        <ol className="text-blue-800 text-sm space-y-1">
          <li>1. Google Maps'te konumunuzu bulun</li>
          <li>2. "Paylaş" butonuna tıklayın</li>
          <li>3. "Harita embed et" sekmesini seçin</li>
          <li>4. Boyut ayarlayın ve "HTML'yi kopyala" butonuna tıklayın</li>
          <li>5. src="" içindeki URL'yi buraya yapıştırın</li>
        </ol>
      </div>
    </div>
  );
};

export default ManageContact; 