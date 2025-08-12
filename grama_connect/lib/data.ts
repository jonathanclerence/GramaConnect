// lib/data.ts

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
    role: "Grama Niladhari",
    avatarUrl: "/avatars/cristiano.jpg",
  },
  {
    id: "messi",
    name: "Messi",
    role: "Pradeshiya Representative",
    avatarUrl: "/avatars/messi.jpg",
  },
  {
    id: "dembele",
    name: "Dembele",
    role: "Divisional secretariat office",
    avatarUrl: "/avatars/dembele.jpg",
  },
  {
    id: "negreira",
    name: "Negreira",
    role: "Bribery Commission Rep",
    avatarUrl: "/avatars/negreira.jpg",
  },
];