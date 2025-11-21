
import { PageHeader } from "@/components/shared/page-header";
import { CAREER_PATHS, LIVE_CLASSES } from "@/lib/data";
import CareerPathCard from "@/components/career-hub/career-path-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Radio, Calendar } from "lucide-react";
import ClientOnly from "@/components/shared/client-only";

const LiveClassSection = () => {
    const liveClass = LIVE_CLASSES.find(c => c.isLive);
    const upcomingClasses = LIVE_CLASSES.filter(c => !c.isLive);

    return (
        <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
                <Radio className="h-8 w-8 text-red-500 animate-pulse" />
                Live Now
            </h2>
            <p className="text-muted-foreground mb-6">Join live sessions from creators and mentors.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card className="overflow-hidden">
                        <CardContent className="p-0">
                            {liveClass ? (
                                <div className="aspect-video">
                                    <iframe
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${liveClass.youtubeId}?autoplay=1`}
                                        title={liveClass.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            ) : (
                                <div className="aspect-video bg-muted flex items-center justify-center">
                                    <p className="text-muted-foreground">No class is live right now. Check back later!</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                     {liveClass && (
                        <div className="mt-4">
                            <h3 className="text-xl font-bold">{liveClass.title}</h3>
                            <p className="text-muted-foreground">with <span className="font-semibold text-primary">{liveClass.host}</span></p>
                            <p className="text-sm mt-2">{liveClass.description}</p>
                        </div>
                    )}
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Upcoming Schedule
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {upcomingClasses.map(c => (
                                <div key={c.id} className="p-3 bg-background/50 rounded-lg border">
                                    <p className="font-semibold">{c.title}</p>
                                    <p className="text-sm text-muted-foreground">by {c.host}</p>
                                    <ClientOnly>
                                        <p className="text-xs text-accent font-semibold mt-1">
                                            {new Date(c.startTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                                        </p>
                                    </ClientOnly>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default function CareerHubPage() {
    const after10th = CAREER_PATHS.filter(p => p.id === 'cp-1'); // Simplified for example
    const after12th = CAREER_PATHS;
  
  return (
    <div>
      <PageHeader 
        title="Live Classes"
        subtitle="Explore your future. Join live classes, discover trending careers, and find exam roadmaps."
      />

      <LiveClassSection />

      <Tabs defaultValue="after12th" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="after10th">After 10th</TabsTrigger>
          <TabsTrigger value="after12th">After 12th</TabsTrigger>
        </TabsList>
        <TabsContent value="after10th" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {after10th.length > 0 ? after10th.map(path => (
                    <CareerPathCard key={path.id} path={path} />
                )) : (
                    <p className="text-muted-foreground col-span-full">Career paths for after 10th grade are being updated.</p>
                )}
            </div>
        </TabsContent>
        <TabsContent value="after12th" className="mt-6">
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {after12th.map(path => (
                    <CareerPathCard key={path.id} path={path} />
                ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
