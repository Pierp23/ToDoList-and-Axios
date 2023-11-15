<template>
  <div class="completedTasks">
    <h1>Task completati e archiviati</h1>
    <div>

      <!-- SELECT PER FILTRARE -->
      <h3 class="pa-0">
        Filtra le task:
      </h3>
      <select @change="filterTask()" name="" id="" v-model="selectedUser">
        <option value="" selected>Filtra per utente &#9660;</option>
        <option v-for="(user, index) in store.state.users" :key="index" :value="user">
          {{ user }}
        </option>
      </select>

      <h3 class="pt-3">
        oppure fai una ricerca testuale
      </h3>

      <!-- INPUT PER EFFETTUARE UNA RICERCA TESTUALE -->
      <form action="">
        <v-text-field label="Cerca una task o un utente" @keyup="searchInputFunction()"
          v-model="searchInput"></v-text-field>
      </form>
    </div>

    <!-- STAMPO I DATI DELLE TASK COMPLETATE E ARCHIVIATE -->
    <div>
      <h3>
        Tasks:
      </h3>
      <v-simple-table class="my-table">
        <thead>
          <tr>
            <th class="text-left">
              Creato da
            </th>
            <th class="text-left">
              Archiviato da
            </th>
            <th class="text-left">
              Task
            </th>
            <th class="text-left">
              Azioni
            </th>
          </tr>
        </thead>
        <!-- SE NON HO FILTRATO MOSTRO TUTTE LE TASK ARCHIVIATE -->
        <tbody v-if="selectedUser == ''">
          <tr v-for="(toDo, index) in   store.state.completedToDoList" :key="index">
            <template v-if="toDo.visible == true">
              <td>
                {{ toDo.user }}
              </td>
              <td>
                {{ store.state.userLogged }}
              </td>
              <td>
                {{ toDo.title }}
              </td>
              <td>
                <span @click.capture="reverseArchiveTask(index)">
                  Annulla archiviazione
                </span>
              </td>
            </template>
          </tr>
        </tbody>

        <!-- ALTRIMENTI STAMPO SOLO QUELLI DELL'UTENTE INDICATO -->
        <tbody v-else>
          <tr v-for="(toDo, index) in   store.state.completedToDoList" :key="index">
            <template v-if="toDo.user == selectedUser">
              <td>
                {{ toDo.user }}
              </td>
              <td>
                {{ store.state.userLogged }}
              </td>
              <td>
                {{ toDo.title }}
              </td>
              <td>
                <span @click.capture="reverseArchiveTask(index)">
                  Annulla archiviazione
                </span>
              </td>
            </template>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import store from '../store';
export default {
  data() {
    return {
      store,
      selectedUser: '',
      searchInput: ''
    }
  },
  methods: {
    // FUNZIONE PER CAMBIARE LA OPTION DELLA SELECT: mi stampo il risultato per un controllo del corretto funzionamento
    filterTask() {
      console.log(this.selectedUser)
    },
    // FUNZIONE PER AGGIORNARE I DATI IN BASE ALLA RICERCA TESTUALE: per nome (sia utente creatore che utente archiviatore) e per testo task
    searchInputFunction() {
      this.store.state.completedToDoList.forEach(singleToDo => {
        singleToDo.visible = true
        if (!singleToDo.title.toLowerCase().includes(this.searchInput.toLowerCase()) && !store.state.userLogged.toLowerCase().includes(this.searchInput.toLowerCase()) && !singleToDo.user.toLowerCase().includes(this.searchInput.toLowerCase())) {
          singleToDo.visible = false
        }
      })
    },
    reverseArchiveTask(i) {
      this.store.state.toDoList.push(this.store.state.completedToDoList[i])
      this.store.state.completedToDoList.splice(i, 1)
      // console.log(this.store.state.completedToDoList)

    }
  }
}
</script>
<style scoped>
.completedTasks {
  margin: 0 auto;
  width: 1000px;
  padding: 10px;
  background-color: rgba(255, 240, 240, 0.5);
  border-radius: 10px;
}

select {
  border: 1px solid black;
  border-radius: 10px;
  background-color: white;
  padding: 5px;
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

.my-table span {
  padding-right: 10px;
}

.my-table span:hover {
  cursor: pointer;
}
</style>
