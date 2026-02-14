export type Category = 'Elektronik' | 'Alat Makan' | 'Alat Tulis' | 'Non Elektronik Lainnya';

// Definisikan tipe untuk Sub Kategori Map
export type SubCategoryMap = {
  'Elektronik': string[];
  'Alat Makan': string[];
  'Alat Tulis': string[];
  'Non Elektronik Lainnya': string[];
};

export const CATEGORIES: Category[] = ['Elektronik', 'Alat Makan', 'Alat Tulis', 'Non Elektronik Lainnya'];

export const SUB_CATEGORIES: SubCategoryMap = {
  'Elektronik': ['Laptop', 'Mouse', 'Keyboard', 'Monitor', 'Printer', 'Lainnya'],
  'Alat Makan': ['Sendok', 'Garpu', 'Gelas', 'Piring', 'Mug', 'Teko'],
  'Alat Tulis': ['Bolpoin', 'Pensil', 'Penghapus', 'Spidol', 'Kertas', 'Buku'],
  'Non Elektronik Lainnya': ['Perlengkapan Kebersihan', 'Furniture', 'Lainnya'],
};

export const UNITS = ['Pcs', 'Unit', 'Buah', 'Set', 'Rim', 'Box', 'Lembar', 'Gulung', 'Pack'];
export const CONDITIONS = ['Baik', 'Rusak Ringan', 'Rusak Berat', 'Dibuang'];
export const STATUSES = ['Ada', 'Hilang'];

// Kita buat type alias biar komponen lain yang import 'Status' atau 'Unit' tidak error
export type Unit = typeof UNITS[number];
export type Condition = typeof CONDITIONS[number];
export type Status = typeof STATUSES[number];

export interface InventoryItem {
  id: string;
  nomorBarang: string;
  namaBarang: string;
  kategori: Category;
  subKategori: string;
  jumlah: number;
  satuan: string;
  kondisi: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}