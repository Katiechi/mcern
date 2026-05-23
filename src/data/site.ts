import { ShieldAlert, Leaf, HeartPulse, Users, Heart, Eye, HandHeart, Accessibility, Handshake, ScrollText, Sprout } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const site = {
  name: "M-CERN",
  fullName: "Mathare Community Emergency Response Network",
  tagline: "A Resilient and United Community",
  email: "info@mcern.org",
  // Primary public phone shown in Header/Footer = the Chairperson line.
  phone: "+254 792 868 963",
  phoneHref: "tel:+254792868963",
  location: "Mathare, Nairobi, Kenya",
  mapsHref: "https://www.google.com/maps/search/?api=1&query=Mathare%2C+Nairobi%2C+Kenya",
  mapsEmbed:
    "https://www.google.com/maps?q=Mathare%2C+Nairobi%2C+Kenya&output=embed",
  logo: "/images/mcern-logo.png",
  description:
    "A grassroots, community-led disaster response and resilience network serving Nairobi's informal settlements.",
};

export const phones: { role: string; number: string; href: string }[] = [
  { role: "Chairperson / Coordinator", number: "+254 792 868 963", href: "tel:+254792868963" },
  { role: "Asst Chairperson / Coordinator", number: "+254 101 066 814", href: "tel:+254101066814" },
  { role: "Finance", number: "+254 111 537 339", href: "tel:+254111537339" },
];

export const nav: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

export const heroImages = {
  home: "/images/hero-fire-demo.webp",
  about: "/images/about-hero.webp",
  services: "/images/services-hero.webp",
  gallery: "/images/gallery-hero.webp",
  contact: "/images/contact-hero.webp",
  team: "/images/team-portrait.webp",
};

export type Pillar = {
  id: string;
  number: string;
  title: string;
  blurb: string;
  description: string;
  activities: string[];
  icon: LucideIcon;
  tint: string;
  image: string;
  imageAlt: string;
};

export const pillars: Pillar[] = [
  {
    id: "disaster",
    number: "01",
    title: "Disaster Management",
    blurb: "Preparedness, response, and recovery built with the community.",
    description:
      "Strengthening community preparedness, response, and recovery. Activities include fire and flood response, First Aid training, and community-wide disaster simulations.",
    activities: ["Fire & flood response", "First Aid training", "Community disaster simulations"],
    icon: ShieldAlert,
    tint: "bg-[color:var(--brand-red)]/8",
    image: "/images/pillar-disaster.webp",
    imageAlt: "M-CERN and Nairobi County firefighters battling flames in a Mathare settlement",
  },
  {
    id: "climate",
    number: "02",
    title: "Climate Action",
    blurb: "Sustainable, green initiatives rooted in Mathare.",
    description:
      "Promoting environmental sustainability through tree planting, urban smart agriculture, and waste management. We actively participate in Climate Democracy Accelerator Projects.",
    activities: ["Tree planting drives", "Urban smart agriculture", "Waste management initiatives"],
    icon: Leaf,
    tint: "bg-[color:var(--brand-green)]/8",
    image: "/images/pillar-climate.webp",
    imageAlt: "M-CERN volunteers clearing waste in Mathare during a community cleanup",
  },
  {
    id: "health",
    number: "03",
    title: "Community Health",
    blurb: "Public health awareness for stronger families.",
    description:
      "Public health awareness focusing on hygiene, sanitation, disease prevention, mental health, and maternal/child health outreach.",
    activities: ["Hygiene & sanitation drives", "Mental health awareness", "Maternal & child outreach"],
    icon: HeartPulse,
    tint: "bg-[color:var(--brand-gold)]/12",
    image: "/images/pillar-health.webp",
    imageAlt: "M-CERN volunteer distributing supplies during a community health outreach",
  },
  {
    id: "empowerment",
    number: "04",
    title: "Empowerment & Inclusion",
    blurb: "Leadership, livelihoods, and disability inclusion.",
    description:
      "Empowering youth through leadership mentorship and economic initiatives. We maintain a strict focus on Disability Inclusion, ensuring Persons with Disabilities are central to our governance.",
    activities: ["Youth leadership mentorship", "Economic empowerment", "Disability inclusion in governance"],
    icon: Users,
    tint: "bg-[color:var(--brand-charcoal)]/6",
    image: "/images/pillar-empowerment.webp",
    imageAlt: "M-CERN leadership lineup including a community member who uses a wheelchair",
  },
];

