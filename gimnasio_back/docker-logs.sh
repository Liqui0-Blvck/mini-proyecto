#!/bin/bash

# Levantar los contenedores en modo desapegado
docker-compose up -d

# Obtener el nombre del contenedor principal (web) y mostrar sus logs
container_name=$(docker ps --filter "name=gimnasio_back_web" --format "{{.Names}}")
docker logs -f $container_name
