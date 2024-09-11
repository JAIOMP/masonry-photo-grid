# MASONRY PHOTO GRID

## Overview

The Masonry Photo Grid App is a responsive web application designed for browsing and searching photos using the [Pixabay API](https://pixabay.com/api/). The app includes an infinite scroll feature and an intuitive search interface to filter photos by keywords.

## Features

- **Infinite Scrolling**: Automatically load more photos as you scroll down.
- **Search Functionality**: Filter photos by entering keywords in the search bar.
- **Responsive Design**: Optimized for various screen sizes, including mobile, tablet, and desktop.
- **Error Handling**: Displays user-friendly error messages and allows retrying if something goes wrong.

## Technologies Used

- **React**: For building the user interface.
- **Vite**: For fast development and build tooling.
- **TypeScript**: For type safety and better development experience.
- **Axios**: For making HTTP requests.
- **CSS Variables**: For consistent styling and theme management.

## Setup and Installation

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/your-username/masonry-photo-grid.git
cd masonry-photo-grid
```

## Install Dependencies
```
npm install
# or
yarn install
```

## Set Up Environment Variables
`VITE_PIXABAY_API_KEY=your_pixabay_api_key`

## Run the Development Server
```
npm run dev
# or
yarn dev
```

Open your browser and navigate to http://localhost:5173/ to see the app in action.

## Usage
### Search for Photos:

Use the search input to filter photos by keywords.
The grid will update dynamically with search results.

### Browse Photos:

Scroll down to load more photos automatically.
Click on a photo to view its details.

## Error Handling
The application includes error boundaries to handle runtime errors. If an error occurs, a user-friendly error message will be displayed with an option to retry.

## Acknowledgments
### Pixabay API:
For providing the photo data.

### React Community:
For the extensive documentation and support.
### Vite: 
For a fast and efficient development experience.
