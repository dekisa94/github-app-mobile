<template>
    <v-ons-page>
      <app-toolbar />
      <app-search :query.sync="query" placeholder="Find repository"/>
    </v-ons-page>
</template>
<script>
import AppToolbar from './components/AppToolbar'
import AppSearch from './components/AppSearch'
  export default{
    components:{
      AppToolbar,
      AppSearch
    },
    data() {
      return {
        query: ""
      };
    }
  };
</script>
