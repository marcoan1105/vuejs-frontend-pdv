<template>
  <div id="app">
    <Menu></Menu>
    <div style="margin: 30px;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Menu from './components/Menu.vue'

export default {
  name: 'app',
  components: {
    Menu
  }
}
</script>

<style>
</style>
