import axios from 'axios';
import parse from 'parse-link-header';


class Github {

  static host = 'https://api.github.com';

  static issues({ owner, repo, pagination }) {
    const url = pagination.currentUrl ||
        `${Github.host}/repos/${owner}/${repo}/issues?state=all&page=${pagination.current}&per_page=${pagination.pageSize}`;

    return axios.get(url)
        .then(res => ({ data: res.data, pagination: parse(res.headers.link) }));
  }

  static issue({ owner, repo, number }) {
    const url = `${Github.host}/repos/${owner}/${repo}/issues/${number}`;

    return axios.get(url)
        .then(res => ({ data: res.data }));
  }

  static repos({ owner }) {
    const url = `${Github.host}/users/${owner}/repos`;

    return axios.get(url)
        .then(res => ({ data: res.data }));
  }
}


export default Github;
