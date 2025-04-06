import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyAriAo4X9C3GHeFTJxRopTEMhMRvnEkNBc",
    authDomain: "cis657restapp.firebaseapp.com",
    databaseURL: "https://cis657restapp-default-rtdb.firebaseio.com",
    projectId: "cis657restapp",
    storageBucket: "cis657restapp.appspot.com",
    messagingSenderId: "492907526166",
    appId: "1:492907526166:web:1ceb9d63895e6b247cdd37",
    measurementId: "G-DDG5HL8N7Q"
};

export const app = initializeApp(firebaseConfig)