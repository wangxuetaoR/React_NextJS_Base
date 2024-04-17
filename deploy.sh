# kill and remove existed container
docker kill centos
docker rm centos

docker build --pull --rm -f "dockerfile" -t centos:latest "."

docker run -d --name centos -p 3000:3000 centos:latest
