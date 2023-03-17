<template>
  <TopBar></TopBar>
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <ModalityLink v-for="(modality, index) in modalities" :key="index" :modality="modality"></ModalityLink>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { ModalitiesService } from '../services';
import { IModality } from '../models';
import TopBar from '../components/TopBar.vue'
import ModalityLink from '../components/ModalityLink.vue'

const modalities: Ref<IModality[]> = ref([])
const service = new ModalitiesService()

service.findAll().then(response => {
  modalities.value = response.data
})
</script>
