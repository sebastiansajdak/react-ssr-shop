import firebase from 'firebase';

export const getCollection = (table: string) => {
    const db = firebase.firestore();
    return db.collection(table);
}
