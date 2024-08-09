export enum ErrorCodes {
  INVALID_EMAIL = "auth/invalid-email",
  INVALID_CREDENTIAL = "auth/invalid-credential",
  WRONG_PASSWORD = "auth/wrong-password",
  TOO_MANY_REQUESTS = "auth/too-many-requests",
}

export enum ErrorMessage {
  INVALID_EMAIL = "Invalid email address. Please try again.",
  INVALID_PASSWORD = "Incorrect password. Please try again.",
  INVALID_CREDENTIAL = "An error occurred. Please try again.",
}
