export interface Root {
  $schema: string
  title: string
  type: string
  properties: Properties
  required: string[]
}

export interface Properties {
  login: Login
  id: Id
  node_id: NodeId
  avatar_url: AvatarUrl
  gravatar_id: GravatarId
  url: Url
  html_url: HtmlUrl
  followers_url: FollowersUrl
  following_url: FollowingUrl2
  starred_url: StarredUrl3
  subscriptions_url: SubscriptionsUrl4
  repos_url: ReposUrl5
  type: Type6
  user_view_type: UserViewType6
  site_admin: SiteAdmin6
  name: Name5
  company: Company
  blog: Blog
  location: Location
  email: Email
  hireable: Hireable
  bio: Bio
  twitter_username: TwitterUsername
  public_repos: PublicRepos
  public_gists: PublicGists
  followers: Followers
  following: Following
  created_at: CreatedAt4
  updated_at: UpdatedAt4
}

export interface Login {
  type: string
}

export interface Id {
  type: string
}

export interface NodeId {
  type: string
}

export interface AvatarUrl {
  type: string
}

export interface GravatarId {
  type: string
}

export interface Url {
  type: string
}

export interface HtmlUrl {
  type: string
}

export interface FollowersUrl {
  type: string
  items: Items
}

export interface Items {
  type: string
  properties: Properties2
  required: string[]
}

export interface Properties2 {
  login: Login2
  id: Id2
  node_id: NodeId2
  avatar_url: AvatarUrl2
  gravatar_id: GravatarId2
  url: Url2
  html_url: HtmlUrl2
  followers_url: FollowersUrl2
  following_url: FollowingUrl
  gists_url: GistsUrl
  starred_url: StarredUrl
  subscriptions_url: SubscriptionsUrl
  organizations_url: OrganizationsUrl
  repos_url: ReposUrl
  events_url: EventsUrl
  received_events_url: ReceivedEventsUrl
  type: Type
  user_view_type: UserViewType
  site_admin: SiteAdmin
}

export interface Login2 {
  type: string
}

export interface Id2 {
  type: string
}

export interface NodeId2 {
  type: string
}

export interface AvatarUrl2 {
  type: string
}

export interface GravatarId2 {
  type: string
}

export interface Url2 {
  type: string
}

export interface HtmlUrl2 {
  type: string
}

export interface FollowersUrl2 {
  type: string
}

export interface FollowingUrl {
  type: string
}

export interface GistsUrl {
  type: string
}

export interface StarredUrl {
  type: string
}

export interface SubscriptionsUrl {
  type: string
}

export interface OrganizationsUrl {
  type: string
}

export interface ReposUrl {
  type: string
}

export interface EventsUrl {
  type: string
}

export interface ReceivedEventsUrl {
  type: string
}

export interface Type {
  type: string
}

export interface UserViewType {
  type: string
}

export interface SiteAdmin {
  type: string
}

export interface FollowingUrl2 {
  type: string
  items: Items2
}

export interface Items2 {
  type: string
  properties: Properties3
  required: string[]
}

export interface Properties3 {
  login: Login3
  id: Id3
  node_id: NodeId3
  avatar_url: AvatarUrl3
  gravatar_id: GravatarId3
  url: Url3
  html_url: HtmlUrl3
  followers_url: FollowersUrl3
  following_url: FollowingUrl3
  gists_url: GistsUrl2
  starred_url: StarredUrl2
  subscriptions_url: SubscriptionsUrl2
  organizations_url: OrganizationsUrl2
  repos_url: ReposUrl2
  events_url: EventsUrl2
  received_events_url: ReceivedEventsUrl2
  type: Type2
  user_view_type: UserViewType2
  site_admin: SiteAdmin2
}

export interface Login3 {
  type: string
}

export interface Id3 {
  type: string
}

export interface NodeId3 {
  type: string
}

export interface AvatarUrl3 {
  type: string
}

export interface GravatarId3 {
  type: string
}

