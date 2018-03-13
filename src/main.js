import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';
import './directives/Transform';
import VeeValidate from 'vee-validate';
import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/js/bootstrap.js';
import msg from './pt_BR';
import './assets/css/teste.css';
import './assets/js/teste.js';


Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000/'

/* Adicionando Header na requisição Http 
Vue.http.interceptors.push((req, next) => {

  // é possível colocar informações no header antes do envio da requisição
  req.headers.set('Authorization', 'informação de segurança aqui');
  console.log('Lidando com o request');

  next(res => {
    console.log('Lidando com a resposta')
    // é possível acessar os dados da reposta e realizar transformações antes
    console.log(res.body);
  });

});
*/
Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes,
  mode: 'history' // pra se livrar o /#/ na url
});  // poderia omitir o segundo deixar só 'routes' porque quando é igual ele entende

//Vue.use(VeeValidate);

Vue.use(VeeValidate, {
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
});

new Vue({
  el: '#app',
  router: router, // poderia omitir o segundo deixar só 'router' porque quando é igual ele entende
  render: h => h(App)
})