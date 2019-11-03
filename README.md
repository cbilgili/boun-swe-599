# Bogazici University SWE-599

The project is to develop a web based tool to allow its user model their requirements, mark the ones that are mandatory or implemented, keep track of the themes and teams, and help analysing the model to find the optimal releases. The model is transformed to SMT-LİB v2 clauses and an external solver will be used. The main tasks are to build the user interface, server-client architecture, and the model transformation.

[![CircleCI](https://circleci.com/gh/altugcagri/boun-swe-599.svg?style=svg)](https://circleci.com/gh/altugcagri/boun-swe-599)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=altugcagri_boun-swe-599&metric=alert_status)](https://sonarcloud.io/dashboard?id=altugcagri_boun-swe-599)


# MMSR
                                      Boğaziçi University Software Engineering Department

                                                SWE 599 - Project 2019/Fall
                                    
                                  
## Installation

In order to install and run the backend project [Java](https://www.java.com) Jdk v11+, [Gradle](https://gradle.org/) and [Postgresql database](https://www.postgresql.org/)  must be installed.

**Note that:** Postgresql database is not mandatory. Any other database can be used. However database driver dependencies must be added to build.gradle file and database configurations must be added to application.properties file.

Database configuration explained below.

In order to install and run the frontend project [Node](https://nodejs.org/en/) must be istalled

Set JAVA_HOME like "C:\Program Files\Java\jdk-11.0.2", "bin" folder is not required. Otherwise gradle tasks can fail.

In order to run the projects on docker environment [Docker](https://docs.docker.com/) must be installed.

After installation  of Java, Gradle and Docker, you can clone the project from the [repository](https://github.com/altugcagri/boun-swe-599.git) into your workspace.

## Build BackEnd

After cloning the project go to workspace and run the gradle command:

```sh
$ .\backend\gradle build
```

in order to run tests run the gradle command:

```sh
$ .\backend\gradle test
```

Builds the backend for production to the `backend/build/libs/`folder as `mmsr-0.0.1-SNAPSHOT.jar`.<br>

## Build FrontEnd

After cloning the project go to /frontend folder under the workspace and run the commands respectively;

```sh
$ npm install
```

Dowloads necessary packages and dependencies.

```sh
$ npm run build
```

Builds the app for production to the `/frontend/build/` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Database Configuration

In order to make database configurations for local environment, you should open `backend\src\main\resources\applicaion-db-dev.properties` file and change the parameters below. After making changes you should run the application with dev profile. Running with profiles is explaned under running the backend sections

```sh
spring.datasource.url= jdbc:postgresql://{DATABASE_URL}/{DATABASE_NAME}
spring.datasource.username= {USERNAME_NAME}
spring.datasource.password= {PASSWORD}
```

`{DATABASE_URL}` is the url of the database. it is mostly `localhost:5432` for the local environments

`{DATABASE_NAME}` is the name of the database that you created on database server for the appication. If you did not, first [create a database on the server](https://www.postgresql.org/docs/current/sql-createdatabase.html). 

`{USERNAME_NAME}` is the username of your database.

`{PASSWORD}` is the password of your database.

In order to se database configurations for prod environment, you should open `backend\src\main\resources\applicaion-db-prod.properties` file. You should not change anything in this file. The parameters defined below should be defined as environment varible on the server. You should run the application with prod profile. Running with profiles is explaned under running the backend sections

```sh
spring.datasource.url=${DATABASE_HOST}
spring.datasource.username=${DATABASE_USER_NAME}
spring.datasource.password=${DATABASE_PASS}
```

`${DATABASE_HOST}` is the datasource url of the database. it must be defined as environment varible on the server named `DATABASE_HOST`. It is constracted like `jdbc:postgresql://{DATABASE_URL}/{DATABASE_NAME}`. If you did not create database, first [create a database on the server](https://www.postgresql.org/docs/current/sql-createdatabase.html). 

`{DATABASE_USER_NAME}` is the username of your database. it must be defined as environment varible on the server named `DATABASE_USER_NAME`

`${DATABASE_PASS}` is the password of your database. it must be defined as environment varible on the server named `DATABASE_PASS`

Please see to create [environemnt variles](https://www.geeksforgeeks.org/environment-variables-in-linux-unix/) on the server.

If you like to use another database please [see](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-sql.html)

## Run BackEnd Without Docker

After building the project running the project requires the steps below;

### Development environment:

```sh
$ java -jar -Dspring.profiles.active=dev {Jar_File_Location}/mmsr-0.0.1-SNAPSHOT.jar
```

`{Jar_File_Location}` is the directory where you keep your jar file. Please change it according to your settings

It runs the backend project in dev profile. It means that application will read  `backend\src\main\resources\applicaion-db-dev.properties` file for connectting to the your development database (most probably local database). 

### Production environment:

```sh
$ nohup java -jar -Dspring.profiles.active=prod {Jar_File_Location}/mmsr-0.0.1-SNAPSHOT.jar &
```

`{Jar_File_Location}` is the directory where you keep your jar file. Please change it according to your settings

It runs the backend project in prod profile. It means that application will read  `backend\src\main\resources\applicaion-db-prod.properties` file for connectting to production database. 

Application writes the log to nohup.out file which is placed where the jar is located.

## Run FrontEnd Without Docker

After building the project running the project requires the steps below;

Go to web folder under the workspace

Since project requires mmsr-service, it is recomended to run backend first.

Before run the frontend application, please run the command below; 

```sh
$ npm install -g serve
```

It downloads and install necessery serving packages.

### Development Environment:

```sh
$ serve -s {Build_Directory_Location}/build
```

`{Build_Directory_Location}` is the directory where you keep your build directory. Please change it according to your settings

It runs the frontend project as development mode

### Production Environment:

```sh
$ nohup serve -s {Build_Directory_Location}/build &
```

`{Build_Directory_Location}` is the directory where you keep your build directory. Please change it according to your settings

It runs the frontend project as production mode


## Build and Run With Docker

**Note That:** Docker files is constructed for production mode. You cannot run docker files in your local environemt. You have to [set database environment](https://docs.docker.com/engine/reference/builder/#env) variables explained above before building image of backend and running containers.

Also Frontend will be served as a static web page content at Amazon web services s3 please find more [information](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html) 

### Build image 

BackEnd:

```sh
$ docker build -f Dockerfile --tag={ContainerName} .
```

### Run Container

BackEnd:

```sh
$ docker run -p 8080:8080 {ContainerName}
```

## System Architecture

MMSR-service will be served in cloud environment. AWS is choosen for the serving all frontend, backend and database. Backend service will be running as a docker container. These containers will be served in Elastic Container Service whic is a container managemenet system. This backend service will be easily auto scailale. 

Front end will be served iin Simple Storage Service which is simple a file bucket. This service has static web hosting property. By using this property frontend will be eaisly reached. 

Data base will be a postgresql service running on the RDS which is Aws database service.

This is just a simple and easy system to build. I lacks of security, elb, log monitoring and etc. However, our priority is the functionality of the system for now. 

You can find overview of architecture below;

![System-Architecture](https://github.com/altugcagri/boun-swe-599/blob/master/docs/images/mmsr-architecture.png)


### Reference Documentation
For further reference, please consider the following sections:

* [Official Gradle documentation](https://docs.gradle.org)
* [Spring Boot Gradle Plugin Reference Guide](https://docs.spring.io/spring-boot/docs/2.2.0.RELEASE/gradle-plugin/reference/html/)
* [Spring Data JPA](https://docs.spring.io/spring-boot/docs/2.2.0.RELEASE/reference/htmlsingle/#boot-features-jpa-and-spring-data)
* [Cloud Bootstrap](https://spring.io/projects/spring-cloud-commons)
* [Spring Web](https://docs.spring.io/spring-boot/docs/2.2.0.RELEASE/reference/htmlsingle/#boot-features-developing-web-applications)
* [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
* [React documentation](https://reactjs.org/)

### Guides
The following guides illustrate how to use some features concretely:

* [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)
* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
* [Building REST services with Spring](https://spring.io/guides/tutorials/bookmarks/)

### Additional Links
These additional references should also help you:

* [Gradle Build Scans – insights for your project's build](https://scans.gradle.com#gradle)
* [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
* [Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
* [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
* [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
* [Deployment of Frontend](https://facebook.github.io/create-react-app/docs/deployment)
* [`npm run build` fails to minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
