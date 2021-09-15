<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
</template>

<script>
export default {
  name: 'Top',
  props: {
    title: String
  }
}
</script>

<style scoped>
header {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  text-align: center;
}
</style>
