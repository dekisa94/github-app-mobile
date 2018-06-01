import Axios from "axios";

export default class GitService {
  constructor() {
    Axios.defaults.baseURL = "https://api.github.com/";
    // Axios.defaults.headers.common['Authorization'] = 'Bearer ' + '96e2d41f3ce80d43b6f47f677fab5e51ad8f76dc';
  }
  gitRepos(username) {
    return Axios.get(`users/${username}/repos`, username);
  }
  gitUser(username) {
    return Axios.get(`users/${username}`, username);
  }
}

export const gitService = new GitService();
