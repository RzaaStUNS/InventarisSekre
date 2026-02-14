import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Category, CATEGORIES, CONDITIONS, Condition } from '@/types/inventory';
import { Search, Filter } from 'lucide-react';

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryFilter: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
  conditionFilter: Condition | 'all';
  onConditionChange: (condition: Condition | 'all') => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  conditionFilter,
  onConditionChange,
}) => {
  return (
    <div className="card-kawaii p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search input */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Cari barang..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 rounded-xl border-2 focus:border-primary bg-muted/30"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Filter Kategori */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <Select value={categoryFilter} onValueChange={onCategoryChange}>
              <SelectTrigger className="w-40 rounded-xl border-2 bg-card">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent className="rounded-xl bg-card border-2 border-border z-[100]">
                <SelectItem value="all">Semua Kategori</SelectItem>
                {CATEGORIES.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filter Kondisi */}
          <Select value={conditionFilter} onValueChange={onConditionChange}>
            <SelectTrigger className="w-40 rounded-xl border-2 bg-card">
              <SelectValue placeholder="Kondisi" />
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-card border-2 border-border z-[100]">
              <SelectItem value="all">Semua Kondisi</SelectItem>
              {CONDITIONS.map(cond => (
                <SelectItem key={cond} value={cond}>{cond}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;