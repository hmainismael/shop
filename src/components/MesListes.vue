<template lang="html">
  <div>
    <h1>Mes listes</h1>

    <div class="input-group w-50">
      <div class="input-group-prepend">
        <span class="input-group-text">Recherche</span>
      </div>
      <input type="text" class="form-control" v-model="searching" @input="onChange">
    </div>

    <table class="table">
      <thead class="thead-light">
      <tr>
        <th class="w-25" scope="col">Nom</th>
        <th class="w-50">Budget</th>
        <th class="w-25" scope="col">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in listsToDisplay" :key="index">
        <th scope="row">{{ item.name }}</th>
        <td>{{ item.budget }}</td>
        <td>
          <router-link :to="{ name: 'maListe', params: { name: item.name }}" class="btn btn-success editer">Editer</router-link>
          <button type="button" class="btn btn-danger" @click="deleteList(index)">Supprimer</button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="form-group text-center">
        <button type="button" class="btn btn-primary" @click="creationList = true">Nouvelle liste</button>
    </div>
    <div class="row" v-if="creationList">
      <div class="col-sm-4 offset-sm-2">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Nom de la liste</span>
          </div>
          <input type="text" class="form-control" v-model="name" @keyup.enter="createList">
        </div>
      </div>
      <div class="col-sm-4">
        <button type="button" id="creer" class="btn btn-success" @click="createList">Créer</button>
        <button type="button" id="annuler" class="btn btn-danger" @click="reInitCreationList">Annuler</button>
      </div>
    </div>
  </div>

</template>

<script lang="js">
  export default  {
    name: 'mes-listes',
    props: [],
    data() {
      return {
          lists: null,
          listsToDisplay: null,
          creationList: false,
          name: '',
          searching: ''
      }
    },
    mounted() {
          if (!JSON.parse(window.localStorage.getItem('lists')))
              window.localStorage.setItem('lists', JSON.stringify([]))
          this.lists = this.listsToDisplay = JSON.parse(window.localStorage.getItem('lists'))
    },
    methods: {
      createList() {
          const exists = this.lists.length > 0 ? this.lists.find(list => list.name === this.name) : false

          if (!this.name || exists) {
              return alert('Nom vide ou déjà existant')
          }

          this.list = {name: this.name, panier: [], budget: 20, updatedAt: new Date().getTime()}
          this.lists.push(this.list)
          alert('Liste créée')

          this.reInitCreationList()
      },
      reInitCreationList() {
          this.name = ''
          this.creationList = false
      },
      deleteList: function (index) {
          this.lists.splice(index, 1)

          alert('Liste supprimée')
      },
      onChange() {
          const results = this.lists.filter(list => list.name.includes(this.searching));

          this.listsToDisplay = results
      }
    },
    computed: {

    },
    watch: {
      lists: {
          handler () {
              window.localStorage.setItem('lists', JSON.stringify(this.lists))

              this.listsToDisplay = this.lists
          },
          deep: true
      }
    }
}
</script>

<style scoped lang="css">
table {
    margin-top: 40px;
    margin-bottom: 40px;
}
#creer, .editer {
    margin-right: 5px;
}
</style>
