import React, { useState } from 'react';
import { InventoryItem, Category, Condition } from '@/types/inventory';
import SearchFilter from '@/components/inventory/SearchFilter';
import InventoryCard from '@/components/inventory/InventoryCard';
import AdminLoginModal from '@/components/inventory/AdminLoginModal'; // Import Modal Baru
import { Package, Lock, Unlock } from 'lucide-react';
import { StarDecor } from '@/components/icons/KawaiiIcons';

interface InventoryViewProps {
  items: InventoryItem[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryFilter: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
  conditionFilter: Condition | 'all';
  onConditionChange: (condition: Condition | 'all') => void;
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: string) => void;
  isAdmin: boolean;
  onAdminLogin: (password: string) => boolean;
  onAdminLogout: () => void;
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
  isAdmin,
  onAdminLogin,
  onAdminLogout,
}) => {
  // State untuk kontrol Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdminToggle = () => {
    if (isAdmin) {
      onAdminLogout();
    } else {
      setIsModalOpen(true); // Buka modal estetik, bukan prompt jelek
    }
  };

  const handleLoginProcess = (password: string) => {
    if (onAdminLogin(password)) {
      setIsModalOpen(false); // Tutup modal jika sukses
    } else {
      alert("Password Salah! ❌"); // Nanti bisa diganti pakai Toast biar makin keren
    }
  };

  return (
    <div className="space-y-6">
      {/* Modal Admin Control */}
      <AdminLoginModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onLogin={handleLoginProcess} 
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center">
          <Package className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            Daftar Barang 
            <span className="text-sm font-normal text-muted-foreground">({items.length} item)</span>
          </h2>
        </div>
        
        {/* Tombol Admin Control yang sudah Estetik */}
        <button
          onClick={handleAdminToggle}
          className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 shadow-sm ${
            isAdmin 
            ? 'bg-destructive text-destructive-foreground hover:scale-105 active:scale-95' 
            : 'bg-kawaii-blue text-white hover:bg-kawaii-blue/80 hover:scale-105 active:scale-95 shadow-cute'
          }`}
        >
          {isAdmin ? (
            <><Unlock size={16} /> Disable Admin</>
          ) : (
            <><Lock size={16} /> Admin Control</>
          )}
        </button>

        <div className="hidden sm:block">
          <StarDecor size={24} className="animate-wiggle" />
        </div>
      </div>

      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        categoryFilter={categoryFilter}
        onCategoryChange={onCategoryChange}
        conditionFilter={conditionFilter}
        onConditionChange={onConditionChange}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length > 0 ? (
          items.map(item => (
            <InventoryCard
              key={item.id}
              item={item}
              onEdit={isAdmin ? onEdit : undefined}
              onDelete={isAdmin ? onDelete : undefined}
            />
          ))
        ) : (
          <div className="col-span-full card-kawaii p-12 text-center border-2 border-dashed border-muted">
            <div className="w-20 h-20 bg-muted/50 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Tidak ada barang ditemukan</h3>
            <p className="text-muted-foreground">Coba ubah filter atau aktifkan Admin Mode</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryView;
