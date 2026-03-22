export type InputValue = string | number | null | undefined;

/**
 * Transforms the input value to a string.
 *
 * @param {InputValue} value - The value to transform.
 * @param {string} [defaultValue=''] - The default value to return if the input value is null, undefined, or NaN.
 * @returns {string} - The transformed string value.
 */
export function transformValue(
  value: InputValue,
  defaultValue: string = ''
): string {
  if (
    value === null ||
    value === undefined ||
    (typeof value === 'number' && Number.isNaN(value))
  ) {
    return defaultValue;
  }

  return value.toString();
}

// ----------------------------------------------------------------------

/**
 * Transforms the output value on change event.
 *
 * @param {string | number} value - The value to transform.
 * @returns {number | ''} - The cleaned and transformed numeric value, or an empty string.
 */
export function transformValueOnChange(value: string | number): number | '' {
  const currentValue: string = transformValue(value);

  const cleanedValue = currentValue.replace(/[^0-9.]/g, '');
  const [integerPart, ...decimalParts] = cleanedValue.split('.');

  const normalizedValue =
    decimalParts.length > 0
      ? `${integerPart}.${decimalParts.join('')}`
      : integerPart;

  if (normalizedValue === '' || normalizedValue === '.') {
    return '';
  }

  const numericValue = parseFloat(normalizedValue);

  return Number.isNaN(numericValue) ? '' : numericValue;
}

// ----------------------------------------------------------------------

/**
 * Transforms the output value on blur event.
 *
 * @param {InputValue} value - The value to transform.
 * @param {string | number} [defaultValue=''] - The default value to return if the input value is null, undefined, or NaN.
 * @returns {string | number} - The transformed numeric value or the default value.
 */
export function transformValueOnBlur(
  value: InputValue,
  defaultValue: string | number = ''
): string | number {
  if (
    value === null ||
    value === undefined ||
    (typeof value === 'number' && Number.isNaN(value))
  ) {
    return defaultValue;
  }

  const numericValue = parseFloat(value.toString());

  if (Number.isNaN(numericValue)) {
    return defaultValue;
  }

  return numericValue;
}

// ----------------------------------------------------------------------

export const transformNumber = {
  onChange: transformValueOnChange,
  onBlur: transformValueOnBlur,
  value: transformValue,
};
