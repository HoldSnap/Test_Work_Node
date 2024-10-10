<template>
  <v-container>
    <v-list>
      <v-list-item v-for="comment in comments" :key="comment.id">
        <v-list-item-content>
          <v-list-item-subtitle>{{ comment.author }}</v-list-item-subtitle>
          <v-list-item-text>{{ comment.content }}</v-list-item-text>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click="">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-btn @click="">Add Comment</v-btn>
  </v-container>
</template>
