<template>
  <nav class="main-nav">
    <router-link :to="{ name: 'HomePage' }">Events</router-link> |
    <router-link :to="{ name: 'AddEvent' }">Add New Event</router-link>
  </nav>
</template>

<script>
export default {};
</script>

<style>
.main-nav {
  text-align: center;
  margin: 40px auto;
  color: rgb(144, 144, 144);
}
.main-nav a {
  display: inline-block;
  text-decoration: none;
  margin: 0 10px;
  color: rgb(144, 144, 144);
  font-size: 25px;
}
a.router-link-active {
  border-bottom: 3px solid white;
  padding-bottom: 4px;
  color: white;
}
</style>
