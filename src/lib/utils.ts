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
 * Fungsi untuk Export Data Inventory ke format CSV (Pecah Baris Berdasarkan Jumlah)
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

  // --- LOGIKA BARU: PECAH DATA BERDASARKAN JUMLAH ---
  const expandedItems: InventoryItem[] = [];
  
  items.forEach(item => {
    // Pastikan angka valid. Kalau jumlahnya 0 atau kosong, minimal tetap diekspor 1 baris
    const qty = Number(item.jumlah) > 0 ? Number(item.jumlah) : 1;
    
    // Looping sebanyak jumlah barang
    for (let i = 0; i < qty; i++) {
      // Kita masukkan ke array baru.
      // Nilai "jumlah" kita ubah jadi 1 karena ini mewakili 1 unit fisik per baris
      expandedItems.push({ ...item, jumlah: 1 });
    }
  });

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

  // 2. Petakan data ke dalam baris menggunakan array yang sudah dipecah (expandedItems)
  const rows = expandedItems.map((item, index) => {
    return selectedKeys.map(key => {
      if (key === 'no') return index + 1; // Nomor urut akan menyesuaikan total baris baru
      if (key === 'updatedAt') return `"${item.updatedAt ? new Date(item.updatedAt).toLocaleString('id-ID') : '-'}"`;
      if (key === 'jumlah') return item.jumlah;
      
      const val = item[key as keyof InventoryItem];
      // Bersihkan enter (\n) jika ada agar tidak merusak baris di Excel
      const cleanVal = String(val || '-').replace(/\r?\n/g, ' ');
      
      return `"${cleanVal}"`; 
    });
  });

  // 3. Gabungkan Header dan Baris dengan Titik Koma (;) standar region Indonesia
  const delimiter = ';';
  const csvContent = [
    headers.join(delimiter),
    ...rows.map(row => row.join(delimiter))
  ].join('\n');

  // 4. Tambahkan BOM (\uFEFF) agar Excel membacanya dengan rapi (UTF-8)
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  // Format nama file
  const dateStr = new Date().toISOString().slice(0, 10);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${dateStr}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
