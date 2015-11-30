// Run mngodb container
docker run -p 27017:27017 --name mongo_instance_001 -d mongo

//Liste containers status
docker ps

//Connect you on mongodb
mongo --port 27017
mongo 172.17.0.1:27017

mongo 127.0.0.1/connectIt:27017
use connectIt
db.pictures.find();


//create test database
use test


docker run -i -t --link mongo_instance_005:mongo connectit-embbeded /bin/bash

docker exec -it 0ea9541c4d88 /bin/bash
