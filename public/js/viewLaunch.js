const $ = (sel) => document.querySelector(sel);
const savedBtn = $('.toSavedBtn') ? $('.toSavedBtn') : $('.removeSavedBtn');

const savedBtnHandler = async () => {
    savedBtn.classList.contains('toSavedBtn') ? await savedAddHandler() : await savedRemoveHandler();
}

//Add the post to the dashboard
const savedAddHandler = async () => {
    const launch_id = document.location.pathname.split('/').at(-1);
    const response = await fetch(`/api/users/save/${launch_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        alert('Launch added to saved');
        document.location.reload();
    } else alert('Failed to add to saved'); 
}

// Remove saved button
const savedRemoveHandler = async () => {
    const launch_id = document.location.pathname.split('/').at(-1);
    const response = await fetch(`/api/users/remove/${launch_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        alert('Launch removed from saved');
        document.location.reload();
    } else alert('Failed to remove from saved');
}

const commentHandler = async (event) => {
    //Prevent any default action from happening 
    event.preventDefault();
    //Get the value of the text and title of blog post
    const comment_text = $('#commentText').value.trim();
    //Giving us access to the URL.
    const launch_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1]
    //Send fetch request to add a new post 
    const createResponse = await fetch('/api/comments', {
        //Read from POST method 
        method: 'POST',
        //Convert data recieve to a string and display it on the page
        body: JSON.stringify({ comment_text, launch_id }),
        //Indicate the request body format is json
        headers: { 'Content-Type': 'application/json' }
    });
    //If the post is added, then the template will be re-rendered 
    createResponse.ok ? document.location.reload() : alert('Failed to add comment');
};

//Grab the selector for button and call the function 
$('#postComment').addEventListener('click', commentHandler);
//Grab the selector for saved and call the function 
savedBtn.addEventListener('click', savedBtnHandler);

