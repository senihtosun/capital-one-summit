// Function will run everytime page refreshes
// Sports category is the default to display
$(document).ready(function() {
  retrieveNews('sports')
})

// Sports function
function sports(){
  retrieveNews('sports')
}

// Technology function
function tech(){
  retrieveNews('technology')
}

// Entertainment function
function entertainment(){
  retrieveNews('entertainment')
}


// Main Function to fetch and append the news to html div
function retrieveNews(category){
  const apiKey = 'put_your_api_key_here'

  // Url to fetch the data by providing a category and the API Key
  let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=30&apiKey=${apiKey}`

  // Output variable to append all the news
  let output = ""

  // Request the url first
  const request = new Request(url)
  
  // Fetch the request
  fetch(request).then(response => response.json())
    .then((news) => {

      // For loop to go through each article one by one
      // to be able to access title, author, imageUrl etc.
      for (let i in news.articles){

        // Turn the date string into a meaningful string
        let date = new Date(news.articles[i].publishedAt)
        let publishDate = date.toDateString()

        // Concatenate everyting to the output variable
        // All the styling is done by materialize css cards
        // If the source doesn't have an image display a default alt.jpg
        output += `
        <div class="col l4 m6 s12">
        <div class="card medium hoverable">
          <div class="card-image">                         
            <a href="${news.articles[i].url}" target="_blank"><img src="${news.articles[i].urlToImage}" alt="" onerror="this.src='static/alt.jpg'"></a>
          </div>
          <div class="card-content">
            <h6 class="truncate"><a href="${news.articles[i].url}" target='_blank' title="${news.articles[i].title}">${news.articles[i].title}</a></h6>
            <p><b>Author</b>: ${news.articles[i].author}</p>
            <p><b>Source</b>: ${news.articles[i].source.name}</p>
            <p><b>Published</b>: ${publishDate} </p>
          </div>

          <div class="card-reveal">
            <span class="card-title"><i class="material-icons right">close</i></span>
            <p><b>Description</b>: ${news.articles[i].description}</p>
          </div>

          </div>
        </div>
        `   
      }

      // If the output variable is not empty display it
      if (output !== ""){
          $('#newsList').html(output)
      }
      
      })
  
  // Catch and print to console if there are any errors while fetching
  .catch(error => {
      console.log(error)
  })
}

