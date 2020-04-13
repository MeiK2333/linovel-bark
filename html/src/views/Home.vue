<template>
  <div style="width: 120px">
    <p>现有账号：{{users.length}}</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'home',
  components: {},
  data: () => ({
    drawer: null,
    users: []
  }),
  async created () {
    const query = `
{
  users {
    id
  }
}
`
    const resp = await axios.post('/graph', { query })
    this.users = resp.data.data.users
  }
}
</script>
