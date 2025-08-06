import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ManageGallery = ({ data, onSave, onBack }) => {
  const [galleryData, setGalleryData] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);

  // Veri ilk yüklendiğinde tüm öğelerin ID'si olduğundan emin ol
  useEffect(() => {
    const dataWithIds = data.map(item => item.id ? item : { ...item, id: uuidv4() });
    setGalleryData(dataWithIds);
  }, [data]);


  const handleFileChange = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      setUploading(true);
      try {
                        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const result = await res.json();
        if (res.ok) {
          const newGalleryData = [...galleryData, { id: uuidv4(), src: result.imageUrl, alt: 'Galeri fotoğrafı' }];
          setGalleryData(newGalleryData);
          onSave('gallery', newGalleryData); // Otomatik kaydet
        } else {
          throw new Error(result.message || 'Yükleme başarısız.');
        }
      } catch (error) {
        alert(`Hata: ${error.message}`);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleAddByUrl = () => {
    if (newImageUrl && newImageUrl.startsWith('http')) {
      const newGalleryData = [...galleryData, { id: uuidv4(), src: newImageUrl, alt: 'Galeri fotoğrafı' }];
      setGalleryData(newGalleryData);
      onSave('gallery', newGalleryData); // Otomatik kaydet
      setNewImageUrl('');
    } else {
      alert('Lütfen geçerli bir URL girin.');
    }
  };

  const handleDelete = (id) => {
    if(window.confirm("Bu fotoğrafı silmek istediğinizden emin misiniz?")) {
        const updatedGallery = galleryData.filter(item => item.id !== id);
        setGalleryData(updatedGallery);
        onSave('gallery', updatedGallery); // Silme işlemini anında kaydet
    }
  };
  
  const handleEdit = (image) => {
      setEditingImage(image);
  };

  const handleUpdateImage = () => {
      const updatedGallery = galleryData.map(item => item.id === editingImage.id ? editingImage : item);
      setGalleryData(updatedGallery);
      onSave('gallery', updatedGallery); // Güncellemeyi anında kaydet
      setEditingImage(null);
  };

  const openLightbox = (index) => {
      setCurrentLightboxIndex(index);
      setIsLightboxOpen(true);
  }

  const closeLightbox = () => {
      setIsLightboxOpen(false);
  }

  const showNextImage = () => {
      setCurrentLightboxIndex((prevIndex) => (prevIndex + 1) % galleryData.length);
  }

  const showPrevImage = () => {
      setCurrentLightboxIndex((prevIndex) => (prevIndex - 1 + galleryData.length) % galleryData.length);
  }

  return (
    <div>
      <button onClick={onBack} className="mb-6 text-sm text-blue-600 hover:underline">&larr; Geri Dön</button>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Galeriyi Düzenle</h2>
        {/* Tümünü kaydet butonu kaldırıldı, işlemler artık anlık. */}
      </div>

      <div className="p-6 border rounded-lg bg-white mb-6">
        <h3 className="text-xl font-semibold mb-4">Yeni Fotoğraf Ekle</h3>
        <div className="flex items-start gap-4">
            <div className="flex-1">
                <label className="block text-sm font-medium">URL ile Ekle</label>
                <input type="text" value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)} placeholder="https://..." className="mt-1 block w-full border p-2 rounded-md"/>
                <button onClick={handleAddByUrl} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md text-sm">URL'den Ekle</button>
            </div>
            <div className="flex-1">
                 <label className="block text-sm font-medium">Veya Bilgisayardan Yükle</label>
                 <input type="file" onChange={handleFileChange} className="mt-1 block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                 {uploading && <p className="text-sm text-blue-600 mt-2">Yükleniyor...</p>}
            </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">Bir fotoğrafı düzenlemek için "Düzenle" butonuna, büyütmek için fotoğrafın kendisine tıklayın.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {galleryData.map((item, index) => (
          <div key={item.id} className="relative group">
            <img src={item.src} alt={item.alt} className="w-full h-40 object-cover rounded-md shadow-md cursor-pointer" onClick={() => openLightbox(index)} />
            <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(item)} className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">✏️</button>
                <button onClick={() => handleDelete(item.id)} className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">&times;</button>
            </div>
          </div>
        ))}
      </div>

        {/* Edit Modal */}
        {editingImage && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                    <h3 className="text-xl font-bold mb-4">Fotoğrafı Düzenle</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Görsel URL</label>
                            <input type="text" value={editingImage.src} onChange={(e) => setEditingImage({...editingImage, src: e.target.value})} className="mt-1 block w-full border p-2 rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Açıklama (Alt Metin)</label>
                            <input type="text" value={editingImage.alt} onChange={(e) => setEditingImage({...editingImage, alt: e.target.value})} className="mt-1 block w-full border p-2 rounded-md" />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                        <button onClick={() => setEditingImage(null)} className="text-gray-600">İptal</button>
                        <button onClick={handleUpdateImage} className="bg-blue-600 text-white py-2 px-6 rounded-md">Güncelle ve Kaydet</button>
                    </div>
                </div>
            </div>
        )}
        
        {/* Lightbox */}
        {isLightboxOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={closeLightbox}>
                <button onClick={(e) => {e.stopPropagation(); showPrevImage()}} className="absolute left-4 text-white text-4xl p-4">&larr;</button>
                <img src={galleryData[currentLightboxIndex].src} alt={galleryData[currentLightboxIndex].alt} className="max-w-[90vw] max-h-[90vh]" />
                <button onClick={(e) => {e.stopPropagation(); showNextImage()}} className="absolute right-4 text-white text-4xl p-4">&rarr;</button>
            </div>
        )}
    </div>
  );
};

export default ManageGallery; 