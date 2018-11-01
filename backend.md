# Notations:
# quoted by "[]" means optional

# MetaBook Json Example:
{
  "isbn": 636920051626,
  "title": "Learning Web Design, 5th Edition",
  "cover": "https://covers.oreillystatic.com/images/0636920051626/cat.gif",
  "subtitle": "A Beginner' 's Guide to HTML, CSS, JavaScript, and Web Graphics",
  "author": "Jennifer Robbins",
  "price": 49.8
  "publisher": "O' 'Reilly Media",
  "publishYear": 2018,
  "keyword": "Web Developement",
  "pages": 808,
  "descHtml": "<p>Do you want to build web pages but have no prior experience?</p> ..."
}

# Book Json Example:
{
  "barcode": 127237769175500,
  "isbn": 9787520705806,
  "location": "A332-E-3",
  "available": true,
  "deleted": false,
  "add_time": "2018-10-30T02:59:42.288+0000"
}

# Account Json Example:
{
  "username": "Peggy",
  "nickname": "Nickname",
  "email": "mail@mail.cn",
  "address": "Xidain University, Student Dormitory #11",
  "slogan": "Reading helps"
}

# Borrow Json Example:
{
  "id": 1,
  "barcode": 10001,
  "fine": 9,
  "librarian_id": "lib",
  "reader_id": "rad",
  "borrow_time": 1537495200000,
  "return_time": null,
  "fine_update_date": 1540828800000
}

###

# Login
POST http://localhost:80/login
Content-Type: application/x-www-form-urlencoded
Accept: application/json

username=<username>&password=<password>

Response Status:
1. OK 200, login success
2. UNAUTHORIZED 401, not registered

###

# Logout
POST http://localhost:80/logout

###

POST http://localhost:80/change_password
Content-Type: application/x-www-form-urlencoded

old_password=1234&new_password=1234

Response:
1. OK
1. FORBIDDEN, old_password incorrect

###

# Check has book meta info(isbn, title, subtitle, desc etc.)
GET http://localhost:80/has_meta_book?isbn=123456

Response Status:
1. OK 200, has book meta info
2. NOT_FOUND 404, no book meta info

###

# Put a book into db
# Using `GET http://localhost:80/has_meta_book` to check before the PUT request,
# otherwise an empty colletion may be returned if no corresponding meta book info in db
PUT http://localhost:80/add_book
Content-Type: application/x-www-form-urlencoded
Accept: application/json

isbn=99&location=A213-D-3[&count=2][&title=xx&subtitle=xx(some other book meta info)etc.]

###

# Get meta book info
GET http://localhost:80/get_meta_book?isbn=123456

Response Status:
1. OK 200, meta_book json
2. NOT_FOUND 404

###

# Get book
GET http://localhost:80/get_book?barcode=123456

Response Status:
1. OK 200, book json
2. NOT_FOUND 404

###

# Get books having the given ISBN
GET http://localhost:80/get_books?isbn=123456

Response Status:
1. OK 200, array of books, may be empty

###

# Update book
POST http://localhost:80/update_book
Content-Type: application/json

{}

###

# Update meta book
POST http://localhost:80/update_meta_book
Content-Type: application/json

{}

###

# Delete book
DELETE http://localhost:80/remove_book?barcode=<barcode>

Response Status:
1. OK 200, deleted
2. BAD_REQUEST 400, delete fail, almost just not exist

###

# Borrow a book
POST http://localhost:80/borrow
Content-Type: application/x-www-form-urlencoded
Accept: application/json

reader=reader_username&barcode=barcode

Reponse status:
Nonsence expect status code

###

GET http://localhost:80/borrows[?reader_id=xx]
Accept: application/json

###

# Return book
POST http://localhost:80/return_book
Content-Type: application/x-www-form-urlencoded

borrow_id=99

Response status:
1. PAYMENT_REQUIRED, fine to pay
2. NOT_FOUND, no borrow record
3. OK

###

# Get fine of a specific borrow
GET http://localhost:80/fine?borrow_id=99
Accept: application/json

<array of borrows>

###

# Get fines
GET http://localhost:80/fines?[reader_id=xx][&unpaid_only=true(default)/false]
Accept: application/json

[
  {
    "id": 1,
    "barcode": 10001,
    "fine": 9,
    "librarian_id": "lib",
    "reader_id": "rad",
    "borrow_time": 1537495200000,
    "return_time": null,
    "fine_update_date": 1540828800000
  },
  {
    "id": 2,
    "barcode": 10002,
    "fine": 9,
    "librarian_id": "lib",
    "reader_id": "rad",
    "borrow_time": 1537495200000,
    "return_time": null,
    "fine_update_date": 1540828800000
  }
]

###

# Pay fine
POST http://localhost:80/pay_fine
Content-Type: application/x-www-form-urlencoded

borrow_id=99

Response status:
1. BAD_REQUEST, fine not exist or have been paid
2. OK

###

# Search book
GET http://localhost:80/search?param=<param>

Response:
1. OK 200, meta book list

### As an admin

# Get/Search librarians
GET http://localhost:80/librarians[?query=peggy]
Accept: application/json

Response Status
1. OK 200, array of account
2. 4xx/5xx

###

# Add Librarian
POST http://localhost:80/add_librarian
Content-Type: application/x-www-form-urlencoded
Accept: application/json

username=xx&password=xx&email=xx[&nickname=xx][&slogan=xx][&address=xx]

Response Status:
1. OK 200, registered account
2. CONFLICT 409, username already exsits
3. BadRequest 400

###

# Reset librarian password
POST http://localhost:80/reset_librarian_password
Accept: application/json

username=xx&new_password=xx

Response Status:
1. OK 200, array of account
2. 4xx/5xx

###

# Update librarian info
POST http://localhost:80/update_librarian
Content-Type: application/x-www-form-urlencoded
Accept: application/json

[email=xx][&address=xx][&nickname=xx][&slogan=xx]

Response Status:
1. OK 200, account
2. 4xx/5xx

### As an librarian (following 3 apis' specifications are same as admins')
# Add Librarian
POST http://localhost:80/add_reader

###
# Get/Search readers
GET http://localhost:80/readers[?query=peggy]

###
# Reset reader password
POST http://localhost:80/reset_reader_password

###
# Update reader info
POST http://localhost:80/update_reader

###

# Get brief income
GET http://localhost:80/brief_income
Accept: application/json

{
  "fine": 18,
  "deposit": 300
}

###

# Get income info with time period [start, end], start&end should be formatted as `%4d-%02d-%02d`
GET http://localhost:80/income?start=2018-10-01&end=2018-10-30
Accept: application/json

[
  {
    "this_day": "2018-10-29",
    "fine_amount": 18,
    "deposit_amount": 300,
    "incomes": [
      {
        "id": 1,
        "amount": 9,
        "type": 1,
        "time": "2018-10-29T11:12:12.000+0000",
        "reader_id": "rad",
        "librarian_id": "lib",
        "borrow_id": 10001
      },
      {
        "id": 2,
        "amount": 9,
        "type": 1,
        "time": "2018-10-29T11:12:12.000+0000",
        "reader_id": "rad",
        "librarian_id": "lib",
        "borrow_id": 10002
      },
      {
        "id": 3,
        "amount": 300,
        "type": 2,
        "time": "2018-10-29T11:12:12.000+0000",
        "reader_id": "rad",
        "librarian_id": "lib",
        "borrow_id": -1
      }
    ]
  }
]

###

