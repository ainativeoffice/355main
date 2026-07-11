export function GET() {
  const content = `# 355 Main

355main.com is the building and suites experience for 355 Main in Armonk, New York. 355 Main is part of Armonk Professional Center, the campus-level destination encompassing 355 Main and 357 Main. North Castle Ventures owns and manages both buildings.

## Current suite status
- Suite 101/A — 2,520 SF — now leasing.
- Suite 102/B — 2,534 SF — now leasing.
- Suite 103/C — 2,380 SF — occupied and not available.
- Alpha School leased the 2nd Level Full-Floor Flagship Suite. This is a tenant milestone and is not current availability.

## Ecosystem
- Armonk Professional Center: campus-wide destination and inquiries.
- 355 Main: building-specific suite leasing.
- North Castle Ventures: owner and manager.
- Alpha School: AI-powered K–8 education platform and tenant milestone.
- Native Agentic: operator of the sovereign technology layer.
- Nate — Native Agentic Technical Engineer: technical support role for the environment.
- AI-Native Office RFC: open specification describing the room as the machine.
- Sovereign Shell: on-premises technology environment in which tenants retain ownership and custody of their hardware and data.
- NVIDIA: referenced as the hardware platform for on-premises infrastructure.
`;

  return new Response(content, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
