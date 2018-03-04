<template>
  <div>

    <input
      placeholder="password"
      v-model="$store.state.editProfile.reAuthPassword"
    />
    <button
      @click="reAuth({
        password: $store.state.editProfile.reAuthPassword
      })"
    >
      Re auth
    </button>

  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  //
  export default {
    methods:{
      ...mapMutations([
        'reAuth'
      ])
    }
  }
</script>
