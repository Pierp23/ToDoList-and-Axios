<template>
  <!-- SE NON è STATO EFFETTUATO IL LOGIN -->
  <div class="login" v-if="store.state.userLogged == ''">
    <h1>Effettua il login</h1>
    <form action="">
      <div>
        <label for="task">Nome:</label>
        <input type="text" v-model="nameUser" placeholder="Inserisci il tuo nome" required>
        <button @click.capture="userLogged()" class="login-btn rounded-pill" :class="nameUser == '' ? 'disabled' : ''">
          Login
        </button>
      </div>
    </form>
  </div>

  <!-- SE è STATO EFFETTUATO IL LOGIN -->
  <div class="login" v-else>
    <h1>
      Benvenuto {{ store.state.userLogged }}
    </h1>
    <div>
      <h3>
        Menu
      </h3>
      <div>
        <router-link to="/albo">Albo</router-link>
      </div>
      <div>
        <router-link :to="{ name: 'toDoList' }">To Do List</router-link>
      </div>
      <div>
        <router-link to="/archivia">Task completati</router-link>
      </div>
      <div @click="logoutFunction()">
        <router-link to="/">Logout</router-link>
      </div>

    </div>
  </div>
</template>

<script>
import store from '../store';
export default {
  data() {
    return {
      store,
      nameUser: ''
    }
  },
  methods: {
    // FUNZIONE PER SALVARE IL NOME DELL'UTENTE LOGGATO NELLO STORE
    userLogged() {
      if (!this.nameUser == '') {
        // console.log(this.nameUser)
        this.store.state.userLogged = this.nameUser
        // console.log(this.store.state.userLogged)
      }
    },
    // FUNZIONE PER IL LOGOUT
    logoutFunction() {
      this.nameUser = ''
      this.store.state.userLogged = ''
    }
  }
}
</script>

<style scoped>
.login {
  text-align: center;
  margin: 10px auto;
  width: 800px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 20px;
  background-color: rgb(198, 198, 235, 1);
}

.login form {
  margin-top: 10px;
}

.login label {
  text-align: start;
  margin-right: 10px;
}

.login input {
  border: 1px solid black;
  border-radius: 10px;
  background-color: white;
  padding: 5px;
}

.login .login-btn {
  margin-left: 10px;
  border: 1px solid black;
  padding: 5px;
  background-color: white;

}

.login .login-btn * {
  text-decoration: none;
  color: black;

}

.login .login-btn:hover {
  background-color: rgb(145, 145, 214);
}

.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.login a {
  text-decoration: none;
}
</style>
