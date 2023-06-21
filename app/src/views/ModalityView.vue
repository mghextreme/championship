<template>
  <div class="view modality">
    <TopBar></TopBar>
    <h1 class="p-2">{{ modality?.name }}</h1>
    <swiper
      class="tab-contents"
      :modules="swiperModules"
      :pagination="swiperPaginationOptions"
      :slides-per-view="1"
      :space-between="20">
      <ul class="tabs my-2"></ul>
      <swiper-slide>
        <div class="container standings">
          <div class="stage mb-3" v-for="stage in modality?.stages" :key="stage.id">
            <h4>{{ stage.name }}</h4>
            <SingleBracket :stage="stage" v-if="stage.type == StageType.SingleBracket"></SingleBracket>
            <GroupStandings :stage="stage" v-if="stage.type == StageType.RoundRobin"></GroupStandings>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide v-if="nextMatches">
        <div class="container matches">
          <template v-for="(match, index) in nextMatches" :key="match.id">
            <h4 v-if="index == 0 || matchDate(match) != matchDate(nextMatches[index - 1])">{{ matchDate(match) }}</h4>
            <Match :match="match" :stage="match.stage" :show-stage="true" show-datetime="time"></Match>
          </template>
        </div>
      </swiper-slide>
      <swiper-slide v-if="pastMatches">
        <div class="container results">
          <template v-for="(match, index) in pastMatches" :key="match.id">
            <h4 v-if="index == 0 || matchDate(match) != matchDate(pastMatches[index - 1])">{{ matchDate(match) }}</h4>
            <Match :match="match" :stage="match.stage" :show-stage="true"></Match>
          </template>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, Ref, ref } from 'vue';
import moment from 'moment';
import { useRoute } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper';
import 'swiper/css';

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

const tabNames = computed(() => {
  const list = ['Standings']
  if (nextMatches) { list.push('Matches'); }
  if (pastMatches) { list.push('Results'); }
  return list;
})

const swiperModules = [Pagination];
const swiperPaginationOptions = computed(() => ({
  clickable: true,
  el: '.tabs',
  type: 'bullets',
  renderBullet: (index: number, className: string) => '<li class="' + className + '">' + tabNames.value[index] + '</li>',
  bulletClass: 'tab',
  bulletActiveClass: 'active'
}));

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

function matchDate(match: IMatch): string {
  return match.startDateTime?.format('DD/MM/YYYY') ?? 'TBD';
}
</script>

<style scoped lang="scss">
@import '../assets/scss/variables';

.tab-contents {
  display: flex;
  flex-direction: column;

  ul.tabs {
    order: -1;
    text-align: center;

    :is(li) {
      display: inline-block;
      box-sizing: border-box;
      padding: calc($border-width + $spacing-1) calc($border-width + $spacing-2);
    }

    :is(li.active) {
      @include box;
    }
  }

  .container {
    h4 {
      padding-left: $spacing-1;
      margin-bottom: $spacing-1;
      font-size: .85em;
      color: $gray-800;
    }
    .match + h4 {
      margin-top: $spacing-2;
    }

    .match {
      margin-bottom: $spacing-1;
    }
  }
}
</style>
