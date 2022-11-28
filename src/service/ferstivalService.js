import { collection, query, doc, getDocs, limit, orderBy, where, getCountFromServer, startAfter, setDoc } from "firebase/firestore";
import {
    db
} from "../config/configFirebase";


const COLLECTION_NAME = 'festivals';

export const getFestivals = async (cursor, size, qSearch) => {
        console.log("Call API");
        const query_ = query(collection(db, COLLECTION_NAME),
            orderBy('nom_du_festival'),
            where('nom_du_festival', '>=', qSearch),
            where('nom_du_festival', '<=', qSearch+ '\uf8ff'),
            startAfter(cursor),
            limit(size));
        return await getDocs(query_);
}

export const getFestival = async (id) => {
    const first = query(collection(db, "festivals"), where("identifiant","==",id));
    return await getDocs(first);
}

export const countFestivals = async (qSearch) => {
    const coll = collection(db, COLLECTION_NAME);
    const query_ = query(coll, 
                        where('nom_du_festival', '>=', qSearch),
                        where('nom_du_festival', '<=', qSearch+ '\uf8ff'));

    return await getCountFromServer(query_);
}

 const generateRandomId = () => {
    let str = Date.now().toString(26);
    let end = Math.random().toString(26);
    console.log(str + end);
    return str + end;
 }

 export const addFestival = async (festival) => {
    const uuid =  generateRandomId(); 
    let objet = {
        ...festival,
        identifiant: uuid
    }
    return await setDoc(doc(db, COLLECTION_NAME, uuid), objet);
}

export const updateFestival = async (id, festival) => {
    const q = query(collection(db, COLLECTION_NAME), where("identifiant", "==", id));
    const querySnapshot = await getDocs(q);
    let uuid = undefined;
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        uuid = doc.id;
      });

    if (!uuid) {
        throw Error("Festival not found !");
    }

    return await setDoc(doc(db, COLLECTION_NAME, uuid), festival);
}
