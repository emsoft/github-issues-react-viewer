class RepoInfo {

  id;
  name;

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}


class UserInfo {

  login;
  avatarUrl;
  profileUrl;

  constructor(login, avatarUrl, profileUrl) {
    this.login = login;
    this.avatarUrl = avatarUrl;
    this.profileUrl = profileUrl;
  }
}


class IssueInfo {

  number;
  title;
  createdAt;
  user;

  constructor(number, title, createdAt, user) {
    this.number = number;
    this.title = title;
    this.createdAt = createdAt;
    this.user = user;
  }
}


class IssueDetailsInfo extends IssueInfo {

  body;

  constructor(number, title, createdAt, user, body) {
    super(number, title, createdAt, user);
    this.body = body;
  }
}


export { RepoInfo, IssueInfo, IssueDetailsInfo, UserInfo };
