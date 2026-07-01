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
 * Fungsi untuk Export Data Inventory ke format CSV dengan kustomisasi kolom
 */
export const exportToCSV = (
  items: InventoryItem[], 
  filename: string = 'Data_Inventaris',
  selectedKeys: string[] = ['no', 'nomorBarang', 'namaBarang', 'kategori', 'subKategori', 'jumlah', 'satuan', 'kondisi', 'status', 'updatedAt']
) => {
  if (items.length === 0) {
    alert("Tidak ada data untuk diekspor!");
    return;
  }
  if (selectedKeys.length === 0) {
    alert("Pilih minimal 1 kolom untuk diekspor!");
    return;
  }

  // Pemetaan ID kolom ke Nama Header yang rapi di Excel
  const headerMap: Record<string, string> = {
    no: 'No',
    nomorBarang: 'Nomor Barang',
    namaBarang: 'Nama Barang',
    kategori: 'Kategori',
    subKategori: 'Sub Kategori',
    jumlah: 'Jumlah',
    satuan: 'Satuan',
    kondisi: 'Kondisi',
    status: 'Status',
    updatedAt: 'Terakhir Diupdate'
  };

  // 1. Buat Header Kolom sesuai pilihan
  const headers = selectedKeys.map(key => headerMap[key] || key);

  // 2. Petakan data ke dalam baris sesuai urutan kolom pilihan
  const rows = items.map((item, index) => {
    return selectedKeys.map(key => {
      // Handle data khusus (nomor urut, tanggal, dan angka)
      if (key === 'no') return index + 1;
      if (key === 'updatedAt') return `"${item.updatedAt ? new Date(item.updatedAt).toLocaleString('id-ID') : '-'}"`;
      if (key === 'jumlah') return item.jumlah || 0;
      
      // Ambil nilai string lainnya secara dinamis
      const val = item[key as keyof InventoryItem];
      return `"${val || '-'}"`; // Bungkus kutip ganda agar kalau ada koma di nama barang, format nggak rusak di Excel
    });
  });

  // 3. Gabungkan Header dan Baris dengan enter (\n)
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // 4. Download File CSV
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  // Format nama file dengan tanggal hari ini
  const dateStr = new Date().toISOString().slice(0, 10);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${dateStr}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};