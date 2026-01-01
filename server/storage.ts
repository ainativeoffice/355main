import { db } from "./db";
import { eq, desc, and, gte, lte } from "drizzle-orm";
import { 
  users,
  adminUsers,
  testimonials, 
  news,
  members,
  memberPreferences,
  memberArrivals,
  organizations,
  type User, 
  type InsertUser,
  type AdminUser,
  type Testimonial,
  type InsertTestimonial,
  type News,
  type InsertNews,
  type Member,
  type InsertMember,
  type MemberPreferences,
  type InsertMemberPreferences,
  type MemberWithPreferences,
  type MemberArrival,
  type InsertMemberArrival,
  type ArrivalWithMember,
  type Organization,
  type InsertOrganization
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
  
  getMembers(): Promise<MemberWithPreferences[]>;
  getMemberById(id: number): Promise<MemberWithPreferences | undefined>;
  getMemberByEmail(email: string): Promise<Member | undefined>;
  createMember(member: InsertMember): Promise<Member>;
  updateMember(id: number, member: Partial<InsertMember>): Promise<Member | undefined>;
  deleteMember(id: number): Promise<boolean>;
  
  getMemberPreferences(memberId: number): Promise<MemberPreferences | undefined>;
  createMemberPreferences(preferences: InsertMemberPreferences): Promise<MemberPreferences>;
  updateMemberPreferences(memberId: number, preferences: Partial<InsertMemberPreferences>): Promise<MemberPreferences | undefined>;
  
  getOrganization(id: number): Promise<Organization | undefined>;
  createOrganization(org: InsertOrganization): Promise<Organization>;
  getOrganizationMembers(orgId: number): Promise<Member[]>;
  updateMemberOrganization(memberId: number, orgId: number, role?: string): Promise<Member | undefined>;
  
  getTodaysArrivals(): Promise<ArrivalWithMember[]>;
  getPendingArrivals(): Promise<ArrivalWithMember[]>;
  createArrival(arrival: InsertMemberArrival): Promise<MemberArrival>;
  updateArrival(id: number, arrival: Partial<InsertMemberArrival>): Promise<MemberArrival | undefined>;
  markArrivalComplete(id: number): Promise<MemberArrival | undefined>;
  markBeverageReady(id: number): Promise<MemberArrival | undefined>;
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
    return user!;
  }

  async getAdminByUsername(username: string): Promise<AdminUser | undefined> {
    const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    return admin;
  }

  async createAdminUser(username: string, passwordHash: string): Promise<AdminUser> {
    const [admin] = await db.insert(adminUsers).values({ username, passwordHash }).returning();
    return admin!;
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
    return created!;
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
    let results: News[];
    
    if (category) {
      results = await db.select().from(news)
        .where(eq(news.category, category))
        .orderBy(desc(news.publishedAt));
    } else {
      results = await db.select().from(news).orderBy(desc(news.publishedAt));
    }
    
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
    return created!;
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

  async getMembers(): Promise<MemberWithPreferences[]> {
    const allMembers = await db.select().from(members).orderBy(desc(members.createdAt));
    const result: MemberWithPreferences[] = [];
    
    for (const member of allMembers) {
      const [prefs] = await db.select().from(memberPreferences).where(eq(memberPreferences.memberId, member.id));
      result.push({ ...member, preferences: prefs });
    }
    
    return result;
  }

  async getMemberById(id: number): Promise<MemberWithPreferences | undefined> {
    const [member] = await db.select().from(members).where(eq(members.id, id));
    if (!member) return undefined;
    
    const [prefs] = await db.select().from(memberPreferences).where(eq(memberPreferences.memberId, id));
    return { ...member, preferences: prefs };
  }

  async getMemberByEmail(email: string): Promise<Member | undefined> {
    const [member] = await db.select().from(members).where(eq(members.email, email));
    return member;
  }

  async createMember(member: InsertMember): Promise<Member> {
    const [created] = await db.insert(members).values(member).returning();
    return created!;
  }

  async updateMember(id: number, member: Partial<InsertMember>): Promise<Member | undefined> {
    const [updated] = await db.update(members)
      .set(member)
      .where(eq(members.id, id))
      .returning();
    return updated;
  }

  async deleteMember(id: number): Promise<boolean> {
    await db.delete(memberPreferences).where(eq(memberPreferences.memberId, id));
    const result = await db.delete(members).where(eq(members.id, id)).returning();
    return result.length > 0;
  }

  async getMemberPreferences(memberId: number): Promise<MemberPreferences | undefined> {
    const [prefs] = await db.select().from(memberPreferences).where(eq(memberPreferences.memberId, memberId));
    return prefs;
  }

  async createMemberPreferences(preferences: InsertMemberPreferences): Promise<MemberPreferences> {
    const [created] = await db.insert(memberPreferences).values(preferences).returning();
    return created!;
  }

  async updateMemberPreferences(memberId: number, preferences: Partial<InsertMemberPreferences>): Promise<MemberPreferences | undefined> {
    const [updated] = await db.update(memberPreferences)
      .set(preferences)
      .where(eq(memberPreferences.memberId, memberId))
      .returning();
    return updated;
  }

  async getOrganization(id: number): Promise<Organization | undefined> {
    const [org] = await db.select().from(organizations).where(eq(organizations.id, id));
    return org;
  }

  async createOrganization(org: InsertOrganization): Promise<Organization> {
    const [created] = await db.insert(organizations).values(org).returning();
    return created!;
  }

  async getOrganizationMembers(orgId: number): Promise<Member[]> {
    return db.select().from(members).where(eq(members.organizationId, orgId));
  }

  async updateMemberOrganization(memberId: number, orgId: number, role: string = "member"): Promise<Member | undefined> {
    const [updated] = await db.update(members)
      .set({ organizationId: orgId, role })
      .where(eq(members.id, memberId))
      .returning();
    return updated;
  }

  async getTodaysArrivals(): Promise<ArrivalWithMember[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const arrivals = await db.select().from(memberArrivals)
      .where(and(
        gte(memberArrivals.createdAt, today),
        lte(memberArrivals.createdAt, tomorrow)
      ))
      .orderBy(desc(memberArrivals.estimatedArrival));

    const result: ArrivalWithMember[] = [];
    for (const arrival of arrivals) {
      const [member] = await db.select().from(members).where(eq(members.id, arrival.memberId));
      if (member) {
        const [prefs] = await db.select().from(memberPreferences).where(eq(memberPreferences.memberId, member.id));
        result.push({ ...arrival, member, preferences: prefs });
      }
    }
    return result;
  }

  async getPendingArrivals(): Promise<ArrivalWithMember[]> {
    const arrivals = await db.select().from(memberArrivals)
      .where(eq(memberArrivals.status, "pending"))
      .orderBy(memberArrivals.estimatedArrival);

    const result: ArrivalWithMember[] = [];
    for (const arrival of arrivals) {
      const [member] = await db.select().from(members).where(eq(members.id, arrival.memberId));
      if (member) {
        const [prefs] = await db.select().from(memberPreferences).where(eq(memberPreferences.memberId, member.id));
        result.push({ ...arrival, member, preferences: prefs });
      }
    }
    return result;
  }

  async createArrival(arrival: InsertMemberArrival): Promise<MemberArrival> {
    const [created] = await db.insert(memberArrivals).values(arrival).returning();
    return created!;
  }

  async updateArrival(id: number, arrival: Partial<InsertMemberArrival>): Promise<MemberArrival | undefined> {
    const [updated] = await db.update(memberArrivals)
      .set(arrival)
      .where(eq(memberArrivals.id, id))
      .returning();
    return updated;
  }

  async markArrivalComplete(id: number): Promise<MemberArrival | undefined> {
    const [updated] = await db.update(memberArrivals)
      .set({ status: "arrived", actualArrival: new Date() })
      .where(eq(memberArrivals.id, id))
      .returning();
    return updated;
  }

  async markBeverageReady(id: number): Promise<MemberArrival | undefined> {
    const [updated] = await db.update(memberArrivals)
      .set({ beverageReady: true })
      .where(eq(memberArrivals.id, id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
