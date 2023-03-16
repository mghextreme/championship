<template>
  <div class="bracket-node d-flex flex-row-reverse flex-nowrap">
    <div class="round d-flex flex-column flex-nowrap justify-space-around align-stretch current">
      <Match :match="props.match"></Match>
    </div>
    <div v-if="props.match.precedingMatches" class="round d-flex flex-column flex-nowrap justify-space-around align-stretch">
      <Match v-for="(match, index) in props.match.precedingMatches" :key="index" :match="match"></Match>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IMatch } from '../models';
import Match from './Match.vue'

const props = defineProps<{
  match: IMatch
}>()
</script>

<style lang="scss" scoped>
.bracket-node .round {
  width: 220px;
  margin: 0;

  &.current {
    margin-left: 20px;
  }
}
</style>
