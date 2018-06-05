import Axios from "axios";

export default class GitService {
  constructor() {
    Axios.defaults.baseURL = "https://api.github.com/";
    // Axios.defaults.headers.common["Authorization"] =
    //   "Bearer " + "bba1605e7ca3818a7dcf2b4d0d3afd667a2a65fd";
  }
  gitRepos(username) {
    return Axios.get(`users/${username}/repos`, username);
  }
  gitUser(username) {
    return Axios.get(`users/${username}`, username);
  }
}

export const gitService = new GitService();
