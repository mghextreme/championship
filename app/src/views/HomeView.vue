<template>
  <div class="view home">
    <TopBar></TopBar>
    <Bracket v-if="sample2" :stage="sample2"></Bracket>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import Bracket from '../components/SingleBracket.vue'
import TopBar from '../components/TopBar.vue'
import { StagesService } from '../services'

import { ISingleBracketStage } from '../models'

// provide('stagesService', new StagesService())
// let stagesService = inject('stagesService') as StagesService

const stagesService = new StagesService()
const sample2: Ref<ISingleBracketStage | null> = ref(null)
stagesService.findOne(3).then(response => {
  let bracket = response.data as ISingleBracketStage
  sample2.value = bracket
})
</script>
