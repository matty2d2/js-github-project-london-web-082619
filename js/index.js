document.addEventListener('DOMContentLoaded', ()=>{
    // const userSearchURL = 'https://api.github.com/search/users?q=octocat';
    const form = document.getElementById('github-form');
    
    function userReposURL(name){
        return `https://api.github.com/users/${name}/repos`
    }

    function userSearchURL(name){
        return `https://api.github.com/search/users?q=${name}`;
    }

    form.addEventListener('submit', searchGithub);

    function searchGithub(e){
        e.preventDefault();
        const name = e.target[0].value;
        getUsers(name)
            .then(json => {displayUsers(json.items)});
        
        e.target.reset();
    }

    function getUsers(name){
        return fetch(userSearchURL(name), {headers: {Accept: "application/vnd.github.v3+json"}})
            .then(resp => resp.json())
    }

    function getUserRepos(name){
        return fetch(userReposURL(name), {headers: {Accept: "application/vnd.github.v3+json"}})
            .then(resp => resp.json())
    }
    
    function displayUsers(array){
        const userList = document.getElementById('user-list');
        deleteList(userList);
        array.forEach(user => displayUser(user))
    }

    function displayUser(user){
        const userList = document.getElementById('user-list');
        const userItem = document.createElement('li');
        const userName = document.createElement('h2');
        const userAvatar = document.createElement('img');
        const userLink = document.createElement('a');
        const lineBreak = document.createElement('br');

        userList.appendChild(userItem);
        userItem.append(userName, userAvatar, lineBreak, userLink);

        userName.innerText = user.login;
        userAvatar.src = user.avatar_url;
        userLink.href = user.html_url;
        userLink.innerText = 'Go to Profile...';

        userItem.addEventListener('click', showRepo);
    }

    function showRepo(e){
        const name = this.firstChild.innerText;
        getUserRepos(name)
            .then(console.log)
    }

    function deleteList(userList){
        while (userList.children.length != 0){
            userList.removeChild(userList.firstChild);
        }
    }

})



