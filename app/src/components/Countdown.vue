<template>
  <div class="countdown">{{ formattedTime }}</div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps<{
  to: moment.Moment
}>();

const now = ref(moment())
const formattedTime = computed(() => {
  const diff = props.to.diff(now.value)

  if (diff < 0) {
    return 'Live';
  }

  const totalSeconds = Math.floor(diff / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);

  let time = hours > 0 ? hours + ':' : '';

  time += (totalMinutes % 60).toString().padStart(2, '0') + ':'
  time += (totalSeconds % 60).toString().padStart(2, '0')

  return time
})

let interval: number;
onMounted(() => {
  interval = setInterval(() => {
    now.value = moment()
  }, 500)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>
