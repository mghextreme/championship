<template>
  <div class="view modality">
    <TopBar></TopBar>
    <div v-for="(stage) in modality?.stages" :key="stage.id">
      <h3>{{ stage.name }}</h3>
      <RoundRobin v-if="stage.type == StageType.RoundRobin" :stage="stage"></RoundRobin>
      <Bracket v-if="stage.type == StageType.SingleBracket" :stage="stage"></Bracket>
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ModalitiesService, StagesService } from '../services';
import { IModality, StageType } from '../models';
import TopBar from '../components/TopBar.vue'
import Bracket from '../components/Bracket.vue'
import RoundRobin from '../components/RoundRobin.vue'

const route = useRoute()
const id = parseInt(route.params.id as string) || null

const modality: Ref<IModality | null> = ref(null)
const modalitiesService = new ModalitiesService()
const stagesService = new StagesService()
provide(StagesService.name, stagesService)

if (id) {
  modalitiesService.findOne(id).then(response => {
    modality.value = response.data
  })
}
</script>
