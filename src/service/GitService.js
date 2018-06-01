import Axios from "axios";

export default class GitService {
  constructor() {
    Axios.defaults.baseURL = "https://api.github.com/";
    Axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'be8991555b28a4cf0d068daa36b852e3a27c3467';
  }
  gitRepos(username) {
    return Axios.get(`users/${username}/repos`, username);
  }
  gitUser(username) {
    return Axios.get(`users/${username}`, username);
  }
}

export const gitService = new GitService();
