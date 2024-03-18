<template>
  <link v-for="(url) in this.styles" v-bind:href="url" rel="stylesheet"/>
</template>

<script lang="ts">
export default {
  props: ['styles']
}
</script>
