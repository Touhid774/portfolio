const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const MESSAGE_MAX = 2000;

/** Returns an object of { field: errorMessage }. Empty object = valid. */
export function validateContact({ name, email, subject, message }) {
  const errors = {};

  if (!name.trim()) errors.name = 'Please enter your name.';
  else if (name.trim().length < 2) errors.name = 'Your name must be at least 2 characters.';

  if (!email.trim()) errors.email = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'Please enter a valid email address.';

  if (!subject.trim()) errors.subject = 'Please add a subject.';
  else if (subject.trim().length < 3) errors.subject = 'The subject must be at least 3 characters.';

  if (!message.trim()) errors.message = 'Please write a message.';
  else if (message.trim().length < 10) errors.message = 'Your message must be at least 10 characters.';
  else if (message.length > MESSAGE_MAX) errors.message = `Please keep your message under ${MESSAGE_MAX} characters.`;

  return errors;
}
