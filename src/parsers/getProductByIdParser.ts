import productParser from './productParser';
import { ISnapshot } from '../types';

export default (snapshot: ISnapshot) => {
    if (snapshot.exists) {
        return productParser(snapshot);
    }
}
