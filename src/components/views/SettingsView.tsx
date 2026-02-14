import React, { useState, useMemo } from 'react';
import { useInventory } from '@/hooks/useInventory';
import { CATEGORIES, SUB_CATEGORIES, Category, InventoryItem } from '@/types/inventory';
import { 
  User, Building2, Briefcase, Package, Calendar, 
  MessageSquare, Send, X, Phone, AlertCircle 
} from 'lucide-react';
import { CloudDecor, StarDecor } from '@/components/icons/KawaiiIcons';

// Daftar Organisasi
const ORGANIZATIONS = [
  "E-MAILKOMP", "HIMAVIAN", "HIMAVIDA", "HIMAKESJA", "FORMADGATA", "HMPS KP", 
  "HIMAMA", "HMPS Perpajakan", "HMPS MP", "GAMALOGISTA", "HMPS MPD", 
  "GAMAGRITA", "GAMADIPTA", "HIMA PSDKU", "HIMADEPSI", "HMPS MB", 
  "CHISS", "KADIKA", "HMB Andalusia", "SEQUENCE", "SEVONCE", 
  "GENERA", "PSDKU SPORT", "FUTSAL", "Seelenz", "SKI", 
  "KMK SV", "PMK", "DEMA UNS", "BEM UNS", "Lainnya"
];

// Nomor WA (Ganti nomor Aldifa dengan yang asli)
const CONTACTS = {
  abimanyu: "6282133751840", 
  aldifa: "6281234567890" // <--- Ganti dengan nomor Aldifa yang benar
};

