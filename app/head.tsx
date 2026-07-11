import { availableSuites } from "@/lib/suites";

export default function Head() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://355main.com/#owner",
        name: "North Castle Ventures",
        url: "https://northcastleventures.com",
      },
      {
        "@type": ["Place", "OfficeBuilding"],
        "@id": "https://355main.com/#building",
        name: "355 Main",
        url: "https://355main.com",
        address: { "@type": "PostalAddress", streetAddress: "355 Main Street", addressLocality: "Armonk", addressRegion: "NY", addressCountry: "US" },
        owner: { "@id": "https://355main.com/#owner" },
        managedBy: { "@id": "https://355main.com/#owner" },
        isPartOf: { "@type": "Place", name: "Armonk Professional Center", url: "https://armonkprofessionalcenter.com" },
      },
      ...availableSuites.map((suite) => ({
        "@type": "Offer",
        name: `${suite.name} at 355 Main`,
        availability: "https://schema.org/InStock",
        itemOffered: { "@type": "Accommodation", name: suite.name, floorSize: { "@type": "QuantitativeValue", value: suite.area.replace(/[^0-9]/g, ""), unitText: "square feet" }, containedInPlace: { "@id": "https://355main.com/#building" } },
      })),
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />;
}
