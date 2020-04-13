<template>
  <div>
    <v-card class="mx-auto" max-width="480px">
      <v-card-text>
        <v-data-table :loading="loading" hide-default-header hide-default-footer>
          <template v-slot:body>
            <tbody>
              <tr>
                <td>当前可用用户</td>
                <td>{{users.length}}</td>
              </tr>
              <tr>
                <td>账户余额</td>
                <td>{{summary}}
                  <v-btn color="deep-purple accent-4" x-small fab dark @click="open('http://92jindou.com/web.html')">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn></td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'home',
  components: {},
  data: () => ({
    loading: true,
    drawer: null,
    users: [],
    summary: 0
  }),
  async created () {
    this.loading = true
    const query = `
{
  users {
    id
  }
  summary {
    summary
  }
}
`
    const resp = await axios.post('/graph', { query })
    this.users = resp.data.data.users
    this.summary = resp.data.data.summary.summary
    this.loading = false
  },
  methods: {
    open (href) {
      window.open(href, '_blank')
    }
  }
}
</script>
