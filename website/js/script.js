function fillBlogEntries(username)
{
    steem.api.getDiscussionsByBlog({tag: username, limit: 20}, function(err, blog) 
        {
          console.log(blog);
            var blogContainer = $('#blog');
            for (var i = 0; i < blog.length; i++) 
            {
                blogContainer.append('<div><a target="_blank" href="https://steemit.com' + 
                    blog[i].url + '">'+ blog[i].created + ' ' + blog[i].title  + '</div></a>');
            }
        });
}

function generatePreview(article, post)
{
  const jsonMetadata = JSON.parse(post.json_metadata);
  let imagePath = '';

  if (jsonMetadata.image && jsonMetadata.image[0])
  {
    imagePath = getProxyImageURL(jsonMetadata.image[0], 'preview');
  }
  else
  {
    const bodyImg = post.body.match(image());
    if (bodyImg && bodyImg.length)
    {
      imagePath = getProxyImageURL(bodyImg[0], 'preview');
    }
  }

  const preview =
  {
    text: () => ` <div class="card-body">
                    <h4 class="card-title">
                      <a href="#">`+ post.title + `</a>
                    </h4>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos quisquam, error quod sed cumque, odio distinctio velit nostrum temporibus necessitatibus et facere atque iure perspiciatis mollitia recusandae vero vel quam!</p>
                  </div>`,

    image: () => `<img class="card-img-top" src="` + imagePath + `" alt="">`,
  };

   const bodyData = [];

     bodyData.push(preview.image());
     bodyData.push(preview.text());
  

  $(article).append(bodyData);
}

function storyPreview ( article, author, permlink )
{
    var test = steem.api.getContent(author, permlink, function(err, post)
    {
       var result = generatePreview(article, post);
    });

    return test;
}

fillBlogEntries('jefpatat');