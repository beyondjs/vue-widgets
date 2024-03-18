<template>
  <Styles :styles="this.styles"/>
  <component :is="this.Widget" v-bind="this.props"/>
</template>

<script lang="ts">
import Styles from './styles.vue';

export default {
  props: ['Widget', 'props', 'styles'],
  components: {Styles}
}
</script>
