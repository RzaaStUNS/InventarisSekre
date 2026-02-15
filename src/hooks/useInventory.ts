import { useState, useEffect, useCallback, useMemo } from 'react';
import { InventoryItem, Category, Condition, Status } from '@/types/inventory';
import api from '@/lib/api';

export const useInventory = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Admin Control State (Per Sesi)
  const [isAdmin, setIsAdmin] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');
  const [conditionFilter, setConditionFilter] = useState<Condition | 'all'>('all');

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

  // Logic Admin
  const loginAsAdmin = useCallback((password: string) => {
    if (password === 'SekreEM_Periode2026') {
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const logoutAdmin = useCallback(() => {
    setIsAdmin(false);
  }, []);

  const addItem = useCallback(async (newItemData: any) => {
    if (!isAdmin) return; // Guard logic
    try {
      const response = await api.post('/inventories', newItemData);
      await fetchItems();
      return response.data;
    } catch (err) {
      console.error('Gagal tambah item:', err);
      throw err;
    }
  }, [fetchItems, isAdmin]);

  const updateItem = useCallback(async (id: string, updates: Partial<InventoryItem>) => {
    if (!isAdmin) return;
    try {
      await api.post(`/inventories/${id}`, {
        ...updates,
        _method: 'PUT'
      });
      await fetchItems(); 
    } catch (err) {
      console.error('Gagal update item:', err);
    }
  }, [fetchItems, isAdmin]);

  const deleteItem = useCallback(async (id: string) => {
    if (!isAdmin) return;
    try {
      await api.post(`/inventories/${id}`, {
        _method: 'DELETE'
      }); 
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Gagal hapus:", err);
    }
  }, [isAdmin]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const safeNama = (item.namaBarang || '').toLowerCase();
      const safeNomor = (item.nomorBarang || '').toLowerCase();
      const safeSearch = searchQuery.toLowerCase();
      const matchesSearch = safeNama.includes(safeSearch) || safeNomor.includes(safeSearch);
      const matchesCategory = categoryFilter === 'all' || item.kategori === categoryFilter;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesCondition = conditionFilter === 'all' || item.kondisi === conditionFilter;
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
    conditionFilter,
    setConditionFilter,
    isAdmin,
    loginAsAdmin,
    logoutAdmin,
    addItem,
    updateItem,
    deleteItem,
    refreshItems: fetchItems,
  };
};
