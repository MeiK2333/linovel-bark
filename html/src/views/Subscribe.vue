<template>
  <div>
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="subscribes"
      :items-per-page="5"
      class="elevation-1"
      :footer-props="{
        showFirstLastPage: true
      }"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>订阅管理</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-btn color="deep-purple accent-4" small fab dark class="ml-1" @click="dialog = true">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.title="{ item }">
        <a :href="bookUrl(item.targetId)" target="_blank">《{{item.title}}》</a>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">新增订阅</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="4">
                <v-text-field
                  v-model="url"
                  label="web 端获取的书籍链接"
                  append-icon="mdi-file-find"
                  @click:append="bookInfo"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="info.id !== -1">
              <v-data-table hide-default-header hide-default-footer>
                <template v-slot:body>
                  <tbody>
                    <tr>
                      <td>书名</td>
                      <td><a :href="bookUrl(info.id)" target="_blank">《{{info.title}}》</a></td>
                    </tr>
                    <tr>
                      <td>封面</td>
                      <td><img :src="info.bookImageLink" width="100%" /></td>
                    </tr>
                    <tr>
                      <td>书籍 ID</td>
                      <td>{{info.id}}</td>
                    </tr>
                    <tr>
                      <td>作者</td>
                      <td>{{info.author}}</td>
                    </tr>
                    <tr>
                      <td>作者头像</td>
                      <td><img :src="info.authorImageLink" width="100%" /></td>
                    </tr>
                  </tbody>
                </template>
              </v-data-table>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">取消</v-btn>
          <v-btn color="blue darken-1" text @click="update()" :disabled="info.id === -1">提交</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Subscribe } from '../types/subscribe'
import { BookInfo } from '../types/bookInfo'
import Vue from 'vue'
import axios from 'axios'
export default Vue.extend({
  name: 'Subscribe',
  data: () => ({
    dialog: false,
    loading: true,
    subscribes: [] as Array<Subscribe>,
    info: {
      id: -1
    } as BookInfo,
    url: '',
    headers: [
      {
        text: '编号',
        value: 'id'
      },
      {
        text: '书名',
        sortable: false,
        value: 'title'
      },
      { text: '书籍 ID', value: 'targetId' }
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
  subscribes {
    id
    title
    targetId
  }
}
`
      const resp = await axios.post<{ data: { subscribes: Array<Subscribe> } }>(
        '/graph',
        {
          query
        }
      )
      this.subscribes = resp.data.data.subscribes
      this.loading = false
    },
    bookUrl (targetId: number) {
      return `https://www.linovel.net/book/${targetId}.html`
    },
    async update () {
      const query = `
mutation {
  addSubscribe(title: "${this.info.title}", targetId: ${this.info.id}) {
    id
  }
}
        `
      await axios.post('/graph', { query })
      this.info = { id: -1 } as BookInfo
      await this.load()
      this.dialog = false
    },
    async bookInfo () {
      const query = `
{
  bookInfo(url: "${this.url}") {
    url
    id
    title
    bookImageLink
    author
    authorImageLink
  }
}`
      const resp = await axios.post<{ data: { bookInfo: BookInfo } }>(
        '/graph',
        {
          query
        }
      )
      this.info = resp.data.data.bookInfo
    }
  }
})
</script>
