'use client';

import Link from 'next/link';
import Image from 'next/image';
import { COURSES } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function getCourseImage(courseId: string) {
    if (courseId.includes('math')) return PlaceHolderImages.find(p => p.id === 'course-thumb1');
    if (courseId.includes('sci')) return PlaceHolderImages.find(p => p.id === 'course-thumb2');
    if (courseId.includes('hist')) return PlaceHolderImages.find(p => p.id === 'course-thumb3');
    return PlaceHolderImages[3]; // default
}


export default function CourseRecommendations() {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">Recommended For You</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {COURSES.slice(0, 3).map((course) => {
            const imagePlaceholder = getCourseImage(course.id);
            return (
                <Link href={`/courses/${course.id}`} key={course.id} passHref>
                    <Card className="h-full overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
                    <CardHeader className="p-0">
                        <div className="relative h-40 w-full">
                        {imagePlaceholder && <Image
                            src={imagePlaceholder.imageUrl}
                            alt={course.title}
                            fill
                            className="object-cover"
                            data-ai-hint={imagePlaceholder.imageHint}
                        />}
                        </div>
                    </CardHeader>
                    <CardContent className="p-4">
                        <CardTitle className="text-lg font-bold mb-1">{course.title}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground line-clamp-2">{course.description}</CardDescription>
                    </CardContent>
                    </Card>
                </Link>
            )
        })}
      </div>
       <div className="mt-6 flex justify-center">
            <Link href="/courses" passHref>
                <Button variant="outline" className="group">
                    Explore All Courses <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </Link>
        </div>
    </div>
  );
}
