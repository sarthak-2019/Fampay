## Backend Specs
1-A cron job which runs every 10 seconds to fetch videos based on ten different tags  <br />
2-Videos with unique ids are uploaded to the database  <br />
3-Backend application support two different APIs  <br />
   *Search videos based on Tags  <br />
   *Search video based on a subsequence of the video title [partial match search]  <br />
   *Both the APIs support pagination, limit and sorting based on Published 
    time  <br />
    *API Documentation  <br />
    https://documenter.getpostman.com/view/16007708/VUxLwUMd  <br />
4-If API limit gets exhausted for one key, it automatically uses the following available key in the cron job  <br />
5-Application has a docker file as well to dockerize the application.  <br />

## Tech Stack [Language Used-Javascript]
1-NodeJs
2-Express
3-Mongodb
4-Node-cron
5-Axios

## Frontend Dashboard
1-User can search videos based on 10 Different Tags
2-Sort Videos based on time, support pagination with five videos at a time
3-Search Bar to search videos based on video titles
 Deployed Site-https://fampay1.netlify.app/

## Tech Stack [Language Used-Javascript]
1-React
2-Redux
3-Mui
