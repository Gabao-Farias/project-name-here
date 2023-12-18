FROM node:20.9.0

WORKDIR ./machine-backend

COPY ./backend ./backend

COPY ./native-app/data ./native-app/data

WORKDIR ./backend

RUN yarn

RUN yarn build

CMD yarn start:prd
