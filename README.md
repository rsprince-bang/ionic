# Melt Down App
The Melt Down app is the Android & iPhone app that is being developed to accompany Jack Owoc's new book, "The Bang Anti-Diet". This app is to be used along side of the book to help the user ensure they are doing everything correctly for their new "Anti-Diet" regime. Key features of the app will include the ability to track your daily diet, excercise, and progress. 

Use the instructions below to get started with developing on this app!

 ## Dependencies at the time of this install
- Git [(install instructions)](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Node: v12.18.3 [(download)](https://nodejs.org/en/download/)
- NPM: 6.14.6 [(download)](https://nodejs.org/en/download/)
- Ionic: 6.11.8 [(install instructions)](https://ionicframework.com/docs/installation/cli)



## Installation:

Clone the Git Repository
```git
git clone https://github.com/BangWebGit/melt-down-app.git 
```

Enter / navigate to the directory for the app
```
cd melt-down-app
```

Install NPM Dependencies
```
npm install
```

Launch the App
```
ionic serve --devapp
```


## Setup
### Change API URL in 
Update the URL in the Environment's file to match your test/development environment on the development server. This URL should point to a test Bang website where you have access to the database. This is the URL & database that the app will use to store all of it's data.

Open the file with nano or other editor:
```
sudo nano src/app/environments/environment.ts
```

Change The Following Line To Match Your Dev URL:
```
API_URL: "https://bang-us-new.bangstg.com/md-app/"
```

### Add Database Tables
The following database tables will need to be added to the WordPress install you linked to in the previous step. In the future, this step will be semi-automated, for now this will be a manual process.

[Download SQL Database Tables Here](http://10.220.0.4/~csteurer/_db/md_app_tables.sql)
