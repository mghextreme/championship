<template>
  <div class="bracket-round d-flex flex-column flex-nowrap">
    <div class="round-name text-center flex-grow-0" v-if="props.showNames">{{ props.bracketRound.name || '-' }}</div>
    <div class="round-games d-flex flex-column flex-nowrap justify-space-around align-stretch flex-grow-1">
      <Game v-for="(game, index) in props.bracketRound.games" :key="index" :game="game"></Game>
    </div>
  </div>
</template>

<script setup lang="ts">
import Game from './Game.vue'
import { IBracketRound } from '../models'

const props = defineProps<{
  bracketRound: IBracketRound,
  showNames: boolean
}>()
</script>

<style lang="scss" scoped>
.bracket-round {
  width: 200px;
  margin: 0 10px;
}
</style>
