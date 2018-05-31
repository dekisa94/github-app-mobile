<template>
    <v-ons-page>
      <app-toolbar />
      <app-search :query.sync="query" placeholder="Find repository"/>


  <div class="container">
    <v-ons-progress-circular indeterminate v-if="query && !isSearchDone && !errorsNew"/>
    <empty-state v-if="errorsNew && query" :type="query" />
    <div v-else>
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
  </div>

    </v-ons-page>
</template>
<script>
import debounce from "lodash/debounce";
import AppToolbar from "./components/AppToolbar";
import AppSearch from "./components/AppSearch";
import EmptyState from "./components/EmptyState";
import { gitService } from "./service/GitService";
export default {
  components: {
    AppToolbar,
    AppSearch,
    EmptyState
  },
  data() {
    return {
      query: "",
      repos: [],
      image: "",
      isSearchDone: false,
      error: ""
    };
  },
  methods: {
    getRepos: debounce(function () {
      this.error = "";
      gitService
        .gitRepos(this.query)
        .then(response => {
          this.repos = response.data;
          this.isSearchDone = true;
          this.repos.forEach(repo => {
            this.image = repo.owner.avatar_url;
          });
        })
        .catch(errors => {
          this.error = errors.message;
          console.log(errors.message)
        });
    }, 500)
  },
  watch: {
    query: function() {
      this.getRepos()
      this.isSearchDone = false;
    }
  },
  computed:{
    errorsNew(){
      return this.error;
    }
  }
};
</script>
