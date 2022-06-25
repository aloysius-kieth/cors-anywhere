export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL: string;
      PORT: string;
      email: string;
      password: string;
      ENV: "test" | "dev" | "prod";
    }
  }
}
