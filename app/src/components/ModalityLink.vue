<template>
  <v-card
    class="elevation-3"
    :href="'/modality/' + props.modality.id">
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="100px"
      cover
    ></v-img>
    <v-card-title>{{ props.modality.name }}</v-card-title>
  </v-card>
</template>

<script setup lang="ts">
import { IModality } from '../models'

const props = defineProps<{
  modality: IModality
}>()
</script>

<style scoped lang="scss">
.v-card {
  max-width: 300px;
  margin: 10px;
}
</style>
