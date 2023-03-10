import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBISPt98ojIOjZxdVG0cCXt6A6zwuADbiE",
  authDomain: "boom-firebase01.firebaseapp.com",
  projectId: "boom-firebase01",
  storageBucket: "boom-firebase01.appspot.com",
  messagingSenderId: "22837365698",
  appId: "1:22837365698:web:cf1f8c537636a53547a45b",
};

// Initialize Firebase
const initFirebase = initializeApp(firebaseConfig);

export const db = getFirestore(initFirebase);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