export interface Url3 {
  type: string
}

export interface HtmlUrl3 {
  type: string
}

export interface FollowersUrl3 {
  type: string
}

export interface FollowingUrl3 {
  type: string
}

export interface GistsUrl2 {
  type: string
}

export interface StarredUrl2 {
  type: string
}

export interface SubscriptionsUrl2 {
  type: string
}

export interface OrganizationsUrl2 {
  type: string
}

export interface ReposUrl2 {
  type: string
}

export interface EventsUrl2 {
  type: string
}

export interface ReceivedEventsUrl2 {
  type: string
}

export interface Type2 {
  type: string
}

export interface UserViewType2 {
  type: string
}

export interface SiteAdmin2 {
  type: string
}

export interface StarredUrl3 {
  type: string
  items: Items3
}

export interface Items3 {
  type: string
  properties: Properties4
  required: string[]
}

export interface Properties4 {
  id: Id4
  node_id: NodeId4
  name: Name
  full_name: FullName
  private: Private
  owner: Owner
  html_url: HtmlUrl5
  description: Description
  fork: Fork
  url: Url5
  forks_url: ForksUrl
  keys_url: KeysUrl
  collaborators_url: CollaboratorsUrl
  teams_url: TeamsUrl
  hooks_url: HooksUrl
  issue_events_url: IssueEventsUrl
  events_url: EventsUrl4
  assignees_url: AssigneesUrl
  branches_url: BranchesUrl
  tags_url: TagsUrl
  blobs_url: BlobsUrl
  git_tags_url: GitTagsUrl
  git_refs_url: GitRefsUrl
  trees_url: TreesUrl
  statuses_url: StatusesUrl
  languages_url: LanguagesUrl
  stargazers_url: StargazersUrl
  contributors_url: ContributorsUrl
  subscribers_url: SubscribersUrl
  subscription_url: SubscriptionUrl
  commits_url: CommitsUrl
  git_commits_url: GitCommitsUrl
  comments_url: CommentsUrl
  issue_comment_url: IssueCommentUrl
  contents_url: ContentsUrl
  compare_url: CompareUrl
  merges_url: MergesUrl
  archive_url: ArchiveUrl
  downloads_url: DownloadsUrl
  issues_url: IssuesUrl
  pulls_url: PullsUrl
  milestones_url: MilestonesUrl
  notifications_url: NotificationsUrl
  labels_url: LabelsUrl
  releases_url: ReleasesUrl
  deployments_url: DeploymentsUrl
  created_at: CreatedAt
  updated_at: UpdatedAt
  pushed_at: PushedAt
  git_url: GitUrl
  ssh_url: SshUrl
  clone_url: CloneUrl
  svn_url: SvnUrl
  homepage: Homepage
  size: Size
  stargazers_count: StargazersCount
  watchers_count: WatchersCount
  language: Language
  has_issues: HasIssues
  has_projects: HasProjects
  has_downloads: HasDownloads
  has_wiki: HasWiki
  has_pages: HasPages
  has_discussions: HasDiscussions
  forks_count: ForksCount
  mirror_url: MirrorUrl
  archived: Archived
  disabled: Disabled
  open_issues_count: OpenIssuesCount
  license: License
  allow_forking: AllowForking
  is_template: IsTemplate
  web_commit_signoff_required: WebCommitSignoffRequired
  has_pull_requests: HasPullRequests
  pull_request_creation_policy: PullRequestCreationPolicy
  topics: Topics
  visibility: Visibility
  forks: Forks
  open_issues: OpenIssues
  watchers: Watchers
  default_branch: DefaultBranch
}

export interface Id4 {
  type: string
}

export interface NodeId4 {
  type: string
}

export interface Name {
  type: string
}

export interface FullName {
  type: string
}

export interface Private {
  type: string
}

export interface Owner {
  type: string
  properties: Properties5
  required: string[]
}

