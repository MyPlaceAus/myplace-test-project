import { Search, ArrowRight } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { templates } from 'src/templates';
import { Input } from 'src/components/ui/input';
import { Button } from 'src/components/ui/button';
import { Alert, AlertDescription } from 'src/components/ui/alert';
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from 'src/components/ui/card';
import { useAuthContext } from 'src/auth/hooks';

import { CreateProjectDialog } from '../create-project-dialog';
import { imageBasePath, resolveProjectImage } from '../project-template-images';
import { createNewProject, getProjectsByUser, type ProjectResponse } from '../project-api';

type CombinedProjectCard = {
  key: string;
  title: string;
  image: string;
  description: string;
  industries: string[];
  kind: 'template' | 'project';
  projectId?: number;
  template?: (typeof templates)[number];
};

export const ProjectView = () => {
  const router = useRouter();
  const { user } = useAuthContext();

  const [dbProjects, setDbProjects] = useState<ProjectResponse[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [isCreating, setIsCreating] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = Number(user?.id);

    if (!Number.isInteger(userId) || userId <= 0) {
      setDbProjects([]);
      return;
    }

    const loadProjects = async () => {
      setLoadingProjects(true);

      try {
        const projects = await getProjectsByUser(userId);
        setDbProjects(projects);
      } catch (err) {
        console.error(err);
        setError('Could not load your projects. Please try again.');
      } finally {
        setLoadingProjects(false);
      }
    };

    void loadProjects();
  }, [user?.id]);

  const templateByImage = useMemo(
    () =>
      new Map(
        templates.map((template) => [resolveProjectImage(template.image), template] as const)
      ),
    []
  );

  const combinedCards = useMemo<CombinedProjectCard[]>(() => {
    const projectCards = dbProjects.map((project) => {
      const matchedTemplate = templateByImage.get(resolveProjectImage(project.image));

      return {
        key: `project-${project.id}`,
        title: project.title,
        image: resolveProjectImage(project.image),
        description: matchedTemplate?.description ?? 'Saved project from your workspace.',
        industries: matchedTemplate?.industries ?? [],
        kind: 'project' as const,
        projectId: project.id,
      };
    });

    const templateCards = templates.map((template) => ({
      key: `template-${template.name}`,
      title: template.name,
      image: resolveProjectImage(template.image),
      description: template.description,
      industries: template.industries,
      kind: 'template' as const,
      template,
    }));

    return [...projectCards, ...templateCards];
  }, [dbProjects, templateByImage]);

  const filteredCards = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return combinedCards;
    }

    return combinedCards.filter((card) => {
      const haystack = [card.title, card.description, card.industries.join(' ')].join(' ');
      return haystack.toLowerCase().includes(query);
    });
  }, [combinedCards, search]);

  const handleCreateProject = async (template: (typeof templates)[number]) => {
    const userId = Number(user?.id);

    if (!Number.isInteger(userId) || userId <= 0) {
      setError('Missing user session. Please sign in again and retry.');
      return;
    }

    setError(null);
    setIsCreating(template.name);

    try {
      const project = await createNewProject({
        userId,
        title: template.name,
        image: resolveProjectImage(template.image),
      });

      if (!project?.id) {
        throw new Error('Project was created but no id was returned.');
      }

      router.push(paths.dashboard.projectById(project.id));
    } catch (err) {
      console.error(err);
      setError('Could not create project. Please try again.');
    } finally {
      setIsCreating(null);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-background via-background to-muted/20">
      <section className="mx-auto w-full max-w-7xl px-6 py-8 md:py-10">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Projects</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
              Start with a proven structure, then customize it for your customer and proposal.
            </p>
          </div>

          <CreateProjectDialog
            userId={Number(user?.id)}
            onError={(message) => setError(message || null)}
            onCreated={(project) => setDbProjects((prev) => [project, ...prev])}
          />
        </div>

        {loadingProjects && (
          <p className="mb-4 text-sm text-muted-foreground">Loading your saved projects...</p>
        )}

        {!!error && (
          <Alert severity="error" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="relative mb-6 max-w-md">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search projects and templates"
            className="pl-9"
            aria-label="Search projects"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCards.map((card) => {
            const loading =
              card.kind === 'template' && card.template ? isCreating === card.template.name : false;

            return (
              <Card
                key={card.key}
                className="group flex h-full flex-col overflow-hidden border-border/70 bg-card/70 backdrop-blur-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={`${imageBasePath}/${card.image}`}
                    alt={card.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = '/colin-logo.svg';
                      event.currentTarget.className =
                        'h-full w-full object-contain p-8 opacity-70 transition duration-300';
                    }}
                  />
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="line-clamp-1 text-lg">{card.title}</CardTitle>
                  <CardDescription className="line-clamp-2 min-h-10">
                    {card.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="mt-auto flex items-center justify-between pt-0">
                  <p className="line-clamp-1 text-xs text-muted-foreground">
                    {card.industries.slice(0, 2).join(' · ') || 'Custom project'}
                  </p>

                  <Button
                    size="sm"
                    variant="contained"
                    color="primary"
                    disabled={!!isCreating}
                    onClick={() => {
                      if (card.kind === 'project' && card.projectId) {
                        router.push(paths.dashboard.projectById(card.projectId));
                        return;
                      }

                      if (card.template) {
                        void handleCreateProject(card.template);
                      }
                    }}
                  >
                    {card.kind === 'project'
                      ? 'Open project'
                      : loading
                        ? 'Creating...'
                        : 'Use template'}
                    {!loading && <ArrowRight className="h-4 w-4" />}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
};
