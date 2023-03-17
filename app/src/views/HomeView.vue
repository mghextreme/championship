<template>
  <TopBar></TopBar>
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <v-sheet rounded="lg" class="pa-5">
        <Bracket v-if="sample2" :bracket="sample2"></Bracket>
      </v-sheet>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import Bracket from '../components/Bracket.vue'
import TopBar from '../components/TopBar.vue'
import { StagesService } from '../services'

import { ISingleBracketStage } from '../models'

// provide('stagesService', new StagesService())
// let stagesService = inject('stagesService') as StagesService

const stagesService = new StagesService()
const sample2: Ref<ISingleBracketStage | null> = ref(null)
stagesService.findOne(3).then(response => {
  let bracket = response.data as ISingleBracketStage
  console.log(bracket)
  sample2.value = bracket
})
</script>
