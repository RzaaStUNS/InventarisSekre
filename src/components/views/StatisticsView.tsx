import React from 'react';
import { InventoryItem } from '@/types/inventory';
import { BarChart3, PieChart, Package, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { FlowerDecor, StarDecor, HeartDecor, CloudDecor } from '@/components/icons/KawaiiIcons';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface StatisticsViewProps {
  allItems: InventoryItem[];
}

const StatisticsView: React.FC<StatisticsViewProps> = ({ allItems }) => {
  // Category data for pie chart
  const categoryData = Object.entries(
    allItems.reduce((acc, item) => {
      acc[item.kategori] = (acc[item.kategori] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  // Status data
  const statusData = [
    { name: 'Tersedia', value: allItems.filter(i => i.status === 'Ada').length, color: 'hsl(var(--success))' },
    { name: 'Hilang', value: allItems.filter(i => i.status === 'Hilang').length, color: 'hsl(var(--danger))' },
  ];

  // Condition data
  const conditionData = [
    { name: 'Baik', value: allItems.filter(i => i.kondisi === 'Baik').length },
    { name: 'Rusak Ringan', value: allItems.filter(i => i.kondisi === 'Rusak Ringan').length },
    { name: 'Rusak Berat', value: allItems.filter(i => i.kondisi === 'Rusak Berat').length },
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--warning))'];

  const totalItems = allItems.length;
  const totalQuantity = allItems.reduce((acc, item) => acc + item.jumlah, 0);
  const availableItems = allItems.filter(i => i.status === 'Ada').length;
  const goodCondition = allItems.filter(i => i.kondisi === 'Baik').length;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-accent/30 rounded-2xl flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-accent-foreground" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Statistik Inventaris</h2>
        <div className="ml-auto">
          <FlowerDecor size={24} className="animate-wiggle" />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card-kawaii p-4 text-center relative overflow-hidden">
          <div className="absolute top-1 right-1 opacity-40">
            <StarDecor size={16} />
          </div>
          <Package className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{totalItems}</p>
          <p className="text-xs text-muted-foreground">Total Jenis</p>
        </div>
        <div className="card-kawaii p-4 text-center relative overflow-hidden">
          <div className="absolute top-1 right-1 opacity-40">
            <HeartDecor size={16} />
          </div>
          <TrendingUp className="w-8 h-8 text-secondary-foreground mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{totalQuantity}</p>
          <p className="text-xs text-muted-foreground">Total Unit</p>
        </div>
        <div className="card-kawaii p-4 text-center relative overflow-hidden">
          <div className="absolute top-1 right-1 opacity-40">
            <CloudDecor size={16} />
          </div>
          <CheckCircle className="w-8 h-8 text-success-foreground mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{availableItems}</p>
          <p className="text-xs text-muted-foreground">Tersedia</p>
        </div>
        <div className="card-kawaii p-4 text-center relative overflow-hidden">
          <div className="absolute top-1 right-1 opacity-40">
            <FlowerDecor size={16} />
          </div>
          <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{goodCondition}</p>
          <p className="text-xs text-muted-foreground">Kondisi Baik</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Pie Chart */}
        <div className="card-kawaii p-5">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground">Berdasarkan Kategori</h3>
          </div>
          {categoryData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <PieChart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Belum ada data</p>
              </div>
            </div>
          )}
        </div>

        {/* Status Pie Chart */}
        <div className="card-kawaii p-5">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-5 h-5 text-success-foreground" />
            <h3 className="font-bold text-foreground">Status Ketersediaan</h3>
          </div>
          {statusData.some(d => d.value > 0) ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={statusData.filter(d => d.value > 0)}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <PieChart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Belum ada data</p>
              </div>
            </div>
          )}
        </div>

        {/* Condition Bar Chart */}
        <div className="card-kawaii p-5 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-warning-foreground" />
            <h3 className="font-bold text-foreground">Kondisi Barang</h3>
          </div>
          {conditionData.some(d => d.value > 0) ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conditionData} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 10, 10, 0]}>
                    {conditionData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Belum ada data</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsView;
