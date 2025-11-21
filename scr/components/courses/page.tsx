import { PageHeader } from "@/components/shared/page-header";
import { COURSES } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Course } from "@/lib/types";


function getCourseImage(courseId: string) {
    if (courseId.includes('math')) return PlaceHolderImages.find(p => p.id === 'course-thumb1');
    if (courseId.includes('sci')) return PlaceHolderImages.find(p => p.id === 'course-thumb2');
    if (courseId.includes('hist')) return PlaceHolderImages.find(p => p.id === 'course-thumb3');
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

export default function CoursesPage() {
    const boardExamCourses = COURSES.filter(c => c.category === 'Board Exam');
    const competitiveExamCourses = COURSES.filter(c => c.category === 'Competitive Exam');

    return (
        <div>
            <PageHeader
                title="All Courses"
                subtitle="Browse our library of courses to master your subjects."
            />
            <Tabs defaultValue="board" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
                    <TabsTrigger value="board">Board Exams</TabsTrigger>
                    <TabsTrigger value="competitive">Competitive Exams</TabsTrigger>
                </TabsList>
                <TabsContent value="board" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                       {boardExamCourses.map((course) => <CourseCard key={course.id} course={course} />)}
                    </div>
                </TabsContent>
                <TabsContent value="competitive" className="mt-6">
                     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {competitiveExamCourses.map((course) => <CourseCard key={course.id} course={course} />)}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
