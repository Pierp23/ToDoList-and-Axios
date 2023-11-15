<template>
  <div class="albo">
    <h1>
      Le vignette di Randall Munroe
    </h1>

    <!-- SE I DATI NON SONO ANCORA DISPONIBILI VISUALIZZO IL LOADING -->
    <template v-if="loading == true">
      <div class="loading mt-10">
        Loading. . .
      </div>
    </template>

    <!-- TERMINATA LA CHIAMATA AXIOS STAMPO I DATI -->
    <div class="comicCard mt-10" v-else>
      <h2>
        {{ store.state.comic.title }}
      </h2>
      <ul>
        <li>
          <span class="font-weight-bold">Giorno: </span>{{ store.state.comic.day }}
        </li>
        <li>
          <span class="font-weight-bold">Mese: </span>{{ store.state.comic.month }}
        </li>
        <li>
          <span class="font-weight-bold">Anno: </span>{{ store.state.comic.year }}
        </li>
        <li>
          <span class="font-weight-bold">Numero: </span>{{ store.state.comic.num }}
        </li>
        <li>
          <span class="font-weight-bold">Link img: </span>
          <a :href="store.state.comic.img">
            {{ store.state.comic.img }}
          </a>
        </li>

        <!-- FRECCE PER SCORRERE LE VIGNETTE: al click scatenano le rispettive funzioni-->
        <div class="btn-div">
          <span @click="prevComic()">&larr; Prev</span>
          <span @click="nextComic()">Next &rarr;</span>
        </div>
      </ul>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios'
import store from '../store';

export default {
  axios,
  name: 'AlboView',
  data() {
    return {
      loading: false,
      store,
      currentComic: 100,
      lastComic: ''
    }
  },
  methods: {
    // FUNZIONE PER EFFETTUARE LA CHIAMATA API
    getComic() {
      this.loading = true
      axios.get('http://localhost:8080/' + this.currentComic + '/info.0.json')
        .then(response => {
          this.store.state.comic = response.data
          this.loading = false
          // console.log(response)
        }).catch((err) => {
          console.log(err)
        })
    },
    // FUNZIONI PER SCORRERE LE VIGNETTE
    prevComic() {
      if (this.currentComic > 1) {
        this.currentComic--
        this.getComic()
      }
    },
    nextComic() {
      if (this.currentComic < this.lastComic) {
        this.currentComic++
        this.getComic()
      }
    },
    // FUNZIONE PER PESCARE L'ULTIMO NUMERO: servirà per fermare il tasto Next una volta arrivati all'ultima vignetta
    getLastComic() {
      axios.get('http://localhost:8080/info.0.json')
        .then(response => {
          this.lastComic = response.data.num
          // console.log(this.lastComic)
        }).catch((err) => {
          console.log(err)
        })
    }

  },
  created() {
    this.getComic(),
      this.getLastComic()

  }

}
</script>

<style scoped>
.albo {
  margin: 0 auto;
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading {
  font-size: 30px;
  font-weight: bold;
}

.comicCard {
  border: 1px solid black;
  border-radius: 10px;
  height: max-content;
  padding: 20px;
  padding-top: 10px;
  background-color: rgb(198, 198, 235, 1);
}

h2 {
  margin-bottom: 10px;
}

ul {
  padding: 0 !important;
  list-style: none;
}

li {
  text-align: start;
}

.btn-div {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.btn-div span:hover {
  cursor: pointer;
}

.btn-div span:first-child:hover {
  cursor: pointer;
  color: red;
}

.btn-div span:last-child:hover {
  cursor: pointer;
  color: green;
}
</style>
