<template>
  <template v-for="(teamScore, index) in props.match.teamScores" :key="index">
    <v-divider class="my-1" v-if="index !== 0"></v-divider>
    <div>
      Icon
      <div class="team-name" :class="{'font-weight-bold': winnerTeamId && winnerTeamId === teamScore.team?.id}" :title="teamScore.team?.name">{{ teamScore.team?.name || 'TBD' }}</div>
      <div>{{ teamScore.score }}</div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { IMatch } from '../models'

const props = defineProps<{
  match: IMatch
}>()

const winnerTeamId = computed(() => {
  if (!props.match.finished || !props.match.teamScores) {
    return null
  }

  const hasWinner = props.match.teamScores[0].score != props.match.teamScores[1].score
  if (!hasWinner) {
     return null
  }

  return props.match.teamScores[0].score > props.match.teamScores[1].score ? props.match.teamScores[0].team?.id : props.match.teamScores[1].team?.id
})
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  margin: 10px 0;
  text-align: center;

  div.team-name {
    margin-right: auto;
  }
}
</style>
