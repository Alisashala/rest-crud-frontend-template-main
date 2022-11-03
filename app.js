// ====== REST SERVICE ("model") ====== //
const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";
const serverUrl = "API_URL_HERE";
const endpoint = isLocalhost ? "http://localhost:3000" : serverUrl;

// === READ (GET) === //
// get all posts
function getPosts() {
    fetch("http://localhost:3000/posts/")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            appendPosts(data);
        });

}

function appendPosts(postLists) {
    console.log(postLists);
    let html = "";

    for(let index = 0; index < postLists.length; index++) {
        const post = postLists[index];

        html +=`
           
            <article>
                <img src="${post.image}">
                <h2>${post.title}</h2> 
                <p>${post.body}</p>
                <div class="btns">
                    <button class="btn-delete-user" onclick="deletePost('${post.id}')">Delete</button>
                </div>
            </article>
            
            `;
    }
    console.log(html);
    document.querySelector("#posts-grid").innerHTML = html;
}
function deletePost (id) {
    fetch(endpoint + "/posts/" + id, {method: "DELETE"}).then(function (){
        getPosts();
    })
    };

function createPosts (event) {
    event.preventDefault();
    console.log("Create button clicked");

    const post = {
        title: event.target.title.value,
        body: event.target.body.value,
        image: event.target.url.value,
    };
    console.log(post);

    fetch(endpoint + "/posts", {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function () {
        getPosts();
    });
}

// ====== REST SERVICE END ====== //

// ====== EVENTS ====== ("controller+view") //


// ========= EVENTS END ====== //

// === INITIALIZE APP === //

async function initApp() {
    const posts = await getPosts();
    console.log(posts);
}

initApp();

getPosts();
// ====== INITIALIZE APP END ====== //
