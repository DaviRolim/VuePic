<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
 <!-- novo elemento para exibir mensagens para o usuário -->
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>

<input class="filtro" @input="filtro = $event.target.value" type="search" placeholder="Filtre por titulo">
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto._id">

        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva v-my-transform:rotate.animate="{ incremento: 15, reverse: true}" :url="foto.url" :titulo="foto.titulo"/>
          <!--my-button tipo="button" rotulo="DELETE" @click.native="apagar(foto)"></my-button-->
          <router-link :to="{ name: 'altera', params: { id: foto._id }}">
            <my-button tipo="button" rotulo="UPDATE" estilo="padrao" :confirmacao="false"></my-button> <!--pegando evento do elemento filho com $event-->
          </router-link>
          <my-button tipo="button" rotulo="DELETE" estilo="perigo" :confirmacao="true" @buttonActive="apagar($event, foto)"></my-button> <!--pegando evento do elemento filho com $event-->
          <!-- Se eu tivesse colocado confimacao sem o v-bind (:) ele iria enxergar o "true" como string, com o ":" ele enxerga como expressao-->
        </meu-painel>

      </li>
    </ul>

  </div>
</template>

<script>
import Painel from "../shared/painel/Painel.vue";
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Button from "../shared/button/Button.vue";
import FotoService from "../../domain/foto/FotoService";

export default {
  components: {
    "meu-painel": Painel,
    "imagem-responsiva": ImagemResponsiva,
    "my-button": Button
  },

  data() {
    return {
      titulo: "Alurapic",
      fotos: [],
      filtro: "",
      mensagem: ""
    };
  },

  computed: {
    /* Computed motodos serve pra criar uma logica dentro dele e isolar uma logica*/
    fotosComFiltro() {
      if (this.filtro) {
        /* filtrar */
        let exp = new RegExp(this.filtro.trim(), "i"); //ignorar espaço e ignorar case
        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else {
        /* todos */
        return this.fotos;
      }
    }
  },

  methods: {
    apagar($event, foto) {
      this.service.remove(foto._id).then(
        () => {
          this.mensagem = "Foto removida com Sucesso";
          let indice = this.fotos.indexOf(foto); // para tirar a foto da lista de fotos (poderia também refazer a requisição)
          this.fotos.splice(indice, 1);
        },
        err => {
          this.mensagem = err.message;
        }
      );
      /*
      this.$http.delete(`v1/fotos/${foto._id}`).then(
        () => {
          this.mensagem = "Foto removida com Sucesso";
          let indice = this.fotos.indexOf(foto); // para tirar a foto da lista de fotos (poderia também refazer a requisição)
          this.fotos.splice(indice, 1);
        },
        err => {
          console.log(err);
          this.mensagem = "Não foi possivel remover a foto";
        }
      );*/
    }
  },

  created() {
    this.service = new FotoService(this.$resource);

    this.resource = this.$resource("v1/fotos{/id}");
    this.service.lista().then(
      fotos => (this.fotos = fotos),
      err => {
        this.mensagem = err.message; // Pegando o message lá do fotoService (o Throw que to jogando no service to pegando aqui com o err.message)
      }
    );

    /*
    this.$http
      .get("v1/fotos")
      .then(res => res.json())
      .then(fotos => (this.fotos = fotos), err => console.log(err));*/
  }
};
</script>

<style>
.centralizado {
  text-align: center;
}

.lista-fotos {
  list-style: none;
}
.lista-fotos .lista-fotos-item {
  display: inline-block;
}

.filtro {
  display: inline-block;
  width: 100%;
}
</style>
