'use client';
import { useParams } from 'next/navigation';
import { COURSES } from '@/lib/data';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Lock, PlayCircle, ArrowLeft } from 'lucide-react';
import { useProgress } from '@/hooks/use-progress';
import LessonDisplay from '@/components/courses/lesson-display';
import { useState, useEffect } from 'react';
import type { Lesson } from '@/lib/types';
import Link from 'next/link';


export default function CourseDetailsPage() {
    const params = useParams();
    const courseId = params.id as string;
    const course = COURSES.find(c => c.id === courseId);
    
    const { progress } = useProgress();
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

    useEffect(() => {
        if (course) {
            const firstLesson = course.lessons.length > 0 ? course.lessons[0] : null;
            if (firstLesson) {
                const fullLesson = COURSES.flatMap(c => c.lessons).find(l => l.id === firstLesson.id);
                setSelectedLesson(fullLesson || null);
            } else {
                setSelectedLesson(null)
            }
        }
    }, [course]);

    const handleSelectLesson = (lesson: Lesson) => {
        const fullLesson = COURSES.flatMap(c => c.lessons).find(l => l.id === lesson.id);
        setSelectedLesson(fullLesson || null);
    }

    if (!course) {
        return <div>Course not found.</div>;
    }

    return (
        <div>
            <Link href="/courses" passHref className="mb-4 inline-block">
                <Button variant="ghost">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Courses
                </Button>
            </Link>
            <PageHeader title={course.title} subtitle={course.description} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <LessonDisplay lesson={selectedLesson} courseId={course.id} />
                </div>
                <div>
                    <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle>Lessons</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {course.lessons.map((lesson, index) => {
                                    const isCompleted = progress.completedLessons.includes(lesson.id);
                                    const isLocked = false; // For now, all lessons are unlocked.
                                    const isSelected = selectedLesson?.id === lesson.id;
                                    
                                    return (
                                        <Button 
                                            key={lesson.id} 
                                            variant={isSelected ? "default" : "ghost"}
                                            className="w-full justify-start h-auto py-3"
                                            onClick={() => !isLocked && handleSelectLesson(lesson)}
                                            disabled={isLocked}
                                        >
                                            <div className="flex items-center gap-4">
                                                {isCompleted ? <CheckCircle className="h-5 w-5 text-green-500" /> : isLocked ? <Lock className="h-5 w-5 text-muted-foreground"/> : <PlayCircle className="h-5 w-5 text-primary"/> }
                                                <div className="text-left">
                                                    <p className="font-semibold">{lesson.title}</p>
                                                    <p className="text-xs text-muted-foreground">{isCompleted ? "Completed" : "Watch lesson"}</p>
                                                </div>
                                            </div>
                                        </Button>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
