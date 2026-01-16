import { useLocation } from "wouter";
import { AlertTriangle, ArrowLeft, Mail, RefreshCw, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ERROR_MESSAGES: Record<string, { title: string; description: string; action?: string }> = {
  auth_not_configured: {
    title: "Authentication Not Available",
    description: "The authentication system is not properly configured. Please contact support for assistance.",
    action: "contact",
  },
  missing_code: {
    title: "Authentication Incomplete",
    description: "The authentication process was interrupted. This can happen if you navigated away during sign-in.",
    action: "retry",
  },
  no_email: {
    title: "Email Required",
    description: "We couldn't retrieve your email address from the authentication provider. Please try signing in with a different method.",
    action: "retry",
  },
  email_not_verified: {
    title: "Email Not Verified",
    description: "Please verify your email address before signing in. Check your inbox for a verification link.",
    action: "retry",
  },
  auth_failed: {
    title: "Authentication Failed",
    description: "Something went wrong during sign-in. This may be a temporary issue. Please try again.",
    action: "retry",
  },
  invalid_client: {
    title: "Configuration Error",
    description: "There's a mismatch in the authentication configuration. Our team has been notified and is working on a fix.",
    action: "contact",
  },
  session_expired: {
    title: "Session Expired",
    description: "Your session has expired. Please sign in again to continue.",
    action: "retry",
  },
  default: {
    title: "Authentication Error",
    description: "An unexpected error occurred during sign-in. Please try again or contact support if the problem persists.",
    action: "retry",
  },
};

export default function AuthError() {
  const [, setLocation] = useLocation();
  
  const params = new URLSearchParams(window.location.search);
  const errorCode = params.get("code") || "default";
  const errorDetails = params.get("details");
  
  const errorInfo = ERROR_MESSAGES[errorCode] ?? ERROR_MESSAGES.default!;

  const handleRetry = () => {
    window.location.href = "/api/auth/login";
  };

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4" data-testid="auth-error-page">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-destructive/10 p-4">
              <AlertTriangle className="h-10 w-10 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-xl" data-testid="text-error-title">
            {errorInfo.title}
          </CardTitle>
          <CardDescription className="text-base" data-testid="text-error-description">
            {errorInfo.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {errorInfo.action === "retry" && (
              <Button onClick={handleRetry} data-testid="button-retry-auth">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            )}
            
            {errorInfo.action === "contact" && (
              <Button asChild data-testid="button-contact-support">
                <a href="mailto:support@355main.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Support
                </a>
              </Button>
            )}
            
            <Button variant="outline" onClick={handleGoHome} data-testid="button-go-home">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>

          {errorDetails && process.env.NODE_ENV === "development" && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Technical Details
              </summary>
              <div className="mt-2 p-3 bg-muted rounded-lg overflow-auto">
                <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                  {decodeURIComponent(errorDetails)}
                </pre>
              </div>
            </details>
          )}

          <p className="text-center text-sm text-muted-foreground pt-4">
            Error code: <code className="bg-muted px-1 rounded" data-testid="text-error-code">{errorCode}</code>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
