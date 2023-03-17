<template>
  <v-card class="elevation-3">
    <v-card-item class="py-2 px-3">
      <template v-for="(teamScore, index) in props.match.teamScores" :key="index">
        <v-divider class="my-1" v-if="index !== 0"></v-divider>
        <div class="d-flex flex-nowrap justify-space-between py-1">
          <v-avatar v-if="teamScore.team?.color" :color="teamScore.team?.color" size="x-small"></v-avatar>
          <div class="team-name text-truncate" :class="{'font-weight-bold': winnerTeamId && winnerTeamId === teamScore.team?.id}" :title="teamScore.team?.name">{{ teamScore.team?.name || 'TBD' }}</div>
          <div>{{ teamScore.score }}</div>
        </div>
      </template>
    </v-card-item>
  </v-card>
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
.v-card {
  width: 100%;
  margin: 10px 0;
  text-align: center;

  .v-avatar {
    margin-right: 10px;
  }

  div.team-name {
    margin-right: auto;
  }
}
</style>