export interface Properties5 {
  login: Login4
  id: Id5
  node_id: NodeId5
  avatar_url: AvatarUrl4
  gravatar_id: GravatarId4
  url: Url4
  html_url: HtmlUrl4
  followers_url: FollowersUrl4
  following_url: FollowingUrl4
  gists_url: GistsUrl3
  starred_url: StarredUrl4
  subscriptions_url: SubscriptionsUrl3
  organizations_url: OrganizationsUrl3
  repos_url: ReposUrl3
  events_url: EventsUrl3
  received_events_url: ReceivedEventsUrl3
  type: Type3
  user_view_type: UserViewType3
  site_admin: SiteAdmin3
}

export interface Login4 {
  type: string
}

export interface Id5 {
  type: string
}

export interface NodeId5 {
  type: string
}

export interface AvatarUrl4 {
  type: string
}

export interface GravatarId4 {
  type: string
}

export interface Url4 {
  type: string
}

export interface HtmlUrl4 {
  type: string
}

export interface FollowersUrl4 {
  type: string
}

export interface FollowingUrl4 {
  type: string
}

export interface GistsUrl3 {
  type: string
}

export interface StarredUrl4 {
  type: string
}

export interface SubscriptionsUrl3 {
  type: string
}

export interface OrganizationsUrl3 {
  type: string
}

export interface ReposUrl3 {
  type: string
}

export interface EventsUrl3 {
  type: string
}

export interface ReceivedEventsUrl3 {
  type: string
}

export interface Type3 {
  type: string
}

export interface UserViewType3 {
  type: string
}

export interface SiteAdmin3 {
  type: string
}

export interface HtmlUrl5 {
  type: string
}

export interface Description {
  type: string
}

export interface Fork {
  type: string
}

export interface Url5 {
  type: string
}

export interface ForksUrl {
  type: string
}

export interface KeysUrl {
  type: string
}

export interface CollaboratorsUrl {
  type: string
}

export interface TeamsUrl {
  type: string
}

export interface HooksUrl {
  type: string
}

export interface IssueEventsUrl {
  type: string
}

export interface EventsUrl4 {
  type: string
}

export interface AssigneesUrl {
  type: string
}

export interface BranchesUrl {
  type: string
}

export interface TagsUrl {
  type: string
}

export interface BlobsUrl {
  type: string
}

export interface GitTagsUrl {
  type: string
}

export interface GitRefsUrl {
  type: string
}

export interface TreesUrl {
  type: string
}

export interface StatusesUrl {
  type: string
}

export interface LanguagesUrl {
  type: string
}

export interface StargazersUrl {
  type: string
}

export interface ContributorsUrl {
  type: string
}

export interface SubscribersUrl {
  type: string
}

export interface SubscriptionUrl {
  type: string
}

export interface CommitsUrl {
  type: string
}

export interface GitCommitsUrl {
  type: string
}

export interface CommentsUrl {
  type: string
}

export interface IssueCommentUrl {
  type: string
}

export interface ContentsUrl {
  type: string
}

export interface CompareUrl {
  type: string
}

export interface MergesUrl {
  type: string
}

export interface ArchiveUrl {
  type: string
}

export interface DownloadsUrl {
  type: string
}

export interface IssuesUrl {
  type: string
}

export interface PullsUrl {
  type: string
}

export interface MilestonesUrl {
  type: string
}

export interface NotificationsUrl {
  type: string
}

export interface LabelsUrl {
  type: string
}

export interface ReleasesUrl {
  type: string
}

export interface DeploymentsUrl {
  type: string
}

export interface CreatedAt {
  type: string
}

export interface UpdatedAt {
  type: string
}

export interface PushedAt {
  type: string
}

export interface GitUrl {
  type: string
}

export interface SshUrl {
  type: string
}

export interface CloneUrl {
  type: string
}

export interface SvnUrl {
  type: string
}

export interface Homepage {
  type: string
}

export interface Size {
  type: string
}

export interface StargazersCount {
  type: string
}

export interface WatchersCount {
  type: string
}

