import Axios from "axios";

export default class GitService {
  constructor() {
    Axios.defaults.baseURL = "https://api.github.com/";
    Axios.defaults.headers.common['Authorization'] = 'Bearer ' + '89f02e87852fe57770df34fd417cd08b791c9883';
  }
  gitRepos(username) {
    return Axios.get(`users/${username}/repos`, username);
  }
  gitUser(username) {
    return Axios.get(`users/${username}`, username);
  }
}

export const gitService = new GitService();
