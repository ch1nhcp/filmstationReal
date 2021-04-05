import {md5, getDataFromDoc} from "../utils.js";

export async function login(email, password) {
    let response = await firebase
        .firestore()
        .collection("users")
        .where("email", "==", email)
        .where("password", "==", md5(password))
        .get();

    if(response.empty) {
        alert("Email or password is not correct");
    } else {
        let userID = response.docs[0].id;
        let token = generateToken(userID);

        localStorage.setItem("token", token);
        await updateUser(userID, {token: token});
        // console.log(window.location.hostname);
        window.location = "/index.html";
    }
}

export function logout () {
    localStorage.clear();
    window.location = "/index.html";
}

export async function register(name, email, password) {
    let response = await firebase
        .firestore()
        .collection("users")
        .where("email", "==", email)
        .get();

    console.log(response);

    if (response.empty) {
        await firebase.firestore().collection("users").add({
            name: name,
            email: email,
            password: md5(password),
        });
        alert ('Register successfully');
    }
     else {
        alert("This email has been already in used!");
    }
}

export async function updateUser(id, data) {
    await firebase.firestore().collection('users').doc(id).update(data);
}

export function generateToken(id) {
    return md5(Date.now() + id);
}

export async function getcurrentUser() {
    let token = localStorage.getItem('token');
    let currentUser = await getUserByToken(token);
    return currentUser;
}

export async function getUserByToken(token) {
    let response = await firebase.firestore().collection('users').where('token','==', token).get();
    if(response.empty) {
        throw new Error ('User is not exist in database')
    }
    
    return getDataFromDoc(response.docs[0]);
}