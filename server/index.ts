import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { testDatabaseConnection } from "./db";
import { validateAndExit } from "./env-validation";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

async function startServer() {
  try {
    log("Starting server initialization...", "startup");
    
    validateAndExit();
    
    log(`NODE_ENV: ${process.env.NODE_ENV || "development"}`, "startup");
    log(`DATABASE_URL: ${process.env.DATABASE_URL ? "configured" : "NOT SET"}`, "startup");
    log(`SESSION_SECRET: ${process.env.SESSION_SECRET ? "configured" : "using default"}`, "startup");
    log(`PORT: ${process.env.PORT || "5000 (default)"}`, "startup");

    log("Testing database connection...", "startup");
    const dbConnected = await testDatabaseConnection();
    if (!dbConnected) {
      log("WARNING: Database connection failed, but continuing server startup", "startup");
    }

    await registerRoutes(httpServer, app);
    log("Routes registered successfully", "startup");

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      log(`Error: ${message}`, "error");
      res.status(status).json({ message });
    });

    if (process.env.NODE_ENV === "production") {
      log("Setting up static file serving for production", "startup");
      serveStatic(app);
    } else {
      log("Setting up Vite dev server", "startup");
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
    }

    const port = parseInt(process.env.PORT || "5000", 10);
    httpServer.listen(
      {
        port,
        host: "0.0.0.0",
        reusePort: true,
      },
      () => {
        log(`Server is ready and listening on port ${port}`, "startup");
        log(`Server startup complete`, "startup");
      },
    );
  } catch (error) {
    log(`Fatal error during server startup: ${error}`, "error");
    console.error(error);
    process.exit(1);
  }
}

startServer();
