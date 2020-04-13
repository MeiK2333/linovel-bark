<template>
  <div>
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="users"
      :items-per-page="5"
      show-expand
      :single-expand="true"
      class="elevation-1"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td>昵称</td>
                  <td>{{item.nickname}}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </td>
      </template>
    </v-data-table>
  </div>
</template>
<script lang="ts">
import { User } from '../../../src/entity/user'
import Vue from 'vue'
import axios from 'axios'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dateFormat = require('dateformat')
export default Vue.extend({
  name: 'AccountList',
  data: () => ({
    loading: true,
    users: [] as Array<User>,
    headers: [
      {
        text: '账号',
        align: 'start',
        sortable: false,
        value: 'username'
      },
      {
        text: '昵称',
        sortable: false,
        value: 'nickname'
      },
      { text: '上次签到', value: 'signAt' },
      { text: '上次领取月票', value: 'monthlyAt' },
      { text: '', value: 'data-table-expand' }
    ]
  }),
  async created () {
    const query = `
{
  users {
    id
    username
    nickname
    password
    createdAt
    signAt
    monthlyAt
    lastLogin
    token
  }
}
`
    const resp = await axios.post<{ data: { users: Array<User> } }>('/graph', {
      query
    })
    this.users = resp.data.data.users
    this.users.forEach(user => {
      user.signAt = dateFormat(user.signAt, 'yyyy-mm-dd HH:MM:ss')
      user.createdAt = dateFormat(user.createdAt, 'yyyy-mm-dd HH:MM:ss')
      user.monthlyAt = dateFormat(user.monthlyAt, 'yyyy-mm-dd HH:MM:ss')
      user.lastLogin = dateFormat(user.lastLogin, 'yyyy-mm-dd HH:MM:ss')
    })
    this.loading = false
  }
})
</script>
