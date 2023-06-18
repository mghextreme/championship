<template>
  <div class="round-robin-full">
    <h4>Standings</h4>
    <table>
      <thead>
        <tr>
          <th :colspan="2">Team</th>
          <th>P</th>
          <th>M</th>
          <th>W</th>
          <th>T</th>
          <th>L</th>
          <th>S&Delta;</th>
          <th>SP</th>
          <th>SA</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in bracket.standings" :key="index">
          <td>Icon</td>
          <td>{{ item.team.name }}</td>
          <td>{{ item.points }}</td>
          <td>{{ item.wins + item.ties + item.losses }}</td>
          <td>{{ item.wins }}</td>
          <td>{{ item.ties }}</td>
          <td>{{ item.losses }}</td>
          <td>{{ item.scorePro - item.scoreAgainst }}</td>
          <td>{{ item.scorePro }}</td>
          <td>{{ item.scoreAgainst }}</td>
        </tr>
      </tbody>
    </table>
    <h4 class="mt-4">Matches</h4>
    <Match v-for="match in bracket.matches" :match="match"></Match>
  </div>
</template>

<script setup lang="ts">
import { inject, Ref, ref } from 'vue';
import { IRoundRobinStage, StageType } from '../models';
import { StagesService } from '../services';
import Match from '../components/Match.vue';

const props = defineProps<{
  stage: IRoundRobinStage
}>()

const bracket: Ref<IRoundRobinStage> = ref(props.stage)

if (bracket.value.type == StageType.RoundRobin && bracket.value.id && !bracket.value.standings) {
  const stagesService = inject(StagesService.name) as StagesService
  stagesService.findOne(bracket.value.id).then(stage => {
    bracket.value = stage.data as IRoundRobinStage
  })
}
</script>

<style scoped lang="scss">
table {
  width: 100%;
}
</style>
