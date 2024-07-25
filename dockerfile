#Uses the latest Node.js image as the base image.
FROM node:latest

#Sets the working directory inside the container.
WORKDIR /usr/src/app

#Copies the package.json and package-lock.json files to the working directory.
COPY package*.json ./

#Installs the Node.js dependencies.
RUN npm install

#Copies the rest of the application files to the working directory.
COPY . .

#Exposes the port
EXPOSE 4000

#Runs `npm start` to start the node.js application.
CMD ["npm", "start"]

