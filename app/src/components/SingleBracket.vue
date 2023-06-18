<template>
  <div class="bracket-full">
    <BracketNode v-if="bracket.root" :match="bracket.root"></BracketNode>
  </div>
</template>

<script setup lang="ts">
import { inject, Ref, ref } from 'vue';
import { ISingleBracketStage, StageType } from '../models';
import { StagesService } from '../services';
import BracketNode from './BracketNode.vue'

const props = defineProps<{
  stage: ISingleBracketStage
}>()

const bracket: Ref<ISingleBracketStage> = ref(props.stage)

if (bracket.value.type == StageType.SingleBracket && bracket.value.id && !bracket.value.root) {
  const stagesService = inject(StagesService.name) as StagesService
  stagesService.findOne(bracket.value.id).then(stage => {
    bracket.value = stage.data
  })
}
</script>
