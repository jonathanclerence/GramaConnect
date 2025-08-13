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
    avatarUrl: "/chatAvatars/cristiano.jpg",
  },
  {
    id: "messi",
    name: "Messi",
    role: "Pradeshiya Representative",
    avatarUrl: "/chatAvatars/messi.jpg",
  },
  {
    id: "dembele",
    name: "Dembele",
    role: "Divisional secretariat office",
    avatarUrl: "/chatAvatars/dembele.jpg",
  },
  {
    id: "negreira",
    name: "Negreira",
    role: "Bribery Commission Rep",
    avatarUrl: "/chatAvatars/negreira.jpg",
  },
];