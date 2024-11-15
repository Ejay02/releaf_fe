# PKS Map Manager (Frontend)

## Description

PKS Map Manager (Frontend) is a web application that allows users to interact with a map of mills and PKS dumpsites. The app uses Leaflet for map visualization, with markers for mills and dumpsites, and enables users to add and edit dumpsite information. The front end is designed to be responsive, with a clean and accessible user interface using Vue.js, Tailwind CSS, and Axios.

The app is hosted on Netlify: [Live Site](https://releaf-demo.netlify.app)

## Features

- **Map Visualization**: Display mills and PKS dumpsites on an interactive map using Leaflet.
- **Dumpsite Management**: Add, edit, and display dumpsite details.
- **Pagination**: Navigate through lists of dumpsites and mills.
- **User Authentication**: Sign in with email and password.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **State Management**: User data and app state are managed with Pinia.
- **Data Fetching**: Axios is used for making HTTP requests to the backend API.

## Technologies Used

- **Frontend**: Vue.js (with `<script setup>`), Tailwind CSS, Axios, Leaflet
- **State Management**: Pinia
- **API**: RESTful endpoints for dumpsite and mill data

## Setup

Follow these steps to get the frontend running on your local machine:

### 1. Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Ejay02/releaf_fe.git
```

### 2. Install dependencies

Navigate into the project directory and install the required dependencies:

```bash
cd releaf_fe
npm install
```

This will install all the necessary dependencies listed in the `package.json` file.

### 3. Start the development server

Once the dependencies are installed and the environment variables are set, start the development server:

```bash
npm run dev
```

This will start the frontend app in development mode. The app will be available at `http://localhost:5173` (or a different port, depending on your configuration).

### 5. Building for production

To build the app for production, run:

```bash
npm run build
```

This will create a `dist/` folder with optimized production-ready files.

## Acknowledgments

- [Leaflet](https://leafletjs.com/) for map visualization.
- [Tailwind CSS](https://tailwindcss.com/) for styling.
- [Axios](https://axios-http.com/) for data fetching.
- [Vue.js](https://vuejs.org/) for the frontend framework.
