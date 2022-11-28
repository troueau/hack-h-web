import { collection, addDoc } from "firebase/firestore";
import {
    db
} from "../config/configFirebase";

const COLLECTION_NAME = 'notifications';

export const sendNotification = async (params) => {
    const { identifiant, title, message } = params;
    if (!identifiant || (!title || title.trim() === '') || (!message || message.trim() === '')) {
        throw new Error("Il faut spécifier l'Id du festival");
    }

    let newNotif = {
        identifiant,
        title,
        message,
        timestamp : new Date().getTime()
    }
    return await addDoc(collection(db, COLLECTION_NAME), newNotif);
}