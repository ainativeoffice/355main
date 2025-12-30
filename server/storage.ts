import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import { 
  users, 
  testimonials, 
  news,
  type User, 
  type InsertUser,
  type Testimonial,
  type InsertTestimonial,
  type News,
  type InsertNews
} from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getTestimonials(solutionType?: string): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  getNews(category?: string, limit?: number): Promise<News[]>;
  getFeaturedNews(): Promise<News[]>;
  createNews(newsItem: InsertNews): Promise<News>;
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

  async createNews(newsItem: InsertNews): Promise<News> {
    const [created] = await db.insert(news).values(newsItem).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
