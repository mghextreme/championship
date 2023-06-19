<template>
  <div class="bracket-node">
    <div class="round">
      <Match :match="props.match" layout="vertical" :show-stage="false"></Match>
    </div>
    <div v-if="props.match.precedingMatches" class="round">
      <Match v-for="(match, index) in props.match.precedingMatches" :key="index" :match="match" layout="vertical" :show-stage="false"></Match>
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
@import '../assets/scss/variables';

.bracket-node {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  flex-wrap: nowrap;

  .round {
    flex: 0 0 auto;
    width: calc(50% - $spacing-1);
    margin-left: $spacing-2;

    &:last-of-type { margin-left: 0; }

    .match {
      margin-bottom: $spacing-2;

      &:last-of-type { margin-bottom: 0; }
    }
  }
}
</style>
