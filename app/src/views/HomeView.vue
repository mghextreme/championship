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
import { IBracket, IBracketRound, IGame, ITeamScore } from '../models'

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
        rounds: [
          {
            name: 'Finals',
            games: [
              {
                teams: [
                  {
                    name: 'A',
                    score: 0,
                    color: 'blue'
                  } as ITeamScore,
                  {
                    name: 'H',
                    score: 0,
                    color: 'red'
                  } as ITeamScore
                ]
              } as IGame
            ]
          } as IBracketRound,
          {
            name: 'Semi Finals',
            games: [
              {
                teams: [
                  {
                    name: 'A',
                    score: 1,
                    color: 'blue'
                  } as ITeamScore,
                  {
                    name: 'D',
                    score: 0,
                    color: 'yellow'
                  } as ITeamScore
                ]
              } as IGame,
              {
                teams: [
                  {
                    name: 'E',
                    score: 0,
                    color: 'green'
                  } as ITeamScore,
                  {
                    name: 'H',
                    score: 1,
                    color: 'red'
                  } as ITeamScore
                ]
              } as IGame
            ]
          } as IBracketRound,
          {
            name: 'Quarter Finals',
            games: [
              {
                teams: [
                  {
                    name: 'A',
                    score: 1,
                    color: 'blue'
                  } as ITeamScore,
                  {
                    name: 'B',
                    score: 0
                  } as ITeamScore
                ]
              } as IGame,
              {
                teams: [
                  {
                    name: 'C',
                    score: 0
                  } as ITeamScore,
                  {
                    name: 'D',
                    score: 1,
                    color: 'yellow'
                  } as ITeamScore
                ]
              } as IGame,
              {
                teams: [
                  {
                    name: 'E',
                    score: 1,
                    color: 'green'
                  } as ITeamScore,
                  {
                    name: 'F',
                    score: 0
                  } as ITeamScore
                ]
              } as IGame,
              {
                teams: [
                  {
                    name: 'G',
                    score: 0
                  } as ITeamScore,
                  {
                    name: 'H',
                    score: 1,
                    color: 'red'
                  } as ITeamScore
                ]
              } as IGame
            ]
          } as IBracketRound
        ]
      } as IBracket
    }
  }
}
</script>

<style scoped lang="scss">
</style>
