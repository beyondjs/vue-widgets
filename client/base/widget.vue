<template>
  <Styles :styles="styles"/>
  <component v-if="ready" :key="version" :is="widget()" v-bind="this.props"/>
</template>

<script lang="ts">
import Styles from './styles.vue';

export default {
  props: ['wrapper', 'holder', 'props', 'styles'],
  components: {Styles},
  methods: {
    widget() {
      return this.wrapper.Widget;
    }
  },
  data() {
    const {styles} = this;
    !styles.loaded && styles.ready.then(() => {
      this.holder.style.display = '';
      this.ready = true;
    });

    const data = {version: this.wrapper.version, ready: styles.loaded};
    this.wrapper.changed = () => this.version = this.wrapper.version;
    return data;
  }
}
</script>