export interface Language {
  type: string
}

export interface HasIssues {
  type: string
}

export interface HasProjects {
  type: string
}

export interface HasDownloads {
  type: string
}

export interface HasWiki {
  type: string
}

export interface HasPages {
  type: string
}

export interface HasDiscussions {
  type: string
}

export interface ForksCount {
  type: string
}

export interface MirrorUrl {}

export interface Archived {
  type: string
}

export interface Disabled {
  type: string
}

export interface OpenIssuesCount {
  type: string
}

export interface License {
  type: string
  properties: Properties6
  required: string[]
}

export interface Properties6 {
  key: Key
  name: Name2
  spdx_id: SpdxId
  url: Url6
  node_id: NodeId6
}

export interface Key {
  type: string
}

export interface Name2 {
  type: string
}

export interface SpdxId {
  type: string
}

export interface Url6 {
  type: string
}

export interface NodeId6 {
  type: string
}

export interface AllowForking {
  type: string
}

export interface IsTemplate {
  type: string
}

export interface WebCommitSignoffRequired {
  type: string
}

export interface HasPullRequests {
  type: string
}

export interface PullRequestCreationPolicy {
  type: string
}

export interface Topics {
  type: string
  items: Items4
}

export interface Items4 {
  type: string
}

export interface Visibility {
  type: string
}

export interface Forks {
  type: string
}

export interface OpenIssues {
  type: string
}

export interface Watchers {
  type: string
}

export interface DefaultBranch {
  type: string
}

export interface SubscriptionsUrl4 {
  type: string
  items: Items5
}

export interface Items5 {
  type: string
  properties: Properties7
  required: string[]
}

export interface Properties7 {
  id: Id6
  node_id: NodeId7
  name: Name3
  full_name: FullName2
  private: Private2
  owner: Owner2
  html_url: HtmlUrl7
  description: Description2
  fork: Fork2
  url: Url8
  forks_url: ForksUrl2
  keys_url: KeysUrl2
  collaborators_url: CollaboratorsUrl2
  teams_url: TeamsUrl2
  hooks_url: HooksUrl2
  issue_events_url: IssueEventsUrl2
  events_url: EventsUrl6
  assignees_url: AssigneesUrl2
  branches_url: BranchesUrl2
  tags_url: TagsUrl2
  blobs_url: BlobsUrl2
  git_tags_url: GitTagsUrl2
  git_refs_url: GitRefsUrl2
  trees_url: TreesUrl2
  statuses_url: StatusesUrl2
  languages_url: LanguagesUrl2
  stargazers_url: StargazersUrl2
  contributors_url: ContributorsUrl2
  subscribers_url: SubscribersUrl2
  subscription_url: SubscriptionUrl2
  commits_url: CommitsUrl2
  git_commits_url: GitCommitsUrl2
  comments_url: CommentsUrl2
  issue_comment_url: IssueCommentUrl2
  contents_url: ContentsUrl2
  compare_url: CompareUrl2
  merges_url: MergesUrl2
  archive_url: ArchiveUrl2
  downloads_url: DownloadsUrl2
  issues_url: IssuesUrl2
  pulls_url: PullsUrl2
  milestones_url: MilestonesUrl2
  notifications_url: NotificationsUrl2
  labels_url: LabelsUrl2
  releases_url: ReleasesUrl2
  deployments_url: DeploymentsUrl2
  created_at: CreatedAt2
  updated_at: UpdatedAt2
  pushed_at: PushedAt2
  git_url: GitUrl2
  ssh_url: SshUrl2
  clone_url: CloneUrl2
  svn_url: SvnUrl2
  homepage: Homepage2
  size: Size2
  stargazers_count: StargazersCount2
  watchers_count: WatchersCount2
  language: Language2
  has_issues: HasIssues2
  has_projects: HasProjects2
  has_downloads: HasDownloads2
  has_wiki: HasWiki2
  has_pages: HasPages2
  has_discussions: HasDiscussions2
  forks_count: ForksCount2
  mirror_url: MirrorUrl2
  archived: Archived2
  disabled: Disabled2
  open_issues_count: OpenIssuesCount2
  license: License2
  allow_forking: AllowForking2
  is_template: IsTemplate2
  web_commit_signoff_required: WebCommitSignoffRequired2
  has_pull_requests: HasPullRequests2
  pull_request_creation_policy: PullRequestCreationPolicy2
  topics: Topics2
  visibility: Visibility2
  forks: Forks2
  open_issues: OpenIssues2
  watchers: Watchers2
  default_branch: DefaultBranch2
}

