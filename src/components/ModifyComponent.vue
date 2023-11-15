<template>
  <div class="modifiche-input">
    <h1>Modifica la tua task</h1>

    <!-- INPUT COLLEGATO CON V-MODEL PER MODIFICARE LA STRINGA: SI AGGIORNA CLICCANDO IL TASTO INVIA -->
    <form action="">
      <v-text-field variant="outlined" label="Modifica una task e premi invio" v-model="newTitleTask"
        @keyup.enter="changeTask()"></v-text-field>
    </form>

    <!-- STAMPO I DATI VECCHI, QUELLI MODIFICATI E ROUTER-LINK PER TORNARE ALLA TO-DO-LIST -->
    <v-simple-table class="my-table">
      <thead>
        <tr>
          <th class="text-left">
            Task memorizzata
          </th>
          <th class="text-left">
            Nuovo task
          </th>
          <th class="text-left">
            Azioni
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {{ store.state.toDoList[this.store.state.currentIndex].title }}
          </td>
          <td>
            {{ newTitleTask }}
          </td>
          <td>
            <span>
              <router-link to="/ToDoList">
                Ritorna alla To Do List
              </router-link>
            </span>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import store from '../store';
export default {
  data() {
    return {
      store,
      newTitleTask: ''
    }
  },
  methods: {
    // FUNZIONE PER AGGIORNARE LA TASK
    changeTask() {
      // console.log(this.store.state.toDoList[this.store.state.currentIndex].title)
      this.store.state.toDoList[this.store.state.currentIndex].title = this.newTitleTask
      // console.log(this.store.state.toDoList[this.store.state.currentIndex].title)
    }

  }
}
</script>

<style scoped>
.modifiche-input {
  margin: 0 auto;
  width: 1000px;
  padding: 10px;
  background-color: rgba(255, 240, 240, 0.5);
  border-radius: 10px;
}

.my-table {
  border-radius: 10px;
}

.my-table tr:last-child td:last-child {

  border-bottom-right-radius: 10px;
}

.my-table tr:last-child td:first-child {
  border-bottom-left-radius: 10px;
}

.my-table *:not(span, a) {
  padding-left: 20px;
}

.my-table span:hover {
  cursor: pointer;
}

a {
  text-decoration: none;
  color: rgb(81, 79, 79);
  font-weight: bold;
}

a:hover {
  color: rgb(102, 102, 182);
}
</style>
