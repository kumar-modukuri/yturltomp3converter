FROM maven:3.9.9-amazoncorretto-21 AS build

COPY . .

RUN mvn clean package -DskipTests

FROM openjdk:21-rc-oraclelinux8

COPY --from=build /target/Backend-0.0.1-SNAPSHOT.jar api.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "api.jar"]