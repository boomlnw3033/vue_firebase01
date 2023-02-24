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
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../main";
// import Swal from "sweetalert2";

const router = useRouter();
const email = ref();
const pwd = ref();
const provider = new GoogleAuthProvider();

const menu = ref({
  nameTH: "",
  nameEng: "",
  price: 0,
  detail: "",
});

const allMenu = ref([]);

function login() {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, pwd.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User : " + user);
      router.push("about");
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

async function addUserData() {
  try {
    const docRef = await addDoc(collection(db, "foodmenu"), menu.value);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function showMenu() {
  allMenu.value = [];
  const querySnapshot = await getDocs(collection(db, "foodmenu"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // allMenu.value.push({ ...doc.data(), id: doc.id });\
    const myDoc = ref({ id: doc.id, data: doc.data() });
    console.log(doc.id, " => ", doc.data());
    // console.log(allMenu.value);
    console.log(myDoc);
    allMenu.value.push(myDoc.value);
  });
}

async function removeData(foodID) {
  await deleteDoc(doc(db, "foodmenu", foodID));
  showMenu();
}
</script>

<template>
  <div>
    Email : <input type="email" placeholder="email" v-model="email" />
    <br />
    Password : <input type="password" name="pwd" id="" v-model="pwd" /> <br />
    <button @click="login()">Login</button>
    <button @click="register()">Register</button>
    <button @click="googlelogin()">Google login</button> <br />
    <br />
  </div>

  <div>
    Form :
    <form>
      ชื่อเมนูไทย :
      <input type="text" name="" id="" v-model="menu.nameTH" required />
      <br />
      ชื่อเมนูEng :
      <input type="text" name="" id="" v-model="menu.nameEng" required />
      <br />
      ราคา : <input type="number" v-model="menu.price" required /> <br />
      รายละเอียด :
      <input type="text" name="" id="" v-model="menu.detail" required />
    </form>
    <button @click="addUserData()">เพิ่มข้อมูล</button>
  </div>
  <br />
  <div>
    <button @click="showMenu()">แสดงเมนู</button>
    <table>
      <tr>
        <th>เมนูภาษาไทย</th>
        <th>MenuEng</th>
        <th>ราคา</th>
        <th>รายละเอียด</th>
      </tr>
      <tr v-for="(item, index) in allMenu" :key="index">
        <td>{{ item.data.nameTH }}</td>
        <td>{{ item.data.nameEng }}</td>
        <td>{{ item.data.price }}</td>
        <td>{{ item.data.detail }}</td>
        <td>
          <button @click="removeData(item.id)">ลบ</button><br />{{ item.id }}
        </td>
      </tr>
    </table>
  </div>
  <br />
  <div></div>
</template>

<style scoped></style>
