import { db } from "../server/db";
import { testimonials, news, members, memberPreferences } from "../shared/schema";
import { eq } from "drizzle-orm";

const SEED_MARKER_EMAIL = "seed-marker@355main.dev";

async function clearSeededData() {
  console.log("🧹 Clearing previously seeded data...");
  
  const seedMarker = await db
    .select()
    .from(members)
    .where(eq(members.email, SEED_MARKER_EMAIL))
    .limit(1);

  if (seedMarker.length === 0) {
    console.log("   No seed marker found, skipping cleanup");
    return;
  }

  await db.delete(memberPreferences);
  await db.delete(members).where(eq(members.email, SEED_MARKER_EMAIL));
  
  const seededEmails = [
    "sarah.chen@techventures.io",
    "marcus.johnson@greenleaf.design",
    "alex.rivera@streamline.co",
    "emily.watson@innovatehub.com",
    "david.kim@futurescape.ai",
  ];
  
  for (const email of seededEmails) {
    const member = await db.select().from(members).where(eq(members.email, email)).limit(1);
    if (member.length > 0 && member[0]) {
      await db.delete(memberPreferences).where(eq(memberPreferences.memberId, member[0].id));
      await db.delete(members).where(eq(members.email, email));
    }
  }
  
  await db.delete(testimonials);
  await db.delete(news);
  
  console.log("   ✅ Cleared seeded data");
}

async function seedTestimonials() {
  console.log("📝 Seeding testimonials...");
  
  const testimonialsData = [
    {
      name: "Sarah Chen",
      title: "CEO",
      company: "Tech Ventures Inc.",
      quote: "355 Main transformed how our distributed team collaborates. The hybrid membership gives us the flexibility we need while maintaining a professional home base.",
      solutionType: "hybrid",
      featured: true,
    },
    {
      name: "Marcus Johnson",
      title: "Creative Director",
      company: "Greenleaf Design",
      quote: "The private office space is stunning. Our clients are always impressed by the professional atmosphere and thoughtful design details.",
      solutionType: "private",
      featured: true,
    },
    {
      name: "Rachel Torres",
      title: "Partner",
      company: "Torres & Associates",
      quote: "Moving our law practice to 355 Main was the best decision we made. The enterprise amenities and meeting rooms are perfect for client consultations.",
      solutionType: "enterprise",
      featured: false,
    },
    {
      name: "Alex Kim",
      title: "Founder",
      company: "Streamline AI",
      quote: "The tech infrastructure here is unmatched. Fast connectivity, great meeting rooms, and the community events have led to valuable partnerships.",
      solutionType: "hybrid",
      featured: false,
    },
  ];

  await db.insert(testimonials).values(testimonialsData);
  console.log(`   ✅ Created ${testimonialsData.length} testimonials`);
}

async function seedNews() {
  console.log("📰 Seeding news articles...");
  
  const newsData = [
    {
      title: "355 Main Announces New Smart Building Features",
      excerpt: "Introducing Casambi lighting control and automated climate management for all members.",
      content: "We're excited to announce the integration of cutting-edge smart building technology...",
      category: "Announcements",
      featured: true,
    },
    {
      title: "Monthly Networking Event: Innovation in Armonk",
      excerpt: "Join us for our monthly community gathering featuring local entrepreneurs and thought leaders.",
      content: "Our monthly networking events continue to bring together the best minds in Westchester...",
      category: "Events",
      featured: false,
    },
    {
      title: "New Private Offices Now Available",
      excerpt: "We've expanded our private office inventory with beautifully designed spaces.",
      content: "Due to popular demand, we're thrilled to open additional private office suites...",
      category: "Space Updates",
      featured: true,
    },
    {
      title: "Holiday Hours and Upcoming Schedule",
      excerpt: "Important information about building access during the upcoming holiday season.",
      content: "As we approach the holiday season, please note our adjusted building hours...",
      category: "Operations",
      featured: false,
    },
  ];

  await db.insert(news).values(newsData);
  console.log(`   ✅ Created ${newsData.length} news articles`);
}

