
'use client';

import { PageHeader } from "@/components/shared/page-header";
import { COURSES, UPCOMING_EXAMS } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Course, UpcomingExam } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, PlusCircle, BookOpen } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import SubjectCard from "@/components/courses/subject-card";


function getCourseImage(courseId: string) {
    if (courseId.includes('cbse')) return PlaceHolderImages.find(p => p.id === 'course-thumb1');
    if (courseId.includes('icse')) return PlaceHolderImages.find(p => p.id === 'course-thumb4');
    if (courseId.includes('sci')) return PlaceHolderImages.find(p => p.id === 'course-thumb2');
    if (courseId.includes('hist') || courseId.includes('eng')) return PlaceHolderImages.find(p => p.id === 'course-thumb3');
    if (courseId.includes('bio')) return PlaceHolderImages.find(p => p.id === 'course-thumb2'); // reuse science
    if (courseId.includes('apt') || courseId.includes('cuet')) return PlaceHolderImages.find(p => p.id === 'course-thumb1'); 
    return PlaceHolderImages[3]; // default
}

const CourseCard = ({ course }: { course: Course }) => {
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
}

const UpcomingExamsPanel = ({ exams }: { exams: UpcomingExam[] }) => (
    <Card className="bg-muted/30">
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" />
                Upcoming Exams
            </CardTitle>
            <CardDescription>
                Stay ahead of deadlines for major competitive exams.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {exams.map(exam => (
                 <div key={exam.id} className="p-3 bg-background/50 rounded-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <h4 className="font-semibold">{exam.name}</h4>
                            <p className="text-sm text-muted-foreground">
                                Register by: {new Date(exam.registrationDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                            <p className="text-xs text-muted-foreground/80">Eligibility: {exam.eligibility}</p>
                        </div>
                         <Link href={exam.resourcesLink} passHref>
                           <Button size="sm" variant="ghost" className="group">
                                Resources <BookOpen className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </div>
            ))}
        </CardContent>
    </Card>
)

export default function CoursesPage() {
    const { user } = useAuth();
    const boardExamCourses = COURSES.filter(c => c.category === 'Board Exam');
    const competitiveExamCourses = COURSES.filter(c => c.category === 'Competitive Exam');

    return (
        <div>
            <div className="flex justify-between items-start">
                <PageHeader
                    title="All Courses"
                    subtitle="Browse our library of courses to master your subjects."
                />
                {(user?.role === 'Guru' || user?.role === 'Creator') && (
                     <Link href="/create-course" passHref>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create New Course
                        </Button>
                    </Link>
                )}
            </div>
            <Tabs defaultValue="board" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
                    <TabsTrigger value="board">Board Exams</TabsTrigger>
                    <TabsTrigger value="competitive">Competitive Exams</TabsTrigger>
                </TabsList>
                <TabsContent value="board" className="mt-6 space-y-8">
                     <div>
                        <h2 className="text-2xl font-bold mb-1">Board Exam Prep</h2>
                        <p className="text-muted-foreground mb-4">Comprehensive resources for CBSE, ICSE, and State Boards.</p>
                        <div className="space-y-4">
                            {boardExamCourses.map((course) => (
                                <SubjectCard key={course.id} course={course} />
                            ))}
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="competitive" className="mt-6 space-y-8">
                    <UpcomingExamsPanel exams={UPCOMING_EXAMS} />
                    <div>
                        <h2 className="text-2xl font-bold mb-1">Competitive Exams Arena</h2>
                        <p className="text-muted-foreground mb-4">Your training ground for JEE, NEET, CUET, and more.</p>
                         <div className="space-y-4">
                            {competitiveExamCourses.map((course) => (
                                <SubjectCard key={course.id} course={course} />
                            ))}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
