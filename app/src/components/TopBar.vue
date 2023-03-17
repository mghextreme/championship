<template>
  <v-app-bar flat>
    <v-container class="fill-height d-flex align-center">
      <v-avatar
        class="me-10 ms-4"
        color="grey-darken-1"
        size="32"
      >S</v-avatar>
      <v-btn variant="text" href="/">
        Home
      </v-btn>
      <v-spacer></v-spacer>
      <v-responsive max-width="260">
        <v-text-field
          density="compact"
          hide-details
          variant="solo"
        ></v-text-field>
      </v-responsive>
    </v-container>
  </v-app-bar>
</template>
