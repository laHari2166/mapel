
'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Target, Timer, CheckCircle, BrainCircuit, Dices, Book, Award } from 'lucide-react';

const TimeCycleRow = ({ time, activity }: { time: string; activity: string }) => (
  <TableRow>
    <TableCell className="w-1/3 font-semibold">{time}</TableCell>
    <TableCell><Input placeholder={activity} className="h-8 bg-background/50" /></TableCell>
  </TableRow>
);

export default function UnifiedStudyPlannerPage() {
  return (
    <div>
      <PageHeader
        title="My Daily Study Hub"
        subtitle="One day at a time. You've got this."
      />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Column 1: Core Daily Tasks */}
        <div className="xl:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="text-primary" /> Daily Focus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input placeholder="What's the one thing you must accomplish today?" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="text-primary" /> The Three-Task Rule
              </CardTitle>
              <CardDescription>Prioritize your day.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Big Task</label>
                <Input placeholder="e.g., Master Chapter 3 of Calculus" />
              </div>
              <div>
                <label className="text-sm font-medium">Medium Task</label>
                <Input placeholder="e.g., Solve 10 physics problems" />
              </div>
              <div>
                <label className="text-sm font-medium">Small Task</label>
                <Input placeholder="e.g., Review chemistry notes for 15 mins" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Column 2: Schedule & Grid */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="text-primary" /> 45-15 Time Cycle
              </CardTitle>
              <CardDescription>45 min focus, 15 min break.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TimeCycleRow time="Cycle 1" activity="e.g., 45min Study, 15min Break" />
                  <TimeCycleRow time="Cycle 2" activity="e.g., 45min Practice, 15min Walk" />
                  <TimeCycleRow time="Cycle 3" activity="e.g., 45min Revise, 15min Snack" />
                  <TimeCycleRow time="Cycle 4" activity="e.g., 45min Quiz, 15min Music" />
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Column 3: Roulette & Reflection */}
        <div className="xl:col-span-1 space-y-6">
           <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Dices className="text-primary" /> Study Roulette
                </CardTitle>
                <CardDescription>Spice up your learning. Pick one!</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
                {[...Array(6)].map((_, i) => (
                    <Button key={i} variant="outline" className="h-auto py-3 text-center">
                        Slot {i+1}
                    </Button>
                ))}
            </CardContent>
           </Card>

           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="text-primary" /> End-of-Day Reflection
              </CardTitle>
              <CardDescription>What did you achieve today?</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="One win, one lesson learned..." />
            </CardContent>
          </Card>
        </div>
        
        {/* Full Width Weekly Grid */}
        <div className="xl:col-span-3">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BrainCircuit className="text-primary" /> Weekly Study Grid
                    </CardTitle>
                    <CardDescription>Plan your subjects for the week ahead.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                                    <TableHead key={day} className="text-center">{day}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                         <TableBody>
                            <TableRow>
                                {[...Array(7)].map((_, i) => (
                                    <TableCell key={i}>
                                        <Input placeholder="Subject" className="h-8 text-center bg-background/50" />
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                {[...Array(7)].map((_, i) => (
                                    <TableCell key={i}>
                                        <Input placeholder="Subject" className="h-8 text-center bg-background/50" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>

      </div>
    </div>
  );
}
