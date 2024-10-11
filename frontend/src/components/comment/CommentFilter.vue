<template>
    <v-container>
      <v-form v-model="" ref="form" @submit.prevent="">
        <v-text-field
          v-model="dateFrom"
          label="Дата начала"
          type="date"
          required
        ></v-text-field>
        
        <v-text-field
          v-model="dateTo"
          label="Дата окончания"
          type="date"
          required
        ></v-text-field>
        
        <v-btn type="submit" color="primary">Поиск комментариев</v-btn>
      </v-form>
  
      <v-list v-if="comments.length">
        <v-list-item v-for="comment in comments" :key="comment.id">
          <v-list-item-content>
            <v-list-item-title>{{ comment.text }}</v-list-item-title>
            <v-list-item-subtitle>
              <span>Статья:</span>
              <span> | </span>
              <span>Создано:</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
  </template>
