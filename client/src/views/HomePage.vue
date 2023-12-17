<template>
  <div class="homePage">
    <div v-if="events.length">
      <div v-for="event in events" :key="event.id">
        <SingleEvent
          :event="event"
          @delete="deleteMethod"
          @complete="completeMethod"
        ></SingleEvent>
      </div>
    </div>
  </div>
</template>

<script>
import SingleEvent from '../components/single-event.vue';
export default {
  name: 'HomePage',
  components: { SingleEvent },
  data() {
    return {
      events: []
    };
  },
  mounted() {
    fetch(process.env.VUE_APP_API_URL + '/events')
      .then((res) => res.json())
      .then((data) => (this.events = data.reverse()))
      .catch((err) => {
        this.$toast.open({
          message: err.message,
          type: 'error',
          duration: 5000
        });
        console.log(err.message)
      });
  },
  methods: {
    deleteMethod(id) {
      this.events = this.events.filter((event) => event.id !== id);
    },
    completeMethod(id) {
      let c = this.events.find((event) => event.id === id);
      c.complete = !c.complete;
    },
  }
};
</script>
