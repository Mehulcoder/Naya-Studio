
  
  

# Naya Studio

A sign-up experience for designers and makers, where they are asked several questions and the required data is stored in a Database.

The frontend of the website is designed using Bootstrap 4 to make it fully responsive. And the backend is based on Nodejs, Express, MongoDB.

  

## Getting Started

  
  

### Prerequisites

  

You should have the following installed on your local machine:

  

```

NodeJs

npm

MongoDB

Terminal

POSTMAN

Web Browser

```

Below are the download links for the same:

*  [NodeJs and npm](https://nodejs.org/en/download/)

*  [MongoDB](https://www.mongodb.com/download-center/community)

*  [POSTMAN](https://www.postman.com/downloads/)

  

Install them and then move to the next step.

  
  

### Installing

  

* Download and extract the repository.

* Start terminal and change working directory to the extracted repository.

* Make sure your current working directory contains the file named ```index.js```

* To install the required dependencies, inside the terminal, run command ```npm install```

  

## Running and Testing

* Using the terminal run command ```nodemon index.js``` or ```node index.js```

* Make sure that in the terminal you get the message:

	```Sever is on port 8000```
	

> Make sure, this port is not being used by other application.

* This ensures that the application is running properly.

<hr>

The application can be tested using POSTMAN or using a Web browser through which we can send requests.

  

### POSTMAN

* Setting up environment.

* Open POSTMAN application, name your collection as Naya-Studio. And click this button on the top left.

*![enter image description here](https://learning-services-media.brightcove.com/doc-assets/node/17919-use-postman-http-requests/node17919-create-new-request.png)

* Name the request as *Create Designer*.

* Now change the Request type from GET to POST

![enter image description here](https://i.imgur.com/cW47qww.png)

  

* Add two more POST request with names Create Maker and Create DesignMaker

![enter image description here](https://i.imgur.com/pxPrsng.png)

* We have 3 different POST routes in this application

* To create a Designer: ```localhost:3000/designer```

* To create a Maker: ```localhost:3000/maker```

* To create a DesignerMaker: ```localhost:3000/designerMaker```

* Add the urls accordingly and click save each time.![enter image description here](https://i.imgur.com/DFh1OcM.png)

* Now we are ready for adding data for our post requests. Click on the body tab and choose *form-data* from the radio buttons. The window should look like this:![enter image description here](https://i.imgur.com/tSYgq0C.png)
* Change type in *makerImage* key from *text* to *file*, The body for 3 of them should look like:![enter image description here](https://i.imgur.com/ETKl36e.png)

> To enter an array for 'materials' use index notation like shown above

*	The  keys for 3 of the Models are shown below, use them while passing data
	* Maker:

```

KEY   		:	VALUE
email"		:	randomemail@gmail.com

password	:	random99

capacity	:	5

materials[0]:	wood

location	:	Ajmer

imageLink	:	https://i.imgur.com/DFh1OcM.png

makerImage	:	*Choose file*

```

* Designer:

```
KEY		:	VALUE

email	:	randomemail@gmail.com

password:	random99

capacity:	5

category:	interior designer

training:	String

imageLink:	https://i.imgur.com/DFh1OcM.png

designerImage:	*Choose file*

```

* DesignerMaker:

```
KEY			:	VALUE

email		:	randomemail@gmail.com

password	:	randonjacb

makerCapacity:	9

designerCapacity:3.5

category	:	designer maker

material[0]	:	wood

training	:	design

location	:	Ajmer

imageLink	:	https://i.imgur.com/DFh1OcM.png

designerMakerImage:	*Choose file*
```

* Click Save and then Send, to send the request.

* You can now see the request status, to check whether it is a success or failure.

* On a success code, the User has been added to your database. You can check the ```nayaStudio``` collection in MongoDB using [terminal](https://docs.mongodb.com/manual/reference/mongo-shell/) or using [Robo3t](https://robomongo.org/) GUI (Screenshot shared below). You can see that passwords are secured by hashing.

![Robo3t snapshot](https://i.imgur.com/ljnsFqZ.png)

* In case of wrong input (we'll discuss the allowed inputs very soon) you'll get an error message in the POSTMAN. Example:

![enter image description here](https://i.imgur.com/kO3d2hh.png)

* This is all about POSTMAN. For any queries feel free to Email me at ```mehul170104047@iitg.ac.in```

### BROWSER

* Well, this one is quite easy. Open Google Chrome or any other Browser (preferably latest).

* In the address bar type: ```localhost:8000``` and press enter.

* There you go, you can now choose from the options available on the screen accordingly which will redirect you to the correct form for you.

> I will try to add Bootstrap Validations to the form for a better UI, if I get a chance.

* I have added a really nice feature which displays a **flash message** on successful submission of the form.

  

## Validations in mongoose

  

I have added the following validations for 3 of the following models:

### Maker model

*  **email** should be of valid format. And make sure that it not already used. It is a required field

* Length of **password** should be between 6-1000. It should not contain the term "*password*", in any form. It is a required field

*  **capacity** must be an *integer* greater than or equal to 1. It is a required field

*  **materials** should be an array of String elements. And should contain items only from:```['wood','metal','plastic','glass','concrete','other']```.It is a required field

*  **imageLink** should be a URL in correct format.

* **BONUS**: I've added the upload image from local machine feature, 				which will let you choose an image file of **jpeg, png, jpg** format, with size less than **6 MB**. The image will be uploaded on the server inside the uploads folder.
The model will store the path of the image uploaded by that user.

> I'll try to further improve the upload image feature in the upcoming versions, if I get to work on this project.

  

### Designer model

Common fields have same validations. Different ones are discussed below:

  

*  **category** of designer should be a String element. And should be only from from:```['furniture designer','architect','interior designer','industrial designer','designer maker','other']```.It is a required field

* No need to worry about the lowercase/uppercase, I've made sure that input changes to lowercase before validation and getting saved. It is a required field. I've also made sure that the end spaces get trimmed.

*  **capacity** of designer should be a number greater than zero (yes, we accept decimals too). It is a required field
* **BONUS**: I've added the upload image from local machine feature, 				which will let you choose an image file of **jpeg, png, jpg** format, with size less than **6 MB**. The image will be uploaded on the server inside the uploads folder.
The model will store the path of the image uploaded by that user.

> I'll try to further improve the upload image feature in the upcoming versions, if I get to work on this project.

  

### designerMaker model

  

The validations of above two models are used in it.

  
  

## Built With

  

* NodeJs

* Express

* MongoDb

* npm dependencies used:

	* "bcryptjs": "^2.4.3" : To hash the password.

  

	* "body-parser": "^1.19.0" : Parsing the JSON body.

	  

	* "connect-flash": "^0.1.1": Displaying flash message on success.

	  

	* "cookie-parser": "^1.4.5",

	  

	* "ejs": "^3.0.2": For rendering.

	  

	* "express": "^4.17.1": Framework.

	  

	* "express-session": "^1.17.0",

	  

	* "mongoose": "^5.9.7": ODM library for MongoDB and nodeJS.

	  

	* "multer": "^1.4.2" : To upload images

	  

	* "path": "^0.12.7"

	  

	* "validator": "^13.0.0": For some super cool validations

  

## Authors

  

*  **[Mehul Chaturvedi](https://github.com/Mehulcoder)**

  
  

## Acknowledgments

  

This task served as a really intresting and fun project for me. Building everything from scratch, going through errors,looking for solutions, solving them, implementing new ideas helped me learn a lot of cool stuff.

Also, I tried to make this README as detailed as possible. If you have any queries you can E-mail me at ```mehul170104047@iitg.ac.in``` or ```mehul355180@gmail.com```.