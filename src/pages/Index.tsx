import React, { useEffect, useMemo, useRef, useState } from 'react';
import { indonesianAnimals, type Animal } from '@/data/animals';
import AnimalCard from '@/components/AnimalCard';
import { Button } from '@/components/ui/button';
import { Sparkles, MapPin, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { FavoriteSet, isFavorite, loadFavorites, saveFavorites, toggleFavorite } from '@/lib/favorites';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';
  const initialStatus = (searchParams.get('s') as 'All' | Animal['conservationStatus'] | null) ?? 'All';
  const [query, setQuery] = useState(initialQuery);
  const [status, setStatus] = useState<'All' | Animal['conservationStatus']>(initialStatus);
  const gridRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<FavoriteSet>(() => loadFavorites());
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(() => (searchParams.get('f') === '1'));
  const navigate = useNavigate();

  // Sync state to URL (only includes our keys to avoid churn)
  useEffect(() => {
    const next: Record<string, string> = {};
    if (query) next.q = query;
    if (status && status !== 'All') next.s = status;
    if (onlyFavorites) next.f = '1';
    setSearchParams(next, { replace: true });
  }, [query, status, onlyFavorites, setSearchParams]);

  // Persist favorites to localStorage when changed
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const filteredAnimals = useMemo(() => {
    const q = query.trim().toLowerCase();
    return indonesianAnimals.filter((a) => {
      const matchesQuery =
        !q ||
        a.localName.toLowerCase().includes(q) ||
        a.latinName.toLowerCase().includes(q) ||
        a.habitat.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q);
      const matchesStatus = status === 'All' || a.conservationStatus === status;
      const matchesFavorite = !onlyFavorites || isFavorite(favorites, a.id);
      return matchesQuery && matchesStatus && matchesFavorite;
    });
  }, [query, status, onlyFavorites, favorites]);
  return (
    <div className="min-h-screen bg-nature">
      {/* Hero Section */}
      <div className="bg-jungle text-primary-foreground">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center space-y-6">
            <div className="float-gentle inline-block">
              <Sparkles className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold bounce-in">
              Mamalia Indonesia
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
              Jelajahi dunia menakjubkan mamalia Indonesia melalui cerita interaktif yang menyenangkan!
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button 
                variant="secondary" 
                size="lg"
                className="btn-playful"
                onClick={() => gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Mulai Membaca
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="btn-playful bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={() =>
                  toast({
                    title: 'Peta Interaktif',
                    description: 'Fitur peta akan segera hadir. Nantikan ya! 🗺️',
                  })
                }
              >
                <MapPin className="w-5 h-5 mr-2" />
                Jelajahi Peta
              </Button>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Button size="lg" className="btn-playful" onClick={() => navigate('/quiz')}>
              Mulai Kuis
            </Button>
          </div>
        </div>
      </div>

      {/* Animals Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Temui Teman-Teman Hewan Kita
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Klik pada setiap hewan untuk mempelajari fakta-fakta menarik tentang mereka!
          </p>
        </div>
        {/* Search and Filter Controls */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari hewan (nama lokal, latin, habitat)"
              className="w-full rounded-xl border border-border bg-card px-4 py-3 pr-12 text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Cari hewan"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-sm bg-muted text-foreground hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Bersihkan pencarian"
              >
                Hapus
              </button>
            )}
          </div>
          <div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ('All' | Animal['conservationStatus']))}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Filter status konservasi"
            >
              <option value="All">Semua Status</option>
              <option value="Critically Endangered">Critically Endangered</option>
              <option value="Endangered">Endangered</option>
              <option value="Vulnerable">Vulnerable</option>
              <option value="Near Threatened">Near Threatened</option>
              <option value="Least Concern">Least Concern</option>
            </select>
          </div>
        </div>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Switch id="fav-only" checked={onlyFavorites} onCheckedChange={setOnlyFavorites} />
            <label htmlFor="fav-only" className="text-sm text-foreground">Tampilkan favorit saja</label>
          </div>
          <div className="text-sm text-muted-foreground">Favorit: {favorites.size}</div>
        </div>
        
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {filteredAnimals.map((animal, index) => (
            <AnimalCard 
              key={animal.id} 
              animal={animal} 
              index={index}
              isFavorite={isFavorite(favorites, animal.id)}
              onToggleFavorite={(id) => setFavorites((prev) => toggleFavorite(prev, id))}
            />
          ))}
        </div>
        {filteredAnimals.length === 0 && (
          <div className="mt-8 text-center">
            <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h3 className="text-xl font-heading font-bold mb-2">Tidak ada hasil</h3>
              <p className="text-muted-foreground mb-4">Coba ubah kata kunci atau pilih status konservasi yang berbeda.</p>
              <Button onClick={() => { setQuery(''); setStatus('All'); }}>Reset Pencarian</Button>
            </div>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-sky text-accent-foreground py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">
              Fitur Pembelajaran Interaktif
            </h2>
            <p className="text-lg opacity-90">
              Belajar sambil bermain dengan berbagai fitur menarik
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-accent-foreground/10 rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-heading font-bold">Cerita Interaktif</h3>
              <p className="opacity-90">
                Baca dan dengarkan cerita menarik tentang setiap hewan
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-accent-foreground/10 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-heading font-bold">Peta Interaktif</h3>
              <p className="opacity-90">
                Jelajahi habitat alami hewan-hewan di seluruh Indonesia
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-accent-foreground/10 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-heading font-bold">Mini Games</h3>
              <p className="opacity-90">
                Mainkan kuis dan permainan seru untuk menguji pengetahuan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
