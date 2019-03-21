import Vue from 'vue'
import Router from 'vue-router'
import Accueil from '../components/Accueil'
import MesListes from '../components/MesListes'
import MaListe from '../components/MaListe'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'accueil',
            component: Accueil
        }, {
            path: '/mes-listes',
            name: 'mesListes',
            component: MesListes
        }, {
            path: '/a-propos',
            name: 'aPropos',
            component: MaListe
        }
    ]
})