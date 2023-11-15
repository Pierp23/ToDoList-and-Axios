<template>
  <v-app>
    <div id="app" class="app-container">
      <!-- NAV-BAR COLLOCATA IN ALTO  -->
      <nav class="mt-2 mb-5">
        <span class="font-weight-bold">
          <span class="title-site">TO-DO APP</span>
          |
        </span>
        <span>
          <router-link to="/">Home</router-link>
          -
        </span>
        <span>
          <router-link to="/albo">Albo</router-link>
        </span>

        <!-- SE IL LOGIN NON è STATO EFFETTUATO LA TO-DO-LIST E LE TASK COMPLEATE SONO NASCOSTE -->
        <span v-if="!store.state.userLogged == ''">
          -
          <router-link to="/ToDoList">To Do List</router-link>
        </span>
        <span v-if="!store.state.userLogged == ''">
          -
          <router-link to="/archivia">Task completati</router-link>
        </span>
      </nav>
      <router-view />
    </div>
  </v-app>
</template>

<script>
import store from './store'

export default {
  name: 'App',

  data: () => ({
    store
  }),
};
</script>

<style>
.app-container {
  height: 100vh;
  padding: 0 10px;
  background-image: url(./assets/gradient.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}

#app nav .title-site {
  color: white;
}

#app nav a {
  color: white;
  text-decoration: none;
}
</style>
