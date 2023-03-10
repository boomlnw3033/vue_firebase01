<script setup>
// import { doc, getDoc } from "firebase/firestore";
import { ref, onMounted } from "vue";
import { db } from "../main";
import { collection, getDocs } from "firebase/firestore";

const allgameData = ref([]);

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

onMounted(show);
</script>

<template>
  <div style="text-align: center">
    <ul>
      <div class="gamebox" v-for="(game, index) in allgameData" :key="index">
        <p># {{ index + 1 }}</p>
        <h2>{{ game.data.gameTitle }}</h2>
        <img :src="game.data.gameImage" alt="" width="300" />
        <div class="game">
          <p>วันที่เพิ่มเกม : {{ game.data.gameAddDate }}</p>
        </div>
        <div class="game">
          <p>ประเภทเกม : {{ game.data.gameGenre }}</p>
        </div>
        <div class="game">
          <p>ทำไมถึงชอบ : {{ game.data.description }}</p>
        </div>
      </div>
    </ul>
  </div>
</template>

<style scoped>
h2 {
  color: #000;
}

img {
  border-radius: 12px;
}

.gamebox {
  margin: 2rem auto;
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  background: #62cdff;
}

.game {
  margin-top: 0.25rem;
  padding: 0.1rem;
  border-radius: 12px;
  background: #97deff;
}
</style>
