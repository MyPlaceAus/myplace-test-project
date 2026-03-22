import { templates } from 'src/templates';

export const imageBasePath = '/templates';

export const templateImageFiles = Array.from(
  new Set(
    templates.map((template) => template.image?.trim()).filter((image): image is string => !!image)
  )
);

const templateImageFileSet = new Set<string>(templateImageFiles);

export const templateImageOptions = templates
  .filter((template) => templateImageFileSet.has(template.image))
  .map((template) => ({
    label: `${template.name} (${template.image})`,
    value: template.image,
  }));

export const resolveProjectImage = (image?: string) =>
  image && templateImageFileSet.has(image)
    ? image
    : (templateImageFiles[0] ?? templates[0]?.image ?? 'professional-sales-proposal.png');
