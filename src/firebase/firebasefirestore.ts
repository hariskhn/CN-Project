import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "./firebaseconfig";
import { auth } from "./firebaseauth";

export const db = getFirestore(app);

export async function saveTodo(todo: string) {
    let uid = auth.currentUser?.uid;
    let newTodo = {
        todo,
        uid
    }
    try {
        let collectionRef = collection(db, "todos")
        await addDoc(collectionRef, newTodo);
    }catch(e){
        console.log(e);
    }
}