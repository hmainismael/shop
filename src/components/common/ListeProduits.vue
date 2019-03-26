<template>
  <ul class="list-group">
    <li class="list-group-item" v-for="(item, index) in items" :key="index">
      <div class="row">
        <div class="col-sm-2">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="achete" v-model="item.achete">
          </div>
        </div>
        <div class="col-sm-3">
          <h4>{{ item.nom }}</h4>
        </div>
        <div class="col-sm-4">
          <div class="input-group w-50" v-if="item.achete">
            <div class="input-group-prepend">
              <span class="input-group-text">Prix</span>
            </div>
            <input type="text" class="form-control" v-model="item.prix" v-on:keypress="isNumber($event)">
            <div class="input-group-append">
              <span class="input-group-text">€</span>
            </div>
          </div>
        </div>
        <div class="col-sm-3 text-center">
            <button type="button" class="btn btn-danger" @click="supprimerProduit(index)">Supprimer</button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
    name: 'liste-produits',
    data: function () {
      return {

      }
    },
    props: ['items'],
    methods: {
        supprimerProduit: function(index) {
            this.items.splice(index, 1)
        },
        isNumber: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();
            } else {
                return true;
            }
        }
    }
}
</script>

<style scoped>
ul {
  margin-top: 50px !important;
}
.list-group-item {
    margin: 0px !important;
}
</style>
