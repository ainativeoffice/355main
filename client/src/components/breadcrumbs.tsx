import { useLocation, Link } from "wouter";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const routeLabels: Record<string, string> = {
  "/shells": "Shells",
  "/thesis": "Thesis",
  "/about": "About",
  "/inquiry": "Inquiry",
};

export function Breadcrumbs() {
  const [location] = useLocation();

  if (location === "/") return null;

  const segments = location.split("/").filter(Boolean);
  const crumbs: { path: string; label: string }[] = [];

  for (let i = 0; i < segments.length; i++) {
    const path = "/" + segments.slice(0, i + 1).join("/");
    const segment = segments[i] || "";
    const label = routeLabels[path] || segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    crumbs.push({ path, label });
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 pt-6" data-testid="breadcrumbs">
      <Breadcrumb>
        <BreadcrumbList className="text-xs uppercase tracking-widest">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/" data-testid="breadcrumb-home">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <span key={crumb.path} className="inline-flex items-center gap-1.5 sm:gap-2.5">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage data-testid={`breadcrumb-current`}>
                      {crumb.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={crumb.path} data-testid={`breadcrumb-link-${crumb.path.replace(/\//g, "-").slice(1)}`}>
                        {crumb.label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </span>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
