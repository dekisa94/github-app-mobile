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
                <v-ons-input placeholder="Leave your note here" float v-model="note.content"/>
                <v-ons-button @click="storeLocal">Save note</v-ons-button>
              </div>
            </v-ons-list-item>
            <v-ons-list-item v-for="(note, key) in notes" :key="key">
              <div class="left">
                {{note.content}}
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
  components: {
    AppToolbar,
    Page404
  },
  props: {
    username: {
      type: String
    }
  },
  data() {
    return {
      user: [],
      image: "",
      error: "",
      notes: [],
      note: { content: "", userId: "" }
    };
  },
  mounted() {
    gitService
      .gitUser(this.username)
      .then(response => {
        this.user = response.data;
        this.image = response.data.avatar_url;
        this.note.userId = this.user.id;
        if (localStorage.getItem("notes"))
          this.notes = JSON.parse(localStorage.getItem("notes"));
      })
      .catch(errors => {
        this.error = errors.message;
      });
  },
  methods: {
    storeLocal() {
      this.notes.push(Object.assign({}, this.note));
      const allNotes = JSON.parse(localStorage.getItem("notes"));
      allNotes.push(Object.assign({}, this.note));
      localStorage.setItem("notes", JSON.stringify(allNotes));

      this.note.content = "";
    }
  }
};
</script>