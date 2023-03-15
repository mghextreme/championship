<template>
  <TopBar></TopBar>
  <v-main class="bg-grey-lighten-3">
    <Container>
      <Bracket :bracket="sample"></Bracket>
    </Container>
  </v-main>
</template>

<script lang="ts">
import Bracket from '../components/Bracket.vue'
import Container from '../components/Container.vue'
import TopBar from '../components/TopBar.vue'

// TODO: Delete
import { IBracket, IMatch, ITeamScore } from '../models'

export default {
  name: 'HomeView',
  components: {
    Bracket,
    Container,
    TopBar
  },
  data() {
    return {
      sample: {
        id: 1,
        name: 'Playoffs',
        root: {
          id: 1,
          finished: false,
          teamScores: [
            {
              team: {
                name: 'A',
                color: 'blue'
              },
              score: 0
            } as ITeamScore,
            {
              team: {
                name: 'H',
                color: 'red'
              },
              score: 0
            } as ITeamScore
          ],
          precedingMatches: [
            {
              id: 2,
              finished: true,
              teamScores: [
                {
                  team: {
                    name: 'A',
                    color: 'blue'
                  },
                  score: 1
                } as ITeamScore,
                {
                  team: {
                    name: 'D',
                    color: 'yellow'
                  },
                  score: 0
                } as ITeamScore
              ]
            } as IMatch,
            {
              id: 3,
              finished: true,
              teamScores: [
                {
                  team: {
                    name: 'E',
                    color: 'green'
                  },
                  score: 0
                } as ITeamScore,
                {
                  team: {
                    name: 'H',
                    color: 'red'
                  },
                  score: 1
                } as ITeamScore
              ]
            } as IMatch
          ]
        } as IMatch
      } as IBracket
    }
  }
}
</script>

<style scoped lang="scss">
</style>
