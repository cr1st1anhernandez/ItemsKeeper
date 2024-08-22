export function validateEmail(email: string) {
  if (!email) {
    return 'Email cannot be empty.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return 'Email format is invalid.';
  }

  return '';
}

export function validateName(name: string) {
  if (!name.trim()) {
    return 'Name cannot be empty.';
  }
  const nameRegex = /^[a-zA-Z\s]+$/;

  if (!nameRegex.test(name)) {
    return 'Name can only contain letters and spaces.';
  }
  if (name.length > 50) {
    return 'Name cannot exceed 50 characters.';
  }

  return '';
}

export function validatePassword(password: string) {
  if (!password) {
    return 'Password cannot be empty.';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  if (!uppercaseRegex.test(password)) {
    return 'Password must contain at least one uppercase letter.';
  }
  if (!lowercaseRegex.test(password)) {
    return 'Password must contain at least one lowercase letter.';
  }
  if (!numberRegex.test(password)) {
    return 'Password must contain at least one number.';
  }
  if (!specialCharRegex.test(password)) {
    return 'Password must contain at least one special character.';
  }

  return '';
}
