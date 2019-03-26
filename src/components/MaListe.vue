<template lang="html">
    <div>
        <h1>Liste : {{ list.name }}</h1>
        <div class="form-group">
          <div class="input-group w-25">
            <div class="input-group-prepend">
              <span class="input-group-text">Votre budget</span>
            </div>
            <input type="text" class="form-control" v-model="list.budget">
            <div class="input-group-append">
              <span class="input-group-text">€</span>
            </div>
          </div>
        </div>
        <produit-autocomplete :items="list.panier"></produit-autocomplete>
        <liste-produits :items="list.panier"></liste-produits>
        <div class="col-sm-6 offset-sm-3 text-center alert alert-danger m-top-20" role="alert" v-if="budgetDepasse">
          Budget dépassé !
        </div>
        <p class="lead m-top-20 text-center">Montant total : <span v-bind:class="montantClass">{{ montantTotal }} €</span></p>
    </div>
</template>

<script lang="js">
import ListeProduits from './common/ListeProduits.vue'
import ProduitAutocomplete from "./common/ProduitAutocomplete";

export default  {
    name: 'ma-liste',
    data: function () {
        return {
            lists: JSON.parse(window.localStorage.getItem('lists')),
            list: {}
        }
    },
    components: {
        ProduitAutocomplete,
        ListeProduits
    },
    mounted() {
        this.list = this.lists.find(l => l.name === this.$route.params.name)
    },
    computed: {
        montantTotal () {
            if (this.list.panier) {
                const reducer = (accumulator, currentValue) =>
                    currentValue.achete ? (
                        accumulator += parseInt(currentValue.prix ? currentValue.prix : 0)
                    ) : (accumulator)

                return this.list.panier.reduce(reducer, 0);
            }

            return 0
        },
        budgetDepasse () {
            return this.list.budget < this.montantTotal;
        },
        montantClass: function() {
            return this.budgetDepasse ? 'red-text' : 'green-text'
        }
    },
    watch: {
        list: {
            handler () {
                this.list.updatedAt = new Date().getTime();

                window.localStorage.setItem('lists', JSON.stringify(this.lists));
            },
            deep: true
        }
    }
}
</script>

<style scoped>
.m-top-20 {
    margin-top: 20px !important;
}
.green-text {
    color: green;
}
.red-text {
    color: red;
}
.lead {
    font-size: 25px !important;
}
</style>
