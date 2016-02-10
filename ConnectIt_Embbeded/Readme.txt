Hello Bad boy :)

Le projet embarque un fichier Dockerfile afin construire un container embarquant
notre application NodeJS.

Pré-requis :
Il faut installer Docker sur votre poste ;)

Construction du container :
1 * vous placer au même niveau que le fichier DockerFile
2 * Lancer : sudo docker build -t connectit-embbeded .

Lancement de l'application :
1 * sudo docker run connectit-embbeded



docker run -d -P connectit-embbeded --link mongo mongo_instance_002
