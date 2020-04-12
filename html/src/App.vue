<template>
  <v-app>
    <v-app-bar app clipped-left color="amber">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped color="grey lighten-4">
      <v-list dense class="grey lighten-4">
        <v-list-item link :to="'/'">
          <v-list-item-content>
            <v-list-item-title class="grey--text">首页</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="'/about'">
          <v-list-item-content>
            <v-list-item-title class="grey--text">关于</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'App',
  components: {},
  data: () => ({
    drawer: null
  })
})
</script>
<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>
