<template>
    <v-container>
      <v-list>
        <v-list-item v-for="article in articles" :key="article.id">
          <v-list-item-content>
            <v-list-item-title>{{ article.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
  </template>
  
  <script>

  </script>
  