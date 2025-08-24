// lib/data.ts

// --- Dummy DATA FOR Contact page ---

export type Authority = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string; // Path to the image in the /public folder
};

export const authorities: Authority[] = [
  {
    id: "cristiano",
    name: "Cristiano",
    role: "Grama Niladhari(GS)",
    avatarUrl: "/chatAvatars/cristiano.jpg",
  },
  {
    id: "messi",
    name: "Messi",
    role: "Pradeshiya Representative(PS)",
    avatarUrl: "/chatAvatars/messi.jpg",
  },
  {
    id: "dembele",
    name: "Dembele",
    role: "Divisional secretariat office(DS)",
    avatarUrl: "/chatAvatars/dembele.jpg",
  },
  {
    id: "trent",
    name: "Trent",
    role: "Urban Council Rep",
    avatarUrl: "/chatAvatars/negreira.jpg",
  },
  {
    id: "perez",
    name: "Perez",
    role: "Municipal Council Rep",
    avatarUrl: "/chatAvatars/negreira.jpg",
  },
  {
    id: "negreira",
    name: "Negreira",
    role: "Bribery Commission Rep",
    avatarUrl: "/chatAvatars/negreira.jpg",
  },
];

// --- Dummy DATA FOR Chat pages ---

export type Message = {
  id: number;
  text: string;
  sender: 'me' | 'them';
};

export const mockMessages: Message[] = [
    { id: 1, sender: 'them', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies sed hendrerit ac mollis sollicitudin viverra proin.' },
    { id: 2, sender: 'me', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies sed hendrerit ac mollis sollicitudin viverra proin. Phasellus tristique nulla eu leo aliquet, maecenas sapien. Fermentum curabitur amet.' },
    { id: 3, sender: 'them', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies sed hendrerit ac mollis sollicitudin viverra proin.' },
    { id: 4, sender: 'me', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
];

// --- Dummy DATA FOR BOOKING PAGE ---

export const bookingSubjects = [
  { id: "resdnce-cert", name: "Certificate of Residence" },
  { id: "voter-reg", name: "Voter Registration assistance" },
  { id: "welf-dister", name: "Reporting for social welfare & disaster relief" },
  { id: "life-event", name: "Life Events: Issuing Birth, Marriage, Death Certificates" },
  { id: "Id-serv", name: "(NIC) services" },
  { id: "lisn-serv", name: "Licenses: Business Name Registration, Revenue Licenses" },
  { id: "land", name: "Handling land registrations and deeds" },
  { id: "construction", name: "Approval of building plans" },
  { id: "sanitation", name: "Sanitation:  Solid waste collection, drain maintenance" },
  { id: "infrastructure", name: "Infrastructure: Maintenance of local roads, street lighting" },
  { id: "community", name: "Community: Managing parks, libraries,community halls" },
  { id: "water-supply", name: "Comprehensive water supply & drainage systems" },
  { id: "city-planning", name: "City planning and zoning regulations" },
  { id: "addr-change", name: "Address Change Request" },
  { id: "birth-cert", name: "Birth Certificate Copy" },
];

// --- MAPPING FOR BOOKING PAGE LOGIC ---
// This object connects services to the responsible officers and required documents.
export const serviceMappings: { [key: string]: { responsible: string[], docs: string[] } } = {
  // Grama Niladhari (GS) services
  "resdnce-cert": { responsible: ["cristiano"], docs: ["NIC", "Utility Bill"] },
  "voter-reg": { responsible: ["cristiano"], docs: ["NIC"] },
  "welf-dister": { responsible: ["cristiano"], docs: ["NIC", "Proof of need"] },
  "addr-change": { responsible: ["cristiano"], docs: ["NIC", "New Address Proof"] },

  // Divisional Secretariat (DS) services
  "life-event": { responsible: ["dembele"], docs: ["Hospital Report", "Parent NICs"] },
  "Id-serv": { responsible: ["dembele"], docs: ["Application Form", "Birth Certificate"] },
  "lisn-serv": { responsible: ["dembele"], docs: ["Business Registration", "Tax File"] },

  // Pradeshiya Sabha (PS) / Council services
  "land": { responsible: ["messi"], docs: ["Deed Copy", "Survey Plan"] },
  "construction": { responsible: ["trent"], docs: ["Building Plan", "Engineer Certificate"] },
  "sanitation": { responsible: ["perez"], docs: ["Complaint Form"] },

  // Bribery Commission
  "negreira": { responsible: ["negreira"], docs: ["Evidence (if any)", "Written Complaint"] },
};

// --- Dummy available time DATA FOR BOOKING PAGE ---
export const availableTimes = ["09:00 AM", "11:00 AM", "03:00 PM"];

// --- Notification DATA ---
export type Notification = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  avatarUrl: string;
  read: boolean;
  type: 'reminder' | 'appointment' | 'registration' | 'vote' | 'general';
};

export const notifications: Notification[] = [
  {
    id: "1",
    title: "Pension Form Reminder",
    description: "Due Date 20/08/2025",
    timestamp: "9:41 AM",
    avatarUrl: "/chatAvatars/dembele.jpg",
    read: false,
    type: "reminder"
  },
  {
    id: "2", 
    title: "Character Certificate",
    description: "Upcoming Appointment with Gs",
    timestamp: "9:41 AM",
    avatarUrl: "/chatAvatars/cristiano.jpg",
    read: false,
    type: "appointment"
  },
  {
    id: "3",
    title: "Voters List",
    description: "Registration for 2026 Elections Open",
    timestamp: "9:41 AM", 
    avatarUrl: "/chatAvatars/messi.jpg",
    read: false,
    type: "registration"
  },
  {
    id: "4",
    title: "Every Vote Counts",
    description: "Vote for your preferred party today!",
    timestamp: "9:41 AM",
    avatarUrl: "/chatAvatars/negreira.jpg", 
    read: false,
    type: "vote"
  }
];