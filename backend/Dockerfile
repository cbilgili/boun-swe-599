FROM openjdk:11-jre-slim
MAINTAINER cagri.altug
COPY build/libs/mmsr-0.0.1-SNAPSHOT.jar /usr/app/mmsr.jar
EXPOSE 8080
WORKDIR /usr/app/
CMD ["java","-jar","-Dspring.profiles.active=prod","mmsr.jar"]
