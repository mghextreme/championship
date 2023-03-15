<template>
  <div class="bracket-full d-flex flex-row-reverse flex-nowrap justify-center align-stretch">
    <BracketNode :match="bracket.root"></BracketNode>
  </div>
</template>

<script setup lang="ts">
import { IBracket } from '../models';
import BracketNode from './BracketNode.vue'

const props = defineProps<{
  bracket: IBracket
}>()
</script>
