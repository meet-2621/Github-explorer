async function searchUser() {
    const username = document.getElementById('username').value;
    const profileDiv = document.getElementById('profile');
    const reposDiv = document.getElementById('repos');

    profileDiv.innerHTML = '';
    reposDiv.innerHTML = '';

    if (!username) return alert('Please enter a username');

    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (!userRes.ok) {
        profileDiv.innerHTML = '<p>User not found</p>';
        return;
    }
    const userData = await userRes.json();
    profileDiv.innerHTML = `
        <h2>${userData.name} (${userData.login})</h2>
        <img src="${userData.avatar_url}" width="100" alt="Avatar">
        <p>${userData.bio || ''}</p>
        <p>Location: ${userData.location || 'N/A'}</p>
        <p>Followers: ${userData.followers}</p>
    `;

    const reposRes = await fetch(userData.repos_url);
    const reposData = await reposRes.json();
    reposDiv.innerHTML = '<h3>Repositories:</h3>';
    reposData.forEach(repo => {
        reposDiv.innerHTML += `
            <div class="repo">
    <a href="${repo.html_url}" target="_blank"><strong>${repo.name}</strong></a>
 <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count} | 
 🧠 ${repo.language || 'N/A'}</p>
</div>`; });}
