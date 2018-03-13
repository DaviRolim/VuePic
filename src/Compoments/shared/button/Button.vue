<template>
    <button @click="disparaAcao()" class="button" :class="estiloBotao" :type="tipo">{{rotulo}}</button>
</template>
<script>
export default {
  props: {
    tipo: {
      required: true,
      type: String
    },
    rotulo: {
      required: true,
      type: String
    },
    confirmacao: Boolean,
    estilo: String
  },

  methods: {
    disparaAcao() {
      if (this.confirmacao) {
        if (confirm("Confirma operação?")) {
          this.$emit("buttonActive", new Date()); // passando dados do componente filho para o pai! esses dados são pegos no pai com o $event, sintaxe (nome do evento, dados)
        }
        return;
      }
      this.$emit("buttonActive", new Date()); // passando dados do componente filho para o pai! esses dados são pegos no pai com o $event, sintaxe (nome do evento, dados)
    }
  },

  computed: {
    estiloBotao() {
      if (this.estilo == "padrao" || !this.estilo) return "button-standard";
      if (this.estilo == "perigo") return "button-danger";
    }
  }
};
</script>    

<style scoped>
.button {
  display: inline-block;
  padding: 10px;
  border-radius: 3px;
  margin: 10px;
  font-size: 1.2em;
}

.button-danger {
  background: firebrick;
  color: white;
}

.button-standard {
  background: darkcyan;
  color: white;
}
</style>