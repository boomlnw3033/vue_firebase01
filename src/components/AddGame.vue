<script setup>
import { ref, onMounted } from "vue";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../main";

const gameData = ref({
  gameTitle: "",
  gameGenre: "",
  gameAddDate: "",
  gameImage: "",
  description: "",
});

const allgameData = ref([]);

async function addGameData() {
  try {
    const docRef = await addDoc(collection(db, "FavoriteGame"), gameData.value);
    console.log("Document written with ID: ", docRef.id);
    show();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function show() {
  allgameData.value = [];
  const querySnapshot = await getDocs(collection(db, "FavoriteGame"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // allMenu.value.push({ ...doc.data(), id: doc.id });\
    const myDoc = ref({ id: doc.id, data: doc.data() });
    console.log(doc.id, " => ", doc.data());
    // console.log(allMenu.value);
    console.log(myDoc);
    allgameData.value.push(myDoc.value);
  });
}

async function removeData(gameID) {
  await deleteDoc(doc(db, "FavoriteGame", gameID));
  show();
}

onMounted(show);
</script>

<template>
  <div>
    <div>
      <form @submit.prevent="addGameData()">
        <h3>Form</h3>
        gameTitle :
        <input type="text" name="" id="" v-model="gameData.gameTitle" required />
        <br />
        gameGenre :
        <input type="text" name="" id="" v-model="gameData.gameGenre" required />
        <br />
        gameAddDate :
        <input type="date" name="" id="" v-model="gameData.gameAddDate" required />
        <br />
        gameImage :
        <input type="text" name="" id="" v-model="gameData.gameImage" required />
        <br />
        description :
        <input type="text" name="" id="" v-model="gameData.description" required />
        <br />
        <button type="submit">เพิ่มข้อมูล</button>
      </form>
    </div>

    <button @click="show()">showdata</button>
    <br />
  </div>
  <table class="table" style="width: 100%">
    <thead>
      <tr>
        <th scope="col">gameTitle</th>
        <th scope="col">gameGenre</th>
        <th scope="col">gameAddDate</th>
        <th scope="col">gameImage</th>
        <th scope="col">description</th>
        <th scope="col">Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in allgameData" :key="index">
        <td>{{ item.data.gameTitle }}</td>
        <td>{{ item.data.gameGenre }}</td>
        <td>{{ item.data.gameAddDate }}</td>
        <td><img :src="item.data.gameImage" alt="" width=" 50" /></td>
        <td>{{ item.data.description }}</td>
        <td><button @click="removeData(item.id)">ลบ</button><br />{{ item.id }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
form {
  margin: 2rem auto;
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  background: #fff;
}
.form-control {
  margin: 0.5rem 0;
}
label {
  font-weight: bold;
}
input,
select {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.25rem;
}
button {
  font: inherit;
  background: rgb(215, 56, 56);
  color: rgb(255, 255, 255);
  padding: 0.25rem 1rem;
  border-radius: 5px;
}
input[type="radio"] {
  display: inline-block;
  width: auto;
  margin-right: 1rem;
}
input[type="radio"] + label {
  font-weight: normal;
}
input[type="date"] {
  display: block;
  width: 45%;
}
input[type="time"] {
  display: block;
  width: 45%;
}

table,
th,
td {
  border: 1px solid gray;
}
</style>