export interface Id6 {
  type: string
}

export interface NodeId7 {
  type: string
}

export interface Name3 {
  type: string
}

export interface FullName2 {
  type: string
}

export interface Private2 {
  type: string
}

export interface Owner2 {
  type: string
  properties: Properties8
  required: string[]
}

export interface Properties8 {
  login: Login5
  id: Id7
  node_id: NodeId8
  avatar_url: AvatarUrl5
  gravatar_id: GravatarId5
  url: Url7
  html_url: HtmlUrl6
  followers_url: FollowersUrl5
  following_url: FollowingUrl5
  gists_url: GistsUrl4
  starred_url: StarredUrl5
  subscriptions_url: SubscriptionsUrl5
  organizations_url: OrganizationsUrl4
  repos_url: ReposUrl4
  events_url: EventsUrl5
  received_events_url: ReceivedEventsUrl4
  type: Type4
  user_view_type: UserViewType4
  site_admin: SiteAdmin4
}

export interface Login5 {
  type: string
}

export interface Id7 {
  type: string
}

export interface NodeId8 {
  type: string
}

export interface AvatarUrl5 {
  type: string
}

export interface GravatarId5 {
  type: string
}

export interface Url7 {
  type: string
}

export interface HtmlUrl6 {
  type: string
}

export interface FollowersUrl5 {
  type: string
}

export interface FollowingUrl5 {
  type: string
}

export interface GistsUrl4 {
  type: string
}

export interface StarredUrl5 {
  type: string
}

export interface SubscriptionsUrl5 {
  type: string
}

export interface OrganizationsUrl4 {
  type: string
}

export interface ReposUrl4 {
  type: string
}

export interface EventsUrl5 {
  type: string
}

export interface ReceivedEventsUrl4 {
  type: string
}

export interface Type4 {
  type: string
}

export interface UserViewType4 {
  type: string
}

export interface SiteAdmin4 {
  type: string
}

export interface HtmlUrl7 {
  type: string
}

export interface Description2 {}

export interface Fork2 {
  type: string
}

export interface Url8 {
  type: string
}

export interface ForksUrl2 {
  type: string
}

export interface KeysUrl2 {
  type: string
}

export interface CollaboratorsUrl2 {
  type: string
}

export interface TeamsUrl2 {
  type: string
}

export interface HooksUrl2 {
  type: string
}

export interface IssueEventsUrl2 {
  type: string
}

export interface EventsUrl6 {
  type: string
}

export interface AssigneesUrl2 {
  type: string
}

export interface BranchesUrl2 {
  type: string
}

export interface TagsUrl2 {
  type: string
}

export interface BlobsUrl2 {
  type: string
}

export interface GitTagsUrl2 {
  type: string
}

export interface GitRefsUrl2 {
  type: string
}

export interface TreesUrl2 {
  type: string
}

export interface StatusesUrl2 {
  type: string
}

export interface LanguagesUrl2 {
  type: string
}

export interface StargazersUrl2 {
  type: string
}

export interface ContributorsUrl2 {
  type: string
}

export interface SubscribersUrl2 {
  type: string
}

export interface SubscriptionUrl2 {
  type: string
}

export interface CommitsUrl2 {
  type: string
}

export interface GitCommitsUrl2 {
  type: string
}

export interface CommentsUrl2 {
  type: string
}

