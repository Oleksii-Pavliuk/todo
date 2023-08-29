# Todo


## Description 
Todo app where you can register and login to add your tasks, you can edit your task, mark your task as done, delete your task from list and translate yout task name and description on Ukrainian using Google Translate.

##### Admin interface
If user is admin ( username: admin, password: 123456), admin can view other users history, like username, list of tasks and history of tasks: when task was done and translated

  
  
   

## CI/CD, Testing
  
   Deployment to Google Cloud on push both app and cloud functions 
   Automated test of cloud functions with http requests
   
## Auto GCP deployment instructions 

  ### todo app build and deploy 
  Just push app to todo repository in main branch , it will be automaticaly builded and deployed 
  
  ### todoSRV cloud functions deploy
  Specify name of function in ```main.yaml``` in field ```name:```
  
  <img width="571" alt="Screenshot 2023-02-23 at 10 49 27 pm" src="https://user-images.githubusercontent.com/71220725/221064962-065dfe99-76f4-4781-be5d-745f836babad.png">

  Push ```main.py``` and ```main.yaml``` to todoSRV/main with function written
   
## Manual GCP deployment instructions  

#### 1. Assuning that angular project already built and we only need to deploy it

#### 2. Than create 'app.yaml' file in root directory of project and copy content of 'app.yaml' from this repository in your file 

#### 3. Create new projct in GCP console or select your current project

#### 4. Create new application in App engine dashboard https://console.cloud.google.com/appengine , set up your region and language: 'Other', and click "i'll do it later"
<img width="1179" alt="Screenshot 2023-02-28 at 4 32 50 pm" src="https://user-images.githubusercontent.com/71220725/221763113-9d308a5b-05cf-43e9-8471-d67aa4eb4af1.png">

#### 5. Download gcloud SDK https://cloud.google.com/sdk/docs/install

#### 6. After instalation, go to your terminal and execute ``` gcloud auth login ``` to login, login using your email account assigned to your project

#### 7. Deploy app by executing ``` gcloud app deploy --project=[your project id]``` , you can find your project id in GCP console, in your project details

Thats it, you can find link to your project in your console.
