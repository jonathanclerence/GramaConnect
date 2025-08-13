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