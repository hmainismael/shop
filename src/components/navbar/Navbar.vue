<template lang="html">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div class="container">
            <router-link :to="{ name: 'accueil'}" class="navbar-brand">SHOP</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <router-link to="/" class="nav-link">Accueil</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/mes-listes" class="nav-link">Mes listes</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/a-propos" class="nav-link">A propos</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script lang="js">
export default  {
    name: 'navbar',
    props: [],
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="css">
  .navbar {
    margin-bottom: 20px !important;
  }
  .navbar-brand {
      font-size: 32px !important;
      font-weight: bold;
  }
  .nav-link {
    font-size: 25px !important;
      outline: none;
  }
</style>