export interface IssueCommentUrl2 {
  type: string
}

export interface ContentsUrl2 {
  type: string
}

export interface CompareUrl2 {
  type: string
}

export interface MergesUrl2 {
  type: string
}

export interface ArchiveUrl2 {
  type: string
}

export interface DownloadsUrl2 {
  type: string
}

export interface IssuesUrl2 {
  type: string
}

export interface PullsUrl2 {
  type: string
}

export interface MilestonesUrl2 {
  type: string
}

export interface NotificationsUrl2 {
  type: string
}

export interface LabelsUrl2 {
  type: string
}

export interface ReleasesUrl2 {
  type: string
}

export interface DeploymentsUrl2 {
  type: string
}

export interface CreatedAt2 {
  type: string
}

export interface UpdatedAt2 {
  type: string
}

export interface PushedAt2 {
  type: string
}

export interface GitUrl2 {
  type: string
}

export interface SshUrl2 {
  type: string
}

export interface CloneUrl2 {
  type: string
}

export interface SvnUrl2 {
  type: string
}

export interface Homepage2 {}

export interface Size2 {
  type: string
}

export interface StargazersCount2 {
  type: string
}

export interface WatchersCount2 {
  type: string
}

export interface Language2 {}

export interface HasIssues2 {
  type: string
}

export interface HasProjects2 {
  type: string
}

export interface HasDownloads2 {
  type: string
}

export interface HasWiki2 {
  type: string
}

export interface HasPages2 {
  type: string
}

export interface HasDiscussions2 {
  type: string
}

export interface ForksCount2 {
  type: string
}

export interface MirrorUrl2 {}

export interface Archived2 {
  type: string
}

export interface Disabled2 {
  type: string
}

export interface OpenIssuesCount2 {
  type: string
}

export interface License2 {}

export interface AllowForking2 {
  type: string
}

export interface IsTemplate2 {
  type: string
}

export interface WebCommitSignoffRequired2 {
  type: string
}

export interface HasPullRequests2 {
  type: string
}

export interface PullRequestCreationPolicy2 {
  type: string
}

export interface Topics2 {
  type: string
  items: Items6
}

export interface Items6 {}

export interface Visibility2 {
  type: string
}

export interface Forks2 {
  type: string
}

export interface OpenIssues2 {
  type: string
}

export interface Watchers2 {
  type: string
}

export interface DefaultBranch2 {
  type: string
}

export interface ReposUrl5 {
  type: string
  items: Items7
}

export interface Items7 {
  type: string
  properties: Properties9
  required: string[]
}

