# Hydro Data PoC Application
 Uses the cell site power and cost hydro bill data to create tools to easier intrepet the data and see trends. 
 
 ## Prerequisites Packages
  - First install Node.js https://nodejs.org/en/
  - `npm install express`
  - `npm install mongodb@2.2.33`
 
 ## Running on local host
  - In /public/graphsProject/index.js , change the SERVER variable to be 'http://localhost' and set PORT to your desired port
  - In /public/mapProject/fetchData.js , change the SERVER variable to be 'http://localhost' and set PORT to the same port in the previous step
  - In server.js , set PORT to the same port
  - Currently, the default value for the SERVER variable is 'http://localhost' and PORT is set to 8082
 
  - In command prompt `cd` to the root project directory of graphsMapCombined, run `node server.js` and then open http://localhost:PORT, where PORT is the port number stated in the terminal. 
 
 ## Running on a hosted server
  - In /public/graphsProject/index.js , change the SERVER variable to your desired server address and set PORT to your desired port
  - In /public/mapProject/fetchData.js , change the SERVER variable to your desired server address and set PORT to the same port in the previous step
  - In server.js , set PORT to the same port
 
  - SSH into the server. `cd` into the root project directory of graphsMapCombined. 
  - To keep the server forever running, we will use `screen`. Use the command `screen`. If it is not installed, install screen with `yum install screen` and try the command `screen` again. Then type `node server.js` and hit enter. To detach from the process, press Ctrl a d
  - To come back to the process, use the command `screen -r`
  - To kill all screens, use the command `killall screen`
  - Open http://SERVER:PORT in your browser where SERVER and PORT were set by you earlier 