export const values: { letter: string; title: string; description: string; icon: LucideIcon }[] = [
  { letter: "C", title: "Community First", description: "Our foundation is built on the people we serve. Every decision starts with the safety and well-being of residents in our informal settlements.", icon: Heart },
  { letter: "I", title: "Integrity", description: "We act with honesty and transparency. All emergency information is verified by our leadership, building a name donors and residents can trust.", icon: ScrollText },
  { letter: "V", title: "Volunteerism", description: "Our strength is our heart. We serve out of a selfless commitment to protect and uplift our neighbors in their times of greatest need.", icon: HandHeart },
  { letter: "I", title: "Inclusivity", description: "We leave no one behind. Our voice reaches everyone — the elderly, youth, and those who communicate through sign language.", icon: Accessibility },
  { letter: "T", title: "Teamwork", description: "We are one body. By coordinating with local leaders, disaster officers, and each other, we achieve a unified response that saves more lives.", icon: Handshake },
  { letter: "A", title: "Accountability", description: "We are responsible for our actions and our resources, ensuring every effort and donation is used ethically for the community.", icon: Eye },
  { letter: "S", title: "Resilience", description: "We don't just survive; we overcome. We focus on training and preparation so our settlements can bounce back from any disaster.", icon: Sprout },
];

// Where M-CERN began. Mathare remains our base and point of origin, but the
// organization is open to working across other wards, sub-counties, and counties
// in Kenya when invited or engaged.
export const origin = {
  trail: ["Nairobi County", "Mathare Sub-County", "Mabatini Ward", "Mashimoni"],
  summary: "Founded in Mathare, Nairobi — open to Nairobi and beyond.",
};

export type ActiveHub = { subCounty: string; focus: string; hubs: string[] };

// 🟢 Active Hubs — established responder networks and primary intervention zones.
export const activeHubs: ActiveHub[] = [
  {
    subCounty: "Mathare Sub-County",
    focus: "High-density community outreach, rapid incident reporting, and local volunteer deployment.",
    hubs: ["Mlango Kubwa", "Huruma", "Mabatini", "Ngei", "Kiamaiko"],
  },
  {
    subCounty: "Ruaraka Sub-County",
    focus: "Industrial zone safety mapping, institutional safety coordination, and rapid crisis management.",
    hubs: ["Baba Dogo", "Utalii", "Lucky Summer", "Korogocho", "Mathare North"],
  },
  {
    subCounty: "Kamukunji Sub-County",
    focus: "Commercial hub safety integrations, rapid response logistics, and business-district resilience training.",
    hubs: ["Eastleigh North", "Eastleigh South", "Airbase", "California", "Pumwani"],
  },
];

// 🟡 Immediate Expansion Zones — foundations being laid and responder teams onboarding.
export const expansionZones: { subCounty: string; hubs: string[] }[] = [
  { subCounty: "Embakasi East", hubs: ["Utawala", "Mihango", "Embakasi", "Upper Savannah", "Lower Savannah"] },
  { subCounty: "Embakasi West", hubs: ["Umoja I", "Umoja II", "Mowlem", "Kariobangi South"] },
  { subCounty: "Embakasi North", hubs: ["Kariobangi North", "Dandora Area I", "Dandora Area II", "Dandora Area III", "Dandora Area IV"] },
];

// ⚪ Future Horizons — the road to 100% county-wide coverage (all 17 sub-counties).
export const futureHorizons: { region: string; subCounties: string[] }[] = [
  { region: "Eastern & Northern Nairobi", subCounties: ["Kasarani", "Roysambu", "Embakasi Central", "Embakasi South", "Makadara"] },
  { region: "Central & Western Nairobi", subCounties: ["Starehe (CBD & Environs)", "Westlands", "Dagoretti North"] },
  { region: "Southern Nairobi & Environs", subCounties: ["Kibra", "Lang'ata", "Dagoretti South"] },
];

export const stats = [
  { value: "5+", label: "Years Grassroots Experience" },
  { value: "3", label: "Active Sub-Counties" },
  { value: "17", label: "Sub-Counties Targeted" },
  { value: "Nov 2025", label: "Officially Registered" },
];

export type GalleryCategory =
  | "Disaster Response"
  | "Climate Action"
  | "Community Health"
  | "Empowerment"
  | "Trainings"
  | "Field Photos";

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
};

// Additional photos from the field — surfaced under the "Field Photos" filter.
// Sequentially named extra-001.webp through extra-NNN.webp in /public/images/extras/.
const EXTRA_PHOTO_COUNT = 139;
const extraPhotos: GalleryItem[] = Array.from({ length: EXTRA_PHOTO_COUNT }, (_, i) => {
  const n = String(i + 1).padStart(3, "0");
  return {
    src: `/images/extras/extra-${n}.webp`,
    alt: `M-CERN field photo ${i + 1}`,
    caption: "Field photo from M-CERN's work",
    category: "Field Photos" as const,
  };
});

