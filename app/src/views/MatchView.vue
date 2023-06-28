<template>
  <div class="view match">
    <TopBar></TopBar>
    <div class="container">
      <router-link :to="'/modality/' + match?.stage?.modality?.id" class="stage-details mb-1">
        <h4 class="stage">{{ match?.name ?? match?.stage?.name }}</h4>
        <h4 class="modality">{{ match?.stage?.modality?.name }}</h4>
      </router-link>
      <div class="details" :class="[{'finished': !!match?.finished, 'started': !!match?.started}]">
        <div class="logos mb-2">
          <span class="x">X</span>
          <div class="team-logo"><img src="http://placehold.it/240x240" /></div>
          <div class="team-logo"><img src="http://placehold.it/240x240" /></div>
        </div>
        <div class="names">
          <span class="x">X</span>
          <div class="team-name" v-for="(teamScore, index) in match?.teamScores" :key="index" :class="[matchWinnerLoser(teamScore.score)]">
            {{ teamScore.team?.name || 'TBD' }}
          </div>
        </div>
        <div class="scores mt-2">
          <span class="x">X</span>
          <div class="team-score" v-for="(teamScore, index) in match?.teamScores" :key="index" :class="[matchWinnerLoser(teamScore.score)]">
            <span class="score">{{ teamScore.score || '0' }}</span>
          </div>
        </div>
      </div>
      <div class="match-time mt-1" v-if="!isLive">
        <div class="date">{{ formattedDate }}</div>
        <Countdown v-if="!match?.started && match?.startDateTime" :to="match?.startDateTime"></Countdown>
        <div class="time">{{ formattedTime }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, Ref, ref } from 'vue';
import moment from 'moment';
import { useRoute } from 'vue-router';

import { MatchesService } from '../services';
import { IMatch } from '../models';
import TopBar from '../components/TopBar.vue'
import Countdown from '../components/Countdown.vue'

const route = useRoute()
const id = parseInt(route.params.id as string) || null

const match: Ref<IMatch | null> = ref(null)
const matchesService = inject<MatchesService>(MatchesService.name)

const isLive = computed(() => match.value?.started && !match.value.finished)

const formattedTime = computed(() => {
  if (!match.value?.startDateTime) {
    return ''
  }

  return match.value.startDateTime.format('HH:mm')
})

const formattedDate = computed(() => {
  if (!match.value?.startDateTime) {
    return ''
  }

  return match.value.startDateTime.format('DD/MM/YYYY')
})

function matchWinnerLoser(score?: number): string {
  if (!match?.value?.teamScores) {
    return '';
  }

  const scores = match.value.teamScores.map(ts => Number(ts.score));
  const maxScore = Math.max(...scores);
  const isMaxScore = score == maxScore;
  if (!isMaxScore) {
    return 'loser';
  }

  return scores.filter(s => s == maxScore).length == 1 ? 'winner' : '';
}

if (id) {
  matchesService?.findOne(id).then(response => {
    if (response.data.startDateTime) {
      response.data.startDateTime = moment(response.data.startDateTime);
    }
    match.value = response.data;
  })
}

function matchDate(match: IMatch): string {
  return match.startDateTime?.format('DD/MM/YYYY') ?? 'TBD';
}
</script>

<style scoped lang="scss">
@import '../assets/scss/variables';

.stage-details {
  @include box;

  display: flex;
  justify-content: space-between;

  h4 {
    font-size: 1.15em;
    line-height: 1.5em;
  }
}

.details {
  @include box;
  --padding: #{$spacing-2};

  text-align: center;

  .logos,
  .names,
  .scores {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;

    & > div {
      flex: 1 1 auto;
      width: 30%;

      &:first-of-type { order: -1; }
      &:last-of-type { order: 1; }
    }

    & > .x {
      flex: 0 0 auto;
      order: 0;
      margin: $spacing-1 $spacing-2;
    }
  }

  .logos {
    .team-logo {
      img {
        @include box;
        --padding: 0;
        --border-radius: 50%;

        display: block;
        margin: 0 auto;
        padding: 0;

        width: 100%;
        max-width: 50%;
        height: auto;
      }
    }
  }
  &.started .logos .x { visibility: hidden; }

  .names {
    .team-name {
      font-size: 1.3em;
      line-height: 1.5em;
    }

    .x {
      visibility: hidden;
    }
  }

  .scores {
    display: none;

    .team-score {
      .score {
        @include box;
        --padding: #{$spacing-2};

        display: inline-block;
        flex: 0 0 auto;
        text-align: center;
        font-size: 2em;
        font-weight: 300;
        line-height: 1.4em;
        min-width: calc($spacing-4 + .8em);
        margin-left: $spacing-1;
        background-color: $gray-200;
      }
    }
  }
  &.started .scores { display: flex; }
  &.finished .scores .team-score {
    .score { background-color: $yellow-300; }
    &.loser .score { background-color: $red-300; }
    &.winner .score { background-color: $green-300; }
  }
}

.match-time {
  @include box;

  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    flex: 1 1 auto;
    width: 20%;
    font-size: 1em;
    line-height: 1.5em;

    &:first-of-type { text-align: left; }
    &:last-of-type { text-align: right; }

    &.countdown {
      font-size: 1.3em;
      text-align: center;
      letter-spacing: .05em;
    }
  }
}
</style>
