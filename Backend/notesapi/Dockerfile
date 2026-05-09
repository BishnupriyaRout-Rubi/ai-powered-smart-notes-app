FROM eclipse-temurin:17

WORKDIR /app

COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
COPY src src

RUN chmod +x mvnw

RUN ./mvnw clean package -DskipTests

EXPOSE 8080

CMD java -Dserver.port=$PORT -jar target/notesapi-0.0.1-SNAPSHOT.jar