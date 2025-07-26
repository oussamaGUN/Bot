FROM node:20 AS builder
EXPOSE 5173
WORKDIR /app
COPY . .
RUN npm install
RUN npm install tailwindcss @tailwindcss/vite \
    && npm install lucide-react react-router-dom tailwind-merge \
    && npm install @radix-ui/react-toast class-variance-authority clsx \
    && npm i ogl && npm install @react-oauth/google && npm install jwt-decode


CMD [ "npm", "run", "dev" ]