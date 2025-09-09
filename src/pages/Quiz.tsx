import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { indonesianAnimals } from '@/data/animals';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { loadBestScore, saveBestScoreFor, loadBestScoreFor } from '@/lib/quiz';
import { playCorrect, playIncorrect } from '@/lib/sfx';

// Simple quiz generated from animals data
// Question types: "status" or "habitat"

type QType = 'status' | 'habitat';

type Q = {
  type: QType;
  prompt: string;
  choices: string[];
  answer: string;
  animalId: string;
};

type TimerMode = 'none' | 'perQuestion' | 'overall';

const PER_QUESTION_SECONDS = 15;
const OVERALL_SECONDS = 180;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestions(count: number): Q[] {
  const animals = shuffle(indonesianAnimals);
  const qs: Q[] = [];

  const take = Math.min(count, animals.length);
  for (let i = 0; i < take; i++) {
    const a = animals[i];
    const type: QType = Math.random() < 0.5 ? 'status' : 'habitat';

    if (type === 'status') {
      // Ask conservation status
      const allStatuses = Array.from(new Set(indonesianAnimals.map(x => x.conservationStatus)));
      const wrong = shuffle(allStatuses.filter(s => s !== a.conservationStatus)).slice(0, 3);
      const choices = shuffle([a.conservationStatus, ...wrong]);
      qs.push({
        type,
        prompt: `Status konservasi untuk "${a.localName}" adalah...`,
        choices,
        answer: a.conservationStatus,
        animalId: a.id,
      });
    } else {
      // Ask habitat
      // Build distractors from other animals' habitats
      const habitats = shuffle(indonesianAnimals.map(x => x.habitat).filter(h => h !== a.habitat)).slice(0, 3);
      const choices = shuffle([a.habitat, ...habitats]);
      qs.push({
        type,
        prompt: `Di mana habitat utama "${a.localName}"?`,
        choices,
        answer: a.habitat,
        animalId: a.id,
      });
    }
  }
  return qs;
}

