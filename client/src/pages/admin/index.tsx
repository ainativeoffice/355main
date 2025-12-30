import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, LogOut } from "lucide-react";
import type { Testimonial, News } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: admin, isLoading: checkingAuth } = useQuery({
    queryKey: ["admin-auth"],
    queryFn: async () => {
      const response = await fetch("/api/admin/me", { credentials: "include" });
      if (!response.ok) throw new Error("Not authenticated");
      return response.json();
    },
    retry: false,
  });

  useEffect(() => {
    if (!checkingAuth && !admin) {
      setLocation("/admin/login");
    }
  }, [checkingAuth, admin, setLocation]);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    },
    onSuccess: () => {
      queryClient.clear();
      setLocation("/admin/login");
    },
  });

  if (checkingAuth) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl">Opus 355 Admin</h1>
            <p className="text-sm text-muted-foreground">Logged in as {admin.username}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-view-site">
              View Site
            </Link>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => logoutMutation.mutate()}
              data-testid="button-admin-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="testimonials">
          <TabsList className="mb-8">
            <TabsTrigger value="testimonials" data-testid="tab-testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="news" data-testid="tab-news">News</TabsTrigger>
          </TabsList>

          <TabsContent value="testimonials">
            <TestimonialsManager />
          </TabsContent>

          <TabsContent value="news">
            <NewsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function TestimonialsManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const response = await fetch("/api/testimonials");
      return response.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<Testimonial>) => {
      const response = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to create");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      setIsCreating(false);
      toast({ title: "Testimonial created" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Testimonial> }) => {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to update");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      setEditing(null);
      toast({ title: "Testimonial updated" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE", credentials: "include" });
      if (!response.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast({ title: "Testimonial deleted" });
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">Testimonials</h2>
        <Button onClick={() => setIsCreating(true)} data-testid="button-add-testimonial">
          <Plus className="w-4 h-4 mr-2" /> Add Testimonial
        </Button>
      </div>

      {(isCreating || editing) && (
        <TestimonialForm
          testimonial={editing}
          onSubmit={(data) => {
            if (editing) {
              updateMutation.mutate({ id: editing.id, data });
            } else {
              createMutation.mutate(data);
            }
          }}
          onCancel={() => {
            setEditing(null);
            setIsCreating(false);
          }}
          isLoading={createMutation.isPending || updateMutation.isPending}
        />
      )}

      <div className="grid gap-4">
        {testimonials?.map((t) => (
          <div key={t.id} className="bg-card p-6 border border-border flex items-start justify-between gap-4" data-testid={`card-admin-testimonial-${t.id}`}>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">{t.name}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{t.title}, {t.company}</span>
                {t.featured && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Featured</span>}
              </div>
              <p className="text-muted-foreground text-sm italic">"{t.quote}"</p>
              {t.solutionType && <p className="text-xs text-muted-foreground mt-2">Solution: {t.solutionType}</p>}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => setEditing(t)} data-testid={`button-edit-testimonial-${t.id}`}>
                <Pencil className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => deleteMutation.mutate(t.id)} data-testid={`button-delete-testimonial-${t.id}`}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialForm({ testimonial, onSubmit, onCancel, isLoading }: {
  testimonial: Testimonial | null;
  onSubmit: (data: Partial<Testimonial>) => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  const [form, setForm] = useState({
    name: testimonial?.name || "",
    title: testimonial?.title || "",
    company: testimonial?.company || "",
    quote: testimonial?.quote || "",
    solutionType: testimonial?.solutionType || "",
    featured: testimonial?.featured || false,
  });

  return (
    <div className="bg-card p-6 border border-border space-y-4">
      <h3 className="font-medium">{testimonial ? "Edit" : "New"} Testimonial</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Name</Label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} data-testid="input-testimonial-name" />
        </div>
        <div className="space-y-2">
          <Label>Title</Label>
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} data-testid="input-testimonial-title" />
        </div>
        <div className="space-y-2">
          <Label>Company</Label>
          <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} data-testid="input-testimonial-company" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Quote</Label>
        <Textarea value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} rows={3} data-testid="input-testimonial-quote" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Solution Type (optional)</Label>
          <Input value={form.solutionType} onChange={(e) => setForm({ ...form, solutionType: e.target.value })} placeholder="e.g., private-offices" data-testid="input-testimonial-solution" />
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={form.featured} onCheckedChange={(checked) => setForm({ ...form, featured: checked })} data-testid="switch-testimonial-featured" />
          <Label>Featured</Label>
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => onSubmit(form)} disabled={isLoading} data-testid="button-save-testimonial">
          {isLoading ? "Saving..." : "Save"}
        </Button>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
}

function NewsManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<News | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { data: newsItems } = useQuery<News[]>({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await fetch("/api/news");
      return response.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<News>) => {
      const response = await fetch("/api/admin/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to create");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      setIsCreating(false);
      toast({ title: "News article created" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<News> }) => {
      const response = await fetch(`/api/admin/news/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to update");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      setEditing(null);
      toast({ title: "News article updated" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/news/${id}`, { method: "DELETE", credentials: "include" });
      if (!response.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      toast({ title: "News article deleted" });
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">News & Updates</h2>
        <Button onClick={() => setIsCreating(true)} data-testid="button-add-news">
          <Plus className="w-4 h-4 mr-2" /> Add Article
        </Button>
      </div>

      {(isCreating || editing) && (
        <NewsForm
          news={editing}
          onSubmit={(data) => {
            if (editing) {
              updateMutation.mutate({ id: editing.id, data });
            } else {
              createMutation.mutate(data);
            }
          }}
          onCancel={() => {
            setEditing(null);
            setIsCreating(false);
          }}
          isLoading={createMutation.isPending || updateMutation.isPending}
        />
      )}

      <div className="grid gap-4">
        {newsItems?.map((n) => (
          <div key={n.id} className="bg-card p-6 border border-border flex items-start justify-between gap-4" data-testid={`card-admin-news-${n.id}`}>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">{n.title}</span>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">{n.category}</span>
                {n.featured && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Featured</span>}
              </div>
              <p className="text-muted-foreground text-sm">{n.excerpt}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => setEditing(n)} data-testid={`button-edit-news-${n.id}`}>
                <Pencil className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => deleteMutation.mutate(n.id)} data-testid={`button-delete-news-${n.id}`}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewsForm({ news, onSubmit, onCancel, isLoading }: {
  news: News | null;
  onSubmit: (data: Partial<News>) => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  const [form, setForm] = useState({
    title: news?.title || "",
    excerpt: news?.excerpt || "",
    content: news?.content || "",
    category: news?.category || "",
    imageUrl: news?.imageUrl || "",
    featured: news?.featured || false,
  });

  return (
    <div className="bg-card p-6 border border-border space-y-4">
      <h3 className="font-medium">{news ? "Edit" : "New"} Article</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} data-testid="input-news-title" />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g., Announcements, Design, Insights" data-testid="input-news-category" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Excerpt</Label>
        <Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} data-testid="input-news-excerpt" />
      </div>
      <div className="space-y-2">
        <Label>Content (optional)</Label>
        <Textarea value={form.content || ""} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={4} data-testid="input-news-content" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Image URL (optional)</Label>
          <Input value={form.imageUrl || ""} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} data-testid="input-news-image" />
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={form.featured} onCheckedChange={(checked) => setForm({ ...form, featured: checked })} data-testid="switch-news-featured" />
          <Label>Featured</Label>
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => onSubmit(form)} disabled={isLoading} data-testid="button-save-news">
          {isLoading ? "Saving..." : "Save"}
        </Button>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
}
