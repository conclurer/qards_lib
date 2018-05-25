import firebase from 'firebase';

export interface Card {
  comments: Array<{ comment: string; userId: string }>;
  creatorId: string;
  holderHistory: string[]; // user id
  holderId: string | null;
  imageId: string;
  imageUrl: string;
  location: { lat: number; lng: number }; // Reverse geo
  tags: Array<{ tag: string; score: number }>;
  title: string;
}

export class QardsDatabase {
  private database: firebase.firestore.Firestore;
  constructor(app: firebase.app.App) {
    this.database = app.firestore();
  }

  public createCard(data: Card): Promise<any> {
    return this.database.collection('cards').add({
      comments: data.comments,
      creatorId: data.creatorId,
      holderHistory: data.holderHistory,
      holderId: data.holderId,
      imageId: data.imageId,
      imageUrl: data.imageUrl,
      location: [data.location.lat, data.location.lng],
      tags: data.tags,
      title: data.title
    });
  }

  public storeCard(cardId: string, userId: string): Promise<any> {
    return this.database
      .collection('cards')
      .doc(cardId)
      .set({
        holderId: userId
      });
  }

  public discardCard(cardId: string): Promise<any> {
    return this.database
      .collection('cards')
      .doc(cardId)
      .set({
        holderId: null
      });
  }
}
