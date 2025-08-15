// require('dotenv').config();
// const admin = require('firebase-admin');

// // --- Initialize Firebase Admin using env vars ---
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       projectId: process.env.FIREBASE_PROJECT_ID,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//     }),
//   });
// }

// const db = admin.firestore();

// // --- Authorities data (adapted to schema) ---
// const authorities = [
//   {
//     id: "cristiano",
//     name: "Cristiano",
//     role_title: "Grama Niladhari (GS)",
//     division: "Colombo 05",
//     office_address: "123 GS Office Street, Colombo 05",
//   },
//   {
//     id: "messi",
//     name: "Messi",
//     role_title: "Pradeshiya Representative (PS)",
//     division: "Gampaha",
//     office_address: "45 PS Building, Gampaha",
//   },
//   {
//     id: "dembele",
//     name: "Dembele",
//     role_title: "Divisional Secretariat Office (DS)",
//     division: "Kandy",
//     office_address: "78 DS Complex, Kandy",
//   },
//   {
//     id: "trent",
//     name: "Trent",
//     role_title: "Urban Council Rep",
//     division: "Negombo",
//     office_address: "12 UC Road, Negombo",
//   },
//   {
//     id: "perez",
//     name: "Perez",
//     role_title: "Municipal Council Rep",
//     division: "Matara",
//     office_address: "89 MC Lane, Matara",
//   },
//   {
//     id: "negreira",
//     name: "Negreira",
//     role_title: "Bribery Commission Rep",
//     division: "Colombo 01",
//     office_address: "101 BC Tower, Colombo 01",
//   },
// ];

// const services = [
//   // Grama Niladhari (GS) services
//   {
//     id: "resdnce-cert",
//     subject: "Certificate of Residence",
//     responsible_authority_role: "Grama Niladhari (GS)",
//     required_documents: ["NIC", "Utility Bill"],
//   },
//   {
//     id: "voter-reg",
//     subject: "Voter Registration assistance",
//     responsible_authority_role: "Grama Niladhari (GS)",
//     required_documents: ["NIC"],
//   },
//   {
//     id: "welf-dister",
//     subject: "Reporting for social welfare & disaster relief",
//     responsible_authority_role: "Grama Niladhari (GS)",
//     required_documents: ["NIC", "Proof of need"],
//   },
//   {
//     id: "addr-change",
//     subject: "Address Change Request",
//     responsible_authority_role: "Grama Niladhari (GS)",
//     required_documents: ["NIC", "New Address Proof"],
//   },

//   // Divisional Secretariat (DS) services
//   {
//     id: "life-event",
//     subject: "Life Events: Issuing Birth, Marriage, Death Certificates",
//     responsible_authority_role: "Divisional Secretariat Office (DS)",
//     required_documents: ["Hospital Report", "Parent NICs"],
//   },
//   {
//     id: "Id-serv",
//     subject: "(NIC) services",
//     responsible_authority_role: "Divisional Secretariat Office (DS)",
//     required_documents: ["Application Form", "Birth Certificate"],
//   },
//   {
//     id: "lisn-serv",
//     subject: "Licenses: Business Name Registration, Revenue Licenses",
//     responsible_authority_role: "Divisional Secretariat Office (DS)",
//     required_documents: ["Business Registration", "Tax File"],
//   },

//   // Pradeshiya Sabha / Council services
//   {
//     id: "land",
//     subject: "Handling land registrations and deeds",
//     responsible_authority_role: "Pradeshiya Representative (PS)",
//     required_documents: ["Deed Copy", "Survey Plan"],
//   },
//   {
//     id: "construction",
//     subject: "Approval of building plans",
//     responsible_authority_role: "Urban Council Rep",
//     required_documents: ["Building Plan", "Engineer Certificate"],
//   },
//   {
//     id: "sanitation",
//     subject: "Sanitation: Solid waste collection, drain maintenance",
//     responsible_authority_role: "Municipal Council Rep",
//     required_documents: ["Complaint Form"],
//   },

//   // Bribery Commission service
//   {
//     id: "bribery-complaint",
//     subject: "Report a bribery or corruption case",
//     responsible_authority_role: "Bribery Commission Rep",
//     required_documents: ["Evidence (if any)", "Written Complaint"],
//   },
// ];


// // --- Seed Function ---
// async function seedDatabase() {
//   try {
//     console.log("Starting database seeding...");

//     // Seed authorities
//     console.log("Seeding authorities...");
//     for (const authority of authorities) {
//       await db.collection("authorities").doc(authority.id).set(authority);
//     }
//     console.log("Authorities seeded.");

//     // Seed services
//     console.log("Seeding services...");
//     for (const service of services) {
//       await db.collection("services").doc(service.id).set(service);
//     }
//     console.log("Services seeded.");

//     console.log("Seeding complete!");
//     process.exit(0);
//   } catch (error) {
//     console.error("Error seeding database:", error);
//     process.exit(1);
//   }
// }

// seedDatabase().catch(console.error);