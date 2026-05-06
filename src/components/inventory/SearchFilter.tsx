import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Category, CATEGORIES, CONDITIONS, Condition } from '@/types/inventory';
import { Search, Filter, SortAsc } from 'lucide-react';

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryFilter: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
  subCategoryFilter: string | 'all';
  onSubCategoryChange: (sub: string | 'all') => void;
  conditionFilter: Condition | 'all';
  onConditionChange: (condition: Condition | 'all') => void;
  sortBy: 'newest' | 'oldest';
  onSortChange: (sort: 'newest' | 'oldest') => void;
  availableSubCategories: string[]; // List sub-kategori unik dari data yang ada
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  subCategoryFilter,
  onSubCategoryChange,
  conditionFilter,
  onConditionChange,
  sortBy,
  onSortChange,
  availableSubCategories
}) => {
  return (
    <div className="card-kawaii p-4 mb-6 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Cari nama atau nomor barang..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 rounded-xl border-2 focus:border-primary bg-muted/30 h-11"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <SortAsc className="w-5 h-5 text-muted-foreground" />
          <Select value={sortBy} onValueChange={(val: any) => onSortChange(val)}>
            <SelectTrigger className="w-40 rounded-xl border-2 bg-card h-11">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-card border-2 border-border z-[100]">
              <SelectItem value="newest">Terbaru diupdate</SelectItem>
              <SelectItem value="oldest">Terlama diupdate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center pt-2 border-t border-dashed border-muted">
        <Filter className="w-4 h-4 text-muted-foreground mr-1" />
        
        {/* Filter Kategori */}
        <Select value={categoryFilter} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-40 rounded-xl border-2 bg-card h-10 text-xs">
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent className="rounded-xl bg-card border-2 border-border">
            <SelectItem value="all">Semua Kategori</SelectItem>
            {CATEGORIES.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filter Sub-Kategori */}
        <Select value={subCategoryFilter} onValueChange={onSubCategoryChange}>
          <SelectTrigger className="w-40 rounded-xl border-2 bg-card h-10 text-xs">
            <SelectValue placeholder="Sub Kategori" />
          </SelectTrigger>
          <SelectContent className="rounded-xl bg-card border-2 border-border">
            <SelectItem value="all">Semua Sub</SelectItem>
            {availableSubCategories.map(sub => (
              <SelectItem key={sub} value={sub}>{sub}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filter Kondisi */}
        <Select value={conditionFilter} onValueChange={onConditionChange}>
          <SelectTrigger className="w-40 rounded-xl border-2 bg-card h-10 text-xs">
            <SelectValue placeholder="Kondisi" />
          </SelectTrigger>
          <SelectContent className="rounded-xl bg-card border-2 border-border">
            <SelectItem value="all">Semua Kondisi</SelectItem>
            {CONDITIONS.map(cond => (
              <SelectItem key={cond} value={cond}>{cond}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchFilter;