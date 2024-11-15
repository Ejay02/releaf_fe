# Interactive Web App for Mills and PKS Dumpsites: FrontEnd

## Description
An interactive, responsive web app that displays and manages a set of map markers for mills and Palm Kernel Shell (PKS) dumpsites.

The app is hosted on Netlify: [Live Site](https://releaf-demo.netlify.app)


 ## Frontend Architecture
- **Framework**: Vue.js with Vite for efficient build and development.
- **UI Styling**: Tailwind CSS for responsive and clean design.
- **Map**: Leaflet.js is used to display an interactive map with markers for mills and PKS dumpsites. Users can click on the map to add new dumpsites.
- **State Management**: Pinia is used for state management, allowing user data and map-related data (mills and dumpsites) to persist across pages.
- **Data Fetching**: Axios is used to fetch data from the backend API, including mill and dumpsite information.
- **Routing**: Vue Router is used for navigating between different pages (e.g., dumpsites and mills views).
- **Notifications**: A custom notification system (useNotifications) to display success/error messages when adding mills or dumpsites.


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
