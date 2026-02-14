import React, { useState, useEffect } from 'react';
import { InventoryItem, CATEGORIES, SUB_CATEGORIES, UNITS, CONDITIONS, Category } from '@/types/inventory';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Sparkles, HelpCircle } from 'lucide-react';
import { StarDecor, HeartDecor, FlowerDecor } from '@/components/icons/KawaiiIcons';

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
      });
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.kategori) return;
    onSubmit(formData as Omit<InventoryItem, 'id' | 'nomorBarang' | 'createdAt' | 'updatedAt'>);
  };

  const availableSubCategories = formData.kategori ? SUB_CATEGORIES[formData.kategori] : [];

  return (
    <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
      {/* Container Utama dengan max-height terkunci */}
      <div className="bg-card rounded-3xl shadow-float max-w-lg w-full max-h-[90vh] flex flex-col relative overflow-hidden border-4 border-white">
        
        {/* Dekorasi (Tetap ada karena absolute terhadap container) */}
        <div className="absolute top-10 -left-4 animate-float-slow z-10 pointer-events-none">
          <StarDecor size={32} />
        </div>
        <div className="absolute top-12 -right-6 animate-float z-10 pointer-events-none">
          <HeartDecor size={28} />
        </div>

        {/* Header - STICKY (Tidak ikut ter-scroll) */}
        <div className="bg-gradient-to-r from-primary to-kawaii-skyblue p-6 rounded-t-[1.4rem] flex-shrink-0">
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
            <button 
              onClick={onClose}
              className="w-10 h-10 bg-card/20 hover:bg-card/40 rounded-xl flex items-center justify-center transition-all hover:rotate-90"
            >
              <X className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>
        </div>

        {/* Area Form yang Bisa Di-scroll */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
            
            {/* Nama Barang */}
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

            {/* Grid Kategori & Sub (Biar tidak memanjang ke bawah) */}
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

            {/* Grid Jumlah & Satuan */}
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
                <Label className="text-sm font-bold ml-1">Satuan</Label>
                <Select 
                  value={formData.satuan} 
                  onValueChange={(value: typeof UNITS[number]) => setFormData(prev => ({ ...prev, satuan: value }))}
                >
                  <SelectTrigger className="rounded-2xl border-2 bg-card h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl bg-card border-2 z-[200]">
                    {UNITS.map(unit => (
                      <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Kondisi dengan desain Button Group agar hemat tempat */}
            <div className="space-y-2">
              <Label className="text-sm font-bold ml-1 text-primary">Kondisi Barang</Label>
              <div className="grid grid-cols-2 gap-2">
                {CONDITIONS.map(cond => (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => setFormData({ ...formData, kondisi: cond as any })}
                    className={`py-3 px-2 text-xs font-bold rounded-2xl border-2 transition-all active:scale-95 ${
                      formData.kondisi === cond 
                        ? 'border-primary bg-primary/10 text-primary shadow-sm' 
                        : 'border-muted bg-card text-muted-foreground'
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            {/* Tips Helper - Tetap di dalam scroll agar tidak menutupi tombol simpan */}
            <div className="flex items-start gap-2 bg-kawaii-cream/40 rounded-2xl p-4 text-xs border border-accent/20">
              <HelpCircle size={16} className="text-accent flex-shrink-0" />
              <span className="text-muted-foreground leading-relaxed">
                Aset tetap (Elektronik/Furniture) akan mendapatkan nomor otomatis secara permanen. Barang habis pakai (Alat Tulis) sebaiknya dicek kondisinya secara berkala.
              </span>
            </div>
          </div>

          {/* Footer / Submit - STICKY (Tetap di bawah) */}
          <div className="p-6 bg-card border-t border-muted flex-shrink-0">
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-kawaii-skyblue text-primary-foreground py-4 rounded-2xl font-bold text-lg shadow-float hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
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