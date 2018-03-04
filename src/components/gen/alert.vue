<template>
  <div>
  </div>
</template>
<script>
  export default {
    methods: {
      open() {
        let vm = this
        const h = this.$createElement;

        this.$notify({
          message: h(vm.$store.state.gen.alertMsg, {style: 'color: teal'}, 'This is a reminder')
        });
      },
    }
  }
</script>
