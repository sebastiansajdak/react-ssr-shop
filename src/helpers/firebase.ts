import * as firebase from 'firebase/app';
import 'firebase/firestore';

export const getCollection = (table: string) => {
    const db = firebase.firestore();
    return db.collection(table);
}
