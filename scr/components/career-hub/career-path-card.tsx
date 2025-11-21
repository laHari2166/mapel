'use client';

import type { CareerPath } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookCopy, BrainCircuit, Goal } from "lucide-react";

interface CareerPathCardProps {
    path: CareerPath;
}

export default function CareerPathCard({ path }: CareerPathCardProps) {
  return (
    <Card className="flex flex-col h-full bg-card/70 backdrop-blur-sm">
        <CardHeader>
            {path.trending && (
                <Badge variant="destructive" className="absolute top-4 right-4 animate-pulse">TRENDING</Badge>
            )}
            <CardTitle>{path.title}</CardTitle>
            <CardDescription>{path.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="exams">
                    <AccordionTrigger>
                        <div className="flex items-center gap-2 font-semibold">
                            <Goal className="h-4 w-4 text-primary"/>
                            Exams
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            {path.exams.map(exam => <li key={exam}>{exam}</li>)}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="courses">
                    <AccordionTrigger>
                        <div className="flex items-center gap-2 font-semibold">
                            <BookCopy className="h-4 w-4 text-primary"/>
                            Courses
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                       <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            {path.courses.map(course => <li key={course}>{course}</li>)}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="skills" className="border-b-0">
                    <AccordionTrigger>
                         <div className="flex items-center gap-2 font-semibold">
                            <BrainCircuit className="h-4 w-4 text-primary"/>
                            Key Skills
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-wrap gap-2">
                            {path.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
  );
}
