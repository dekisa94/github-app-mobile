<template>
    <v-ons-page>
        <v-ons-card>
            <img :src="image">
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
import { gitService } from "./../service/GitService";
export default {
  data() {
    return {
      image: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    gitService.gitUser();
  }
};
</script>