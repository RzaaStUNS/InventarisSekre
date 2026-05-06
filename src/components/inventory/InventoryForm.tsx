import React, { useState, useEffect, useRef } from 'react';
import { InventoryItem, CATEGORIES, SUB_CATEGORIES, UNITS, CONDITIONS, Category } from '@/types/inventory';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Sparkles, Camera, FileVideo, ImageIcon, AlertCircle } from 'lucide-react'; 
import { StarDecor, HeartDecor } from '@/components/icons/KawaiiIcons';

interface InventoryFormProps {
  item?: InventoryItem | null;
  nextItemNumber: string;
  onSubmit: (formData: FormData) => void;
  onClose: () => void;
}

const InventoryForm: React.FC<InventoryFormProps> = ({ item, nextItemNumber, onSubmit, onClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    namaBarang: '',
    kategori: '' as Category | '',
    subKategori: '',
    jumlah: 1,
    satuan: 'Pcs' as typeof UNITS[number],
    kondisi: 'Baik' as typeof CONDITIONS[number],
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(item?.imageUrl || null);

  useEffect(() => {
    if (item) {
      setFormData({
        namaBarang: item.namaBarang,
        kategori: item.kategori,
        subKategori: item.subKategori,
        jumlah: item.jumlah,
        satuan: item.satuan,
        kondisi: item.kondisi as any,
      });
      setPreviewUrl(item.imageUrl || null);
    }
  }, [item]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl('video-active');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.kategori) return;

    const data = new FormData();
    data.append('nama_barang', formData.namaBarang);
    data.append('kategori', formData.kategori);
    data.append('sub_kategori', formData.subKategori);
    data.append('jumlah', formData.jumlah.toString());
    data.append('satuan', formData.satuan);
    data.append('kondisi', formData.kondisi);
    
    if (selectedFile) {
      data.append('image', selectedFile); // Key 'image' harus sama dengan di Controller Laravel
    }

    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
      <div className="bg-card rounded-3xl shadow-float max-w-lg w-full max-h-[95vh] flex flex-col relative overflow-hidden border-4 border-white">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-kawaii-skyblue p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-card/90 rounded-2xl flex items-center justify-center">
                <Camera className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary-foreground">{item ? 'Edit Aset' : 'Aset Baru'}</h2>
                <p className="text-primary-foreground/80 text-xs font-mono">{item ? item.nomorBarang : nextItemNumber}</p>
              </div>
            </div>
            <button onClick={onClose} className="w-10 h-10 bg-card/20 rounded-xl flex items-center justify-center"><X className="text-primary-foreground" /></button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
            
            {/* UPLOAD AREA */}
            <div className="space-y-2">
              <Label className="text-sm font-bold ml-1">Media (Foto/Video/GIF)</Label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="group relative w-full h-44 rounded-3xl border-4 border-dashed border-muted hover:border-primary bg-muted/20 transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden"
              >
                {previewUrl ? (
                  previewUrl === 'video-active' ? (
                    <div className="flex flex-col items-center text-primary">
                      <FileVideo size={48} className="animate-bounce" />
                      <span className="text-xs font-bold mt-2">Video: {selectedFile?.name}</span>
                    </div>
                  ) : (
                    <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                  )
                ) : (
                  <>
                    <Camera size={40} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    <p className="mt-2 text-[10px] font-bold text-muted-foreground uppercase">Klik Kamera / Galeri</p>
                  </>
                )}
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*,video/mp4" 
                  capture="environment" 
                  className="hidden" 
                  onChange={handleFileSelect} 
                />
              </div>
            </div>

            {/* Nama Barang */}
            <div className="space-y-2">
              <Label className="text-sm font-bold ml-1">Nama Barang</Label>
              <Input 
                value={formData.namaBarang}
                onChange={(e) => setFormData(prev => ({ ...prev, namaBarang: e.target.value }))}
                placeholder="Misal: Monitor Samsung 24 Inch"
                className="rounded-2xl border-2 py-6"
                required
              />
            </div>

            {/* Grid Kategori */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-bold ml-1">Kategori</Label>
                <Select value={formData.kategori} onValueChange={(v: Category) => setFormData(prev => ({ ...prev, kategori: v, subKategori: '' }))}>
                  <SelectTrigger className="rounded-2xl border-2 h-12"><SelectValue placeholder="Pilih" /></SelectTrigger>
                  <SelectContent className="z-[200]">
                    {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold ml-1">Sub Kategori</Label>
                <Select value={formData.subKategori} onValueChange={(v) => setFormData(prev => ({ ...prev, subKategori: v }))} disabled={!formData.kategori}>
                  <SelectTrigger className="rounded-2xl border-2 h-12"><SelectValue placeholder="Pilih" /></SelectTrigger>
                  <SelectContent className="z-[200]">
                    {(formData.kategori ? SUB_CATEGORIES[formData.kategori] : []).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Jumlah & Kondisi */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-bold ml-1">Jumlah</Label>
                <Input type="number" min={1} value={formData.jumlah} onChange={(e) => setFormData(prev => ({ ...prev, jumlah: parseInt(e.target.value) || 1 }))} className="rounded-2xl border-2 py-6" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold ml-1">Kondisi</Label>
                <Select value={formData.kondisi} onValueChange={(v: any) => setFormData(prev => ({ ...prev, kondisi: v }))}>
                  <SelectTrigger className="rounded-2xl border-2 h-12"><SelectValue /></SelectTrigger>
                  <SelectContent className="z-[200]">
                    {CONDITIONS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="p-6 bg-card border-t flex-shrink-0">
            <button type="submit" className="w-full bg-gradient-to-r from-primary to-kawaii-skyblue text-white py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
              <Sparkles size={20} /> {item ? 'Perbarui Data' : 'Simpan ke Inventaris'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryForm;