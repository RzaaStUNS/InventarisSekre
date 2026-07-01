import React, { useState } from 'react';
import { useInventory } from '@/hooks/useInventory';
import { InventoryItem, Category, Condition } from '@/types/inventory';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import FloatingActionButton from '@/components/layout/FloatingActionButton';
import FloatingBackground from '@/components/inventory/FloatingBackground';
import InventoryForm from '@/components/inventory/InventoryForm';
import DashboardView from '@/components/views/DashboardView';
import InventoryView from '@/components/views/InventoryView';
import StatisticsView from '@/components/views/StatisticsView';
import SettingsView from '@/components/views/SettingsView';
import { Download, X, CheckSquare, Square } from 'lucide-react'; 

// Daftar kolom yang tersedia untuk diekspor ke Excel/CSV
const AVAILABLE_COLUMNS = [
  { id: 'no', label: 'Nomor Urut' },
  { id: 'nomorBarang', label: 'Nomor Barang' },
  { id: 'namaBarang', label: 'Nama Barang' },
  { id: 'kategori', label: 'Kategori' },
  { id: 'subKategori', label: 'Sub Kategori' },
  { id: 'jumlah', label: 'Jumlah' },
  { id: 'satuan', label: 'Satuan' },
  { id: 'kondisi', label: 'Kondisi' },
  { id: 'status', label: 'Status' },
  { id: 'updatedAt', label: 'Terakhir Diupdate' },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  
  // State untuk Modal Export Custom
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    AVAILABLE_COLUMNS.map(c => c.id) // Default: centang semua kolom
  );

  const {
    items,
    allItems,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    subCategoryFilter,
    setSubCategoryFilter,
    conditionFilter,
    setConditionFilter,
    sortBy,
    setSortBy,
    addItem,
    updateItem,
    deleteItem,
    isAdmin,
    loginAsAdmin,
    logoutAdmin,
    exportData // Fungsi export dari hook
  } = useInventory();

  // --- HANDLER EXPORT CUSTOM ---
  const toggleColumn = (id: string) => {
    setSelectedColumns(prev => 
      prev.includes(id) ? prev.filter(col => col !== id) : [...prev, id]
    );
  };

  const handleConfirmExport = () => {
    exportData(selectedColumns);
    setShowExportModal(false);
  };

  // --- HANDLER CRUD ---
  const handleAddItem = async (data: Omit<InventoryItem, 'id' | 'nomorBarang' | 'createdAt' | 'updatedAt'>) => {
    try {
      // Kita bungkus data menjadi FormData agar support upload file/video
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });
      
      // Jika ada file image yang di-pass, pastikan dia ditangkap di InventoryForm
      // dan di-append ke formData di sini (sudah dihandle di dalam form sebelumnya).
      
      // Karena fungsi di hook kita sudah minta FormData, kita lempar FormData-nya
      await addItem(formData as any); 
      setShowForm(false);
    } catch (error) {
      console.error("Gagal menambah item", error);
    }
  };

  const handleEditItem = async (data: Omit<InventoryItem, 'id' | 'nomorBarang' | 'createdAt' | 'updatedAt'>) => {
    if (editingItem) {
      try {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, value.toString());
          }
        });
        
        await updateItem(editingItem.id, formData as any);
        setEditingItem(null);
        setShowForm(false);
      } catch (error) {
        console.error("Gagal mengedit item", error);
      }
    }
  };

  const handleOpenEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  // --- RENDER VIEWS ---
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView allItems={allItems} />;
      case 'inventory':
        return (
          <InventoryView
            items={items}
            allItems={allItems}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoryFilter={categoryFilter}
            onCategoryChange={(val) => setCategoryFilter(val as Category | 'all')}
            subCategoryFilter={subCategoryFilter}
            onSubCategoryChange={setSubCategoryFilter}
            conditionFilter={conditionFilter}
            onConditionChange={(val) => setConditionFilter(val as Condition | 'all')}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onEdit={handleOpenEdit}
            onDelete={deleteItem}
            isAdmin={isAdmin}
            onAdminLogin={loginAsAdmin}
            onAdminLogout={logoutAdmin}
          />
        );
      case 'stats':
        return <StatisticsView allItems={allItems} />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView allItems={allItems} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <FloatingBackground />
      <div className="relative z-10 pb-32">
        <Header totalItems={allItems.length} />
        
        <main className="max-w-6xl mx-auto px-4">
          
          {/* TOMBOL EXPORT: Hanya Muncul di Tab Inventory */}
          {activeTab === 'inventory' && (
            <div className="flex justify-end mb-4 relative z-20">
              <button 
                onClick={() => setShowExportModal(true)} 
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-bold text-sm rounded-2xl shadow-float hover:scale-105 active:scale-95 transition-all border-2 border-white/20"
              >
                <Download size={18} />
                Export CSV
              </button>
            </div>
          )}

          {renderActiveView()}
        </main>
      </div>

      {isAdmin && (
        <FloatingActionButton onClick={() => setShowForm(true)} />
      )}
      
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* MODAL FORM TAMBAH/EDIT BARANG */}
      {showForm && (
        <InventoryForm
          item={editingItem}
          nextItemNumber={editingItem ? editingItem.nomorBarang : "Auto-Generated"}
          // Catatan: Karena onSubmit di InventoryForm sekarang mengirim FormData, 
          // pastikan type-nya sinkron (di handleAddItem/EditItem kita casting atau sesuaikan)
          onSubmit={editingItem ? (handleEditItem as any) : (handleAddItem as any)}
          onClose={handleCloseForm}
        />
      )}

      {/* MODAL PILIH KOLOM EXPORT */}
      {showExportModal && (
        <div className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-card rounded-3xl shadow-float max-w-sm w-full overflow-hidden border-4 border-white flex flex-col animate-in fade-in zoom-in duration-200">
            {/* Header Modal */}
            <div className="bg-gradient-to-r from-primary to-kawaii-skyblue p-5 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Download size={20} /> Opsi Export Data
              </h3>
              <button 
                onClick={() => setShowExportModal(false)} 
                className="text-white hover:rotate-90 transition-transform"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Body Modal (Checkbox) */}
            <div className="p-5 space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <p className="text-sm font-bold text-muted-foreground mb-4">Pilih kolom yang ingin di-download:</p>
              
              <div className="grid grid-cols-2 gap-3">
                {AVAILABLE_COLUMNS.map(col => {
                  const isSelected = selectedColumns.includes(col.id);
                  return (
                    <button
                      key={col.id}
                      onClick={() => toggleColumn(col.id)}
                      className={`flex items-center gap-2 p-3 rounded-xl border-2 text-left transition-all text-xs font-semibold
                        ${isSelected 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-muted bg-muted/20 text-muted-foreground hover:bg-muted/50'
                        }
                      `}
                    >
                      {isSelected ? <CheckSquare size={16} className="shrink-0" /> : <Square size={16} className="shrink-0" />}
                      <span className="truncate">{col.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer Modal */}
            <div className="p-5 bg-card border-t border-muted">
              <button 
                onClick={handleConfirmExport}
                disabled={selectedColumns.length === 0}
                className="w-full bg-gradient-to-r from-primary to-kawaii-skyblue text-primary-foreground py-3 rounded-2xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 transition-all"
              >
                Download Laporan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;