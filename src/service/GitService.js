import Axios from "axios";

export default class GitService {
  constructor() {
    Axios.defaults.baseURL = "https://api.github.com/";
  }
  gitRepos(username) {
    return Axios.get(`users/${username}/repos`, username);
  }
}

export const gitService = new GitService();
