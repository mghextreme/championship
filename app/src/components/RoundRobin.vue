<template>
  <div class="round-rabin-full d-flex flex-row-reverse flex-nowrap justify-center align-stretch">
    Group standings<br/>
    List of matches
  </div>
</template>

<script setup lang="ts">
import { inject, Ref, ref } from 'vue';
import { IRoundRobinStage, StageType } from '../models';
import { StagesService } from '../services';

const props = defineProps<{
  stage: IRoundRobinStage
}>()

const bracket: Ref<IRoundRobinStage> = ref(props.stage)

if (bracket.value.type == StageType.RoundRobin && bracket.value.id && !bracket.value.standing) {
  const stagesService = inject(StagesService.name) as StagesService
  stagesService.findOne(bracket.value.id).then(stage => {
    bracket.value = stage.data
  })
}
</script>
