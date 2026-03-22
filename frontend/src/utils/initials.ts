// Get initials from a name
export const getInitials = (name: string) => {
  if (!name) return '';

  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    // Single word: take first character
    return words[0].charAt(0).toUpperCase();
  }

  // Multiple words: take first character of first and last word
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
};
