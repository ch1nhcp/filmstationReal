import { getDataFromDoc, getDataFromDocs } from "../utils.js";

export async function getRandomFilm(){
    let films = await getAllFilms();
    let randomIndex = Math.floor(Math.random() * films.length); //random gia tri
    return films[randomIndex]; //gan film = film thu [random]
}

export async function getAllFilms(){
    let result = await firebase.firestore().collection("films").get();
    return getDataFromDocs(result.docs);
}

export async function getFilmById(id) {
    let result = await firebase.firestore().collection("films").doc(id).get();
    return getDataFromDoc(result);
}

export async function updateTickets(id, tickets) {
    await firebase.firestore().collection("films").doc(id).update({
        tickets: firebase.firestore.FieldValue.arrayUnion(...tickets)
    });
}