<template>
  <link v-for="(url) in resources" v-bind:href="url" rel="stylesheet" v-on:load="onloaded"/>
</template>

<script lang="ts">
export default {
  props: ['styles'],
  methods: {
    onloaded(event) {
      this.styles.onloaded(event);
    }
  },
  data() {
    const data = {resources: this.styles.resources};
    this.styles.on('change', () => {
      this.resources = this.styles.resources;
    });
    return data;
  }
}
</script>
