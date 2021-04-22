<script>
import StoreModule from './store'
export default {
  name: '{{ pascalCase name }}',
  beforeCreate () {
    this.$registerModule(this.$store, { '{{ snakeCase name }}': StoreModule })
  },
  beforeDestroy () {
    this.$unregisterModule(this.$store, ['{{ snakeCase name }}'])
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss"></style>
