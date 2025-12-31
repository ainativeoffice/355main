import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({
  id: true,
  createdAt: true,
});

export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  quote: text("quote").notNull(),
  solutionType: text("solution_type"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
});

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content"),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  publishedAt: timestamp("published_at").defaultNow(),
  featured: boolean("featured").default(false),
});

export const insertNewsSchema = createInsertSchema(news).omit({
  id: true,
  publishedAt: true,
});

export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;

export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  domain: text("domain"),
  workosOrgId: text("workos_org_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertOrganizationSchema = createInsertSchema(organizations).omit({
  id: true,
  createdAt: true,
});

export type InsertOrganization = z.infer<typeof insertOrganizationSchema>;
export type Organization = typeof organizations.$inferSelect;

export const members = pgTable("members", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  company: text("company"),
  jobRole: text("job_role"),
  teamSize: text("team_size"),
  moveInTiming: text("move_in_timing"),
  hubspotContactId: text("hubspot_contact_id"),
  workosUserId: text("workos_user_id"),
  organizationId: integer("organization_id").references(() => organizations.id),
  role: text("role").default("member"),
  stripeCustomerId: text("stripe_customer_id"),
  subscriptionId: text("subscription_id"),
  subscriptionStatus: text("subscription_status"),
  subscriptionTier: text("subscription_tier").default("free"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const memberPreferences = pgTable("member_preferences", {
  id: serial("id").primaryKey(),
  memberId: integer("member_id").notNull().references(() => members.id),
  workspaceArchetype: text("workspace_archetype"),
  privateOfficeDesks: integer("private_office_desks"),
  hybridMemberships: integer("hybrid_memberships"),
  collaborationModes: text("collaboration_modes").array(),
  amenities: text("amenities").array(),
  techStack: text("tech_stack").array(),
  integrations: text("integrations").array(),
  supportPriorities: text("support_priorities").array(),
  decisionStage: text("decision_stage"),
  notes: text("notes"),
  // Hospitality preferences
  morningBeverage: text("morning_beverage"),
  afternoonBeverage: text("afternoon_beverage"),
  beverageNotes: text("beverage_notes"),
  temperaturePreference: text("temperature_preference"),
  lightingPreference: text("lighting_preference"),
  preferredZone: text("preferred_zone"),
  notifyHospitalityOnArrival: boolean("notify_hospitality_on_arrival").default(true),
  syncWithCalendar: boolean("sync_with_calendar").default(false),
  enableLocationArrival: boolean("enable_location_arrival").default(false),
  birthday: text("birthday"),
  dietaryRestrictions: text("dietary_restrictions").array(),
  specialNotes: text("special_notes"),
});

export const memberArrivals = pgTable("member_arrivals", {
  id: serial("id").primaryKey(),
  memberId: integer("member_id").notNull().references(() => members.id),
  estimatedArrival: timestamp("estimated_arrival"),
  actualArrival: timestamp("actual_arrival"),
  status: text("status").default("pending"),
  guestCount: integer("guest_count").default(0),
  guestNames: text("guest_names"),
  beverageReady: boolean("beverage_ready").default(false),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMemberSchema = createInsertSchema(members).omit({
  id: true,
  createdAt: true,
  hubspotContactId: true,
});

export const insertMemberPreferencesSchema = createInsertSchema(memberPreferences).omit({
  id: true,
});

export const insertMemberArrivalSchema = createInsertSchema(memberArrivals).omit({
  id: true,
  createdAt: true,
});

export type InsertMember = z.infer<typeof insertMemberSchema>;
export type Member = typeof members.$inferSelect;
export type InsertMemberPreferences = z.infer<typeof insertMemberPreferencesSchema>;
export type MemberPreferences = typeof memberPreferences.$inferSelect;
export type InsertMemberArrival = z.infer<typeof insertMemberArrivalSchema>;
export type MemberArrival = typeof memberArrivals.$inferSelect;

export type MemberWithPreferences = Member & { preferences?: MemberPreferences };
export type ArrivalWithMember = MemberArrival & { member: Member; preferences?: MemberPreferences };
