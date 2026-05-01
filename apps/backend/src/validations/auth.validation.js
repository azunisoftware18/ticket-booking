import { z } from "zod";

class AuthValidation {
  static get login() {
    return z.object({
      identifier: z.string().min(3, "Email Or phone required"),
      password: z.string().min(6, "Password minimum 6 characters"),
    });
  }
}

export default AuthValidation;
