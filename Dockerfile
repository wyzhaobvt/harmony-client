#Use a Node.js image with npm as a parent image
FROM node:alpine

#Set working directory
WORKDIR /app

#Install dependencies
COPY package.json package-lock.json /app/

#Install dependencies
RUN npm install

#Copy the rest of the Vite project files to /app
COPY . /app/

#Build the Vite application
RUN npm run build

#Expose the port Vite serves on 5173
EXPOSE 5173

#Command to run the Vite development server
CMD ["npm", "run", "dev"]
