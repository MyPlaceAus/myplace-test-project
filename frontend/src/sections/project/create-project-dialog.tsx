import * as zod from 'zod';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useBoolean } from 'src/hooks/use-boolean';
import { toast } from 'src/components/snackbar';
import { Button } from 'src/components/ui/button';
import { Form, Field } from 'src/components/hook-form';
import {
  Dialog,
  DialogBody,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
} from 'src/components/ui/dialog';
import { createNewProject, type ProjectResponse } from './project-api';
import {
  imageBasePath,
  resolveProjectImage,
  templateImageOptions,
} from './project-template-images';

const CreateProjectSchema = zod.object({
  title: zod.string().min(1, { message: 'Project title is required!' }),
  image: zod.string().min(1, { message: 'Template image is required!' }),
});

type CreateProjectSchemaType = zod.infer<typeof CreateProjectSchema>;

type CreateProjectDialogProps = {
  userId: number;
  onError: (message: string) => void;
  onCreated?: (project: ProjectResponse) => void;
};

export function CreateProjectDialog({ userId, onError, onCreated }: CreateProjectDialogProps) {
  const openCreateDialog = useBoolean(false);
  const createProjectMethods = useForm<CreateProjectSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      title: '',
      image: resolveProjectImage(templateImageOptions[0]?.value),
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createProjectMethods;

  const selectedImage = createProjectMethods.watch('image');

  const handleCreateNewProject = handleSubmit(async (data) => {
    if (!Number.isInteger(userId) || userId <= 0) {
      onError('Missing user session. Please sign in again and retry.');
      return;
    }

    onError('');

    try {
      const project = await createNewProject({
        userId,
        title: data.title.trim(),
        image: resolveProjectImage(data.image.trim()),
      });

      if (!project?.id) {
        throw new Error('Project was created but no id was returned.');
      }

      onCreated?.(project);
      toast.success('Project created successfully.');
      createProjectMethods.reset({
        title: '',
        image: resolveProjectImage(data.image),
      });
      openCreateDialog.onFalse();
    } catch (err) {
      console.error(err);
      onError('Could not create project. Please try again.');
    }
  });

  return (
    <>
      <Button size="sm" variant="contained" color="primary" onClick={openCreateDialog.onTrue}>
        <Plus className="h-4 w-4" />
        Create new project
      </Button>

      <Dialog open={openCreateDialog.value} onOpenChange={openCreateDialog.setValue}>
        <DialogContent size="md">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Create a blank project using your own title and template image.
            </DialogDescription>
          </DialogHeader>

          <DialogBody>
            <Form methods={createProjectMethods}>
              <div className="space-y-3">
                <Field.Text name="title" label="Project title" placeholder="My New Proposal" />
                <Field.Select
                  name="image"
                  label="Template image"
                  placeholder="Select an image"
                  helperText="Images from public/templates"
                  options={templateImageOptions}
                />
                <div className="overflow-hidden rounded-md border bg-muted">
                  <img
                    src={`${imageBasePath}/${resolveProjectImage(selectedImage)}`}
                    alt="Selected template preview"
                    className="aspect-video w-full object-cover"
                  />
                </div>
              </div>
            </Form>
          </DialogBody>

          <DialogFooter>
            <Button variant="outline" onClick={openCreateDialog.onFalse}>
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              disabled={isSubmitting}
              onClick={() => void handleCreateNewProject()}
            >
              {isSubmitting ? 'Creating...' : 'Create project'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
