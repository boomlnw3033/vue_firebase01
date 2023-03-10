<script setup>
import { RouterLink, RouterView } from "vue-router";
// import LoginPage from "./components/LoginPage.vue";
</script>

<template>
  <body>
    <header>
      <nav>
        <div style="text-align: center">
          <button><RouterLink to="/">Home</RouterLink></button>
          <button>
            <RouterLink to="/mygame">My Favorite Game</RouterLink>
          </button>
          <button><RouterLink to="/game">AddGame</RouterLink></button>
        </div>
      </nav>
    </header>

    <RouterView />
  </body>
</template>

<style scoped>
header {
  background-color: #c9eeff;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin: 1rem;
  }
}

body {
  font-family: "Golos Text", sans-serif;
  font-family: "Prompt", sans-serif;
}

button {
  font: inherit;
  background: #aa77ff;
  color: rgb(255, 255, 255);
  padding: 0.25rem 1rem;
  border-radius: 5px;
  margin-left: 4rem;
}
</style>
