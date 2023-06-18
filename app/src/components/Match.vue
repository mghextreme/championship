<template>
  <div class="match">
    <div v-for="(teamScore, index) in props.match.teamScores" :key="index">
      <div>
        Icon
        <div class="team-name" :title="teamScore.team?.name">{{ teamScore.team?.name || 'TBD' }}</div>
        <div>{{ teamScore.score }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IMatch } from '../models'

export interface Props {
  match: IMatch,
  layout: 'horizontal' | 'vertical',
  showStage: boolean
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'horizontal',
  showStage: false
})
</script>

<style scoped lang="scss">
@import '../assets/scss/variables';

.match {
  @include box;
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
