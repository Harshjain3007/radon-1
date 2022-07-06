# Books-Management
Key points
Create a group database groupXDatabase. You can clean the db you previously used and resue that.
This time each group should have a single git branch. Coordinate amongst yourselves by ensuring every next person pulls the code last pushed by a team mate. You branch will be checked as part of the demo. Branch name should follow the naming convention project/booksManagementGroupX
Follow the naming conventions exactly as instructed.
Models
User Model
{ 
  title: {string, mandatory, enum[Mr, Mrs, Miss]},
  name: {string, mandatory},
  phone: {string, mandatory, unique},
  email: {string, mandatory, valid email, unique}, 
  password: {string, mandatory, minLen 8, maxLen 15},
  address: {
    street: {string},
    city: {string},
    pincode: {string}
  },
  createdAt: {timestamp},
  updatedAt: {timestamp}
}
Books Model
{ 
  title: {string, mandatory, unique},
  excerpt: {string, mandatory}, 
  userId: {ObjectId, mandatory, refs to user model},
  ISBN: {string, mandatory, unique},
  category: {string, mandatory},
  subcategory: [string, mandatory],
  reviews: {number, default: 0, comment: Holds number of reviews of this book},
  deletedAt: {Date, when the document is deleted}, 
  isDeleted: {boolean, default: false},
  releasedAt: {Date, mandatory, format("YYYY-MM-DD")},
  createdAt: {timestamp},
  updatedAt: {timestamp},
}
Review Model (Books review)
{
  bookId: {ObjectId, mandatory, refs to book model},
  reviewedBy: {string, mandatory, default 'Guest', value: reviewer's name},
  reviewedAt: {Date, mandatory},
  rating: {number, min 1, max 5, mandatory},
  review: {string, optional}
  isDeleted: {boolean, default: false},
}
User APIs
POST /register
Create a user - atleast 5 users
Create a user document from request body.
Return HTTP status 201 on a succesful user creation. Also return the user document. The response should be a JSON object like this
Return HTTP status 400 if no params or invalid params received in request body. The response should be a JSON object like this
POST /login
Allow an user to login with their email and password.
On a successful login attempt return a JWT token contatining the userId, exp, iat. The response should be a JSON object like this
If the credentials are incorrect return a suitable error message with a valid HTTP status code. The response should be a JSON object like this
Books API
POST /books
Create a book document from request body. Get userId in request body only.
Make sure the userId is a valid userId by checking the user exist in the users collection.
Return HTTP status 201 on a succesful book creation. Also return the book document. The response should be a JSON object like this
Create atleast 10 books for each user
Return HTTP status 400 for an invalid request with a response body like this
GET /books
Returns all books in the collection that aren't deleted. Return only book _id, title, excerpt, userId, category, releasedAt, reviews field. Response example here
Return the HTTP status 200 if any documents are found. The response structure should be like this
If no documents are found then return an HTTP status 404 with a response like this
Filter books list by applying filters. Query param can have any combination of below filters.
By userId
By category
By subcategory example of a query url: books?filtername=filtervalue&f2=fv2
Return all books sorted by book name in Alphabatical order
GET /books/:bookId
Returns a book with complete details including reviews. Reviews array would be in the form of Array. Response example here
Return the HTTP status 200 if any documents are found. The response structure should be like this
If the book has no reviews then the response body should include book detail as shown here and an empty array for reviewsData.
If no documents are found then return an HTTP status 404 with a response like this
PUT /books/:bookId