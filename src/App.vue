<template>
    <v-ons-page>
      <app-toolbar>
      </app-toolbar>
      
      <app-search :query.sync="query" placeholder="Find repository"/>
      <v-ons-button modifier="large" @click="pushStack">View Profile</v-ons-button>


  <div class="container">
    <v-ons-progress-circular indeterminate v-if="query && !isSearchDone && !errorsNew"/>
    <Page404 v-if="errorsNew && query" />
    <div v-else>
        <v-ons-list v-if="user">
          <v-ons-list-header v-if="user">Repositories of {{user}}</v-ons-list-header>
          <v-ons-list-item v-for="(fetchResult, key) in repos" :key="key">
            <div class="left">
              <img class="list-item__thumbnail" :src="image">
            </div>

            <div class="center">
              <span class="list-item__title">{{fetchResult.name}}</span><span class="list-item__subtitle">{{fetchResult.language}}</span>
            </div>
          </v-ons-list-item>
        </v-ons-list>
    </div>
    <empty-state v-if="!repos.length && query" :type="query"/>
  </div>

    </v-ons-page>
</template>
<script>
import debounce from "lodash/debounce";
import AppToolbar from "./components/AppToolbar";
import AppSearch from "./components/AppSearch";
import EmptyState from "./components/EmptyState";
import Page404 from "./components/Page404";
import profile from "./components/Profile";
import { gitService } from "./service/GitService";
export default {
  components: {
    AppToolbar,
    AppSearch,
    EmptyState,
    Page404
  },
  data() {
    return {
      query: "",
      repos: [],
      image: "",
      isSearchDone: false,
      error: "",
      user: ""
    };
  },
  methods: {
    getRepos: debounce(function() {
      this.error = "";
      gitService
        .gitRepos(this.query)
        .then(response => {
          this.repos = response.data;
          this.isSearchDone = true;
          this.repos.forEach(repo => {
            this.image = repo.owner.avatar_url;
            this.user = repo.owner.login;
          });
        })
        .catch(errors => {
          this.error = errors.message;
        });
    }, 500),
    pushStack(){
      this.$emit('push-page', {
        extends: profile,
        onsNavigatorProps:{
            username: this.query
          }
        });
    }
  },
  watch: {
    query: function() {
      this.getRepos();
      this.isSearchDone = false;
    }
  },
  computed: {
    errorsNew() {
      return this.error;
    }
  }
};
</script>
