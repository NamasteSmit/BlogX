import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add `id`
    } & DefaultSession["user"]; // Include default properties (name, email, image)
  }

  interface JWT {
    id: string; // Add `id` to the JWT payload
  }
}

// By extending the Session and User interfaces from next-auth, you're telling TypeScript that id is a valid property for session.user and user.
// This ensures your code remains type-safe while allowing you to customize the session data.