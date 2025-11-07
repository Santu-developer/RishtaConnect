# Multi-stage Dockerfile for Spring Boot

# Stage 1: Build
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline -B

COPY src ./src
RUN ./mvnw clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar
RUN mkdir -p /tmp/uploads

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -Dspring.profiles.active=prod -Dserver.port=$\{PORT:-8080\} -jar app.jar"]