async function seedMembers() {
  console.log("👥 Seeding members...");
  
  const membersData = [
    {
      email: SEED_MARKER_EMAIL,
      firstName: "Seed",
      lastName: "Marker",
      company: "System",
      jobRole: "Marker",
      teamSize: "1",
      role: "member",
      subscriptionTier: "free",
    },
    {
      email: "sarah.chen@techventures.io",
      firstName: "Sarah",
      lastName: "Chen",
      company: "Tech Ventures Inc.",
      jobRole: "CEO",
      teamSize: "6-15",
      moveInTiming: "Q1 2026",
      role: "member",
      subscriptionTier: "hybrid",
      subscriptionStatus: "active",
    },
    {
      email: "marcus.johnson@greenleaf.design",
      firstName: "Marcus",
      lastName: "Johnson",
      company: "Greenleaf Design",
      jobRole: "Creative Director",
      teamSize: "2-5",
      role: "member",
      subscriptionTier: "private",
      subscriptionStatus: "active",
    },
    {
      email: "alex.rivera@streamline.co",
      firstName: "Alex",
      lastName: "Rivera",
      company: "Streamline Co",
      jobRole: "Product Manager",
      teamSize: "16-30",
      role: "member",
      subscriptionTier: "hybrid",
      subscriptionStatus: "active",
    },
    {
      email: "emily.watson@innovatehub.com",
      firstName: "Emily",
      lastName: "Watson",
      company: "InnovateHub",
      jobRole: "CTO",
      teamSize: "6-15",
      role: "staff",
      subscriptionTier: "enterprise",
      subscriptionStatus: "active",
    },
    {
      email: "david.kim@futurescape.ai",
      firstName: "David",
      lastName: "Kim",
      company: "FutureScape AI",
      jobRole: "Founder",
      teamSize: "2-5",
      role: "member",
      subscriptionTier: "free",
    },
  ];

  const createdMembers = await db.insert(members).values(membersData).returning();
  console.log(`   ✅ Created ${createdMembers.length} members`);
  
  return createdMembers;
}

async function seedMemberPreferences(createdMembers: { id: number; email: string }[]) {
  console.log("⚙️  Seeding member preferences...");
  
  const preferencesMap: Record<string, Partial<typeof memberPreferences.$inferInsert>> = {
    "sarah.chen@techventures.io": {
      workspaceArchetype: "hybrid",
      hybridMemberships: 5,
      collaborationModes: ["video-calls", "team-meetings", "client-presentations"],
      amenities: ["high-speed-wifi", "standing-desks", "phone-booths"],
      morningBeverage: "Oat milk latte",
      afternoonBeverage: "Sparkling water",
      temperaturePreference: "cool",
      lightingPreference: "natural",
      preferredZone: "focus",
      notifyHospitalityOnArrival: true,
    },
    "marcus.johnson@greenleaf.design": {
      workspaceArchetype: "private",
      privateOfficeDesks: 4,
      collaborationModes: ["creative-sessions", "client-reviews"],
      amenities: ["natural-light", "whiteboard-walls", "printer-access"],
      morningBeverage: "Black coffee",
      afternoonBeverage: "Green tea",
      temperaturePreference: "warm",
      lightingPreference: "warm",
      preferredZone: "creative",
      notifyHospitalityOnArrival: true,
      specialNotes: "Prefers quiet environment for creative work",
    },
    "alex.rivera@streamline.co": {
      workspaceArchetype: "hybrid",
      hybridMemberships: 10,
      collaborationModes: ["stand-ups", "brainstorming", "workshops"],
      amenities: ["conference-rooms", "video-equipment", "catering"],
      morningBeverage: "Americano",
      temperaturePreference: "moderate",
      preferredZone: "collaboration",
      notifyHospitalityOnArrival: false,
    },
    "emily.watson@innovatehub.com": {
      workspaceArchetype: "enterprise",
      privateOfficeDesks: 12,
      hybridMemberships: 8,
      collaborationModes: ["all-hands", "executive-meetings", "town-halls"],
      amenities: ["dedicated-floor", "reception-services", "parking"],
      morningBeverage: "Chai latte",
      afternoonBeverage: "Earl grey tea",
      temperaturePreference: "cool",
      lightingPreference: "adjustable",
      preferredZone: "executive",
      notifyHospitalityOnArrival: true,
      syncWithCalendar: true,
      dietaryRestrictions: ["vegetarian"],
    },
  };

  let count = 0;
  for (const member of createdMembers) {
    const prefs = preferencesMap[member.email];
    if (prefs) {
      await db.insert(memberPreferences).values({
        memberId: member.id,
        ...prefs,
      });
      count++;
    }
  }
  
  console.log(`   ✅ Created ${count} member preference records`);
}

async function main() {
  console.log("\n🌱 Starting database seed...\n");
  
  try {
    await clearSeededData();
    await seedTestimonials();
    await seedNews();
    const createdMembers = await seedMembers();
    await seedMemberPreferences(createdMembers);
    
    console.log("\n✨ Database seeding complete!\n");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Seeding failed:", error);
    process.exit(1);
  }
}

main();
