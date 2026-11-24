import industrialImage from "../assets/industrial-development.jpg";
import constructionImage from "../assets/construction.jpg";
import redevelopmentImage from "../assets/redevelopment.jpg";
import pradhikaranImage from "../assets/pradhikaran.jpeg";

export const defaultProjects = [
  {
    id: "grandeur-residency",
    phase: "completed",
    type: "Residential & Commercial",
    title: "Grandeur Residency",
    location: "Ravet, Pune",
    image: "/project-images/grandeur-residency-01.jpg",
    gallery: [
      {
        src: "/project-images/grandeur-residency-01.jpg",
        label: "3D Front Elevation",
      },
      {
        src: "/project-images/grandeur-residency-02.jpg",
        label: "3D Side Elevation",
      },
      {
        src: "/project-images/grandeur-residency-floor-plan.jpg",
        label: "Typical Floor Plan",
      },
      {
        src: "/project-images/grandeur-residency-amenities.jpg",
        label: "Amenities",
      },
    ],
    description:
      "Grandeur Residency presents luxury 2 & 3 BHK homes at Ravet, with spacious layouts, extra height, natural light and a carefully planned residential environment.",
    brochure: "/brochures/Grandeur-Residency-Brochure.pdf",
    brochureCover:
      "/project-images/grandeur-residency-brochure-cover.jpg",
    progress: 100,
    address:
      "Survey 129/3/1, Behind Jogeshwari Misal, Shinde Vasti, Ravet, PCMC, Pune",
    phone: ["9890929305", "9823187996"],
    email: "adimayarealty129@gmail.com",
    bhk: "Luxury 2 & 3 BHK",
    highlights: [
      "Spacious flats with expansive carpet areas and extra height",
      "Project designed as per Vastu Shastra",
      "Natural light, refined finishes and a comfort-focused layout",
      "6 passenger lift with backup",
    ],
    amenities: [
      "Rainwater harvesting system",
      "Solar water heating system",
      "Ample parking space",
      "Power backup for lift and common areas",
      "Automatic water pump controlling system",
      "Designer entrance gate",
      "CCTV cameras in common areas",
    ],
    specifications: [
      "R.C.C. framed structure",
      "Internal 4 inch and external 6 inch masonry",
      "Vitrified ceramic flooring with 3 inch matching skirting",
      "Black granite kitchen platform and stainless-steel sink",
      "3-track aluminium powder-coated windows with mosquito net",
      "Designer main entrance door and waterproof internal doors",
      "Concealed electrical points with ISI-mark fire-resistant wire",
    ],
    sourceNote:
      "Project information, imagery, amenities and specifications are based on the supplied Grandeur Residency brochure.",
  },

  {
    id: "gravitas-residency",
    phase: "completed",
    type: "Residential & Commercial",
    title: "Gravitas Residency",
    location: "Ravet, Pune",
    image: "/project-images/gravitas-residency.jpg",
    gallery: [
      {
        src: "/project-images/gravitas-residency.jpg",
        label: "Gravitas Residency — Project View",
      },
      {
        src: "/project-images/gravitas-residency-brochure-01.webp",
        label: "Gravitas Residency — Brochure Cover",
      },
      {
        src: "/project-images/gravitas-residency-brochure-02.webp",
        label: "Gravitas Residency — 3 BHK Homes",
      },
      {
        src: "/project-images/gravitas-residency-brochure-06.webp",
        label: "Gravitas Residency — Typical Floor Plan",
      },
      {
        src: "/project-images/gravitas-residency-brochure-04.webp",
        label: "Gravitas Residency — Location & Connectivity",
      },
    ],
    description:
      "A completed residential development in Ravet with contemporary homes, practical amenities and strong connectivity.",
    brochure: "/brochures/Gravitas-Residency-Brochure.pdf",
    brochureCover:
      "/project-images/gravitas-residency-brochure-01.webp",
    progress: 100,
    address:
      "S.No. 76/1/1, Plot No. C10, C11, Near Chandrabhaga Corner, Ravet, Pune 412101",
    phone: ["98909 29303", "98909 29305"],
    email: "adimayaproperties@gmail.com",
    sourceNote: "Brochure-based project details",
  },

  {
    id: "gulmohar-residency",
    phase: "ongoing",
    type: "Redevelopment",
    title: "Gulmohar Residency",
    location: "Pradhikaran, Nigdi, Pune",
    image: "/project-images/gulmohar-residency.jpg",
    gallery: [
      {
        src: "/project-images/gulmohar-residency.jpg",
        label: "Gulmohar Residency — Project View",
      },
      {
        src: "/project-images/gulmohar-residency-brochure-01.webp",
        label: "Gulmohar Residency — Brochure Cover",
      },
      {
        src: "/project-images/gulmohar-residency-brochure-02.webp",
        label: "Gulmohar Residency — Project Overview",
      },
      {
        src: "/project-images/gulmohar-residency-brochure-03.webp",
        label: "Gulmohar Residency — Design & Homes",
      },
    ],
    description:
      "An ongoing residential development in Pradhikaran focused on practical planning, contemporary living and a well-connected location.",
    brochure: "/brochures/Gulmohar-Residency-Brochure.pdf",
    brochureCover:
      "/project-images/gulmohar-residency-brochure-01.webp",
    progress: 55,
    address:
      "Sector 25, Plot No. 23,25,26, Near JPNV School, Pradhikaran, Nigdi, Pune 44",
    officeAddress:
      "Gravitas Residency, Chandrabhaga Corner, Near Shubharambh Clara, Ravet, Pune – 412101",
    phone: ["9156100136", "9156200136"],
    email: "adimayabuildconllp@gmail.com",
    sourceNote:
      "Project details and imagery are based on the Gulmohar Residency brochure by Adimaya.",
  },

  {
    id: "build-con",
    phase: "ongoing",
    type: "Contracting",
    title: "Shubharambh Clara by Aadimaya Buildcon",
    location: "Pune Region",

    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",

    gallery: [
      {
        src:
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
        label: "Shubharambh Clara — Project View",
      },
      {
        src:
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
        label: "Modern Residential Exterior",
      },
      {
        src:
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
        label: "Contemporary Residential Architecture",
      },
      {
        src:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
        label: "Premium Residential Development",
      },
    ],

    description:
      "An ongoing contracting project focused on coordinated construction execution, site management and dependable delivery.",

    progress: 45,

    subProjects: [
      {
        title: "Shubharambh Clara",
        phase: "ongoing",
        type: "Contracting",
        location: "Ravet, Pune",

        image:
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",

        description:
          "Shubharambh Clara is listed in the supplied Adimaya Buildcon LLP portfolio as an ongoing project of 4,00,000 sq. ft. for Ms. Shubharambh Landmarks. The supplied brochure identifies the project as 2025–Ongoing.",

        area: "4,00,000 sq. ft.",

        client: "Ms. Shubharambh Landmarks",

        brochure:
          "/brochures/Shubharambh-Clara-Brochure.pdf",

        sourceNote:
          "Supplied Adimaya Buildcon LLP brochure",
      },
    ],

    sourceNote:
      "Project grouping supplied by the client; Shubharambh Clara details from supplied brochure",
  },

 // ============================================================
// ADIMAYA HOMES / CHIKHALI - EARLY BIRD COMMERCIAL & RESIDENTIAL
// ============================================================

{
  id: "pradhikaran-residential-commercial", 
  phase: "upcoming",
  type: "Commercial & Residential",
  title: "Adimaya Homes", 
  location: "Chikhali, Pune",
  image: pradhikaranImage,
    gallery: [
      {
        src: pradhikaranImage,
        label: "We Are Coming Soon in Chikhali",
      },
    ],

    description:
      "A new commercial and residential destination is taking shape in Chikhali. Be among the first to discover our upcoming premium project, thoughtfully designed for modern businesses, retail, dining, comfortable living, and investment opportunities.",

    progress: 0,

    earlyBird: true,

    earlyBirdTitle:
      "A New Commercial & Residential Destination Is Taking Shape",

    earlyBirdDescription:
      "Be among the first to discover our upcoming premium commercial and residential project in Chikhali, thoughtfully designed for modern businesses, retail, dining, comfortable living, and investment opportunities.",

    earlyBirdBenefits: [
      "Exclusive Early Bird Pricing",
      "Priority Selection of Commercial Spaces",
      "Pre-Launch Special Offers",
      "Flexible Payment Options",
      "Limited Period Benefits",
    ],

    propertyType:
      "Premium Commercial & Residential Spaces",

    status: "Coming Soon",

    requirementOptions: [
      "Shop",
      "Office",
      "Residential",
      "Investment",
    ],

    offerText:
      "LIMITED UNITS • LIMITED-TIME OFFER",

    registerText:
      "Register your interest today and get early access to the project.",

    terms:
      "Terms & conditions apply. Early Bird benefits are subject to availability and applicable project terms.",
  },

  {
    id: "land-development-concept",
    phase: "upcoming",
    type: "Land Development",
    title: "Greenfield Land Development",
    location: "Concept Project",
    image: industrialImage,

    gallery: [
      industrialImage,
      constructionImage,
      redevelopmentImage,
    ],

    description:
      "Concept project for future land development, demonstrating a structured approach to site planning, access, infrastructure coordination and development readiness.",

    progress: 0,

    isConcept: true,

    conceptNote:
      "Concept / dummy project — presented only to demonstrate the Land Development service. It is not an actual Adimaya project.",

    scope: [
      "Land-use and site planning",
      "Access and circulation planning",
      "Infrastructure coordination",
      "Development phasing",
      "Future-ready site organization",
    ],
  },
];

