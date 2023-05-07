// Git Hub
let username = prompt("Enter the name you want to search about him")
let content = document.querySelector(".content")
let followers = document.querySelector(".followers")
let space = document.querySelector(".space")

async function getdata(){
    // Cheak Prompt is empty or not
    if(!username){
        // Condition Empty
        alert("Please Enter The Name")
    }
    else{
    // Fetch Main Information
    let data = await fetch (`https://api.github.com/users/${username}`)
    data = await data.json()
    console.log(data)
    // Display main Information
    content.innerHTML=`
<div class="content_details">
<div class="content_details_image">
            <img src="${data.avatar_url}" alt="">
</div>
<div class="content_details_username">
        <h2>
            ${data.name}
        </h2>
        <p>
            ${data.login}
        </p>
    </div>
</div>
<div class="content_info">
    <div class="content_item"><h3>Public Repositories</h3><p> ${data.public_repos}</p></div>
    <div class="content_item"><h3>Bio</h3><p> ${data.bio}</p></div>
    <div class="content_item"><h3>Location</h3><p> ${data.location}</p></div>
    <div class="content_item"> <h4> <a href="${data.html_url}">Profile Link</a></h4></div>
</div>
    
    `

    // Fetch Following
    let followersfetch = await fetch (`${data.followers_url}`)
    followersfetch     = await followersfetch.json()
    if(followersfetch == 0){
        followers.style.display = "none";
        space.style.display = "none";
    }
    else{
    console.log(followersfetch)
    let followersarr = [];
    for(let i = 0 ; i<followersfetch.length; i++){
        console.log(followersfetch[i])
        followersarr += `
        
        
        <div class="followers_details">
        <div class="followers_items">
            <div class="followers_image">
                <img src="${followersfetch[i].avatar_url}" alt="">
            </div>
            <div class="followers_content_details">
                <div class="main_info">
                    <h2>${followersfetch[i].login}</h2>
                </div>
                <div class="more_info">
                    <h4> <a href="${followersfetch[i].html_url}">Profile Link</a></h4>
                </div>
            </div>
        </div>
    </div>
        
        `

        followers.innerHTML = followersarr
    }
    }


    }
}
getdata()
