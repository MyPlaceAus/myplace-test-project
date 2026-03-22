import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

import { paths } from 'src/routes/paths';
import { useParams, useRouter } from 'src/routes/hooks';
import { fetcher, endpoints } from 'src/lib/axios';
import { Button } from 'src/components/ui/button';
import { Alert, AlertDescription } from 'src/components/ui/alert';
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from 'src/components/ui/card';
import { useAuthContext } from 'src/auth/hooks';

type ProjectDto = {
  id: number;
  title: string;
  image: string;
};

const imageBasePath = '/templates';

export function ProjectDetailView() {
  const router = useRouter();
  const { projectId } = useParams();
  const { user } = useAuthContext();

  const [project, setProject] = useState<ProjectDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      const userId = Number(user?.id);
      const parsedProjectId = Number(projectId);

      if (!Number.isInteger(userId) || userId <= 0) {
        setError('Missing user session. Please sign in again.');
        setLoading(false);
        return;
      }

      if (!Number.isInteger(parsedProjectId) || parsedProjectId <= 0) {
        setError('Invalid project id.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetcher.get(endpoints.projects.byId(String(parsedProjectId)), {
          params: { userId },
        });

        if (!response) {
          setError('Project not found.');
          setProject(null);
          return;
        }

        setProject(response as ProjectDto);
      } catch (err) {
        console.error(err);
        setError('Failed to load project. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    void loadProject();
  }, [projectId, user?.id]);

  return (
    <main className="min-h-screen bg-linear-to-b from-background via-background to-muted/20">
      <section className="mx-auto w-full max-w-5xl px-6 py-8 md:py-10">
        <div className="mb-6">
          <Button variant="text" onClick={() => router.push(paths.dashboard.project)}>
            <ArrowLeft className="h-4 w-4" />
            Back to templates
          </Button>
        </div>

        {loading && (
          <Card>
            <CardHeader>
              <CardTitle>Loading project...</CardTitle>
              <CardDescription>Fetching project details.</CardDescription>
            </CardHeader>
          </Card>
        )}

        {!!error && (
          <Alert severity="error">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!loading && !error && project && (
          <Card className="overflow-hidden">
            <div className="relative aspect-video overflow-hidden bg-muted">
              <img
                src={`${imageBasePath}/${project.image}`}
                alt={project.title}
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.src = '/colin-logo.svg';
                  event.currentTarget.className = 'h-full w-full object-contain p-8 opacity-70';
                }}
              />
            </div>

            <CardHeader>
              <CardTitle className="text-2xl">{project.title}</CardTitle>
              <CardDescription>Project ID: {project.id}</CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your project is ready. Continue from here with your editing or proposal workflow.
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  );
}
