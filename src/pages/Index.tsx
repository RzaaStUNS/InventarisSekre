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

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const {
    items,
    allItems,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    // Status filter dihapus dari sini
    conditionFilter,
    setConditionFilter,
    addItem,
    updateItem,
    deleteItem,
  } = useInventory();

  const handleAddItem = async (data: Omit<InventoryItem, 'id' | 'nomorBarang' | 'createdAt' | 'updatedAt'>) => {
    try {
      await addItem(data);
      setShowForm(false);
    } catch (error) {
      console.error("Gagal menambah item", error);
    }
  };

  const handleEditItem = async (data: Omit<InventoryItem, 'id' | 'nomorBarang' | 'createdAt' | 'updatedAt'>) => {
    if (editingItem) {
      try {
        await updateItem(editingItem.id, data);
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

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView allItems={allItems} />;
      case 'inventory':
        return (
          <InventoryView
            items={items}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoryFilter={categoryFilter}
            onCategoryChange={(val) => setCategoryFilter(val as Category | 'all')}
            // Bagian Status dihapus total
            conditionFilter={conditionFilter}
            onConditionChange={(val) => setConditionFilter(val as Condition | 'all')}
            onEdit={handleOpenEdit}
            onDelete={deleteItem}
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
          {renderActiveView()}
        </main>
      </div>

      <FloatingActionButton onClick={() => setShowForm(true)} />
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {showForm && (
        <InventoryForm
          item={editingItem}
          nextItemNumber={editingItem ? editingItem.nomorBarang : "Auto-Generated"}
          onSubmit={editingItem ? handleEditItem : handleAddItem}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default Index;