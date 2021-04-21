<template>
  <h1>oculus applab</h1>
  <Applab />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Applab from './components/Applab.vue'

export default defineComponent({
  name: 'App',
  components: {
    Applab
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
