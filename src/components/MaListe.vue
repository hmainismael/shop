<template lang="html">
    <div>
        <h1>Gestion de ma liste</h1>
        <div class="form-group">
          <div class="input-group w-25">
            <div class="input-group-prepend">
              <span class="input-group-text">Votre budget</span>
            </div>
            <input type="text" class="form-control" v-model="budget">
            <div class="input-group-append">
              <span class="input-group-text">€</span>
            </div>
          </div>
        </div>
        <produit-autocomplete :items="panier"></produit-autocomplete>
        <hr class="my-4">
        <liste-produits :items="panier"></liste-produits>
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
            budget: 20,
            panier: []
        }
    },
    methods: {

    },
    components: {
        ProduitAutocomplete,
        ListeProduits
    },
    computed: {
        montantTotal () {
            const reducer = (accumulator, currentValue) =>
                currentValue.achete ? (
                    accumulator += parseInt(currentValue.prix ? currentValue.prix : 0)
                ) : ( accumulator )

            return this.panier.reduce(reducer, 0)
        },
        budgetDepasse () {
            return this.budget < this.montantTotal
        },
        montantClass: function() {
            return this.budgetDepasse ? 'red-text' : 'green-text'
        }
    },
    mounted() {
        this.panier = JSON.parse(window.localStorage.getItem('panier')) || []
        this.budget = JSON.parse(window.localStorage.getItem('budget')) || 20
    },
    watch: {
        panier: {
            handler () {
                window.localStorage.setItem('panier', JSON.stringify(this.panier))
            },
            deep: true
        },
        budget () {
            window.localStorage.setItem('budget', JSON.stringify(this.budget))
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
