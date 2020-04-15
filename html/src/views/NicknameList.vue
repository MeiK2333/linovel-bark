<template>
  <div>
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="nicknames"
      :items-per-page="5"
      class="elevation-1"
      :footer-props="{
        showFirstLastPage: true
      }"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>昵称管理</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-btn color="deep-purple accent-4" small fab dark class="ml-1" @click="dialog = true">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.used="{ item }">
        <v-simple-checkbox v-model="item.used" disabled></v-simple-checkbox>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">上传昵称</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="4">
                <v-textarea v-model="updateNicknames" label="昵称" hint="可以上传多个，每行一个"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">取消</v-btn>
          <v-btn color="blue darken-1" text @click="update()">提交</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Nickname } from '../types/nickname'
import Vue from 'vue'
import axios from 'axios'
export default Vue.extend({
  name: 'NicknameList',
  data: () => ({
    dialog: false,
    loading: true,
    nicknames: [] as Array<Nickname>,
    updateNicknames: '',
    headers: [
      {
        text: '昵称',
        sortable: false,
        value: 'nickname'
      },
      { text: '是否已用', value: 'used' }
    ]
  }),
  async created () {
    await this.load()
  },
  methods: {
    async load () {
      this.loading = true
      const query = `
{
  nicknames {
    nickname
    used
  }
}
`
      const resp = await axios.post<{ data: { nicknames: Array<Nickname> } }>(
        '/graph',
        {
          query
        }
      )
      this.nicknames = resp.data.data.nicknames
      this.loading = false
    },
    async update () {
      const data = this.updateNicknames.split('\n')
      for (let i = 0; i < data.length; i++) {
        const nickname = data[i].trim()
        if (nickname === '') {
          continue
        }
        const query = `
mutation {
  addNickname(nickname: "${nickname}") {
    id
  }
}
        `
        await axios.post('/graph', { query })
      }
      this.updateNicknames = ''
      await this.load()
      this.dialog = false
    }
  }
})
</script>
