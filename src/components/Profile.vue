<template>
    <v-ons-page>
      <app-toolbar title="Profile">
        <div slot="left">
          <v-ons-back-button>Repos page</v-ons-back-button>
        </div>
      </app-toolbar>
      <div class="content">
        <Page404 v-if="error" />
          <v-ons-card v-else>
              <img :src="image" width="100%">
              <div class="title">
                  {{user.login}}
              </div>
                  <v-ons-list>
                  <v-ons-list-header>Profile info</v-ons-list-header>
                  <v-ons-list-item>Followers: {{user.followers}}</v-ons-list-item>
                  <v-ons-list-item>Following: {{user.following}}</v-ons-list-item>
                  </v-ons-list>
          </v-ons-card>
        </div>
    </v-ons-page>
</template>

<script>
import AppToolbar from "./AppToolbar";
import Page404 from "./Page404";
import { gitService } from "./../service/GitService";
export default {
  components:{
    AppToolbar,
    Page404
  },
  props:{
    username: {
      type: String
    }
  },
  data() {
    return {
      user: [],
      image: "",
      error: ""
    }
  },
  created(){
    gitService.gitUser(this.username).then(response => {
      this.user = response.data;
      this.image = response.data.avatar_url
    }).catch(errors =>{
      this.error = errors.message;
    })
  }
};
</script>