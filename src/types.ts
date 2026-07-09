export interface Game {
  id: string;
  title: string;
  developer: string;
  category: string;
  tags: string[];
  description: string;
  url: string;
  cover: string;
  scene?: string;
  screenshots?: string[];
  color1: string;   // gradient start
  color2: string;   // gradient end
  textAccent: string;
  featured?: boolean;
}
