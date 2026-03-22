import { TransformFnParams } from 'class-transformer';

const normalizeString = (value: unknown): string | unknown => {
  if (typeof value !== 'string') {
    return value;
  }

  return value.trim();
};

export const toTrimmedString = ({ value }: TransformFnParams) =>
  normalizeString(value);

export const toLowerCaseTrimmedString = ({ value }: TransformFnParams) => {
  const normalized = normalizeString(value);

  return typeof normalized === 'string' ? normalized.toLowerCase() : normalized;
};

export const toNullableTrimmedString = ({ value }: TransformFnParams) => {
  const normalized = normalizeString(value);

  if (normalized === '') {
    return null;
  }

  return normalized;
};
