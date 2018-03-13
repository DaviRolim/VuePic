//import Cadastro from './Compoments/cadastro/Cadastro.vue'
const Cadastro = () => System.import('./Compoments/cadastro/Cadastro.vue') // fazendo desse jeito, ele só carrega o componente quando precisar, não quando inicar a aplicacao (code splitting / lazy loading)
import Home from './Compoments/home/Home.vue'

export const routes = [
    { path: '', name: 'home', component: Home, titulo: 'Home', nav: true },
    { path: '/cadastro', name: 'cadastro', component: Cadastro, titulo: 'Cadastro', nav: true },
    { path: '/cadastro/:id', name: 'altera', component: Cadastro, titulo: 'Cadastro', nav: false },
    { path: '*', component: Home, nav: false }
];