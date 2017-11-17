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
    text: () => `<p class="text-title">` + post.title + `</p>`,

    image: () => 
    (
      `<div key={imagePath}>
        <img class="preview" src="` + imagePath + `"/>
      </div>`
    ),
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