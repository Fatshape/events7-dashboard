<template>
  <div>
    <EventsNavbar />
    <router-view />
  </div>
</template>

<script>
import EventsNavbar from './components/events-navbar.vue';
export default {
  components: { EventsNavbar },
};
</script>

<style>

#app {
  max-width: 600px;
  margin: 0 auto;
  color: #1c163d;
}
nav {
  padding: 30px;
  font-size: 25px;
}

nav a {
  font-weight: bold;
}
</style>
