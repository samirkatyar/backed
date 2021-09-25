Create a new .env file and copy all variables from example.env file into this file and make changes accordingly. 

start server : npm start

Create Demo User In DB for Login 

#Login 
http://localhost:3000/login/ POST

response : {
"status": "success",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRlZDYyNjdjN2VjYzJiNzRkYzE2ZTciLCJpYXQiOjE2MzI1NjE5NjR9.HlwkD41GjOb5RIxC4WMe3a8vKqnZFxW9klwMeVkCpG4"
}

#Create Category :
http://localhost:3000/category/ POST

BODY : {
"title": "title2",
"description": "description",
"status": "status"
}

HEADER : TOKEN

Response : {
"data": {
"_id": "614f05321ddf1e0620c58107",
"title": "title2",
"description": "description",
"status": "status",
"__v": 0
},
"message": "Category created successfully"
}


#List Category :
http://localhost:3000/category/ GET

HEADER : TOKEN

Response :

{
"data": [
{
"_id": "614ee072a0db3513c4921c51",
"title": "newtitle",
"description": "description",
"status": "status",
"__v": 0
}
],
"message": "Category fetch successfully"
}


#List By ParentId Category :
http://localhost:3000/category/:parentId GET

HEADER : TOKEN

Response :

{
"data": [
{
"_id": "614ee072a0db3513c4921c51",
"title": "newtitle",
"description": "description",
"status": "status",
"__v": 0
}
],
"message": "Category fetch successfully"
}

#Update Category :
http://localhost:3000/category/:parentId PUT

HEADER : TOKEN

Response :

{
"data": {
"_id": "614ee072a0db3513c4921c51",
"title": "newtitle",
"description": "description",
"status": "status",
"__v": 0
},
"message": "Category updated successfully"
}

#Delete Category :
http://localhost:3000/category/:parentId DELETE

HEADER : TOKEN

Response : {
"message": "Category deleted successfully"
}