const DEFAULT_TOTAL = 8 as const;

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [total, setTotal] = useState<number>(DEFAULT_TOTAL);
  const questions = useMemo(() => buildQuestions(total), [total]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [completed, setCompleted] = useState(false);
  const [ending, setEnding] = useState(false);
  const [best, setBest] = useState<number>(loadBestScoreFor(total));
  const [muted, setMuted] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<TimerMode>('none');
  const [timeLeft, setTimeLeft] = useState<number>(0); // seconds remaining

  const current = questions[index];
  const progress = Math.round((index / questions.length) * 100);
  const currentAnimal = useMemo(() => current ? indonesianAnimals.find(a => a.id === current.animalId) : undefined, [current]);

  useEffect(() => {
    // update best score shown when difficulty changes
    setBest(loadBestScoreFor(total));
  }, [total]);

  // Initialize timers on start and update per question or overall
  useEffect(() => {
    if (!started || completed) return;
    if (timerMode === 'none') {
      setTimeLeft(0);
      return;
    }

    // set initial time
    if (timerMode === 'perQuestion') {
      setTimeLeft(PER_QUESTION_SECONDS);
    } else if (timerMode === 'overall' && timeLeft === 0) {
      setTimeLeft(OVERALL_SECONDS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, timerMode]);

  // Tick timer every second
  useEffect(() => {
    if (!started || completed || timerMode === 'none') return;
    if (timeLeft <= 0) return;

    const id = window.setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [started, completed, timerMode, timeLeft]);

  // Handle time-out effects
  useEffect(() => {
    if (!started || completed || timerMode === 'none') return;
    if (timeLeft > 0) return;

    if (timerMode === 'perQuestion' && !revealed) {
      // Auto mark incorrect and reveal
      setLastCorrect(false);
      setRevealed(true);
      playIncorrect(muted);
    } else if (timerMode === 'overall' && !completed) {
      // Trigger brief fade-out, then complete
      if (!ending) {
        setEnding(true);
        window.setTimeout(() => {
          setCompleted(true);
          saveBestScoreFor(total, score);
          setBest(loadBestScoreFor(total));
          setEnding(false);
        }, 500);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const submit = useCallback(() => {
    if (!current || selected == null || revealed) return;
    const correct = selected === current.answer;
    setLastCorrect(correct);
    if (correct) {
      setScore(s => s + 1);
      playCorrect(muted);
    } else {
      playIncorrect(muted);
    }
    setRevealed(true);
  }, [current, selected, revealed, muted]);

  const nextQuestion = () => {
    if (index + 1 >= questions.length) {
      setCompleted(true);
      // persist per-difficulty best score
      saveBestScoreFor(total, score);
      setBest(loadBestScoreFor(total));
    } else {
      setIndex(i => i + 1);
      setSelected(null);
      setRevealed(false);
      setLastCorrect(null);
      if (timerMode === 'perQuestion') {
        setTimeLeft(PER_QUESTION_SECONDS);
      }
    }
  };

  const reset = () => {
    // reload the page state by navigating to same route (simple approach)
    navigate(0);
  };

  return (
    <div className="min-h-screen bg-nature page-enter">
      <div className="bg-jungle p-6 text-primary-foreground">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-heading font-bold">Kuis Mini Hewan</h1>
            <div className="flex items-center gap-2">
              <Button variant={muted ? 'outline' : 'secondary'} size="sm" className={muted ? 'bg-primary-foreground/10' : ''} onClick={() => setMuted(m => !m)}>
                {muted ? 'Unmute' : 'Mute'}
              </Button>
              <Button variant="outline" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20" onClick={() => navigate('/')}>Beranda</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {!started ? (
          <Card className={`animal-card ${ending && timerMode === 'overall' ? 'quiz-ending' : ''}`}>
            <CardHeader>
              <CardTitle className="font-heading text-primary">Pilih Tingkat Kesulitan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {[5, 8, 12].map(n => (
                  <Button key={n} variant={total === n ? 'secondary' : 'outline'} className={total === n ? '' : 'bg-card'} onClick={() => setTotal(n)}>
                    {n} Pertanyaan
                  </Button>
                ))}
              </div>
              <div className="mt-6">
                <div className="mb-2 text-sm text-muted-foreground">Mode Waktu</div>
                <div className="flex flex-wrap gap-3">
                  <Button variant={timerMode === 'none' ? 'secondary' : 'outline'} className={timerMode === 'none' ? '' : 'bg-card'} onClick={() => setTimerMode('none')}>Tanpa Timer</Button>
                  <Button variant={timerMode === 'perQuestion' ? 'secondary' : 'outline'} className={timerMode === 'perQuestion' ? '' : 'bg-card'} onClick={() => setTimerMode('perQuestion')}>15 dtk/soal</Button>
                  <Button variant={timerMode === 'overall' ? 'secondary' : 'outline'} className={timerMode === 'overall' ? '' : 'bg-card'} onClick={() => setTimerMode('overall')}>3 menit total</Button>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Skor terbaik: <Badge className="ml-1">{best}</Badge></div>
                <Button className="btn-playful" onClick={() => setStarted(true)}>Mulai</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-4">
              <Progress value={completed ? 100 : progress} />
              <div className="mt-2 text-sm text-muted-foreground flex flex-wrap items-center gap-3">
                <span>Pertanyaan {Math.min(index + 1, questions.length)} dari {questions.length}</span>
                <span>• Skor terbaik ({total}): <Badge className="ml-1">{best}</Badge></span>
                {timerMode !== 'none' && (
                  <span>• Sisa waktu: <Badge className="ml-1">{Math.max(timeLeft, 0)}s</Badge></span>
                )}
              </div>
            </div>

            {!completed ? (
          <Card className={`animal-card ${ending && timerMode === 'overall' ? 'quiz-ending' : ''}`}>
            <CardHeader>
              <CardTitle className="font-heading text-primary">{current.prompt}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {current.choices.map((c) => {
                  const active = selected === c;
                  return (
                    <Button
                      key={c}
                      variant={active ? 'secondary' : 'outline'}
                      className={active ? '' : 'bg-card'}
                      disabled={revealed}
                      onClick={() => setSelected(c)}
                    >
                      {c}
                    </Button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-muted-foreground">Skor: <Badge className="ml-1">{score}</Badge></div>
                {!revealed ? (
                  <Button disabled={selected == null} onClick={submit} className="btn-playful">Jawab</Button>
                ) : (
                  <Button onClick={nextQuestion} className="btn-playful">{index + 1 >= questions.length ? 'Selesai' : 'Lanjut'}</Button>
                )}
              </div>

              {revealed && (
                <div className={`mt-6 rounded-xl border border-border bg-card p-4 ${lastCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
                  <p className="font-medium mb-2">{lastCorrect ? 'Benar! 🎉' : 'Belum tepat.'}</p>
                  <p className="text-sm text-muted-foreground mb-3">Jawaban benar: {current.answer}</p>
                  {currentAnimal && (
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={currentAnimal.illustration}
                        alt={currentAnimal.localName}
                        loading="lazy"
                        decoding="async"
                        width={96}
                        height={64}
                        className="h-16 w-24 object-cover rounded-md border border-border"
                      />
                      <div>
                        <div className="font-heading font-bold">{currentAnimal.localName}</div>
                        <div className="text-xs italic text-muted-foreground">{currentAnimal.latinName}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="bg-card" onClick={() => navigate(`/animal/${current.animalId}`)}>Pelajari lebih lanjut</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
            ) : (
          <Card className="animal-card">
            <CardHeader>
              <CardTitle className="font-heading text-primary">Selesai! 🎉</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Skor kamu: <Badge className="ml-1">{score} / {questions.length}</Badge></p>
              <p className="mb-2 text-sm text-muted-foreground">Skor terbaik: <Badge className="ml-1">{best}</Badge></p>
              <div className="flex gap-3">
                <Button onClick={reset} className="btn-playful">Main Lagi</Button>
                <Button variant="outline" className="bg-card" onClick={() => navigate('/')}>Kembali ke Beranda</Button>
              </div>
            </CardContent>
          </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
