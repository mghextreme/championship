<template>
  <div class="view event">
    <TopBar></TopBar>
    <router-link v-for="modality in modalities" :key="modality.id" :to="'/modality/' + modality.id">{{ modality.name }}</router-link>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { ModalitiesService } from '../services';
import { IModality } from '../models';
import TopBar from '../components/TopBar.vue'

const modalities: Ref<IModality[]> = ref([])
const service = new ModalitiesService()

service.findAll().then(response => {
  modalities.value = response.data
})
</script>
