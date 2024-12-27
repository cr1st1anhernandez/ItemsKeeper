FROM gradle:7.6.1-jdk17-alpine AS build

WORKDIR /app

COPY . /app

RUN gradle clean build -x test --no-daemon

FROM openjdk:17-jdk-alpine

WORKDIR /app

EXPOSE 8080

COPY --from=build /app/build/libs/itemskeeper-backend-1.0.0-plain.jar /app/itemskeeper-backend-1.0.0-plain.jar

ENTRYPOINT ["java", "-jar", "/app/itemskeeper-backend-1.0.0-plain.jar"]
