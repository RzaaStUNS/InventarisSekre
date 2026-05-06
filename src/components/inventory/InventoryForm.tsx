import React, { useState, useEffect } from 'react';
import { InventoryItem, CATEGORIES, SUB_CATEGORIES, UNITS, CONDITIONS, Category } from '@/types/inventory';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Sparkles, HelpCircle, FileVideo, ImageIcon } from 'lucide-react'; 
import { StarDecor, HeartDecor } from '@/components/icons/KawaiiIcons';

interface InventoryFormProps {
  item?: InventoryItem | null;
  nextItemNumber: string;
  onSubmit: (data: Omit<InventoryItem, 'id' | 'nomorBarang' | 'createdAt' | 'updatedAt'>) => void;
  onClose: () => void;
}

const InventoryForm: React.FC<InventoryFormProps> = ({ item, nextItemNumber, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    namaBarang: '',
    kategori: '' as Category | '',
    subKategori: '',
    jumlah: 1,
    satuan: 'Pcs' as typeof UNITS[number],
    kondisi: 'Baik' as typeof CONDITIONS[number],
    imageUrl: '', // State untuk menyimpan nama file (JPG/GIF/MP4)
  });

  useEffect(() => {
    if (item) {
      setFormData({
        namaBarang: item.namaBarang,
        kategori: item.kategori,
        subKategori: item.subKategori,
        jumlah: item.jumlah,
        satuan: item.satuan,
        kondisi: item.kondisi,
        imageUrl: item.imageUrl ? item.imageUrl.split('/').pop() || '' : '', // Ambil nama filenya saja
      });
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.kategori) return;
    
    // Kirim data ke API via hook useInventory
    onSubmit(formData as Omit<InventoryItem, 'id' | 'nomorBarang' | 'createdAt' | 'updatedAt'>);
  };

  const availableSubCategories = formData.kategori ? SUB_CATEGORIES[formData.kategori] : [];

  return (
    <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
      <div className="bg-card rounded-3xl shadow-float max-w-lg w-full max-h-[90vh] flex flex-col relative overflow-hidden border-4 border-white">
        
        {/* Dekorasi Header */}
        <div className="absolute top-10 -left-4 animate-float-slow z-10 pointer-events-none">
          <StarDecor size={32} />
        </div>
        <div className="absolute top-12 -right-6 animate-float z-10 pointer-events-none">
          <HeartDecor size={28} />
        </div>

        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary to-kawaii-skyblue p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-card/90 rounded-2xl flex items-center justify-center shadow-inner">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary-foreground">
                  {item ? 'Edit Barang' : 'Tambah Barang'}
                </h2>
                <p className="text-primary-foreground/80 text-xs font-mono uppercase tracking-wider">
                  {item ? item.nomorBarang : nextItemNumber}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="w-10 h-10 bg-card/20 hover:bg-card/40 rounded-xl flex items-center justify-center transition-all hover:rotate-90">
              <X className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
            
            {/* Input Nama Barang */}
            <div className="space-y-2">
              <Label className="text-sm font-bold ml-1">Nama Barang</Label>
              <Input 
                value={formData.namaBarang}
                onChange={(e) => setFormData(prev => ({ ...prev, namaBarang: e.target.value }))}
                placeholder="Contoh: Laptop ASUS VivoBook"
                className="rounded-2xl border-2 focus:border-primary bg-muted/20 py-6"
                required
              />
            </div>

            {/* SLOT UPLOAD / INPUT NAMA FILE MEDIA */}
            <div className="space-y-2">
              <Label className="text-sm font-bold ml-1 flex items-center gap-2 text-primary">
                <ImageIcon size={16} /> <FileVideo size={16} /> Nama File Media
              </Label>
              <Input 
                value={formData.imageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                placeholder="misal: kursi_sekre.mp4 atau meja.jpg"
                className="rounded-2xl border-2 focus:border-primary bg-muted/20 py-6"
              />
              <div className="bg-kawaii-blue/10 p-3 rounded-xl border border-kawaii-blue/20">
                <p className="text-[10px] text-muted-foreground leading-tight italic">
                  <strong>Workflow Manual CWP:</strong><br />
                  1. Upload file (JPG/GIF/MP4) ke <code>public_html/public/inventory_images/</code> via File Manager.<br />
                  2. Masukkan nama file lengkap dengan ekstensinya di sini.
                </p>
              </div>
            </div>

            {/* Grid Kategori */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-bold ml-1">Kategori</Label>
                <Select 
                  value={formData.kategori} 
                  onValueChange={(value: Category) => setFormData(prev => ({ ...prev, kategori: value, subKategori: '' }))}
                >
                  <SelectTrigger className="rounded-2xl border-2 bg-card h-12">
                    <SelectValue placeholder="Utama" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl bg-card border-2 z-[200]">
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold ml-1">Sub Kategori</Label>
                <Select 
                  value={formData.subKategori} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, subKategori: value }))}
                  disabled={!formData.kategori}
                >
                  <SelectTrigger className="rounded-2xl border-2 bg-card h-12 disabled:opacity-30">
                    <SelectValue placeholder="Detail" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl bg-card border-2 z-[200]">
                    {availableSubCategories.map(subCat => (
                      <SelectItem key={subCat} value={subCat}>{subCat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Grid Jumlah & Kondisi */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-bold ml-1">Jumlah</Label>
                <Input 
                  type="number"
                  min={1}
                  value={formData.jumlah}
                  onChange={(e) => setFormData(prev => ({ ...prev, jumlah: parseInt(e.target.value) || 1 }))}
                  className="rounded-2xl border-2 py-6"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold ml-1 text-primary">Kondisi</Label>
                <Select 
                  value={formData.kondisi} 
                  onValueChange={(value: typeof CONDITIONS[number]) => setFormData(prev => ({ ...prev, kondisi: value }))}
                >
                  <SelectTrigger className="rounded-2xl border-2 bg-card h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl bg-card border-2 z-[200]">
                    {CONDITIONS.map(cond => (
                      <SelectItem key={cond} value={cond}>{cond}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Footer Helper */}
            <div className="flex items-start gap-2 bg-kawaii-cream/40 rounded-2xl p-4 text-xs border border-accent/20">
              <HelpCircle size={16} className="text-accent flex-shrink-0" />
              <span className="text-muted-foreground leading-relaxed">
                Aset tetap organisasi E-MAILKOMP akan mendapatkan nomor barang otomatis. Pastikan kondisi barang dicek berkala.
              </span>
            </div>
          </div>

          <div className="p-6 bg-card border-t border-muted flex-shrink-0">
            <button type="submit" className="w-full bg-gradient-to-r from-primary to-kawaii-skyblue text-primary-foreground py-4 rounded-2xl font-bold text-lg shadow-float hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
              <Sparkles size={20} />
              {item ? 'Simpan Perubahan' : 'Tambah Barang Baru'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryForm;