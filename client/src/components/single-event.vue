<template>
  <div class="event" :class="event.type">
    <div class="icons">
      <router-link
        :to="{ name: 'EditEvent', params: { id: event.id } }"
        >
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="svg-icon" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg></router-link
      >
      <span @click="eventDelete">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="svg-icon" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></span>
    </div>
    <div class="type">{{ event.type }}</div>
    <h3>{{ event.name }}</h3>
    <h5 class="meta-title">Description</h5>
    <p class="meta-text">
      {{ event.description }}
    </p>
    <div class="meta-footer">
      <div>
        <h5 class="meta-title">ID</h5>
        <p class="meta-text">
          {{ event.id }}
        </p>
      </div>
      <div>
        <h5 class="meta-title">Priority</h5>
        <p class="meta-text">
          {{ event.priority}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['event'],
  data() {
    return {
      urlThis: process.env.VUE_APP_API_URL + '/events/' + this.event.id,
    };
  },
  methods: {
    eventDelete() {
      fetch(this.urlThis, { method: 'DELETE' }).then((res) => res.json())
      .then((res) => {
        if (res.status == 'Error' ) {
          this.$toast.open({
            message: res.message,
            type: 'error',
            duration: 5000
          });
        } else {
          this.$toast.open({
            message: 'Event deleted.',
            type: 'success',
            duration: 5000
          });

          this.$emit('delete', this.event.id)
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

<style>
.event {
  margin: 20px auto;
  background-color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.5);
  border-left: 10px solid rgb(5, 150, 157);
  position: relative;
}
h3 {
  margin-top: 0;
}
.icons {
  position: absolute;
  top: 10px;
  right: 20px;
}
.svg-icon {
  opacity: .5;
  margin-left: 10px;
  cursor: pointer;
  height: 20px;
  width: auto;
  transition: opacity .3s;
  fill: currentColor;
  vertical-align: middle;
  color: black;
}
.svg-icon:hover {
  opacity: 1;
}
.type {
  margin: 0 0 15px -21px;
  display: inline-block;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  color: white;
  padding: 2px 25px 2px 21px;
  background-color: rgb(5, 150, 157);
}
h5.meta-title {
  opacity: .8;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 0;
}
p.meta-text {
  margin-top: 0;
}
.meta-footer {
  display: flex;
  justify-content: space-between;
}

.event.crosspromo { border-color: var(--violet)}
.event.liveops { border-color: var(--green);}
.event.app { border-color: var(--green-light);}
.event.ads { border-color: var(--pink);}

.event.crosspromo .type { background-color: var(--violet)}
.event.liveops .type { background-color: var(--green);}
.event.app .type { background-color: var(--green-light);}
.event.ads .type { background-color: var(--pink);}

</style>
