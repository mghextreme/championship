<template>
  <v-card class="elevation-3">
    <v-card-item class="py-2 px-3">
      <template v-for="(teamScore, index) in props.match.teamScores" :key="index">
        <v-divider class="my-1" v-if="index !== 0"></v-divider>
        <div class="d-flex flex-nowrap justify-space-between py-1">
          <v-avatar v-if="teamScore.team?.color" :color="teamScore.team?.color" size="x-small"></v-avatar>
          <div class="team-name text-truncate" :title="teamScore.team?.name">{{ teamScore.team?.name || 'TBD' }}</div>
          <div>{{ teamScore.score }}</div>
        </div>
      </template>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import { IMatch } from '../models'

const props = defineProps<{
  match: IMatch
}>()
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
