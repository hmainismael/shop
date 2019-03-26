<template lang="html">
  <div>
    <div class="jumbotron">
      <h1>Bienvenue sur SHOP</h1>
      <p>Sur ce site, vous pourrez créer et gérer vos listes de courses comme bon vous semble !</p>
    </div>
    <ul class="list-group" v-if="last.name">
      <li class="list-group-item">
        <div class="row">
          <h4>Dernière liste modifiée</h4>
          <div class="col-sm-10">
              <h5>{{ last.name }}</h5>
          </div>
          <div class="col-sm-2 text-center">
              <router-link :to="{ name: 'maListe', params: { name: last.name }}" class="btn btn-primary">Voir</router-link>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="js">
  export default  {
    name: 'accueil',
    props: [],
    mounted() {
      const allLists = JSON.parse(window.localStorage.getItem('lists')) || [];

      const maxUpdated = Math.max.apply(Math, allLists.map(
        function(list) {
            return list.updatedAt;
        })
      );

      const index = allLists.findIndex(list => list.updatedAt == maxUpdated);

      this.last = allLists[index];
    },
    data() {
      return {
        last: {
            name: ''
        }
      }
    }
}
</script>

<style scoped lang="css">
.jumbotron {
  padding: 2rem !important;
}
h4 {
    margin: 15px;
    margin-bottom: 40px;
}
a {
    width: 100%;
}
</style>
