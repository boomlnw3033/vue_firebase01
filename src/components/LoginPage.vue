<script setup>
import { ref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from "vue-router";
// import Swal from "sweetalert2";

const router = useRouter();
const email = ref();
const pwd = ref();
const provider = new GoogleAuthProvider();

function login() {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, pwd.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User : " + user);
      router.push("mygame");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
    });
}

function register() {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, pwd.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User : " + user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
      // ..
    });
}

function googlelogin() {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log("Token : " + token);
      console.log("User : " + user);
      router.push("mygame");
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log("Error : " + errorCode + errorMessage);
      console.log("email :" + email + credential);
    });
}
</script>

<template>
  <div class="login">
    Email : <input type="email" placeholder="email" v-model="email" />
    <br />
    Password : <input type="password" name="pwd" id="" v-model="pwd" /> <br />
    <div>
      <button @click="login()">Log in</button>
    </div>
    <button @click="register()">Register</button>
    <button @click="googlelogin()">Google login</button> <br />
    <br />
  </div>
</template>

<style scoped>
.login {
  margin: 3rem;
  padding: 2rem;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}
</style>