export interface Properties9 {
  id: Id8
  node_id: NodeId9
  name: Name4
  full_name: FullName3
  private: Private3
  owner: Owner3
  html_url: HtmlUrl9
  description: Description3
  fork: Fork3
  url: Url10
  forks_url: ForksUrl3
  keys_url: KeysUrl3
  collaborators_url: CollaboratorsUrl3
  teams_url: TeamsUrl3
  hooks_url: HooksUrl3
  issue_events_url: IssueEventsUrl3
  events_url: EventsUrl8
  assignees_url: AssigneesUrl3
  branches_url: BranchesUrl3
  tags_url: TagsUrl3
  blobs_url: BlobsUrl3
  git_tags_url: GitTagsUrl3
  git_refs_url: GitRefsUrl3
  trees_url: TreesUrl3
  statuses_url: StatusesUrl3
  languages_url: LanguagesUrl3
  stargazers_url: StargazersUrl3
  contributors_url: ContributorsUrl3
  subscribers_url: SubscribersUrl3
  subscription_url: SubscriptionUrl3
  commits_url: CommitsUrl3
  git_commits_url: GitCommitsUrl3
  comments_url: CommentsUrl3
  issue_comment_url: IssueCommentUrl3
  contents_url: ContentsUrl3
  compare_url: CompareUrl3
  merges_url: MergesUrl3
  archive_url: ArchiveUrl3
  downloads_url: DownloadsUrl3
  issues_url: IssuesUrl3
  pulls_url: PullsUrl3
  milestones_url: MilestonesUrl3
  notifications_url: NotificationsUrl3
  labels_url: LabelsUrl3
  releases_url: ReleasesUrl3
  deployments_url: DeploymentsUrl3
  created_at: CreatedAt3
  updated_at: UpdatedAt3
  pushed_at: PushedAt3
  git_url: GitUrl3
  ssh_url: SshUrl3
  clone_url: CloneUrl3
  svn_url: SvnUrl3
  homepage: Homepage3
  size: Size3
  stargazers_count: StargazersCount3
  watchers_count: WatchersCount3
  language: Language3
  has_issues: HasIssues3
  has_projects: HasProjects3
  has_downloads: HasDownloads3
  has_wiki: HasWiki3
  has_pages: HasPages3
  has_discussions: HasDiscussions3
  forks_count: ForksCount3
  mirror_url: MirrorUrl3
  archived: Archived3
  disabled: Disabled3
  open_issues_count: OpenIssuesCount3
  license: License3
  allow_forking: AllowForking3
  is_template: IsTemplate3
  web_commit_signoff_required: WebCommitSignoffRequired3
  has_pull_requests: HasPullRequests3
  pull_request_creation_policy: PullRequestCreationPolicy3
  topics: Topics3
  visibility: Visibility3
  forks: Forks3
  open_issues: OpenIssues3
  watchers: Watchers3
  default_branch: DefaultBranch3
}

export interface Id8 {
  type: string
}

export interface NodeId9 {
  type: string
}

export interface Name4 {
  type: string
}

export interface FullName3 {
  type: string
}

export interface Private3 {
  type: string
}

export interface Owner3 {
  type: string
  properties: Properties10
  required: string[]
}

export interface Properties10 {
  login: Login6
  id: Id9
  node_id: NodeId10
  avatar_url: AvatarUrl6
  gravatar_id: GravatarId6
  url: Url9
  html_url: HtmlUrl8
  followers_url: FollowersUrl6
  following_url: FollowingUrl6
  gists_url: GistsUrl5
  starred_url: StarredUrl6
  subscriptions_url: SubscriptionsUrl6
  organizations_url: OrganizationsUrl5
  repos_url: ReposUrl6
  events_url: EventsUrl7
  received_events_url: ReceivedEventsUrl5
  type: Type5
  user_view_type: UserViewType5
  site_admin: SiteAdmin5
}

export interface Login6 {
  type: string
}

export interface Id9 {
  type: string
}

export interface NodeId10 {
  type: string
}

export interface AvatarUrl6 {
  type: string
}

export interface GravatarId6 {
  type: string
}

export interface Url9 {
  type: string
}

export interface HtmlUrl8 {
  type: string
}

export interface FollowersUrl6 {
  type: string
}

export interface FollowingUrl6 {
  type: string
}

export interface GistsUrl5 {
  type: string
}

export interface StarredUrl6 {
  type: string
}

export interface SubscriptionsUrl6 {
  type: string
}

export interface OrganizationsUrl5 {
  type: string
}

export interface ReposUrl6 {
  type: string
}

export interface EventsUrl7 {
  type: string
}

export interface ReceivedEventsUrl5 {
  type: string
}

export interface Type5 {
  type: string
}

export interface UserViewType5 {
  type: string
}

export interface SiteAdmin5 {
  type: string
}

export interface HtmlUrl9 {
  type: string
}

export interface Description3 {}

export interface Fork3 {
  type: string
}

export interface Url10 {
  type: string
}

export interface ForksUrl3 {
  type: string
}

export interface KeysUrl3 {
  type: string
}

export interface CollaboratorsUrl3 {
  type: string
}

export interface TeamsUrl3 {
  type: string
}

export interface HooksUrl3 {
  type: string
}

export interface IssueEventsUrl3 {
  type: string
}

export interface EventsUrl8 {
  type: string
}

