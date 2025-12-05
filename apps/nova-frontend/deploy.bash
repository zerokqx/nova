
name_app="nova-ai"
docker stop $name_app
docker rm $name_app
docker rm $name_app
docker build -t $name_app .
docker run  --name $name_app -p 80:80 $name_app