export const galleryItems: GalleryItem[] = [
  // Disaster Response
  { src: "/images/gallery-disaster-fire-night.webp", alt: "Silhouette of a volunteer against a wall of flames at night", caption: "Night fire response in Mathare", category: "Disaster Response" },
  { src: "/images/gallery-disaster-firefighter.webp", alt: "M-CERN volunteer and Nairobi firefighter on a smoking rooftop", caption: "Joint response with Nairobi City Fire Brigade", category: "Disaster Response" },
  { src: "/images/gallery-disaster-flames.webp", alt: "Firefighters spraying water at large flames consuming a structure", caption: "Containing a fire at source", category: "Disaster Response" },
  { src: "/images/gallery-disaster-flood.webp", alt: "Residents wading through a flooded street at night", caption: "Flood response coordination", category: "Disaster Response" },
  { src: "/images/gallery-disaster-supplies.webp", alt: "M-CERN volunteer carrying a sack of relief supplies", caption: "Delivering relief to affected families", category: "Disaster Response" },

  // Climate Action
  { src: "/images/gallery-climate-waste1.webp", alt: "M-CERN volunteers clearing piles of waste from a neighborhood", caption: "Community waste-management drive", category: "Climate Action" },
  { src: "/images/gallery-climate-waste2.webp", alt: "M-CERN volunteer collecting and sorting roadside waste", caption: "Cleanup along a Mathare street", category: "Climate Action" },
  { src: "/images/gallery-climate-walkthrough.webp", alt: "Climate partners walking through a community greening project", caption: "Climate Democracy Accelerator visit", category: "Climate Action" },
  { src: "/images/gallery-climate-sitevisit.webp", alt: "M-CERN team in branded vests gathered at a community site", caption: "Field assessment with M-CERN team", category: "Climate Action" },

  // Community Health
  { src: "/images/gallery-health-hygiene.webp", alt: "M-CERN volunteer in vest distributing hygiene supplies", caption: "Hygiene & sanitation outreach", category: "Community Health" },
  { src: "/images/gallery-health-kitchen.webp", alt: "M-CERN volunteer serving food from a community kitchen", caption: "Community kitchen support", category: "Community Health" },
  { src: "/images/gallery-health-distribution.webp", alt: "M-CERN volunteers distributing clothing and supplies indoors", caption: "Supply distribution to families", category: "Community Health" },

  // Empowerment
  { src: "/images/gallery-empowerment-inclusion.webp", alt: "Group portrait that includes a community member using a wheelchair", caption: "Disability inclusion convening", category: "Empowerment" },
  { src: "/images/gallery-empowerment-youth.webp", alt: "Young people raising fists in a leadership workshop", caption: "Youth leadership mentorship", category: "Empowerment" },
  { src: "/images/gallery-empowerment-partners.webp", alt: "M-CERN team standing with partner organizations in Mathare", caption: "Partners united in Mathare", category: "Empowerment" },
  { src: "/images/gallery-empowerment-vest.webp", alt: "M-CERN volunteer in branded vest engaging with community members", caption: "Volunteer on the ground", category: "Empowerment" },

  // Trainings
  { src: "/images/gallery-training-tables.webp", alt: "Volunteers in red vests participating in a structured training", caption: "UCRB capacity-building training", category: "Trainings" },
  { src: "/images/gallery-training-classroom.webp", alt: "Community members gathered in a hall for a learning session", caption: "Community classroom session", category: "Trainings" },
  { src: "/images/gallery-training-mapping.webp", alt: "Group of trainees mapping ideas on a large sheet of paper", caption: "Resilience mapping exercise", category: "Trainings" },
  { src: "/images/gallery-training-fire-demo.webp", alt: "Dramatic live fire demonstration with a volunteer using a fire blanket", caption: "Live fire-response demonstration", category: "Trainings" },
  { src: "/images/gallery-training-blanket-demo.webp", alt: "Volunteer demonstrating a fire blanket on a burning gas cylinder", caption: "Fire-blanket safety demo", category: "Trainings" },
  { src: "/images/gallery-training-march.webp", alt: "Community march for International Firefighters Day in Mathare", caption: "International Firefighters Day march", category: "Trainings" },
  { src: "/images/gallery-training-team.webp", alt: "M-CERN team posing together after a training session", caption: "Team after a training session", category: "Trainings" },

  ...extraPhotos,
];

export const galleryFilters = ["All", "Disaster Response", "Climate Action", "Community Health", "Empowerment", "Trainings", "Field Photos"] as const;
