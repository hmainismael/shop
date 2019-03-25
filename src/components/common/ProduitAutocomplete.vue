<template lang="html">
  <div class="form-group">
    <div class="input-group w-50">
      <div class="input-group-prepend">
        <span class="input-group-text">Produit</span>
      </div>
      <div class="autocomplete">
        <input type="text" class="form-control" @input="onChange" v-model="produit" @keyup.enter="onEnter" />
        <ul id="autocomplete-results" v-show="isOpen" class="autocomplete-results">
          <li v-for="(result, i) in results" :key="i" @click="setResult(result.nom)" class="autocomplete-result" :class="{ 'is-active': i === arrowCounter }">
            {{ result.nom }}
          </li>
        </ul>
      </div>
      <div class="input-group-append">
        <button class="btn btn-primary" type="button" @click="ajouterProduit">Ajouter</button>
      </div>
    </div>
  </div>
</template>

<script lang="js">
  export default  {
    name: 'produit-autocomplete',
    props: {
        items: {
            type: Array,
            required: false,
            default: () => []
        }
    },
    data() {
        return {
            isOpen: false,
            results: [],
            produit: "",
            arrowCounter: 0
        };
    },
    methods: {
        ajouterProduit() {
            if (this.produit) {
                this.items.push({
                    nom: this.produit,
                    achete: false,
                    prix: 0
                });

                this.produit = '';
            }
        },
        onChange() {
            this.$emit("input", this.produit);

            this.filterResults();
            this.isOpen = true;
        },

        filterResults() {
            this.results = this.items.filter(item => {
                return item['nom'].toLowerCase().indexOf(this.produit.toLowerCase()) > -1;
            });
        },
        setResult(result) {
            this.produit = result;
            this.isOpen = false;
        },
        onEnter() {
            if (this.produit) {
                this.ajouterProduit()
            } else {
                this.produit = this.results[this.arrowCounter].nom;
                this.isOpen = false;
                this.arrowCounter = -1;
            }

        },
        handleClickOutside() {
            this.isOpen = false;
            this.arrowCounter = -1;
        }
      },
      watch: {
          items: function(val, oldValue) {
              if (val.length !== oldValue.length) {
                  this.results = val;
              }
          }
      },
      mounted() {
          document.addEventListener("click", this.handleClickOutside);
      },
      destroyed() {
          document.removeEventListener("click", this.handleClickOutside);
      }
}
</script>

<style scoped lang="css">
  .autocomplete {
    position: relative;
    width: 130px;
  }

  .autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    height: 120px;
    overflow: auto;
    width: 100%;
  }

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocomplete-result.is-active,
  .autocomplete-result:hover {
    background-color: #4aae9b;
    color: white;
  }
</style>
