import firebase from 'firebase';

export interface Card {
  comments: Array<{ comment: string; userId: string }>;
  creatorId: string;
  holderHistory: string[]; // user id
  holderId: string | null;
  imageId: string;
  imageUrl: string;
  location: { _lat: number; _long: number }; // Reverse geo
  score: number;
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
      location: new firebase.firestore.GeoPoint(
        data.location._lat,
        data.location._long
      ),
      score: data.score,
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

  public getOwnCards(
    holderId: string
  ): Promise<firebase.firestore.QuerySnapshot> {
    return this.database
      .collection('cards')
      .where('holderId', '==', holderId)
      .get();
  }

  public getRandomCard(): Promise<firebase.firestore.QuerySnapshot> {
    return this.database
      .collection('cards')
      .where('holderId', '==', null)
      .limit(1)
      .get();
  }
}
