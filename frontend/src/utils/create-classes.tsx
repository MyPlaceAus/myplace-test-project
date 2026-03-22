// ----------------------------------------------------------------------

import { CONFIG } from 'src/global-config';

export function createClasses(className: string): string {
  return `${CONFIG.classesPrefix}__${className}`;
}
