// method to submit the form data for new post using ajax
{
  let createPost = () => {

    let newPostForm = $('#new-post-form')

    newPostForm.submit((e) => {
      e.preventDefault();

      $.ajax({
        type: 'post',
        url: 'posts/create',
        data: newPostForm.serialize(),
        success: (data) => {
          let newPost = newPostDom(data.data.post)
          $('#posts-lists>ul').prepend(newPost)
          deletePost($('.delete-post-btn', newPost));

          // call the create comment class
          new PostComments(data.data.post._id);

          new Noty({
            theme: 'relax',
            text: "Post published!",
            type: 'success',
            layout: 'topRight',
            timeout: 1000

          }).show();
        }, error: (error) => {
          console.log(error.responseText);
          return;
        }

      });
    });
  }

  // method to create a post in DOM

  let newPostDom = (post) => {
    return $(`<li id="post-${post._id}">
    <p>
      
      <small>
        <a class="delete-post-btn"  href="/posts/destroy/${post._id}"> X </a>
      </small>
      ${post.content}
      <br />
      <small> ${post.user.name} </small>
    </p>
    <div class="post-comments">
      
    <form id="post-${post._id}-comments-form" action="/comments/create" method="POST">

        <input
          type="text"
          name="content"
          placeholder="Type Here to add comment...."
          required
        />
        <input type="hidden" name="post" value="${post._id}" />
        <input type="submit" value="Add Comment" />
      </form>
  
      <div class="post-comments-list">
        <ul id="post-comments-${post._id}">
          
        </ul>
      </div>
    </div>
  </li>
  `);
  }

  // method to delete the post from DOM
  let deletePost = (deleteLink) => {
    $(deleteLink).click((e) => {
      e.preventDefault();

      $.ajax({
        type: 'get',
        url: $(deleteLink).prop('href'),
        success: (data) => {
          $(`#post-${data.data.post_id}`).remove();

          new Noty({
            theme: 'relax',
            text: "Post Deleted",
            type: 'success',
            layout: 'topRight',
            timeout: 1000

          }).show();
        }, error: (err) => {
          console.log(err.responseText);
          return;
        }
      });

    });
  }

      // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
      let convertPostsToAjax = ()=>{
        $('#posts-lists>ul>li').each(()=>{
            let self = $(this);
            let deleteButton = $(' .delete-post-btn', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            // let postId = self.prop('id').split("-")[1]
            // new PostComments(postId);
        });
    }

  createPost();
  convertPostsToAjax();
}