const PROJECT_DATA_VERSION =
  "2026-10-21-adimaya-homes-v22";

export function readProjects() {
  try {
    const version = localStorage.getItem(
      "adimaya_projects_version"
    );

    if (version !== PROJECT_DATA_VERSION) {
      localStorage.setItem(
        "adimaya_projects",
        JSON.stringify(defaultProjects)
      );

      localStorage.setItem(
        "adimaya_projects_version",
        PROJECT_DATA_VERSION
      );

      return defaultProjects;
    }
  } catch {}

  return readData(
    "adimaya_projects",
    defaultProjects
  );
}

export const defaultTestimonials = [
  {
    id: "t1",
    quote:
      "The team maintained clear communication throughout the project and handled execution in a very structured way.",
    name: "Project Client",
    role: "Development Partner",
  },

  {
    id: "t2",
    quote:
      "We appreciated the focus on quality, planning and practical solutions. The overall experience was professional and transparent.",
    name: "Business Client",
    role: "Commercial Project",
  },

  {
    id: "t3",
    quote:
      "From the initial discussion to execution, the team stayed focused on timelines and delivering a dependable outcome.",
    name: "Property Partner",
    role: "Construction Project",
  },
];

export function readData(key, fallback) {
  try {
    const value = localStorage.getItem(key);

    return value
      ? JSON.parse(value)
      : fallback;
  } catch {
    return fallback;
  }
}

