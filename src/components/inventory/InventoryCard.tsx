import React from 'react';
import { InventoryItem } from '@/types/inventory';
import { getSubCategoryIcon, CheckIcon, CrossIcon } from '@/components/icons/KawaiiIcons';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, CalendarDays, Clock, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface InventoryCardProps {
  item: InventoryItem;
  onEdit?: (item: InventoryItem) => void;
  onDelete?: (id: string) => void;
}

const InventoryCard: React.FC<InventoryCardProps> = ({ item, onEdit, onDelete }) => {
  // Fungsi pembantu untuk format tanggal
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    try {
      return format(new Date(dateString), 'dd MMM yyyy', { locale: id });
    } catch {
      return '-';
    }
  };

  return (
    <div className="card-kawaii p-5 relative overflow-hidden group">
      {/* Dekorasi Background */}
      <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/30 rounded-full blur-xl" />
      
      {/* Header Section */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* KONTAINER GAMBAR / ICON */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-kawaii-lightblue to-kawaii-blue flex items-center justify-center shadow-cute overflow-hidden border-2 border-white/50 relative">
            {item.imageUrl ? (
              <img 
                src={item.imageUrl} 
                alt={item.namaBarang} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  // Jika gambar gagal dimuat (link mati), tampilkan icon saja
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              getSubCategoryIcon(item.subKategori, 32)
            )}
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground">{item.nomorBarang}</p>
            <h3 className="font-bold text-foreground text-lg leading-tight">{item.namaBarang}</h3>
          </div>
        </div>
        
        {/* Status Badge */}
        <Badge 
          variant="outline" 
          className={`${
            item.status === 'Ada' 
              ? 'bg-success/20 text-success-foreground border-success' 
              : 'bg-danger/20 text-danger-foreground border-danger'
          } font-semibold px-3 py-1 rounded-full flex items-center gap-1`}
        >
          {item.status === 'Ada' ? <CheckIcon size={14} /> : <CrossIcon size={14} />}
          {item.status}
        </Badge>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
        <div className="bg-muted/50 rounded-xl px-3 py-2">
          <span className="text-muted-foreground text-xs uppercase font-bold">Kategori</span>
          <p className="font-semibold truncate">{item.kategori}</p>
        </div>
        <div className="bg-muted/50 rounded-xl px-3 py-2">
          <span className="text-muted-foreground text-xs uppercase font-bold">Sub Kategori</span>
          <p className="font-semibold truncate">{item.subKategori}</p>
        </div>
        <div className="bg-muted/50 rounded-xl px-3 py-2">
          <span className="text-muted-foreground text-xs uppercase font-bold">Jumlah</span>
          <p className="font-semibold">{item.jumlah} {item.satuan}</p>
        </div>
        <div className="bg-muted/50 rounded-xl px-3 py-2">
          <span className="text-muted-foreground text-xs uppercase font-bold">Kondisi</span>
          <p className={`font-semibold ${
            item.kondisi === 'Baik' ? 'text-success-foreground' : 
            item.kondisi === 'Rusak Ringan' ? 'text-warning-foreground' : 'text-danger-foreground'
          }`}>{item.kondisi}</p>
        </div>
      </div>

      {/* Timestamp Section */}
      <div className="mt-4 pt-3 border-t border-dashed border-muted flex flex-col gap-1.5 text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
        <div className="flex items-center gap-1.5">
          <CalendarDays size={12} className="text-primary/60" />
          <span>Dibuat: {formatDate(item.createdAt)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={12} className="text-secondary" />
          <span>Update: {formatDate(item.updatedAt)}</span>
        </div>
      </div>

      {/* Action Buttons (Admin Only) */}
      {onEdit && onDelete && (
        <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button 
            onClick={() => onEdit(item)}
            className="flex-1 btn-kawaii bg-primary text-primary-foreground py-2 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold"
          >
            <Edit2 size={16} />
            Edit
          </button>
          <button 
            onClick={() => onDelete(item.id)}
            className="btn-kawaii bg-destructive text-destructive-foreground py-2 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default InventoryCard;