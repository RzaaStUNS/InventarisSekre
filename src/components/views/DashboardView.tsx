import React from 'react';
import { InventoryItem } from '@/types/inventory';
import { Package, TrendingUp, AlertTriangle, Sparkles, Clock, CheckCircle } from 'lucide-react';
import { FlowerDecor, StarDecor, HeartDecor, CloudDecor } from '@/components/icons/KawaiiIcons';

interface DashboardViewProps {
  allItems: InventoryItem[];
}

const DashboardView: React.FC<DashboardViewProps> = ({ allItems }) => {
  const totalItems = allItems.length;
  const totalQuantity = allItems.reduce((acc, item) => acc + item.jumlah, 0);
  const missingItems = allItems.filter(item => item.status === 'Hilang').length;
  const damagedItems = allItems.filter(item => item.kondisi !== 'Baik').length;
  const goodItems = allItems.filter(item => item.kondisi === 'Baik' && item.status === 'Ada').length;

  // Get recent items (last 5)
  const recentItems = [...allItems]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Category breakdown
  const categoryBreakdown = allItems.reduce((acc, item) => {
    acc[item.kategori] = (acc[item.kategori] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="card-kawaii p-6 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 relative overflow-hidden">
        <div className="absolute top-4 right-4 opacity-60">
          <Sparkles className="w-8 h-8 text-primary animate-pulse" />
        </div>
        <div className="absolute bottom-2 right-12 opacity-40">
          <CloudDecor size={40} />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
          Selamat Datang!
        </h2>
        <p className="text-muted-foreground">
          Sistem Pengelolaan Inventaris E-Mailkomp
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card-kawaii p-4 relative overflow-hidden group hover:scale-105 transition-transform">
          <div className="absolute top-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity">
            <StarDecor size={20} className="animate-wiggle" />
          </div>
          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-3">
            <Package className="w-6 h-6 text-primary" />
          </div>
          <p className="text-3xl font-bold text-foreground">{totalItems}</p>
          <p className="text-sm text-muted-foreground">Jenis Barang</p>
        </div>

        <div className="card-kawaii p-4 relative overflow-hidden group hover:scale-105 transition-transform">
          <div className="absolute top-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity">
            <FlowerDecor size={20} className="animate-wiggle" />
          </div>
          <div className="w-12 h-12 bg-secondary/40 rounded-2xl flex items-center justify-center mb-3">
            <TrendingUp className="w-6 h-6 text-secondary-foreground" />
          </div>
          <p className="text-3xl font-bold text-foreground">{totalQuantity}</p>
          <p className="text-sm text-muted-foreground">Total Unit</p>
        </div>

        <div className="card-kawaii p-4 relative overflow-hidden group hover:scale-105 transition-transform">
          <div className="absolute top-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity">
            <HeartDecor size={20} className="animate-wiggle" />
          </div>
          <div className="w-12 h-12 bg-success/30 rounded-2xl flex items-center justify-center mb-3">
            <CheckCircle className="w-6 h-6 text-success-foreground" />
          </div>
          <p className="text-3xl font-bold text-foreground">{goodItems}</p>
          <p className="text-sm text-muted-foreground">Kondisi Baik</p>
        </div>

        <div className="card-kawaii p-4 relative overflow-hidden group hover:scale-105 transition-transform">
          <div className="absolute top-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity">
            <StarDecor size={20} className="animate-wiggle" />
          </div>
          <div className="w-12 h-12 bg-danger/20 rounded-2xl flex items-center justify-center mb-3">
            <AlertTriangle className="w-6 h-6 text-danger-foreground" />
          </div>
          <p className="text-3xl font-bold text-foreground">{missingItems + damagedItems}</p>
          <p className="text-sm text-muted-foreground">Perlu Perhatian</p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Items */}
        <div className="card-kawaii p-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Barang Terbaru</h3>
          </div>
          <div className="space-y-3">
            {recentItems.length > 0 ? (
              recentItems.map(item => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Package className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{item.namaBarang}</p>
                      <p className="text-xs text-muted-foreground">{item.kategori}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'Ada' 
                      ? 'bg-success/20 text-success-foreground' 
                      : 'bg-danger/20 text-danger-foreground'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Belum ada barang</p>
              </div>
            )}
          </div>
        </div>

        {/* Category Summary */}
        <div className="card-kawaii p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-bold text-foreground">Kategori Barang</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(categoryBreakdown).length > 0 ? (
              Object.entries(categoryBreakdown).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-sm text-foreground">{category}</span>
                  </div>
                  <span className="text-sm font-bold text-muted-foreground">{count} item</span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Sparkles className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Belum ada kategori</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="card-kawaii p-5 bg-gradient-to-r from-warning/10 to-secondary/10">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-warning/30 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-warning-foreground" />
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-1">Tips Hari Ini!</h4>
            <p className="text-sm text-muted-foreground">
              Jangan lupa untuk mengecek kondisi barang secara berkala dan update status jika ada perubahan~
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
