'use client';

import type { Course } from '@/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';

interface SubjectCardProps {
    course: Course;
}

export default function SubjectCard({ course }: SubjectCardProps) {
    return (
        <Card className="bg-card/70">
             <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={course.id} className="border-b-0">
                    <AccordionTrigger className="p-6 hover:no-underline">
                        <div className="flex-1 text-left">
                            <h3 className="text-xl font-bold">{course.title}</h3>
                            <p className="text-muted-foreground text-sm mt-1">{course.description}</p>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-6 pt-0">
                        <div className="space-y-2">
                             <h4 className="font-semibold text-muted-foreground">Lessons:</h4>
                            {course.lessons.map(lesson => (
                                <div key={lesson.id} className="flex items-center justify-between p-3 bg-background/50 rounded-md">
                                    <p className="font-medium">{lesson.title}</p>
                                    <Link href={`/courses/${course.id}`} passHref>
                                        <Button variant="ghost" size="sm">
                                            Go to Lesson <ChevronRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    );
}
