const emailValidation = (email) => email.includes('@');
const passwordValidation = (password) => password.length >= 6;
const checkPasswordMatch = (password, confirmPassword) =>
  // eslint-disable-next-line
  password === confirmPassword;

const loginValidation = (email, password) => {
  let message = '';
  let valid = false;
  if (!emailValidation(email)) {
    message = 'Please enter valid email';
    valid = false;
    return { message, valid };
  }
  if (!passwordValidation(password)) {
    message = 'Password should be minimum of 6 characters long';
    valid = false;
    return { message, valid };
  }
  return {
    valid: true,
  };
};

const registerValidations = (email, password, confirmPassword) => {
  let message = '';
  let valid = false;
  const validation = loginValidation(email, password);
  console.log(validation, 3);
  if (!validation.valid) {
    return validation;
  }

  if (!checkPasswordMatch(password, confirmPassword)) {
    message = 'Passwords does not match';
    valid = false;
    return { message, valid };
  }
  return { valid: true };
};

const isValidUserCredentials = (credentials, signIn) => {
  const email = credentials.email?.current?.value;
  const password = credentials.password?.current?.value;
  const confirmPassword = credentials.confirmPassword?.current?.value;

  if (signIn) {
    const validation = loginValidation(email, password);
    return validation;
  }

  const register = registerValidations(email, password, confirmPassword);
  console.log(register, 21);
  return register;
};

export default isValidUserCredentials;
