import fake from './fake.js';

for(let film of fake) {
    firebase.firestore().collection('films').add(film);
}