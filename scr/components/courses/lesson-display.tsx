
'use client';
import Image from 'next/image';
import type { Lesson } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useProgress } from '@/hooks/use-progress';
import { CheckCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ClientOnly from '../shared/client-only';
import { QUIZZES } from '@/lib/data';
import QuizDisplay from '../quiz/quiz-display';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface LessonDisplayProps {
    lesson: Lesson | null;
    courseId: string;
}

// A simple component to render markdown-like text.
// This is not a full markdown parser, but handles basic line breaks.
const MarkdownContent = ({ content }: { content: string }) => {
    return (
        <div>
            {content.split('\\n').map((line, index) => {
                line = line.trim();
                if (line.startsWith('### ')) {
                    return <h3 key={index} className="text-lg font-semibold mt-4 mb-2">{line.replace('### ', '')}</h3>
                }
                if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-xl font-bold mt-6 mb-3">{line.replace('## ', '')}</h2>
                }
                 if (line.startsWith('- ')) {
                    return <p key={index} className="pl-4">{line}</p>;
                }
                return <p key={index}>{line || <br/>}</p>
            })}
        </div>
    );
};


export default function LessonDisplay({ lesson }: LessonDisplayProps) {
    const { progress, updateProgress, addXp } = useProgress();

    if (!lesson) {
        return (
            <Card className="min-h-[400px] flex items-center justify-center bg-card/50">
                <p className="text-muted-foreground">Select a lesson to begin.</p>
            </Card>
        );
    }
    
    const isCompleted = progress.completedLessons.includes(lesson.id);
    const quiz = QUIZZES.find(q => q.id === lesson.quizId);
    
    const pyqImages = lesson.pyqs?.map(id => PlaceHolderImages.find(p => p.id === id)).filter(Boolean);


    const handleCompleteLesson = () => {
        if (!isCompleted) {
            const updatedLessons = [...progress.completedLessons, lesson.id];
            updateProgress({ completedLessons: updatedLessons });
            addXp(100);
        }
    }

    const handleCompleteQuiz = (score: number, total: number) => {
        const xpGained = (score / total) * 50; // Upto 50 xp for quiz
        addXp(Math.round(xpGained));
    }

    return (
        <Card className="bg-card/50">
            <CardContent className="p-2 md:p-4">
                <div className="aspect-video mb-4">
                    <iframe
                        className="w-full h-full rounded-lg"
                        src={`https://www.youtube.com/embed/${lesson.youtubeId}`}
                        title={lesson.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                
                <Tabs defaultValue="resources" className="w-full">
                    <TabsList>
                        <TabsTrigger value="resources">Resources</TabsTrigger>
                        <TabsTrigger value="quiz" disabled={!quiz}>Quiz</TabsTrigger>
                    </TabsList>
                    <TabsContent value="resources">
                        <Tabs defaultValue="notes" className="w-full mt-4">
                           <TabsList className="grid w-full grid-cols-3">
                               <TabsTrigger value="notes">Notes</TabsTrigger>
                               <TabsTrigger value="pyqs">PYQs</TabsTrigger>
                               <TabsTrigger value="imp">Imp. Questions</TabsTrigger>
                           </TabsList>
                            <TabsContent value="notes" className="mt-4 prose max-w-none bg-white text-black p-6 rounded-md min-h-[200px] font-handwritten">
                                <ClientOnly>
                                    <MarkdownContent content={lesson.notes} />
                                </ClientOnly>
                            </TabsContent>
                            <TabsContent value="pyqs" className="mt-4 prose prose-invert max-w-none bg-background/50 p-4 rounded-md min-h-[200px]">
                              {pyqImages && pyqImages.length > 0 ? (
                                    <Carousel className="w-full max-w-lg mx-auto">
                                        <CarouselContent>
                                            {pyqImages.map((image) => (
                                                image && <CarouselItem key={image.id}>
                                                    <Card>
                                                        <CardContent className="relative aspect-video">
                                                            <Image
                                                                src={image.imageUrl}
                                                                alt={image.description}
                                                                fill
                                                                className="object-contain rounded-md"
                                                                data-ai-hint={image.imageHint}
                                                            />
                                                        </CardContent>
                                                    </Card>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious />
                                        <CarouselNext />
                                    </Carousel>
                                ) : (
                                    <p>{'Previous year questions will be available soon.'}</p>
                                )}
                            </TabsContent>
                            <TabsContent value="imp" className="mt-4 prose max-w-none bg-white text-black p-6 rounded-md min-h-[200px] font-handwritten">
                               <ClientOnly>
                                    {lesson.importantQuestions ? (
                                        <MarkdownContent content={lesson.importantQuestions} />
                                    ) : (
                                        <p>{'Important questions will be available soon.'}</p>
                                    )}
                                </ClientOnly>
                            </TabsContent>
                        </Tabs>
                    </TabsContent>
                    <TabsContent value="quiz" className="min-h-[200px] flex items-center justify-center">
                        {quiz ? <QuizDisplay quiz={quiz} onComplete={handleCompleteQuiz} /> : <p className="text-muted-foreground">No quiz available for this lesson.</p>}
                    </TabsContent>
                </Tabs>


                <div className="mt-6 flex justify-end">
                    <Button onClick={handleCompleteLesson} disabled={isCompleted}>
                        {isCompleted ? <CheckCircle className="mr-2 h-4 w-4" /> : null}
                        {isCompleted ? 'Lesson Completed' : 'Mark as Complete (+100 XP)'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
