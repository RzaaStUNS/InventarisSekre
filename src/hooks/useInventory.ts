import { useState, useEffect, useCallback, useMemo } from 'react';
import { InventoryItem, Category, Condition, Status } from '@/types/inventory';
import api from '@/lib/api';

export const useInventory = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');
  const [conditionFilter, setConditionFilter] = useState<Condition | 'all'>('all'); // State Baru

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/inventories');
      const mappedData: InventoryItem[] = response.data.map((item: any) => ({
        id: item.id.toString(),
        nomorBarang: item.nomor_barang || '-',
        namaBarang: item.nama_barang || 'Tanpa Nama',
        kategori: item.kategori,
        subKategori: item.sub_kategori,
        jumlah: item.jumlah,
        satuan: item.satuan,
        kondisi: item.kondisi,
        status: item.status,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));

      setItems(mappedData);
      setError(null);
    } catch (err) {
      console.error('Gagal ambil data:', err);
      setError('Gagal mengambil data inventory.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const addItem = useCallback(async (newItemData: any) => {
    try {
      const response = await api.post('/inventories', newItemData);
      await fetchItems(); // Refresh data untuk mendapatkan nomor barang terbaru dari server
      return response.data;
    } catch (err) {
      console.error('Gagal tambah item:', err);
      throw err;
    }
  }, [fetchItems]);

 const updateItem = useCallback(async (id: string, updates: Partial<InventoryItem>) => {
  try {
    // Gunakan POST sebagai pengganti PUT untuk mengakali limitasi server hosting
    // Kita kirim sebagai object biasa, Axios akan konversi ke JSON
    await api.post(`/inventories/${id}`, {
      ...updates,
      _method: 'PUT' // <--- Kuncinya di sini (Laravel Method Spoofing)
    });
    await fetchItems(); 
  } catch (err) {
    console.error('Gagal update item:', err);
  }
}, [fetchItems]);;

 const deleteItem = async (id: string) => {
  try {
    // Pakai POST dengan bisikan _method DELETE
    await api.post(`/inventories/${id}`, {
      _method: 'DELETE' // <--- Laravel akan menganggap ini request DELETE
    }); 
    setItems(prev => prev.filter(item => item.id !== id));
  } catch (err) {
    console.error("Gagal hapus:", err);
  }
};

  // SAFE FILTERING (Termasuk Kondisi)
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const safeNama = (item.namaBarang || '').toLowerCase();
      const safeNomor = (item.nomorBarang || '').toLowerCase();
      const safeSearch = searchQuery.toLowerCase();

      const matchesSearch = safeNama.includes(safeSearch) || safeNomor.includes(safeSearch);
      const matchesCategory = categoryFilter === 'all' || item.kategori === categoryFilter;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesCondition = conditionFilter === 'all' || item.kondisi === conditionFilter; // Filter Kondisi
      
      return matchesSearch && matchesCategory && matchesStatus && matchesCondition;
    });
  }, [items, searchQuery, categoryFilter, statusFilter, conditionFilter]);

  return {
    items: filteredItems,
    allItems: items,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    conditionFilter, // Ekspos state
    setConditionFilter, // Ekspos setter
    addItem,
    updateItem,
    deleteItem,
    refreshItems: fetchItems,
  };
};
