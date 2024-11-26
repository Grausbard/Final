<!-- App.vue -->
<template>
  <div id="app">
    <AppHeader />
    <router-view />
    <AppFooter v-if="!isProductPage" />
    <ProductFooter v-if="isProductPage" />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import ProductFooter from '@/components/ProductFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    ProductFooter
  },
  computed: {
    isProductPage() {
      return this.$route.name === 'Product'
    }
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

nav {
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    margin: 0 10px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

router-view {
  flex: 1;
}
</style>
