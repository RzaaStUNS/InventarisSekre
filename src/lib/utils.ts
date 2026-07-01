import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { InventoryItem } from '@/types/inventory';

/**
 * Fungsi bawaan Shadcn UI / Tailwind untuk menggabungkan nama class
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Fungsi untuk Export Data Inventory ke format CSV (Bisa dibuka di Excel/Spreadsheet)
 */
export const exportToCSV = (items: InventoryItem[], filename: string = 'Data_Inventaris') => {
  if (items.length === 0) {
    alert("Tidak ada data untuk diekspor!");
    return;
  }

  // 1. Buat Header Kolom
  const headers = [
    'No',
    'Nomor Barang',
    'Nama Barang',
    'Kategori',
    'Sub Kategori',
    'Jumlah',
    'Satuan',
    'Kondisi',
    'Status',
    'Terakhir Diupdate'
  ];

  // 2. Petakan data ke dalam baris
  // Kita bungkus pakai tanda kutip ganda ("") supaya kalau ada koma di nama barang, formatnya nggak rusak di Excel
  const rows = items.map((item, index) => [
    index + 1,
    `"${item.nomorBarang || '-'}"`,
    `"${item.namaBarang || '-'}"`,
    `"${item.kategori || '-'}"`,
    `"${item.subKategori || '-'}"`,
    item.jumlah || 0,
    `"${item.satuan || '-'}"`,
    `"${item.kondisi || '-'}"`,
    `"${item.status || '-'}"`,
    `"${item.updatedAt ? new Date(item.updatedAt).toLocaleString('id-ID') : '-'}"`
  ]);

  // 3. Gabungkan Header dan Baris dengan enter (\n)
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // 4. Trigger Download File CSV
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  // Format nama file dengan tanggal hari ini (contoh: Data_Inventaris_2026-07-01.csv)
  const dateStr = new Date().toISOString().slice(0, 10);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${dateStr}.csv`);
  link.style.visibility = 'hidden';
  
  // Proses eksekusi download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};