
export async function getUserData(name: string) {
    const user = await (await fetch(`https://api.github.com/users/${name}`)).json()
    const followersData = await fetch(user.followers_url)
    const followers = await followersData.json()
    user.followers_url = Array.isArray(followers) ? followers : []
    const followingData = await fetch(user.following_url.replace("{/other_user}", ""))
    const following = await followingData.json()
    user.following_list = Array.isArray(following) ? following : []
    const starredUrl = `https://api.github.com/users/${name}/starred`
    const starredData = await fetch(starredUrl)
    const starred = await starredData.json()
    const starredList = Array.isArray(starred) ? starred : []
    user.starred = starredList
    user.starred_url = starredList
    const suscriptionsUrl = `https://api.github.com/users/${name}/subscriptions`
    const suscriptionsData = await fetch(suscriptionsUrl)
    const suscriptions = await suscriptionsData.json()
    user.suscriptions = suscriptions
    const reposUrl = `https://api.github.com/users/${name}/repos`
    const reposData = await fetch(reposUrl)
    const repos = await reposData.json()
    const sortedRepos = Array.isArray(repos)
        ? repos.sort((a, b) => {
            const starsDiff = (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0)
            if (starsDiff !== 0) {
                return starsDiff
            }

            const bDate = new Date(b.pushed_at ?? b.updated_at ?? b.created_at ?? 0).getTime()
            const aDate = new Date(a.pushed_at ?? a.updated_at ?? a.created_at ?? 0).getTime()
            return bDate - aDate
        })
        : []
    user.repos = sortedRepos
    user.repos_url = sortedRepos


    return user
}