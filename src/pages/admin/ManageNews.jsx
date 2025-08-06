import React, { useState } from 'react';

const ManageNews = ({ data, onSave, onBack }) => {
  const [headlines, setHeadlines] = useState(data || []);
  const [editingId, setEditingId] = useState(null);
  const [newHeadline, setNewHeadline] = useState({
    title: '',
    summary: '',
    imageUrl: '',
    date: new Date().toISOString().split('T')[0],
    isHeadline: true
  });

  const handleSave = () => {
    onSave('headlines', headlines);
  };

  const handleEdit = (headline) => {
    setEditingId(headline.id);
    setNewHeadline({
      title: headline.title || '',
      summary: headline.summary || '',
      imageUrl: headline.imageUrl || '',
      date: headline.date || new Date().toISOString().split('T')[0],
      isHeadline: headline.isHeadline || false
    });
  };

  const handleUpdate = () => {
    setHeadlines(headlines.map(headline =>
      headline.id === editingId
        ? { ...headline, ...newHeadline }
        : headline
    ));
    setEditingId(null);
    setNewHeadline({
      title: '',
      summary: '',
      imageUrl: '',
      date: new Date().toISOString().split('T')[0],
      isHeadline: true
    });
  };

  const handleAdd = () => {
    const id = Date.now();
    setHeadlines([...headlines, { id, ...newHeadline }]);
    setNewHeadline({
      title: '',
      summary: '',
      imageUrl: '',
      date: new Date().toISOString().split('T')[0],
      isHeadline: true
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu haberi silmek istediğinizden emin misiniz?')) {
      setHeadlines(headlines.filter(headline => headline.id !== id));
    }
  };

  const toggleHeadline = (id) => {
    setHeadlines(headlines.map(headline =>
      headline.id === id
        ? { ...headline, isHeadline: !headline.isHeadline }
        : headline
    ));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <button onClick={onBack} className="text-blue-600 hover:text-blue-800 mb-2">← Geri</button>
          <h2 className="text-2xl font-bold">Haber Yönetimi</h2>
        </div>
        <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Değişiklikleri Kaydet
        </button>
      </div>

      {/* Yeni Haber Ekleme / Düzenleme Formu */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {editingId ? 'Haber Düzenle' : 'Yeni Haber Ekle'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
            <input
              type="text"
              value={newHeadline.title}
              onChange={(e) => setNewHeadline({...newHeadline, title: e.target.value})}
              className="w-full border rounded px-3 py-2"
              placeholder="Haber başlığı"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tarih</label>
            <input
              type="date"
              value={newHeadline.date}
              onChange={(e) => setNewHeadline({...newHeadline, date: e.target.value})}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Özet</label>
          <textarea
            value={newHeadline.summary}
            onChange={(e) => setNewHeadline({...newHeadline, summary: e.target.value})}
            className="w-full border rounded px-3 py-2 h-24"
            placeholder="Haber özeti"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Görsel URL</label>
          <input
            type="url"
            value={newHeadline.imageUrl}
            onChange={(e) => setNewHeadline({...newHeadline, imageUrl: e.target.value})}
            className="w-full border rounded px-3 py-2"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            id="isHeadline"
            checked={newHeadline.isHeadline}
            onChange={(e) => setNewHeadline({...newHeadline, isHeadline: e.target.checked})}
            className="mr-2"
          />
          <label htmlFor="isHeadline" className="text-sm text-gray-700">Ana sayfada göster (Slider'da)</label>
        </div>

        <div className="mt-6 flex gap-2">
          {editingId ? (
            <>
              <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Güncelle
              </button>
              <button 
                onClick={() => {
                  setEditingId(null);
                  setNewHeadline({
                    title: '',
                    summary: '',
                    imageUrl: '',
                    date: new Date().toISOString().split('T')[0],
                    isHeadline: true
                  });
                }} 
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                İptal
              </button>
            </>
          ) : (
            <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Haber Ekle
            </button>
          )}
        </div>
      </div>

      {/* Mevcut Haberler */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Mevcut Haberler ({headlines.length})</h3>
        </div>
        
        {headlines.length === 0 ? (
          <div className="p-4 text-gray-500 text-center">Henüz haber eklenmemiş</div>
        ) : (
          <div className="divide-y">
            {headlines.map((headline) => (
              <div key={headline.id} className="p-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold">{headline.title}</h4>
                    <div className="flex items-center gap-2">
                      {headline.isHeadline && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          Ana Sayfa
                        </span>
                      )}
                      <span className="text-gray-500 text-sm">
                        {new Date(headline.date).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{headline.summary}</p>
                  {headline.imageUrl && (
                    <div className="mt-2">
                      <img src={headline.imageUrl} alt={headline.title} className="w-20 h-12 object-cover rounded" />
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => toggleHeadline(headline.id)}
                    className={`px-3 py-1 rounded text-xs ${
                      headline.isHeadline 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                    }`}
                  >
                    {headline.isHeadline ? 'Gizle' : 'Göster'}
                  </button>
                  <button
                    onClick={() => handleEdit(headline)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(headline.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageNews; 