import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CreateCoursePage() {
  return (
    <div>
      <PageHeader
        title="Create a New Course"
        subtitle="This feature is under construction."
      />
      <Card>
        <CardHeader>
          <CardTitle>Course Builder</CardTitle>
          <CardDescription>
            Build, price, and publish your course to the marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            As a Guru, you'll soon have the tools to create and sell your own courses. Design your curriculum, upload video lessons, create quizzes, and set your own pricing.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
