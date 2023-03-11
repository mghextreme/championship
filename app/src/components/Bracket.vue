<template>
  <div class="bracket-full d-flex flex-row-reverse flex-nowrap justify-center align-stretch">
    <BracketRound v-for="(round, index) in props.bracket.rounds" :key="index" :bracket-round="round" :show-names="anyRoundName"></BracketRound>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IBracket } from '../models';
import BracketRound from './BracketRound.vue'

const props = defineProps<{
  bracket: IBracket
}>()

const anyRoundName = computed<boolean>(() => {
  return props.bracket.rounds.some(item => item.name)
})
</script>
