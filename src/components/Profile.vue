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

          <div class="notes">
          <v-ons-list>
            <v-ons-list-header>Personal Notes for user:</v-ons-list-header>
            <v-ons-list-item>
              <div class="center">
                <v-ons-input placeholder="Leave your note here" float v-model="newNote"/>
                <v-ons-button @click="storeLocal">Save note</v-ons-button>
              </div>
            </v-ons-list-item>
            <v-ons-list-item>
              <div class="left">
                {{Note1}}
              </div>
            </v-ons-list-item>
            <v-ons-list-item>
              <div class="left">
                Note 2
              </div>
            </v-ons-list-item>
          </v-ons-list>
        </div>

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
      error: "",
      newNote: "",
      Note1: ""
    }
  },
  created(){
    if(localStorage.getItem('note1')) this.Note1 = localStorage.getItem('note1');

    gitService.gitUser(this.username).then(response => {
      this.user = response.data;
      this.image = response.data.avatar_url
    }).catch(errors =>{
      this.error = errors.message;
    })
  },
  methods:{
    storeLocal(){
      localStorage.setItem('note1', this.newNote);
    }
  }
};
</script>