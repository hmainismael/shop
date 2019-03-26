<template lang="html">
    <div class="row">
        <div>
          <div class="input-group">
            <div class="autocomplete">
              <input type="text" class="form-control" @input="onChange" v-model="produit" @keyup.enter="onEnter" />
              <ul id="autocomplete-results" v-show="isOpen" class="autocomplete-results">
                <li v-for="(result, i) in results" :key="i" @click="setResult(result.nom)" class="autocomplete-result">
                  {{ result.nom }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-4">
          <button class="btn btn-primary" type="button" @click="ajouterProduit">Ajouter</button>
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
            produit: ""
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

            this.results.length > 0 ? this.isOpen = true : this.isOpen = false;
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
                this.handleClickOutside()
            }

        },
        handleClickOutside() {
            this.isOpen = false;
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
  .row {
    padding-left: 15px;
  }
  .autocomplete {
    position: relative;
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
