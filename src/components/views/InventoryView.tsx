import React from 'react';
import { InventoryItem, Category, Condition } from '@/types/inventory';
import SearchFilter from '@/components/inventory/SearchFilter';
import InventoryCard from '@/components/inventory/InventoryCard';
import { Package } from 'lucide-react';
import { StarDecor } from '@/components/icons/KawaiiIcons';

interface InventoryViewProps {
  items: InventoryItem[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryFilter: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
  // Status sudah dihapus, sekarang menggunakan Condition
  conditionFilter: Condition | 'all';
  onConditionChange: (condition: Condition | 'all') => void;
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: string) => void;
}

const InventoryView: React.FC<InventoryViewProps> = ({
  items,
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  conditionFilter,
  onConditionChange,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="space-y-6">
      {/* Title Section */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center">
          <Package className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            Daftar Barang 
            <span className="text-sm font-normal text-muted-foreground">({items.length} item)</span>
          </h2>
        </div>
        <div className="ml-auto">
          <StarDecor size={24} className="animate-wiggle" />
        </div>
      </div>

      {/* Search & Filter */}
      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        categoryFilter={categoryFilter}
        onCategoryChange={onCategoryChange}
        // Sekarang mengirim props kondisi ke SearchFilter
        conditionFilter={conditionFilter}
        onConditionChange={onConditionChange}
      />

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length > 0 ? (
          items.map(item => (
            <InventoryCard
              key={item.id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="col-span-full card-kawaii p-12 text-center">
            <div className="w-20 h-20 bg-muted/50 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Tidak ada barang ditemukan</h3>
            <p className="text-muted-foreground">Coba ubah filter atau tambah barang baru</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryView;