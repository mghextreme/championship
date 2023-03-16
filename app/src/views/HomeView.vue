<template>
  <TopBar></TopBar>
  <v-main class="bg-grey-lighten-3">
    <Container>
      <Bracket v-if="sample2" :bracket="sample2"></Bracket>
    </Container>
  </v-main>
</template>

<script setup lang="ts">
import { inject, provide, Ref, ref } from 'vue';
import Bracket from '../components/Bracket.vue'
import Container from '../components/Container.vue'
import TopBar from '../components/TopBar.vue'
import { StagesService } from '../services'

import { IBracket } from '../models'

// provide('stagesService', new StagesService())
// let stagesService = inject('stagesService') as StagesService

const stagesService = new StagesService()
const sample2: Ref<IBracket | null> = ref(null)
stagesService.findOne(2).then(response => {
  let bracket = response.data as IBracket
  console.log(bracket)
  sample2.value = bracket
})
</script>

<style scoped lang="scss">
</style>
