import type { Company } from "@/lib/types";

// Logos are cropped from design/05-lounge-rooms.jpg (38×38).
export const COMPANIES: Company[] = [
  { id: "bank-of-africa", name: "Bank of Africa", logo: "/logos/bank-of-africa.png", tags: ["Banking"] },
  { id: "deloitte", name: "Deloitte.", logo: "/logos/deloitte.png", tags: ["Audit", "Finance", "Consulting"] },
  { id: "apple", name: "Apple", logo: "/logos/apple.png", tags: ["Audit", "Finance", "Consulting"] },
  { id: "dell", name: "Dell", logo: "/logos/dell.png", tags: ["Audit", "Finance", "Consulting"] },
  { id: "microsoft", name: "Microsoft", logo: "/logos/microsoft.png", tags: ["Audit", "Finance", "Consulting"] },
  { id: "salesforce", name: "Salesforce", logo: "/logos/salesforce.png", tags: ["Audit", "Finance", "Consulting"] },
  { id: "canon", name: "Canon", logo: "/logos/canon.png", tags: ["Audit", "Finance", "Consulting"] },
  { id: "ent", name: "Ent", logo: "/logos/ent.png", tags: ["Audit", "Finance", "Consulting"] },
  { id: "deloitte-digital", name: "Deloitte", logo: "/logos/deloitte-digital.png", tags: ["Audit", "Finance", "Consulting"] },
];

export function getCompany(id: string): Company | undefined {
  return COMPANIES.find((company) => company.id === id);
}
