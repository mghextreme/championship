<template>
  <div class="round-robin-full">
    <h4>Standings</h4>
    <v-table>
      <thead>
        <tr>
          <th :colspan="2" class="text-left">Team</th>
          <th class="text-center">P</th>
          <th class="text-center">M</th>
          <th class="text-center">W</th>
          <th class="text-center">T</th>
          <th class="text-center">L</th>
          <th class="text-center">S&Delta;</th>
          <th class="text-center">SP</th>
          <th class="text-center">SA</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in bracket.standings" :key="index">
          <td><v-avatar v-if="item.team.color" :color="item.team.color" size="x-small"></v-avatar></td>
          <td class="text-left">{{ item.team.name }}</td>
          <td class="text-center font-weight-bold">{{ item.points }}</td>
          <td class="text-center">{{ item.wins + item.ties + item.losses }}</td>
          <td class="text-center">{{ item.wins }}</td>
          <td class="text-center">{{ item.ties }}</td>
          <td class="text-center">{{ item.losses }}</td>
          <td class="text-center">{{ item.scorePro - item.scoreAgainst }}</td>
          <td class="text-center">{{ item.scorePro }}</td>
          <td class="text-center">{{ item.scoreAgainst }}</td>
        </tr>
      </tbody>
    </v-table>
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
.v-table {
  width: 100%;
}
</style>
