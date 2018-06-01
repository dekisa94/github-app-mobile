<template>
    <v-ons-page>
      <app-toolbar title="Profile">
        <div slot="left">
          <v-ons-back-button>Repos page</v-ons-back-button>
        </div>
      </app-toolbar>
        <v-ons-card>
            <img src="">
            <div class="title">
                Test
            </div>
            <div class="content">
                <v-ons-list>
                <v-ons-list-header>Test</v-ons-list-header>
                <v-ons-list-item>Test</v-ons-list-item>
                </v-ons-list>
            </div>
    </v-ons-card>
    </v-ons-page>
</template>

<script>
import AppToolbar from "./AppToolbar";
import { gitService } from "./../service/GitService";
export default {
  components:{
    AppToolbar
  },
  data() {
    return {
    }
  }
};
</script>