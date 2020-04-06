
# Naya Studio
A sign-up experience for designers and makers, where they are asked several question and the data is stored in a Database.
The frontend of the website is designed 

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
* [NodeJs and npm](https://nodejs.org/en/download/)
* [MongoDB](https://www.mongodb.com/download-center/community)
* [POSTMAN](https://www.postman.com/downloads/)


### Installing

* Download and extract repo
* Start terminal and change working directory to the extracted repo.
* Make sure your current working directory contains the file named ```index.js```
* To install the required dependencies, inside the terminal, run command ```npm install```

## Running and Testing
* Using the terminal run command ```nodemon index.js```
* Make sure that in the terminal	 you get the message:
	 ```Sever is on port 3000```
* This ensures that the application is running properly.
<hr>
The application can be tested using POSTMAN or using a Web browser through which we can send requests.

### POSTMAN
* Setting up environment.
	* Open POSTMAN application, name your collection as Naya-Studio. And click this button on the top left.
	*![enter image description here](https://learning-services-media.brightcove.com/doc-assets/node/17919-use-postman-http-requests/node17919-create-new-request.png)
	*  Name the request as create Designer.
	* Now change the Request type from GET to POST
	![enter image description here](https://learning-services-media.brightcove.com/doc-assets/node/17919-use-postman-http-requests/node17919-select-request-type.png)
	* Add two more POST request with names Create Maker and Create DesignMaker
	![enter image description here](https://i.imgur.com/pxPrsng.png)
* We have 3 different POST routes in this application
	* To create a Designer: ```localhost:3000/designer```
	* To create a Maker: ```localhost:3000/maker```
	* To create a DesignerMaker: ```localhost:3000/designerMaker```
* Add the urls accordingly and click save each time.![enter image description here](https://i.imgur.com/DFh1OcM.png)
* Now we are ready for adding JSON data for our post requests using the body tab, also switch text to JSON and choose raw from the radio buttons. The window should look like this:![enter image description here](https://i.imgur.com/nKav8S4.png)
* The body for 3 of them should look like:
	* Maker:
	```
	{
	"email":"randomemail@gmail.com",
	"password":"random99",
	"capacity":5,
	"materials":["wood","metal"],
	"location":"Ajmer",
	"imageLink":"https://i.imgur.com/DFh1OcM.png"
	}
	```
	* Designer:
	```
	{
	"email":"randomemail@gmail.com",
	"password":"random99",
	"capacity":5,
	"category":"interior designer",
	"training":"String",
	"imageLink":"https://i.imgur.com/DFh1OcM.png"
	}
	```
	* DesignerMaker:
	```
	{
	"email":"randomemail@gmail.com",
	"password":"randonjacb",
	"makerCapacity":"9",
	"designerCapacity":"3.5",
	"category":"designer maker",
	"material":["wood"],
	"training":"design",
	"location":"Ajmer",
	"imageLink":"https://i.imgur.com/DFh1OcM.png"
	}
	```
* Click save and then send to send the request.
* You can now see the request status, to check whether it is a success or failure.
*  
	


## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc