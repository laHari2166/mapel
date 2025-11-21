'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StudentSpotlightProps {
    quote: string;
    studentName: string;
    avatar: string;
}

export default function StudentSpotlight({ quote, studentName, avatar }: StudentSpotlightProps) {
    return (
        <Card className="bg-card/70 border-l-4 border-primary">
            <CardContent className="p-6">
                <blockquote className="text-lg italic text-foreground mb-4">
                    &ldquo;{quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={avatar} alt={studentName} />
                        <AvatarFallback>{studentName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold text-primary">{studentName}</p>
                </div>
            </CardContent>
        </Card>
    );
}
