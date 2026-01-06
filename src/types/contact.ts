export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  captchaToken: string;
}

export interface ContactFormState extends ContactSubmission {
  honeypot: string;
}