export function writeData(key, value) {
  localStorage.setItem(
    key,
    JSON.stringify(value)
  );

  window.dispatchEvent(
    new CustomEvent(
      "adimaya:data-change",
      {
        detail: { key },
      }
    )
  );
}

/**
 * Google Sheets enquiry integration.
 *
 * Every enquiry is posted to the spreadsheet
 * through a Google Apps Script Web App that appends one row.
 *
 * Configure the deployment URL in the environment:
 *
 * VITE_GOOGLE_SHEET_WEBAPP_URL=
 * https://script.google.com/macros/s/<DEPLOYMENT_ID>/exec
 *
 * The Apps Script source lives in google-apps-script.gs
 * at the repo root.
 *
 * While the URL is unset, submissions stay client-local
 * and the UI never blocks on a missing integration.
 */

const SHEET_WEBAPP_URL =
  import.meta.env.VITE_GOOGLE_SHEET_WEBAPP_URL || "";

export async function saveLead(lead) {
  const normalized = {
    ...lead,
    status: lead.status || "New",
    submittedAt:
      lead.submittedAt ||
      new Date().toISOString(),
  };

  if (!SHEET_WEBAPP_URL) {
    return normalized;
  }

  try {
    const response = await fetch(
      SHEET_WEBAPP_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(normalized),
      }
    );

    if (!response.ok) {
      console.warn(
        `[saveLead] Google Sheet rejected the request (HTTP ${response.status}).`
      );
    }
  } catch (error) {
    console.warn(
      "[saveLead] Could not send enquiry to Google Sheet:",
      error
    );
  }

  return normalized;
}

export async function fetchLeads() {
  return [];
}