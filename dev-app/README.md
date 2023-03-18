# How to run the this application locally

1. Open a command prompt or terminal window on your local machine and navigate to the directory where you want to store the app code
2. Then use the command
   `git clone https://github.com/The-4-Codesmen/URXperience.git`
   to clone the code onto your local machine.

### To run the backend of this application locally, perform the following commands and steps:

3. Once fully cloned, change into the dev-app directory by using the command `cd dev-app`.
4. Run `npm install` to ensure all dependecies are up to date.
5. To ensure this app runs locally make the following changes:
   - in config/.env.production change CLIENT_URL = http://localhost:3000
   - in client/.env.production change REACT_APP_SERVER = "http://localhost:5000/"
6. In your terminal Run `npm run dev`
7. Make sure the backend is running before you proceed, similar to the one below

```[nodemon] restarting due to changes...
[nodemon] starting `node server.js`
listening on port 5000
MongoDB connected: ac-uyma9iu-shard-00-00.knl0mlj.mongodb.net
```

### To run the frontend of this application locally, perform the following commands and steps:

8. Open a new terminal (independent of the previous terminal) and change into the client directory by using the command `cd dev-app/client`.
9. Run `npm install --legacy-peer-deps` to ensure all dependecies are up to date.
10. In your new instanced terminal Run `npm start`
