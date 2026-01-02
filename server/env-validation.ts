type EnvVarConfig = {
  name: string;
  required: boolean;
  requiredInProduction?: boolean;
  devDefaultValue?: string;
  description: string;
};

const isProduction = process.env.REPLIT_DEPLOYMENT === "1";

const ENV_VARS: EnvVarConfig[] = [
  {
    name: "DATABASE_URL",
    required: true,
    description: "PostgreSQL connection string",
  },
  {
    name: "SESSION_SECRET",
    required: false,
    requiredInProduction: true,
    devDefaultValue: "opus-355-dev-session-secret-change-in-production",
    description: "Secret for signing session cookies (required in production)",
  },
  {
    name: "AUTH_API_KEY",
    required: false,
    description: "WorkOS API key for authentication (production)",
  },
  {
    name: "AUTH_CLIENT_ID",
    required: false,
    description: "WorkOS client ID for authentication (production)",
  },
  {
    name: "AUTH_DEV_API_KEY",
    required: false,
    description: "WorkOS API key for authentication (staging/development)",
  },
  {
    name: "AUTH_DEV_CLIENT_ID",
    required: false,
    description: "WorkOS client ID for authentication (staging/development)",
  },
  {
    name: "STRIPE_SECRET_KEY",
    required: false,
    description: "Stripe secret key for payments",
  },
  {
    name: "STRIPE_WEBHOOK_SECRET",
    required: false,
    description: "Stripe webhook signing secret",
  },
  {
    name: "PORT",
    required: false,
    devDefaultValue: "5000",
    description: "Server port",
  },
];

export type ValidationResult = {
  valid: boolean;
  errors: string[];
  warnings: string[];
};

export function validateEnvironment(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const envVar of ENV_VARS) {
    const value = process.env[envVar.name];

    if (!value) {
      if (envVar.required) {
        errors.push(`Missing required environment variable: ${envVar.name} - ${envVar.description}`);
      } else if (envVar.requiredInProduction && isProduction) {
        errors.push(`Missing required environment variable (production): ${envVar.name} - ${envVar.description}`);
      } else if (envVar.devDefaultValue && !isProduction) {
        process.env[envVar.name] = envVar.devDefaultValue;
        warnings.push(`Using development default for ${envVar.name}`);
      } else {
        warnings.push(`Optional environment variable not set: ${envVar.name} - ${envVar.description}`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateAndExit(): void {
  const result = validateEnvironment();

  if (result.warnings.length > 0) {
    console.log("\n⚠️  Environment Warnings:");
    result.warnings.forEach((warning) => console.log(`   - ${warning}`));
  }

  if (!result.valid) {
    console.error("\n❌ Environment Validation Failed:");
    result.errors.forEach((error) => console.error(`   - ${error}`));
    console.error("\nPlease set the required environment variables and try again.\n");
    process.exit(1);
  }

  console.log("✅ Environment validation passed");
}
