<template>
  <form @submit.prevent="eventSubmit">
    <label class="title">ID:</label>
    <input class="custom-input" type="text" v-model="id" required />
    <label class="title">Name:</label>
    <input class="custom-input" type="text" v-model="name" required />
    <label class="title">Description:</label>
    <textarea v-model="description" required></textarea>
    <label class="title">Type:</label>
    <select class="custom-input" v-model="type">
      <option disabled value="">Please select one</option>
      <option v-for="option in typeOptions" :value="option" :key="option">{{ option }}</option>
    </select>
    <label class="title">Priority (0-10):</label>
    <input class="custom-input" type="text" v-model="priority" required />
    <button>Add Event</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      name: '',
      description: '',
      type: '',
      priority: 0,
      typeOptions: ['crosspromo', 'liveops', 'app', 'ads']
    };
  },
  methods: {
    eventSubmit() {
      let newEvent = {
        id: this.id,
        name: this.name,
        description: this.description,
        type: this.type,
        priority: parseInt(this.priority)
      };
      fetch(process.env.VUE_APP_API_URL + '/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 'Error' ) {
          this.$toast.open({
            message: res.message,
            type: 'error',
            duration: 5000
          });
        } else {
          this.$toast.open({
            message: 'Event successfully added!',
            type: 'success',
            duration: 5000
          });

          this.$router.push('/')
        }
      })
      .catch((err) => {
        this.$toast.open({
          message: err.message,
          type: 'error',
          duration: 5000
        });
        console.log(err.name)
      });
    },
  },
};
</script>

