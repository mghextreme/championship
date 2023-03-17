<template>
  <TopBar></TopBar>
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <v-row>
        <v-col cols="3">
          <v-list
            density="compact"
            nav
            rounded="lg">
            <v-list-item title="Summary" value="Summary" class="px-3" variant="plain" active-color="primary" @click="selectedTab = 'summary'" :active="selectedTab == 'summary'"></v-list-item>
            <v-list-subheader>Matches</v-list-subheader>
            <v-list-item title="Next matches" value="Next matches" class="px-3" variant="plain" active-color="primary" @click="selectedTab = 'nextMatches'" :active="selectedTab == 'nextMatches'"></v-list-item>
            <v-list-item title="Results" value="Results" class="px-3" variant="plain" active-color="primary" @click="selectedTab = 'results'" :active="selectedTab == 'results'"></v-list-item>
            <v-list-subheader>Stages</v-list-subheader>
            <v-list-item v-for="(stage) in modality?.stages" :title="stage.name" :value="stage.name" :key="stage.id" class="px-3" variant="plain" active-color="primary" @click="selectedTab = 'stage-' + stage.id" :active="selectedTab == 'stage-' + stage.id"></v-list-item>
          </v-list>
        </v-col>
        <v-col class="ml-3">
          <v-sheet rounded="lg" class="pa-5 mb-3" v-show="selectedTab == 'summary'">
            <h2>Summary</h2>
            {{ modality?.name }}
          </v-sheet>
          <v-sheet rounded="lg" class="pa-5 mb-3" v-show="selectedTab == 'nextMatches'">
            <h2>Next matches</h2>
          </v-sheet>
          <v-sheet rounded="lg" class="pa-5 mb-3" v-show="selectedTab == 'results'">
            <h2>Results</h2>
          </v-sheet>
          <v-sheet rounded="lg" class="pa-5 mb-3" v-for="(stage) in modality?.stages" :key="stage.id" v-show="selectedTab == 'stage-' + stage.id">
            <h3>{{ stage.name }}</h3>
            <RoundRobin v-if="stage.type == StageType.RoundRobin" :stage="stage"></RoundRobin>
            <Bracket v-if="stage.type == StageType.SingleBracket" :stage="stage"></Bracket>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
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
const selectedTab = ref('summary')

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