const SettingsView: React.FC = () => {
  const { allItems } = useInventory(); // Ambil semua data barang
  
  // State Form
  const [formData, setFormData] = useState({
    nama: '',
    organisasi: '',
    customOrganisasi: '',
    divisi: '',
    kategori: '' as Category | '',
    subKategori: '',
    selectedItemId: '',
    jumlah: 1,
    alasan: '',
    tanggalAmbil: '',
    tanggalKembali: ''
  });

  const [showModal, setShowModal] = useState(false);

  // Filter Sub Kategori berdasarkan Kategori
  const availableSubCategories = useMemo(() => {
    if (!formData.kategori) return [];
    return SUB_CATEGORIES[formData.kategori as Category] || [];
  }, [formData.kategori]);

  // Filter Barang berdasarkan Sub Kategori
  const availableItems = useMemo(() => {
    if (!formData.subKategori) return [];
    return allItems.filter(item => 
      item.kategori === formData.kategori && 
      item.subKategori === formData.subKategori &&
      item.status === 'Ada' // Hanya tampilkan barang yang statusnya Ada
    );
  }, [formData.subKategori, allItems]);

  // Ambil detail barang yang dipilih untuk cek stok
  const selectedItem = useMemo(() => {
    return allItems.find(i => i.id === formData.selectedItemId);
  }, [formData.selectedItemId, allItems]);

  // Handler Submit Form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  // Handler Kirim WA
  const handleSendWA = (contact: 'abimanyu' | 'aldifa') => {
    const finalOrg = formData.organisasi === 'Lainnya' ? formData.customOrganisasi : formData.organisasi;
    const itemName = selectedItem?.namaBarang || 'Barang';
    
    // Format Pesan
    const message = `Halo ${contact === 'abimanyu' ? 'Abimanyu' : 'Aldifa'}, 

Saya *${formData.nama}* dari *${finalOrg}* (Divisi: ${formData.divisi}) ingin meminjam:
*${itemName}*
Jumlah: ${formData.jumlah} ${selectedItem?.satuan || 'pcs'}
Tanggal: ${formData.tanggalAmbil} s/d ${formData.tanggalKembali}
Keperluan: ${formData.alasan}

Mohon dibantu untuk peminjamannya ya, terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = CONTACTS[contact];
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    setShowModal(false);
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Peminjaman Barang</h2>
        <div className="ml-auto">
          <CloudDecor size={24} className="animate-float" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* SECTION 1: Identitas Peminjam */}
        <div className="card-kawaii p-6 space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2">
            <User className="w-5 h-5 text-accent" /> Identitas Peminjam
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Nama Lengkap</label>
              <input 
                required
                className="w-full p-3 rounded-xl border-2 focus:border-primary outline-none bg-background"
                placeholder="Masukkan nama anda"
                value={formData.nama}
                onChange={e => setFormData({...formData, nama: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Organisasi</label>
              <select 
                required
                className="w-full p-3 rounded-xl border-2 focus:border-primary outline-none bg-background"
                value={formData.organisasi}
                onChange={e => setFormData({...formData, organisasi: e.target.value})}
              >
                <option value="">Pilih Organisasi</option>
                {ORGANIZATIONS.map(org => (
                  <option key={org} value={org}>{org}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Jika pilih Lainnya, muncul input manual */}
          {formData.organisasi === 'Lainnya' && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
              <label className="text-sm font-semibold ml-1">Asal Organisasi / Instansi</label>
              <input 
                required
                className="w-full p-3 rounded-xl border-2 border-dashed border-accent focus:border-primary outline-none bg-accent/5"
                placeholder="Masukkan nama organisasi anda"
                value={formData.customOrganisasi}
                onChange={e => setFormData({...formData, customOrganisasi: e.target.value})}
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1">Divisi / Jabatan</label>
            <input 
              required
              className="w-full p-3 rounded-xl border-2 focus:border-primary outline-none bg-background"
              placeholder="Contoh: Humas / Ketua Pelaksana"
              value={formData.divisi}
              onChange={e => setFormData({...formData, divisi: e.target.value})}
            />
          </div>
        </div>

        {/* SECTION 2: Detail Barang */}
        <div className="card-kawaii p-6 space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2">
            <Package className="w-5 h-5 text-primary" /> Pilih Barang
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Kategori</label>
              <select 
                className="w-full p-3 rounded-xl border-2 focus:border-primary outline-none bg-background"
                value={formData.kategori}
                onChange={e => setFormData({
                  ...formData, 
                  kategori: e.target.value as Category, 
                  subKategori: '', 
                  selectedItemId: ''
                })}
              >
                <option value="">Pilih Kategori</option>
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Sub Kategori</label>
              <select 
                className="w-full p-3 rounded-xl border-2 focus:border-primary outline-none bg-background disabled:opacity-50"
                value={formData.subKategori}
                disabled={!formData.kategori}
                onChange={e => setFormData({
                  ...formData, 
                  subKategori: e.target.value, 
                  selectedItemId: ''
                })}
              >
                <option value="">Pilih Sub Kategori</option>
                {availableSubCategories.map(sub => <option key={sub} value={sub}>{sub}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1">Nama Barang</label>
            <select 
              required
              className="w-full p-3 rounded-xl border-2 focus:border-primary outline-none bg-background disabled:opacity-50"
              value={formData.selectedItemId}
              disabled={!formData.subKategori}
              onChange={e => setFormData({...formData, selectedItemId: e.target.value})}
            >
              <option value="">Pilih Barang...</option>
              {availableItems.map(item => (
                <option key={item.id} value={item.id}>
                  {item.namaBarang} (Stok: {item.jumlah} {item.satuan})
                </option>
              ))}
            </select>
          </div>

          {selectedItem && (
            <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 flex items-center justify-between animate-in zoom-in-95">
              <div className="text-sm">
                <span className="block text-muted-foreground">Stok Tersedia:</span>
                <span className="font-bold text-lg text-primary">
                  {selectedItem.jumlah} {selectedItem.satuan}
                </span>
              </div>
              <div className="w-1/2">
                <label className="text-xs font-bold ml-1 mb-1 block">Jumlah Pinjam</label>
                <input 
                  type="number"
                  min="1"
                  max={selectedItem.jumlah}
                  required
                  className="w-full p-2 rounded-lg border-2 focus:border-primary text-center font-bold"
                  value={formData.jumlah}
                  onChange={e => setFormData({...formData, jumlah: parseInt(e.target.value)})}
                />
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: Waktu & Keperluan */}
        <div className="card-kawaii p-6 space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2">
            <Calendar className="w-5 h-5 text-secondary-foreground" /> Detail Peminjaman
          </h3>

          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1">Perihal / Nama Acara</label>
            <textarea 
              required
              rows={2}
              className="w-full p-3 rounded-xl border-2 focus:border-primary outline-none bg-background resize-none"
              placeholder="Jelaskan untuk keperluan apa barang ini dipinjam"
              value={formData.alasan}
              onChange={e => setFormData({...formData, alasan: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Tanggal Ambil</label>
              <input 
                type="date"
                required
                className="w-full p-3 rounded-xl border-2 focus:border-primary outline-none bg-background"
                value={formData.tanggalAmbil}
                onChange={e => setFormData({...formData, tanggalAmbil: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Tanggal Kembali</label>
              <input 
                type="date"
                required
                className="w-full p-3 rounded-xl border-2 focus:border-primary outline-none bg-background"
                value={formData.tanggalKembali}
                onChange={e => setFormData({...formData, tanggalKembali: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-kawaii-skyblue text-white font-bold shadow-float hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Send size={20} />
          Ajukan Peminjaman
        </button>

      </form>

      {/* Modal Kontak */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-card w-full max-w-md rounded-3xl shadow-2xl p-6 relative border-4 border-white animate-in zoom-in-95">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-green-600">
                <MessageSquare size={32} />
              </div>
              <h3 className="text-xl font-bold">Pilih Kontak Admin</h3>
              <p className="text-sm text-muted-foreground mt-1">Data akan diformat otomatis ke WhatsApp</p>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => handleSendWA('abimanyu')}
                className="w-full p-4 rounded-xl border-2 border-green-500/20 bg-green-500/5 hover:bg-green-500/10 flex items-center gap-3 transition-colors group"
              >
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                  <Phone size={18} />
                </div>
                <div className="text-left">
                  <span className="block font-bold text-foreground">Hubungi Abimanyu</span>
                  <span className="text-xs text-muted-foreground">Sekretaris E-Mailkomp 2</span>
                </div>
                <StarDecor className="ml-auto text-green-400 animate-spin-slow" size={20} />
              </button>

              <button 
                onClick={() => handleSendWA('aldifa')}
                className="w-full p-4 rounded-xl border-2 border-green-500/20 bg-green-500/5 hover:bg-green-500/10 flex items-center gap-3 transition-colors group"
              >
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                  <Phone size={18} />
                </div>
                <div className="text-left">
                  <span className="block font-bold text-foreground">Hubungi Aldifa</span>
                  <span className="text-xs text-muted-foreground">Sekretaris E-Mailkomp 1</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsView;