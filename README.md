# melt-down-app

to run this app you first need to have npm
See: https://ionicframework.com/docs/installation/cli

 ## Dependencies
- Git
- Node: 10.1*
- NPM: 6.*
- Ionic: 5.4.*



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
Update the URL in the Environment's file to match your test/development environment on the development server.
```
/** File To Update **/
src/app/environments/environment.ts
```

```
/** Change The Following Line To Match Your Dev URL **/
API_URL: "http://10.220.0.4/~sraychev/bang-us-new/md-app/"
```

### Add Database Tables
The following database tables will need to be added to the primary WordPress install. In the future, this step will be semi-automated, for now this will be a manual process.

These tables should be a part of the primary Bang US WordPress website that you have setup as your test/development website, aka where your API is calling to. 

[Download SQL Database Tables Here]('http://10.220.0.4/~csteurer/_db/md_tables.sql)
