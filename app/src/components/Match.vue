<template>
  <router-link :to="'/match/' + match.id" class="match">
    <div class="header">
      <div class="stage" v-if="showStage && stage">{{ stage.name }}</div>
      <div class="datetime" v-if="showDatetime && match.startDateTime && !isLive">{{ showDatetime == 'time' ? formattedTime : formattedDatetime }}</div>
      <div class="live" v-if="isLive">Live</div>
    </div>
    <div class="scores" :class="[layout, {'finished': props.match.finished, 'started': props.match.started}]">
      <span class="x">X</span>
      <div class="team-score" v-for="(teamScore, index) in props.match.teamScores" :key="index" :class="[matchWinnerLoser(teamScore.score)]">
        <div class="team-name" :title="teamScore.team?.name">{{ teamScore.team?.name || 'TBD' }}</div>
        <div class="score">{{ teamScore.score || '0' }}</div>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IMatch, IStage } from '../models'

export interface Props {
  match: IMatch,
  layout?: 'horizontal' | 'vertical',
  stage?: IStage,
  showStage?: boolean,
  showDatetime?: 'datetime' | 'time' | null,
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'horizontal',
  showStage: false,
  showDatetime: null,
})

const isLive = computed(() => {
  return props.match.started && !props.match.finished;
})

const formattedTime = computed(() => {
  if (!props.match.startDateTime) {
    return ''
  }

  return props.match.startDateTime.format('HH:mm')
})

const formattedDatetime = computed(() => {
  if (!props.match.startDateTime) {
    return ''
  }

  return props.match.startDateTime.format('DD/MM/YYYY HH:mm')
})

function matchWinnerLoser(score?: number): string {
  if (!props.match.teamScores) {
    return '';
  }

  const scores = props.match.teamScores.map(ts => Number(ts.score));
  const maxScore = Math.max(...scores);
  const isMaxScore = score == maxScore;
  if (!isMaxScore) {
    return 'loser';
  }

  return scores.filter(s => s == maxScore).length == 1 ? 'winner' : '';
}
</script>

<style scoped lang="scss">
@import '../assets/scss/variables';

.match {
  display: block;
  @include box;

  .header {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    padding-top: .2em;

    .live {
      padding: .15rem $spacing-1;
      border-radius: $spacing-1;
      text-transform: uppercase;
      font-size: .75em;
      background-color: $red-500;
      color: $white;
    }
  }

  .scores {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;

    .team-score {
      flex: 1 1 auto;
      width: 100%;

      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: space-between;

      .team-name {
        flex: 1 1 auto;
        text-align: right;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .score {
        display: none;

        @include box;
        flex: 0 0 auto;
        padding: $spacing-1;
        text-align: center;
        min-width: calc($spacing-2 + 1.4em);
        margin-left: $spacing-1;
        background-color: $gray-200;
      }
    }
    &.started .team-score .score { display: block; }
    &.finished .team-score .score { background-color: $yellow-300; }
    &.finished .team-score.loser {
      .team-name { opacity: .6; }
      .score { background-color: $red-300; }
    }
    &.finished .team-score.winner {
      .team-name { font-weight: bold; }
      .score { background-color: $green-300; }
    }

    .x {
      flex: 0 0 auto;
      order: 0;
      margin: $spacing-1 $spacing-2;
    }

    &.horizontal {
      .team-score { width: 30%; }
      .team-score:first-of-type { order: -1; }
      .team-score:last-of-type {
        order: 1;

        .team-name {
          text-align: left;
        }

        .score {
          order: -1;
          margin-left: 0;
          margin-right: $spacing-1;
        }
      }
    }

    &.vertical {
      flex-direction: column;

      .team-score { margin-bottom: $spacing-1; }
      .team-score:last-of-type { margin-bottom: 0; }

      .x { display: none; }
    }
  }
}

.card {
  width: 100%;
  margin: 10px 0;
  text-align: center;

  div.team-name {
    margin-right: auto;
  }
}
</style>
