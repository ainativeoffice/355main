import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import { 
  users,
  adminUsers,
  testimonials, 
  news,
  type User, 
  type InsertUser,
  type AdminUser,
  type Testimonial,
  type InsertTestimonial,
  type News,
  type InsertNews
} from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAdminByUsername(username: string): Promise<AdminUser | undefined>;
  createAdminUser(username: string, passwordHash: string): Promise<AdminUser>;
  
  getTestimonials(solutionType?: string): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: number): Promise<boolean>;
  
  getNews(category?: string, limit?: number): Promise<News[]>;
  getFeaturedNews(): Promise<News[]>;
  getNewsById(id: number): Promise<News | undefined>;
  createNews(newsItem: InsertNews): Promise<News>;
  updateNews(id: number, newsItem: Partial<InsertNews>): Promise<News | undefined>;
  deleteNews(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getAdminByUsername(username: string): Promise<AdminUser | undefined> {
    const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    return admin;
  }

  async createAdminUser(username: string, passwordHash: string): Promise<AdminUser> {
    const [admin] = await db.insert(adminUsers).values({ username, passwordHash }).returning();
    return admin;
  }

  async getTestimonials(solutionType?: string): Promise<Testimonial[]> {
    if (solutionType) {
      return db.select().from(testimonials)
        .where(eq(testimonials.solutionType, solutionType))
        .orderBy(desc(testimonials.createdAt));
    }
    return db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials)
      .where(eq(testimonials.featured, true))
      .orderBy(desc(testimonials.createdAt));
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [created] = await db.insert(testimonials).values(testimonial).returning();
    return created;
  }

  async updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const [updated] = await db.update(testimonials)
      .set(testimonial)
      .where(eq(testimonials.id, id))
      .returning();
    return updated;
  }

  async deleteTestimonial(id: number): Promise<boolean> {
    const result = await db.delete(testimonials).where(eq(testimonials.id, id)).returning();
    return result.length > 0;
  }

  async getNews(category?: string, limit?: number): Promise<News[]> {
    let query = db.select().from(news).orderBy(desc(news.publishedAt));
    
    if (category) {
      query = db.select().from(news)
        .where(eq(news.category, category))
        .orderBy(desc(news.publishedAt));
    }
    
    const results = await query;
    return limit ? results.slice(0, limit) : results;
  }

  async getFeaturedNews(): Promise<News[]> {
    return db.select().from(news)
      .where(eq(news.featured, true))
      .orderBy(desc(news.publishedAt));
  }

  async getNewsById(id: number): Promise<News | undefined> {
    const [item] = await db.select().from(news).where(eq(news.id, id));
    return item;
  }

  async createNews(newsItem: InsertNews): Promise<News> {
    const [created] = await db.insert(news).values(newsItem).returning();
    return created;
  }

  async updateNews(id: number, newsItem: Partial<InsertNews>): Promise<News | undefined> {
    const [updated] = await db.update(news)
      .set(newsItem)
      .where(eq(news.id, id))
      .returning();
    return updated;
  }

  async deleteNews(id: number): Promise<boolean> {
    const result = await db.delete(news).where(eq(news.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
