import firebase from 'firebase';

export enum endpoints {
  CARDS = '/cardImages'
}

export class QardsStorage {
  private storage: firebase.storage.Storage;
  constructor(app: firebase.app.App) {
    this.storage = app.storage();
  }

  public upload(image: string, id: string): Promise<any> {
    const ref = this.storage.ref(`${endpoints.CARDS}/${id}`);
    const task = ref.putString(image, 'base64');
    return new Promise((resolve, reject) => {
      task.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => void 0,
        e => {
          reject(e);
        },
        () => {
          resolve(task.snapshot);
        }
      );
    });
  }

  public download(imageUrl: string): Promise<Blob> {
    const ref = this.storage.refFromURL(imageUrl);
    return ref.getDownloadURL().then(url => {
      return fetch(url).then(r => r.blob());
    });
  }

  public getImageUrl(id: string): Promise<any> {
    const ref = this.storage.ref(`${endpoints.CARDS}/${id}`);
    return ref.getDownloadURL();
  }
}
