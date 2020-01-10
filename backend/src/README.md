## Installation

In order to install and run the backend project [Java](https://www.java.com) Jdk v11+, [Gradle](https://gradle.org/) must be installed.

Set JAVA_HOME like "C:\Program Files\Java\jdk11..", "bin" folder is not required. Otherwise gradle tasks can fail.

In order to run the projects on docker environment [Docker](https://docs.docker.com/) must be installed. Docker is a must!

After installation  of Java, Gradle and Docker, you can clone the project from the [repository](https://github.com/altugcagri/boun-swe-599.git) into your workspace.

## Build BackEnd

After cloning the project go to workspace `{PROJECT_DIRECTORY}/backend/` and run the gradle command:

```sh
$ .\gradlew build
```

Builds the backend for production to the `{PROJECT_DIRECTORY}/backend/build/libs/`folder as `swe-599-0.0.1-SNAPSHOT.jar`.<br>

## Build and Run With Docker

### Build image 

BackEnd:

```sh
$ docker build -f {PROJECT_DIRECTORY}/backend/Dockerfile --tag={ContainerName} .
```

### Run Container

BackEnd:

```sh
$ docker run -p 8080:8080 {ContainerName}
```


### Guides
The following guides illustrates how to use certain features concretely:

* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)

