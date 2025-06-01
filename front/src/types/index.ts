export type TopSpeed = {
  id: string;
  taille: number;
  timestamp: number;
  type: string;
  vitesse: number;
};

export type AggType = {
  type: string;
  total_obs: number;
};

export type MeteorObject = {
  id: string;
  nom: string;
  type: string;
  distance: string;
  menace: boolean;
  coord: { x: number; y: number };
};

export type MeteorType = "asteroide" | "comete" | "exoplanete";
