export const config = {
  isProduction: process.env.REPLIT_DEPLOYMENT === "1",
  isDevelopment: process.env.REPLIT_DEPLOYMENT !== "1",
  
  get environment() {
    return this.isProduction ? "production" : "development";
  },
};
