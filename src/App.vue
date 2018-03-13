<template>
  <div class="corpo">

    <my-menu :routes="routes"></my-menu>

    <transition name="page">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { routes } from "./routes";
import Menu from "./Compoments/shared/menu/Menu.vue";

export default {
  components: {
    "my-menu": Menu
  },

  data() {
    return {
      routes: routes.filter(route => route.nav)
    };
  }
};
</script>

<style>
.corpo {
  font-family: Helvetica, sans-serif;
  width: 96%;
  margin: 0 auto;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.6s;
}
</style>
