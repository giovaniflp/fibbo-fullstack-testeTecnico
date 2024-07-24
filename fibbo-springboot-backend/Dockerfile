# Use uma imagem base do Maven para construir o projeto
FROM maven:3.8.3-openjdk-17 AS build

# Defina o diretório de trabalho
WORKDIR /app

# Copie o arquivo pom.xml e as dependências do projeto
COPY pom.xml .
COPY src ./src

# Execute o comando Maven para construir o projeto
RUN mvn clean package -DskipTests

# Use uma imagem base do JDK para rodar o projeto
FROM openjdk:17-jdk-slim

# Defina o diretório de trabalho
WORKDIR /app

# Copie o arquivo JAR gerado na etapa anterior para o contêiner
COPY --from=build /app/target/*.jar app.jar

# Expõe a porta em que a aplicação irá rodar
EXPOSE 8080

# Define o comando padrão para executar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]
