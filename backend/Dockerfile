FROM gcc:latest
MAINTAINER altugcagri@gmail.com

COPY build/libs/swe-599-0.0.1-SNAPSHOT.jar /mathsat/swe-599.jar

RUN apt-get update && apt-get install -y gcc make cmake tar g++ libgmp-dev openjdk-11-jdk

RUN cd /tmp && \
    wget --no-check-certificate http://mathsat.fbk.eu/download.php?file=mathsat-5.5.4-linux-x86_64.tar.gz -O mathsat-5.5.4-linux-x86_64.tar.gz && \
    tar xfz mathsat-5.5.4-linux-x86_64.tar.gz

RUN cd /tmp && \
    mv mathsat-5.5.4-linux-x86_64/* /mathsat && \
    rm -rf mathsat-5.5.4-linux-x86_64.tar.gz

COPY main.c /mathsat/main.c
COPY run.sh /mathsat/run.sh

RUN cd /mathsat/ && \
    gcc main.c -o mathsat lib/libmathsat.a -lgmpxx -lgmp -lstdc++ -lm &&\
    chmod +x run.sh

ENV JAVA_HOME /usr/lib/jvm/java-11-openjdk-amd64
EXPOSE 8080
WORKDIR /mathsat/
CMD ["java","-jar","swe-599.jar"]