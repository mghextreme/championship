<template>
  <v-card class="elevation-3">
    <v-card-item class="py-2 px-3">
      <template v-for="(team, index) in props.game.teams" :key="index">
        <v-divider class="my-1" v-if="index !== 0"></v-divider>
        <div class="d-flex flex-nowrap justify-space-between py-1">
          <v-avatar v-if="team.color" :color="team.color" size="x-small"></v-avatar>
          <div class="team-name">{{ team.name }}</div>
          <div>{{ team.score }}</div>
        </div>
      </template>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import { IGame } from '../models'

const props = defineProps<{
  game: IGame
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
