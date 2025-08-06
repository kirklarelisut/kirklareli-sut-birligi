import React, { useState } from 'react';

const ManageNavigation = ({ data, onSave, onBack }) => {
  const [navigation, setNavigation] = useState(data || []);

  const handleSave = () => {
    onSave('navigation', navigation);
  };

  const addMenuItem = () => {
    const newItem = {
      name: 'Yeni Menü',
      href: '#'
    };
    setNavigation([...navigation, newItem]);
  };

  const addSubMenuItem = (index) => {
    const newSubItem = {
      name: 'Alt Menü',
      href: '#'
    };
    
    const updatedNav = navigation.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          dropdown: [...(item.dropdown || []), newSubItem]
        };
      }
      return item;
    });
    setNavigation(updatedNav);
  };

  const updateMenuItem = (index, field, value) => {
    const updatedNav = navigation.map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );
    setNavigation(updatedNav);
  };

  const updateSubMenuItem = (mainIndex, subIndex, field, value) => {
    const updatedNav = navigation.map((item, idx) => {
      if (idx === mainIndex && item.dropdown) {
        const updatedDropdown = item.dropdown.map((subItem, subIdx) =>
          subIdx === subIndex ? { ...subItem, [field]: value } : subItem
        );
        return { ...item, dropdown: updatedDropdown };
      }
      return item;
    });
    setNavigation(updatedNav);
  };

  const deleteMenuItem = (index) => {
    if (window.confirm('Bu menü öğesini silmek istediğinizden emin misiniz?')) {
      setNavigation(navigation.filter((_, idx) => idx !== index));
    }
  };

  const deleteSubMenuItem = (mainIndex, subIndex) => {
    if (window.confirm('Bu alt menü öğesini silmek istediğinizden emin misiniz?')) {
      const updatedNav = navigation.map((item, idx) => {
        if (idx === mainIndex && item.dropdown) {
          const updatedDropdown = item.dropdown.filter((_, subIdx) => subIdx !== subIndex);
          return updatedDropdown.length > 0 
            ? { ...item, dropdown: updatedDropdown }
            : { name: item.name, href: item.href }; // Dropdown'ı kaldır
        }
        return item;
      });
      setNavigation(updatedNav);
    }
  };

  const moveItem = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= navigation.length) return;

    const newNav = [...navigation];
    [newNav[index], newNav[newIndex]] = [newNav[newIndex], newNav[index]];
    setNavigation(newNav);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <button onClick={onBack} className="text-blue-600 hover:text-blue-800 mb-2">← Geri</button>
          <h2 className="text-2xl font-bold">Menü Yönetimi</h2>
        </div>
        <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Değişiklikleri Kaydet
        </button>
      </div>

      {/* Menü Önizlemesi */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-3">Menü Önizlemesi</h3>
        <div className="flex flex-wrap gap-2 bg-gray-50 p-4 rounded">
          {navigation.map((item, index) => (
            <div key={index} className="relative">
              <div className="bg-blue-100 px-3 py-2 rounded text-sm font-medium">
                {item.name}
                {item.dropdown && item.dropdown.length > 0 && (
                  <span className="ml-1">▼</span>
                )}
              </div>
              {item.dropdown && item.dropdown.length > 0 && (
                <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-10 min-w-max">
                  {item.dropdown.map((subItem, subIndex) => (
                    <div key={subIndex} className="px-3 py-2 text-sm hover:bg-gray-100 whitespace-nowrap">
                      {subItem.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Menü Düzenleme */}
      <div className="space-y-4">
        {navigation.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Menü Öğesi #{index + 1}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => moveItem(index, 'up')}
                  disabled={index === 0}
                  className={`px-2 py-1 rounded text-sm ${
                    index === 0 
                      ? 'bg-gray-300 text-gray-500' 
                      : 'bg-gray-500 text-white hover:bg-gray-600'
                  }`}
                >
                  ↑
                </button>
                <button
                  onClick={() => moveItem(index, 'down')}
                  disabled={index === navigation.length - 1}
                  className={`px-2 py-1 rounded text-sm ${
                    index === navigation.length - 1
                      ? 'bg-gray-300 text-gray-500' 
                      : 'bg-gray-500 text-white hover:bg-gray-600'
                  }`}
                >
                  ↓
                </button>
                <button
                  onClick={() => deleteMenuItem(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                  Sil
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Menü Adı</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateMenuItem(index, 'name', e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Ana Sayfa"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Link (href)</label>
                <input
                  type="text"
                  value={item.href}
                  onChange={(e) => updateMenuItem(index, 'href', e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="#"
                />
              </div>
            </div>

            {/* Alt Menü */}
            {item.dropdown && item.dropdown.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-800 mb-3">Alt Menü Öğeleri</h4>
                <div className="space-y-3">
                  {item.dropdown.map((subItem, subIndex) => (
                    <div key={subIndex} className="flex gap-3 items-center bg-gray-50 p-3 rounded">
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={subItem.name}
                          onChange={(e) => updateSubMenuItem(index, subIndex, 'name', e.target.value)}
                          className="border rounded px-3 py-2 text-sm"
                          placeholder="Alt menü adı"
                        />
                        <input
                          type="text"
                          value={subItem.href}
                          onChange={(e) => updateSubMenuItem(index, subIndex, 'href', e.target.value)}
                          className="border rounded px-3 py-2 text-sm"
                          placeholder="#"
                        />
                      </div>
                      <button
                        onClick={() => deleteSubMenuItem(index, subIndex)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                      >
                        Sil
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => addSubMenuItem(index)}
                className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
              >
                Alt Menü Ekle
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Yeni Menü Ekleme */}
      <div className="text-center mt-6">
        <button
          onClick={addMenuItem}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          + Yeni Menü Öğesi Ekle
        </button>
      </div>

      {/* Yardım */}
      <div className="mt-8 bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Önemli Bilgiler</h4>
        <ul className="text-yellow-800 text-sm space-y-1">
          <li>• Menü değişiklikleri tüm sitede geçerli olacaktır</li>
          <li>• Alt menü olan öğeler dropdown (açılır menü) olarak görünür</li>
          <li>• Sıralama için yukarı/aşağı ok tuşlarını kullanın</li>
          <li>• Değişiklikleri kaydetmeyi unutmayın!</li>
        </ul>
      </div>
    </div>
  );
};

export default ManageNavigation; 