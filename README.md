# BookStore
With Google Books API

## Type a title in title to find your book 
Recommended full title
## Select book language (Polish / English)
Default: english

### Set application:
/src/components/Home.jsx ->
Set for google API Key from Console Cloud Google

line 20: `const YOUR_API_KEY = 'insert your api key'`

line 23: `axios.get(`https://www.googleapis.com/books/v1/volumes?q=${intitle}&key=${YOUR_API_KEY}`)`

### Stack: React, React-Redux, Axios
