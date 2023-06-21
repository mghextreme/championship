<template>
  <div class="group-standing">
    <table>
      <thead>
        <tr>
          <th class="points"></th>
          <th class="team-name">Team</th>
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
          <td class="points"><span>{{ item.points }}</span></td>
          <td class="team-name">{{ item.team.name }}</td>
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

if (bracket.value.type == StageType.RoundRobin && bracket.value.id && !bracket.value.standings) {
  const stagesService = inject(StagesService.name) as StagesService
  stagesService.findOne(bracket.value.id).then(stage => {
    bracket.value = stage.data as IRoundRobinStage
  })
}
</script>

<style scoped lang="scss">
@import '../assets/scss/variables';

h4 {
  padding-left: $spacing-1;
  margin-bottom: $spacing-1;
  font-size: 0.85em;
  color: #343a40;
}

.group-standing {
  @include box;
  --padding: #{$spacing-1};

  table {
    width: 100%;
    border-collapse: collapse;

    tr {
      th, td {
        min-width: 2.2em;
        text-align: center;

        &.points {
          width: 3em;
          padding: calc($spacing-1 * .6) 0;

          span {
            position: relative;
            display: block;
            @include box;
            z-index: 10;
            background-color: $gray-200;
          }
        }

        &.team-name {
          padding-left: $spacing-1;
          width: 50%;
          text-align: left;
        }
      }

      & + tr {
        position: relative;

        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 1.5em;
          right: 0;
          height: $border-width;
          transform: translateY(-50%);
          background: $gray-400;
          z-index: 5;
        }

        td.points {
          position: relative;
          border-top: none;

          &::after {
            content: '';
            position: absolute;
            bottom: 50%;
            height: 100%;
            width: $border-width;
            transform: translateX(-50%);
            background: $gray-400;
            z-index: 5;
          }
        }
      }
    }
  }
}
</style>
