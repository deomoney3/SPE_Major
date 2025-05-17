FROM node:18.13.0 as builder
WORKDIR /app
COPY . . 
RUN npm install
EXPOSE 4200
RUN npm run build --prod

FROM nginx:latest
COPY --from=builder /app/dist/gradeus-frontend /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD nginx -g "daemon off;"