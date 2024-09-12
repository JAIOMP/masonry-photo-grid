# MASONRY PHOTO GRID

## Overview

The Masonry Photo Grid is a responsive web application that lets users browse and search for photos using the [Pixabay API](https://pixabay.com/api/). It supports infinite scrolling, keyword filtering, and provides a smooth user experience with features like API call debouncing and lazy loading for performance optimization.

## Features

- **Infinite Scrolling**: Automatically loads more photos as the user scrolls.
- **Search Functionality**:  Users can filter photos by entering keywords in the search bar. The search includes a debounce feature to reduce unnecessary API calls.
- **Responsive Design**: The app adapts to various screen sizes (mobile, tablet, desktop).
- **Error Handling**: Displays user-friendly messages if errors occur and provides a retry option.

## Technologies Used

- **React**: For building the user interface.
- **Vite**: For fast development and build tooling.
- **TypeScript**: For type safety and better development experience.
- **Axios**: For making HTTP requests.
- **CSS Variables**: For consistent styling and theme management.

## Setup and Installation

### Pixabay API Key
Instead of using Unsplash, we now use the Pixabay API to fetch images. You'll need a Pixabay API key to run the project. A dummy API key is provided for testing purposes.

### Environment Setup
Create a .env file in the root of the project with the following content:
```
VITE_PIXABAY_API_KEY=your_dummy_api_key_here
```
This .env file will store your API key for local development.

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/JAIOMP/masonry-photo-grid.git
cd masonry-photo-grid
```

### 2. Install Dependencies
```
npm install
# or
yarn install
```

### 3. Set Up Environment Variables
Make sure to add your Pixabay API key in the .env file as shown above.

## Run the Development Server
```
npm run dev
# or
yarn dev
```

Open your browser and navigate to http://localhost:5173/ to see the app in action.

## Build and Run Instructions
To build the project for production:

### 1. Build the project:

```
npm run build
```
### 2. Serve the build locally:
```
serve -s dist
```

## Features Overview
### Infinite Scroll
Scroll down the photo grid to automatically load more photos, enhancing the user experience by progressively rendering new content.

### Photo Search with Debounce
Filter photos using the search bar. The debounce feature ensures that API requests are only sent after the user has stopped typing, improving both performance and user experience.

### Error Handling
If something goes wrong, the app shows a friendly error message with a "Retry" option, ensuring that users can recover from errors easily.

## Acknowledgments
### Pixabay API:
For providing the photo data.

### React Community:
For the extensive documentation and support.
### Vite: 
For a fast and efficient development experience.
