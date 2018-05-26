export interface Card {
  comments: { comment: string; userId: string }[];
  creatorId: string;
  holderHistory: string[]; // user id
  holderId: string | null;
  imageId: string;
  imageUrl: string;
  location: { lat: number; lng: number }; // Reverse geo
  tags: { tag: string; score: number }[];
  title: string;
  score: number;
}
