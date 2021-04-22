<script>
import StoreModule from './store'

export default {
  name: 'Index',
  beforeCreate () {
    this.$registerModule(this.$store, { index: StoreModule })
  },
  beforeDestroy () {
    this.$unregisterModule(this.$store, ['index'])
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss"></style>
