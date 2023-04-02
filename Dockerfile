FROM node:current-alpine
COPY ./ /code
WORKDIR /code
RUN cd /code
RUN npm i
RUN node /code/deploy-commands.js
CMD node /code/bot.js
