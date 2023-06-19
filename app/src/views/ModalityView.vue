<template>
  <div class="view modality">
    <TopBar></TopBar>
    <h1 class="p-2">{{ modality?.name }}</h1>
    <ul class="tabs mb-2">
      <li>Standings</li>
      <li v-if="nextMatches">Matches</li>
      <li v-if="pastMatches">Results</li>
    </ul>
    <div class="tab-contents">
      <div class="container standings">
        <div class="stage mb-4" v-for="stage in modality?.stages" :key="stage.id">
          <h3 class="mb-2">{{ stage.name }}</h3>
          <SingleBracket :stage="stage" v-if="stage.type == StageType.SingleBracket"></SingleBracket>
          <GroupStandings :stage="stage" v-if="stage.type == StageType.RoundRobin"></GroupStandings>
        </div>
      </div>
      <div class="container matches" v-if="nextMatches">
        <Match :match="match" :stage="match.stage" :show-stage="true" show-datetime="time" v-for="match in nextMatches" :key="match.id"></Match>
      </div>
      <div class="container results" v-if="pastMatches">
        <Match :match="match" :stage="match.stage" :show-stage="true" v-for="match in nextMatches" :key="match.id"></Match>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, Ref, ref } from 'vue';
import moment from 'moment';
import { useRoute } from 'vue-router';
import { MatchesService, ModalitiesService } from '../services';
import { IMatch, IModality, StageType } from '../models';
import TopBar from '../components/TopBar.vue'
import SingleBracket from '../components/SingleBracket.vue'
import GroupStandings from '../components/GroupStandings.vue'
import Match from '../components/Match.vue'

const route = useRoute()
const id = parseInt(route.params.id as string) || null

const modality: Ref<IModality | null> = ref(null)
const nextMatches: Ref<IMatch[] | null> = ref(null)
const pastMatches: Ref<IMatch[] | null> = ref(null)
const modalitiesService = inject<ModalitiesService>(ModalitiesService.name)
const matchesService = inject<MatchesService>(MatchesService.name)

if (id) {
  modalitiesService?.findOne(id).then(response => {
    modality.value = response.data;
  })

  matchesService?.findNextByModality(id).then(response => {
    nextMatches.value = response.data.map(match => {
      if (match.startDateTime) {
        match.startDateTime = moment(match.startDateTime);
      }
      return match;
    })
  })

  matchesService?.findFinishedByModality(id).then(response => {
    pastMatches.value = response.data.map(match => {
      if (match.startDateTime) {
        match.startDateTime = moment(match.startDateTime);
      }
      return match;
    })
  })
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

ul.tabs {
  text-align: center;

  li {
    @include box;

    display: inline-block;
    margin: 0 $spacing-1;
  }
}

.tab-contents {
  .matches,
  .results {
    .match {
      margin-bottom: $spacing-1;
    }
  }
}
</style>
