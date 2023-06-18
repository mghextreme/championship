<template>
  <router-view/>
</template>

<script setup lang="ts">
import { provide } from "vue"
import { MatchesService, ModalitiesService, StagesService } from "./services"

const matchesService = new MatchesService()
const modalitiesService = new ModalitiesService()
const stagesService = new StagesService()

provide(MatchesService.name, matchesService)
provide(ModalitiesService.name, modalitiesService)
provide(StagesService.name, stagesService)
</script>

