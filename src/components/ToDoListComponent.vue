<template>
  <div class="to-do-list">
    <h1>
      Le task del Team
    </h1>
    <form action="">
      <h3 class="ma-0">
        Aggiungi task alla lista
      </h3>
      <v-text-field v-model="newToDo" variant="outlined" label="Inserisci una task e premi invio"
        @keyup.enter="addNewToDo()"></v-text-field>
    </form>

    <!-- TABELLA CON TUTTE LE TASK -->
    <v-simple-table class="my-table">
      <thead>
        <tr>
          <th class="text-left">
            Creato da
          </th>
          <th class="text-left">
            Task
          </th>
          <th class="text-left">
            Azioni
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(toDo, index) in    store.state.toDoList   " :key="index">
          <template v-if="toDo.title != '' && toDo.archive != true">
            <td>
              {{ toDo.user }}
            </td>
            <td>
              <span :class="toDo.done == true ? 'done' : ''" class="singleTask" @click="reverseDone(index)">
                {{ toDo.title }}
              </span>
            </td>
            <td>
              <span @click.capture="currentIndex(index)">
                <router-link :to="{ name: 'modifica', params: { index: index } }">
                  Modifica
                </router-link>
              </span>
              <span @click.capture="archiveTask(index)">
                <!-- <router-link :to="{ name: 'archivia' }"> -->
                Archivia
                <!-- </router-link> -->
              </span>
              <span @click.stop="removeToDo(index)">
                Elimina
              </span>
            </td>
          </template>
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
      newToDo: '',
      store
    }
  },
  methods: {
    // FUNZIONE PER RIMUOVERE IL TASK
    removeToDo(index) {
      this.store.state.toDoList.splice(index, 1);
    },
    // FUNZIONE PER AGGIUNGERE UN TASK
    addNewToDo() {
      const inputToDo = {
        title: this.newToDo,
        done: false,
        archive: false,
        user: this.store.state.userLogged,
        visible: true
      }
      if (inputToDo.title != '') {
        this.store.state.toDoList.push(inputToDo);
        // console.log(this.store.state.toDoList)
        this.newToDo = '';
        if (!this.store.state.users.includes(inputToDo.user)) {
          this.store.state.users.push(inputToDo.user)
        }
      }
      // console.log(this.store.state.toDoList)
    },
    // FUNZIONE PER INDICARE CHE LA TASK è STATA SVOLTA OPPURE NO
    reverseDone(i) {
      if (this.store.state.toDoList[i].done == true) {
        this.store.state.toDoList[i].done = false
      }
      else {
        this.store.state.toDoList[i].done = true
      }
    },
    // FUNZIONE PER SALVARE L'INDEX DELLA TASK 
    currentIndex(index) {
      this.store.state.currentIndex = index
      // console.log(this.store.state.currentIndex)
    },
    // FUNZIONE PER ARCHIVIARE LA TASK
    archiveTask(i) {
      if (!this.store.state.completedToDoList.includes(this.store.state.toDoList[i])) {
        this.store.state.completedToDoList.push(this.store.state.toDoList[i])
        // console.log(this.store.state.completedToDoList)
        this.store.state.toDoList.splice(i, 1);
      }
    }
  }
}

</script>

<style scoped>
.to-do-list {
  margin: 0 auto;
  width: 1000px;
  padding: 10px;
  background-color: rgba(255, 240, 240, 0.5);
  border-radius: 10px;
}

.to-do-list .my-table {
  border-radius: 10px;
}

.to-do-list .my-table tr:last-child td:last-child {

  border-bottom-right-radius: 10px;
}

.to-do-list .my-table tr:last-child td:first-child {
  border-bottom-left-radius: 10px;
}

.to-do-list .my-table *:not(span, a) {
  padding-left: 20px;
}

.to-do-list .my-table span {
  padding-right: 10px;
}

.to-do-list .my-table span:hover {
  cursor: pointer;
}

.to-do-list .singleTask:hover {
  cursor: pointer;
}

.to-do-list a {
  color: black;
  text-decoration: none;
}

.done {
  text-decoration: line-through;
}
</style>