export interface AssigneesUrl3 {
  type: string
}

export interface BranchesUrl3 {
  type: string
}

export interface TagsUrl3 {
  type: string
}

export interface BlobsUrl3 {
  type: string
}

export interface GitTagsUrl3 {
  type: string
}

export interface GitRefsUrl3 {
  type: string
}

export interface TreesUrl3 {
  type: string
}

export interface StatusesUrl3 {
  type: string
}

export interface LanguagesUrl3 {
  type: string
}

export interface StargazersUrl3 {
  type: string
}

export interface ContributorsUrl3 {
  type: string
}

export interface SubscribersUrl3 {
  type: string
}

export interface SubscriptionUrl3 {
  type: string
}

export interface CommitsUrl3 {
  type: string
}

export interface GitCommitsUrl3 {
  type: string
}

export interface CommentsUrl3 {
  type: string
}

export interface IssueCommentUrl3 {
  type: string
}

export interface ContentsUrl3 {
  type: string
}

export interface CompareUrl3 {
  type: string
}

export interface MergesUrl3 {
  type: string
}

export interface ArchiveUrl3 {
  type: string
}

export interface DownloadsUrl3 {
  type: string
}

export interface IssuesUrl3 {
  type: string
}

export interface PullsUrl3 {
  type: string
}

export interface MilestonesUrl3 {
  type: string
}

export interface NotificationsUrl3 {
  type: string
}

export interface LabelsUrl3 {
  type: string
}

export interface ReleasesUrl3 {
  type: string
}

export interface DeploymentsUrl3 {
  type: string
}

export interface CreatedAt3 {
  type: string
}

export interface UpdatedAt3 {
  type: string
}

export interface PushedAt3 {
  type: string
}

export interface GitUrl3 {
  type: string
}

export interface SshUrl3 {
  type: string
}

export interface CloneUrl3 {
  type: string
}

export interface SvnUrl3 {
  type: string
}

export interface Homepage3 {}

export interface Size3 {
  type: string
}

export interface StargazersCount3 {
  type: string
}

export interface WatchersCount3 {
  type: string
}

export interface Language3 {
  type: string
}

export interface HasIssues3 {
  type: string
}

export interface HasProjects3 {
  type: string
}

export interface HasDownloads3 {
  type: string
}

export interface HasWiki3 {
  type: string
}

export interface HasPages3 {
  type: string
}

export interface HasDiscussions3 {
  type: string
}

export interface ForksCount3 {
  type: string
}

export interface MirrorUrl3 {}

export interface Archived3 {
  type: string
}

export interface Disabled3 {
  type: string
}

export interface OpenIssuesCount3 {
  type: string
}

export interface License3 {}

export interface AllowForking3 {
  type: string
}

export interface IsTemplate3 {
  type: string
}

export interface WebCommitSignoffRequired3 {
  type: string
}

export interface HasPullRequests3 {
  type: string
}

export interface PullRequestCreationPolicy3 {
  type: string
}

export interface Topics3 {
  type: string
  items: Items8
}

export interface Items8 {}

export interface Visibility3 {
  type: string
}

export interface Forks3 {
  type: string
}

export interface OpenIssues3 {
  type: string
}

export interface Watchers3 {
  type: string
}

export interface DefaultBranch3 {
  type: string
}

export interface Type6 {
  type: string
}

export interface UserViewType6 {
  type: string
}

export interface SiteAdmin6 {
  type: string
}

export interface Name5 {
  type: string
}

export interface Company {
  type: string
}

export interface Blog {
  type: string
}

export interface Location {
  type: string
}

export interface Email {}

export interface Hireable {}

export interface Bio {
  type: string
}

export interface TwitterUsername {}

export interface PublicRepos {
  type: string
}

export interface PublicGists {
  type: string
}

export interface Followers {
  type: string
}

export interface Following {
  type: string
}

export interface CreatedAt4 {
  type: string
}

export interface UpdatedAt4 {
  type: string
}
