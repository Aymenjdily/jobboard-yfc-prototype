import type { ParsedCv } from "@/lib/types";

/**
 * Shown on the interview stage when the candidate hasn't scanned a CV yet.
 * Content follows the CV visible in design/02 (Khalil El Kabiri).
 */
export const SAMPLE_RESUME: ParsedCv = {
  fullName: "Khalil El Kabiri",
  title: "FP&A Manager",
  email: "khalil.elkabiri@example.com",
  phone: "+212 6 12 34 56 78",
  location: "Casablanca, Morocco",
  summary:
    "Accomplished finance professional with over 15 years of corporate experience in finance, controls, and operations, consistently delivering outstanding results.",
  experiences: [
    {
      company: "Foundever",
      role: "FP&A Manager",
      location: "Casablanca",
      start: "Dec 2021",
      end: null,
      description:
        "Lead a team of 4 analysts and own budgeting, forecasting and financial reporting for the Morocco territory.",
    },
    {
      company: "IBM",
      role: "Senior Financial Analyst / Account CFO",
      location: "Casablanca",
      start: "Apr 2018",
      end: "Sep 2021",
      description: "Managed end-to-end financials for the IBM/OCP joint venture account.",
    },
    {
      company: "IBM",
      role: "Operations & Controls Manager",
      location: "Casablanca",
      start: "Aug 2011",
      end: "Apr 2018",
      description: "Business operations and financial control lead for Global Technology Services, North Africa.",
    },
  ],
  education: [{ school: "ISCAE Casablanca", degree: "Master in Finance and Accounting", start: "2005", end: "2008" }],
  skills: ["Financial Planning", "Budgeting", "Forecasting", "SAP", "Power BI", "US GAAP"],
};
