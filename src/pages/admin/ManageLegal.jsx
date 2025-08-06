import React, { useState } from 'react';

const ManageLegal = ({ data, onSave, onBack }) => {
  const [legalData, setLegalData] = useState(data || {
    law5200: {
      title: "5200 Sayılı Üretici Birlikleri Kanunu",
      content: [
        "5200 sayılı 'Tarımsal Üretici Birlikleri Hakkında Kanun' 21/12/2004 tarihli ve 25687 sayılı Resmi Gazete'de yayımlanarak yürürlüğe girmiştir.",
        "Bu kanunla, tarımsal ürünlerin değerlendirilmesi ve pazarlanması ile üreticilerin ekonomik ve sosyal durumlarının iyileştirilmesi amacıyla tarımsal üretici birliklerinin kurulması, işleyişi ve denetimi düzenlenmiştir."
      ],
      downloadUrl: "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.5200.pdf"
    },
    regulation: {
      title: "Üretici Birlikleri Tüzüğü",
      content: [
        "Üretici Birlikleri Tüzüğü, 5200 sayılı Kanun'un uygulanmasına dair usul ve esasları belirlemektedir.",
        "Tüzükte birlik kurma şartları, organları, üyelik işlemleri, mali hükümler ve denetim esasları düzenlenmiştir."
      ],
      downloadUrl: "#"
    },
    supportDecrees: {
      title: "Destekleme Kararnameleri",
      content: [
        {
          year: "2024",
          title: "2024 Yılı Destekleme Kararları",
          items: [
            "Süt üretimi teşvik primi: Litre başına 0,50 TL",
            "Kalite prim desteği: A+ kalite sütler için %10 ek prim", 
            "Organik süt desteği: Litre başına 1,00 TL"
          ]
        },
        {
          year: "2024",
          title: "Soğutma Tankı Destekleri",
          items: [
            "Bireysel soğutma tankı alımında %50 oranında destek sağlanmaktadır.",
            "Azami destek tutarı 25.000 TL'dir."
          ]
        }
      ],
      downloadUrl: "#"
    }
  });

  const handleSave = () => {
    onSave('legal', legalData);
  };

  const updateSection = (section, field, value) => {
    setLegalData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateContent = (section, index, value) => {
    const newContent = [...legalData[section].content];
    newContent[index] = value;
    updateSection(section, 'content', newContent);
  };

  const addContent = (section) => {
    const newContent = [...legalData[section].content, ''];
    updateSection(section, 'content', newContent);
  };

  const removeContent = (section, index) => {
    const newContent = legalData[section].content.filter((_, i) => i !== index);
    updateSection(section, 'content', newContent);
  };

  const updateDecreeItem = (decreeIndex, field, value) => {
    const newDecrees = [...legalData.supportDecrees.content];
    newDecrees[decreeIndex] = {
      ...newDecrees[decreeIndex],
      [field]: value
    };
    updateSection('supportDecrees', 'content', newDecrees);
  };

  const updateDecreeItems = (decreeIndex, items) => {
    const newDecrees = [...legalData.supportDecrees.content];
    newDecrees[decreeIndex] = {
      ...newDecrees[decreeIndex],
      items: items
    };
    updateSection('supportDecrees', 'content', newDecrees);
  };

  const addDecree = () => {
    const newDecrees = [...legalData.supportDecrees.content, {
      year: new Date().getFullYear().toString(),
      title: "Yeni Karar",
      items: [""]
    }];
    updateSection('supportDecrees', 'content', newDecrees);
  };

  const removeDecree = (index) => {
    const newDecrees = legalData.supportDecrees.content.filter((_, i) => i !== index);
    updateSection('supportDecrees', 'content', newDecrees);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <button onClick={onBack} className="text-blue-600 hover:text-blue-800 mb-2">← Geri</button>
          <h2 className="text-2xl font-bold">Mevzuat Yönetimi</h2>
        </div>
        <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Değişiklikleri Kaydet
        </button>
      </div>

      <div className="space-y-8">
        {/* 5200 Sayılı Kanun */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">📜 5200 Sayılı Üretici Birlikleri Kanunu</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sayfa Başlığı</label>
            <input
              type="text"
              value={legalData.law5200.title}
              onChange={(e) => updateSection('law5200', 'title', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">İçerik Paragrafları</label>
            {legalData.law5200.content.map((paragraph, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <textarea
                  value={paragraph}
                  onChange={(e) => updateContent('law5200', index, e.target.value)}
                  className="flex-1 border rounded px-3 py-2 h-24"
                  placeholder={`Paragraf ${index + 1}`}
                />
                <button
                  onClick={() => removeContent('law5200', index)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Sil
                </button>
              </div>
            ))}
            <button
              onClick={() => addContent('law5200')}
              className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 mt-2"
            >
              Paragraf Ekle
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">İndirme Linki</label>
            <input
              type="url"
              value={legalData.law5200.downloadUrl}
              onChange={(e) => updateSection('law5200', 'downloadUrl', e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="https://example.com/kanun.pdf"
            />
          </div>
        </div>

        {/* Üretici Birlikleri Tüzüğü */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">📋 Üretici Birlikleri Tüzüğü</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sayfa Başlığı</label>
            <input
              type="text"
              value={legalData.regulation.title}
              onChange={(e) => updateSection('regulation', 'title', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">İçerik Paragrafları</label>
            {legalData.regulation.content.map((paragraph, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <textarea
                  value={paragraph}
                  onChange={(e) => updateContent('regulation', index, e.target.value)}
                  className="flex-1 border rounded px-3 py-2 h-24"
                  placeholder={`Paragraf ${index + 1}`}
                />
                <button
                  onClick={() => removeContent('regulation', index)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Sil
                </button>
              </div>
            ))}
            <button
              onClick={() => addContent('regulation')}
              className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 mt-2"
            >
              Paragraf Ekle
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">İndirme Linki</label>
            <input
              type="url"
              value={legalData.regulation.downloadUrl}
              onChange={(e) => updateSection('regulation', 'downloadUrl', e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="https://example.com/tuzuk.pdf"
            />
          </div>
        </div>

        {/* Destekleme Kararnameleri */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">📊 Destekleme Kararnameleri</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sayfa Başlığı</label>
            <input
              type="text"
              value={legalData.supportDecrees.title}
              onChange={(e) => updateSection('supportDecrees', 'title', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Destek Kararları</label>
            {legalData.supportDecrees.content.map((decree, decreeIndex) => (
              <div key={decreeIndex} className="border p-4 rounded mb-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold">Karar #{decreeIndex + 1}</h4>
                  <button
                    onClick={() => removeDecree(decreeIndex)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Kararı Sil
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Yıl</label>
                    <input
                      type="text"
                      value={decree.year}
                      onChange={(e) => updateDecreeItem(decreeIndex, 'year', e.target.value)}
                      className="w-full border rounded px-2 py-1 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                    <input
                      type="text"
                      value={decree.title}
                      onChange={(e) => updateDecreeItem(decreeIndex, 'title', e.target.value)}
                      className="w-full border rounded px-2 py-1 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Karar Maddeleri</label>
                  {decree.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex gap-2 mb-1">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const newItems = [...decree.items];
                          newItems[itemIndex] = e.target.value;
                          updateDecreeItems(decreeIndex, newItems);
                        }}
                        className="flex-1 border rounded px-2 py-1 text-sm"
                        placeholder={`Madde ${itemIndex + 1}`}
                      />
                      <button
                        onClick={() => {
                          const newItems = decree.items.filter((_, i) => i !== itemIndex);
                          updateDecreeItems(decreeIndex, newItems);
                        }}
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                      >
                        Sil
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newItems = [...decree.items, ''];
                      updateDecreeItems(decreeIndex, newItems);
                    }}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 mt-1"
                  >
                    Madde Ekle
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={addDecree}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Yeni Karar Ekle
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tüm Kararnameleri İndirme Linki</label>
            <input
              type="url"
              value={legalData.supportDecrees.downloadUrl}
              onChange={(e) => updateSection('supportDecrees', 'downloadUrl', e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="https://example.com/kararnameler.pdf"
            />
          </div>
        </div>
      </div>

      {/* Yardım */}
      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Kullanım İpuçları</h4>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• Her bölüm için ayrı sayfa oluşturulur</li>
          <li>• İndirme linkleri PDF dosyalarına yönlendirilebilir</li>
          <li>• Paragrafları tek tek düzenleyebilirsiniz</li>
          <li>• Destekleme kararlarını yıl bazında organize edebilirsiniz</li>
        </ul>
      </div>
    </div>
  );
};

export default ManageLegal; 