import React from 'react';
import { InventoryItem } from '@/types/inventory';
import { getSubCategoryIcon, CheckIcon, CrossIcon } from '@/components/icons/KawaiiIcons';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2 } from 'lucide-react';

interface InventoryCardProps {
  item: InventoryItem;
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: string) => void;
}

const InventoryCard: React.FC<InventoryCardProps> = ({ item, onEdit, onDelete }) => {
  return (
    <div className="card-kawaii p-5 relative overflow-hidden group">
      {/* Decorative corner ribbon */}
      <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/30 rounded-full blur-xl" />
      
      {/* Header with icon and ID */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-kawaii-lightblue to-kawaii-blue flex items-center justify-center shadow-cute">
            {getSubCategoryIcon(item.subKategori, 32)}
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">{item.nomorBarang}</p>
            <h3 className="font-bold text-foreground text-lg leading-tight">{item.namaBarang}</h3>
          </div>
        </div>
        
        {/* Status badge */}
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

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
        <div className="bg-muted/50 rounded-xl px-3 py-2">
          <span className="text-muted-foreground text-xs">Kategori</span>
          <p className="font-semibold">{item.kategori}</p>
        </div>
        <div className="bg-muted/50 rounded-xl px-3 py-2">
          <span className="text-muted-foreground text-xs">Sub Kategori</span>
          <p className="font-semibold">{item.subKategori}</p>
        </div>
        <div className="bg-muted/50 rounded-xl px-3 py-2">
          <span className="text-muted-foreground text-xs">Jumlah</span>
          <p className="font-semibold">{item.jumlah} {item.satuan}</p>
        </div>
        <div className="bg-muted/50 rounded-xl px-3 py-2">
          <span className="text-muted-foreground text-xs">Kondisi</span>
          <p className={`font-semibold ${
            item.kondisi === 'Baik' ? 'text-success-foreground' : 
            item.kondisi === 'Rusak Ringan' ? 'text-warning-foreground' : 'text-danger-foreground'
          }`}>{item.kondisi}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
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
    </div>
  );
};

export default InventoryCard;
