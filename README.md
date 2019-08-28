# Hydro Data PoC Application
 Uses the cell site power and cost hydro bill data to create tools to easier intrepet the data and see trends. 
 
 ## Running on local host
  - In /graphsProject/index.js , change the SERVER variable to be 'http://localhost' and set PORT to your desired port
  - In /mapProject/index.js , change the SERVER variable to be 'http://localhost' and set PORT to your desired port
  - In server.js , set PORT to your desired port
 
  - In command prompt, run `node server.js` and then open http://localhost:PORT, where PORT is the port number stated in the terminal. 
 
 ## Running on a hosted server
  - In /graphsProject/index.js , change the SERVER variable to your desired server address and set PORT to your desired port
  - In /mapProject/index.js , change the SERVER variable to your desired server address and set PORT to your desired port
  - In server.js , set PORT to your desired port
 
  - SSH into the server. `cd` into the graphsMapCombined directory. 
  - To keep the server forevor running, we will use `screen`. Use the command `screen`. If it is not installed, install screen with `yum install screen` and try the command `screen` again. Then type `node server.js` and hit enter. To detach from the process, press Ctrl a d
  - To come back to the process, use the command `screen -r`
  - To kill all screens, use `killall screen`
  - Open http://SERVER:PORT in your browser where SERVER and PORT were set by you earlier 
