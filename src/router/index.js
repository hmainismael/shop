import Vue from 'vue'
import Router from 'vue-router'
import Accueil from '../components/Accueil'
import MesListes from '../components/MesListes'
import MaListe from '../components/MaListe'
import Apropos from '../components/Apropos'

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
            path: '/ma-liste',
            name: 'maListe',
            component: MaListe
        }, {
            path: '/a-propos',
            name: 'aPropos',
            component: Apropos
        }
    ]
})