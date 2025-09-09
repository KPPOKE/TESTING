import React from 'react';
import { Animal } from '@/data/animals';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface AnimalCardProps {
  animal: Animal;
  index: number;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, index, isFavorite = false, onToggleFavorite }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/animal/${animal.id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critically Endangered':
        return 'bg-destructive text-destructive-foreground';
      case 'Endangered':
        return 'bg-secondary text-secondary-foreground';
      case 'Vulnerable':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <Card 
      className="animal-card cursor-pointer bounce-in overflow-hidden group focus:outline-none focus:ring-2 focus:ring-primary"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Buka detail ${animal.localName}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden">
        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(animal.id);
          }}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? `Hapus ${animal.localName} dari favorit` : `Tambahkan ${animal.localName} ke favorit`}
          className="absolute top-3 left-3 z-10 rounded-full bg-black/35 backdrop-blur px-2.5 py-1.5 text-xs font-bold text-white hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {isFavorite ? '♥ Favorit' : '♡ Favorit'}
        </button>
        <img
          src={animal.illustration}
          alt={animal.localName}
          loading="lazy"
          decoding="async"
          width={800}
          height={450}
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <Badge 
          className={`absolute top-3 right-3 ${getStatusColor(animal.conservationStatus)} font-bold text-xs`}
        >
          {animal.conservationStatus}
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">
              {animal.localName}
            </h3>
            <p className="text-sm text-muted-foreground italic">
              {animal.latinName}
            </p>
          </div>
          
          <p className="text-sm text-foreground line-clamp-2">
            {animal.description}
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-muted-foreground">
              {animal.habitat.split(' ').slice(0, 3).join(' ')}...
            </span>
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center float-gentle">
              <span className="text-primary-foreground text-xs font-bold">→</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimalCard;