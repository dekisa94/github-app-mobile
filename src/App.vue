<template>
    <v-ons-page>
      <app-toolbar />
      <app-search :query.sync="query" placeholder="Find repository"/>


  <div class="container">
        <v-ons-list v-for="(fetchResult, key) in repos" :key="key" v-if="fetchResult.id">
          <v-ons-list-header>Repositories of {{fetchResult.owner.login}}</v-ons-list-header>
          <v-ons-list-item>
            <div class="left">
              <img class="list-item__thumbnail" :src="image">
            </div>

            <div class="center">
              <span class="list-item__title">{{fetchResult.name}}</span><span class="list-item__subtitle">{{fetchResult.language}}</span>
            </div>
          </v-ons-list-item>
        </v-ons-list>
  </div>

    </v-ons-page>
</template>
<script>
import AppToolbar from "./components/AppToolbar";
import AppSearch from "./components/AppSearch";
import { gitService } from "./service/GitService";
export default {
  components: {
    AppToolbar,
    AppSearch
  },
  data() {
    return {
      query: "",
      repos: [],
      image: ""
    };
  },
  methods: {
    getAnswer() {
      gitService
        .gitRepos(this.query)
        .then(response => {
          this.repos = response.data;
          this.repos.forEach(repo => {
            this.image = repo.owner.avatar_url;
          });
        })
        .catch(errors => {
          console.log(errors);
        });
    }
  },
  watch: {
    query: function() {
      this.getAnswer();
    }
  }
};
</script>
