export default function checkValidPassword(password) {
  const lowerCase = password.toLowerCase();
  const validString = /^(?!.*(?:password|123|1234|12345|123456)).*$/.test(
    lowerCase
  );
  // eslint-disable-next-line no-useless-escape
  const containsSpecial = /^(?=.*[\/!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*$/.test(
    lowerCase
  );
  if (!validString) {
    return {
      error: true,
      message:
        "Password must not contain 'password', '123', '1234', '12345', or '123456'",
    };
  } else if (lowerCase.length < 12) {
    return {
      error: true,
      message: "Password must be at least 12 characters long",
    };
  } else if (!containsSpecial) {
    return {
      error: true,
      message: "Password must contain a special character",
    };
  }
  return { error: false, message: "" };
}