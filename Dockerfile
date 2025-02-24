FROM node:22

WORKDIR /hw-react
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD npm run dev