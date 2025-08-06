import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ManageBoard = ({ data, onSave, onBack }) => {
  const [boardData, setBoardData] = useState(data);
  const [editingMember, setEditingMember] = useState(null); // null veya üye nesnesi
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
                  setEditingMember({...editingMember, imageUrl: result.imageUrl });
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

  const handleMemberChange = (e, index) => {
    const { name, value } = e.target;
    const updatedMembers = [...boardData];
    updatedMembers[index] = { ...updatedMembers[index], [name]: value };
    setBoardData(updatedMembers);
  };

  const handleAddNewMember = () => {
    setEditingMember({ id: uuidv4(), name: '', title: '', imageUrl: 'https://placehold.co/400x400/EFF6FF/1D4ED8?text=Yeni' });
  };
  
  const handleEditMember = (member) => {
    setEditingMember(member);
  };

  const handleDeleteMember = (index) => {
    if (window.confirm("Bu üyeyi silmek istediğinizden emin misiniz?")) {
      const updatedMembers = boardData.filter((_, i) => i !== index);
      setBoardData(updatedMembers);
    }
  };

  const handleSaveMember = () => {
    let updatedMembers;
    const existingIndex = boardData.findIndex(m => m.id === editingMember.id);

    if (existingIndex > -1) {
        updatedMembers = [...boardData];
        updatedMembers[existingIndex] = editingMember;
    } else {
        updatedMembers = [...boardData, editingMember];
    }
    setBoardData(updatedMembers);
    setEditingMember(null);
  };
  
  const handleSaveAll = () => {
      onSave('boardMembers', boardData);
      alert('Yönetim kurulu başarıyla kaydedildi!');
  }

  if (editingMember) {
    return (
        <div>
            <button onClick={() => setEditingMember(null)} className="mb-6 text-sm text-blue-600 hover:underline">&larr; Geri Dön</button>
            <h3 className="text-xl font-bold mb-4">{editingMember.name ? 'Üye Düzenle' : 'Yeni Üye Ekle'}</h3>
            <div className="space-y-4 p-4 border rounded-md bg-gray-50">
                <div>
                    <label className="block text-sm font-medium">İsim</label>
                    <input type="text" name="name" value={editingMember.name} onChange={(e) => setEditingMember({...editingMember, name: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Unvan</label>
                    <input type="text" name="title" value={editingMember.title} onChange={(e) => setEditingMember({...editingMember, title: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Görsel URL</label>
                    <input type="text" name="imageUrl" value={editingMember.imageUrl} onChange={(e) => setEditingMember({...editingMember, imageUrl: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Veya Bilgisayardan Yükle</label>
                    <input type="file" onChange={handleFileChange} className="mt-1 block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                    {uploading && <p className="text-sm text-blue-600 mt-2">Yükleniyor...</p>}
                </div>
                 <button onClick={handleSaveMember} className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Kaydet</button>
            </div>
        </div>
    )
  }

  return (
    <div>
      <button onClick={onBack} className="mb-6 text-sm text-blue-600 hover:underline">&larr; Geri Dön</button>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Yönetim Kurulunu Düzenle</h2>
        <div>
            <button onClick={handleAddNewMember} className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 mr-2">Yeni Üye Ekle</button>
            <button onClick={handleSaveAll} className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">Tüm Değişiklikleri Kaydet</button>
        </div>
      </div>
      
      <div className="space-y-4">
        {boardData.map((member, index) => (
          <div key={member.id || index} className="flex items-center justify-between p-4 border rounded-md bg-white">
            <div className="flex items-center">
                <img src={member.imageUrl} alt={member.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
                <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.title}</p>
                </div>
            </div>
            <div>
              <button onClick={() => handleEditMember(member)} className="text-sm text-blue-600 hover:underline mr-4">Düzenle</button>
              <button onClick={() => handleDeleteMember(index)} className="text-sm text-red-600 hover:underline">Sil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBoard; 