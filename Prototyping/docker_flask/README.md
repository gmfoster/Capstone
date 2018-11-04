
      <!-- Create/Run Docker -->
<!-- build docker file in current directory (INCLUDE THE PERIOD )-->
docker build -t novasight:latest .

<!-- run docker file: -->
docker run --name novasight -d -p 8000:5000 --rm novasight:latest


      <!-- Delete/Replace Docker -->
<!-- check current docker processes  -->
docker ps
<!-- end a current container process -->
docker rmi <ContainerID>

<!-- look at current docker images  -->
docker images
<!-- remove a docker image  -->
docker rmi <ImageID#>



      <!-- Troubleshooting -->
<!-- View error log  -->
docker logs novasight
