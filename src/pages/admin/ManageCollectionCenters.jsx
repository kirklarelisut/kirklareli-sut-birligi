import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ManageCollectionCenters = ({ data, onSave, onBack }) => {
  const [centers, setCenters] = useState([]);

  useEffect(() => {
    // Gelen veriye ID ekle
    setCenters(data.map(item => item.id ? item : { ...item, id: uuidv4() }));
  }, [data]);

  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    const updatedList = [...centers];
    updatedList[index] = { ...updatedList[index], [name]: value };
    setCenters(updatedList);
  };

  const handleAddItem = () => {
    setCenters([...centers, { id: uuidv4(), name: 'Yeni Merkez', address: '', contactPerson: '', phone: '' }]);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm("Bu merkezi silmek istediğinizden emin misiniz?")) {
      setCenters(centers.filter(item => item.id !== id));
    }
  };

  const handleSaveAll = () => {
    onSave('collectionCenters', centers);
    alert('Toplama merkezleri başarıyla kaydedildi!');
  };

  return (
    <div>
      <button onClick={onBack} className="mb-6 text-sm text-blue-600 hover:underline">&larr; Geri Dön</button>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Süt Toplama Merkezlerini Düzenle</h2>
        <div>
            <button onClick={handleAddItem} className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 mr-2">Yeni Merkez Ekle</button>
            <button onClick={handleSaveAll} className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700">Tüm Değişiklikleri Kaydet</button>
        </div>
      </div>

      <div className="space-y-4">
        {centers.map((item, index) => (
          <div key={item.id} className="p-4 border rounded-md bg-white relative">
            <button onClick={() => handleDeleteItem(item.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-xl">&times;</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">Merkez Adı</label>
                    <input type="text" name="name" value={item.name} onChange={(e) => handleItemChange(e, index)} className="mt-1 block w-full border p-2 rounded-md"/>
                </div>
                 <div>
                    <label className="block text-sm font-medium">Yetkili Kişi</label>
                    <input type="text" name="contactPerson" value={item.contactPerson} onChange={(e) => handleItemChange(e, index)} className="mt-1 block w-full border p-2 rounded-md"/>
                </div>
                 <div className="md:col-span-2">
                    <label className="block text-sm font-medium">Adres</label>
                    <input type="text" name="address" value={item.address} onChange={(e) => handleItemChange(e, index)} className="mt-1 block w-full border p-2 rounded-md"/>
                </div>
                 <div>
                    <label className="block text-sm font-medium">Telefon</label>
                    <input type="text" name="phone" value={item.phone} onChange={(e) => handleItemChange(e, index)} className="mt-1 block w-full border p-2 rounded-md"/>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCollectionCenters; 