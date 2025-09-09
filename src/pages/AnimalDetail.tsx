import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { indonesianAnimals } from '@/data/animals';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Utensils, Users, Sparkles, Volume2, Square } from 'lucide-react';
import { canSpeak, isSpeaking as ttsIsSpeaking, speak, stopSpeaking } from '@/lib/tts';

const AnimalDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const animal = indonesianAnimals.find(a => a.id === id);

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

  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setIsReading(ttsIsSpeaking()), 300);
    return () => {
      clearInterval(id);
      stopSpeaking();
    };
  }, []);

  const handleSpeak = () => {
    if (!canSpeak()) return;
    if (!animal) return;
    const text = `${animal.localName}. ${animal.latinName}. ${animal.description}`;
    speak(text, { lang: 'id-ID', rate: 1 });
    setIsReading(true);
  };

  const handleStop = () => {
    stopSpeaking();
    setIsReading(false);
  };

  if (!animal) {
    return (
      <div className="min-h-screen bg-nature flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">
            Hewan tidak ditemukan
          </h1>
          <Button onClick={() => navigate('/')} variant="outline">
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-nature page-enter">
      {/* Header */}
      <div className="bg-jungle p-6 text-primary-foreground">
        <div className="container mx-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            className="mb-4 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="lg:w-1/2">
              <img
                src={animal.illustration}
                alt={animal.localName}
                loading="lazy"
                decoding="async"
                width={1024}
                height={640}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
            </div>
            
            <div className="lg:w-1/2 space-y-4">
              <div>
                <h1 className="text-4xl font-heading font-bold mb-2">
                  {animal.localName}
                </h1>
                <p className="text-xl italic opacity-90">
                  {animal.latinName}
                </p>
                {canSpeak() && (
                  <div className="mt-4 flex items-center gap-2">
                    {!isReading ? (
                      <Button variant="secondary" size="sm" onClick={handleSpeak} className="btn-playful">
                        <Volume2 className="w-4 h-4 mr-2" /> Dengarkan
                      </Button>
                    ) : (
                      <Button variant="destructive" size="sm" onClick={handleStop} className="btn-playful">
                        <Square className="w-4 h-4 mr-2" /> Hentikan
                      </Button>
                    )}
                  </div>
                )}
              </div>
              
              <Badge className={`${getStatusColor(animal.conservationStatus)} text-lg px-4 py-2`}>
                {animal.conservationStatus}
              </Badge>
              
              <p className="text-lg leading-relaxed opacity-95">
                {animal.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto p-6 -mt-8">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Habitat */}
          <Card className="animal-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-primary font-heading">
                <div className="p-2 bg-primary/10 rounded-full">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                Habitat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{animal.habitat}</p>
            </CardContent>
          </Card>

          {/* Food */}
          <Card className="animal-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-secondary font-heading">
                <div className="p-2 bg-secondary/10 rounded-full">
                  <Utensils className="w-5 h-5 text-secondary" />
                </div>
                Makanan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{animal.foodType}</p>
            </CardContent>
          </Card>

          {/* Population */}
          <Card className="animal-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-accent font-heading">
                <div className="p-2 bg-accent/10 rounded-full">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                Populasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{animal.population}</p>
            </CardContent>
          </Card>

          {/* Fun Fact */}
          <Card className="animal-card bg-sunset text-secondary-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-heading">
                <div className="p-2 bg-secondary-foreground/10 rounded-full">
                  <Sparkles className="w-5 h-5" />
                </div>
                Fakta Menarik
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{animal.funFact}</p>
            </CardContent>
          </Card>
        </div>

        {/* Characteristics */}
        <Card className="animal-card">
          <CardHeader>
            <CardTitle className="text-primary font-heading text-2xl">
              Karakteristik Unik
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid md:grid-cols-2 gap-3">
              {animal.uniqueCharacteristics.map((characteristic, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-foreground">{characteristic}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="text-center mt-8">
          <Button
            onClick={() => navigate('/')}
            className="btn-playful bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
          >
            Jelajahi Hewan Lainnya
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetail;