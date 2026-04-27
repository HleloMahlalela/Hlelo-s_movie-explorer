# 🎬 Mosh&Chill — Movie Explorer

Student Name: Hlelolwenkosi Mahlalela
Student Number: 24020091
INFS 202 — Frontend Development
Project: Midterm Individual Project

## Description

Mosh&Chill is a React web application that allows users to browse, search and filter movies using the TMDB (The Movie Database) public API. Users can view a grid of trending movies, search by title, filter by genre,
and click any movie to view its full details. Users can also add a movie to a personal list using the Add Movie form.

## Features

- Browse trending movies on page load
- Search movies by title
- Filter movies by genre
- View full movie details including backdrop, rating, runtime and overview
- Add a movie using a validated form with controlled inputs
- Responsive layout for desktop, tablet and mobile

## Technologies Used

- React via Vite
- React Router DOM
- TMDB API
- CSS
- JavaScript custom hooks

## Project Structure

src/
├── components/
│ ├── Navbar.jsx
│ └── MovieCard.jsx
├── pages/
│ ├── Home.jsx
│ ├── List.jsx
│ ├── Details.jsx
│ └── AddItem.jsx
├── services/
│ └── api.js
├── styles/
│ ├── base.css
│ ├── base.css
│ ├── navbar.css
│ ├── cards.css
│ ├── home.css
│ ├── list.css
│ ├── details.css
│ └── forms.css
├── js/
│ ├── useMovies.js
│ ├── useGenres.js
│ └── utils.js
├── App.jsx
└── main.jsx

## How to Run the Project

### 1. Clone the repository

git clone https://github.com/HleloMahlalela/Hlelo-s_movie-explorer.git

cd Hlelo-s_movie-explorer

### 2. Install dependencies

npm install

## 3. Set up TMDB API key

Create a file called `.env` in the root of the project and add:

VITE_TMDB_KEY=63de1954f65aeb2a4db81f8ddec07adc

Get a free API key at: https://www.themoviedb.org/settings/api

### 4. Start the development server

npm run dev

Open your browser and go to: `http://localhost:5173`

## Required Routes

| Route | Page |

| `/home` | Home page |
| `/list` | Browse movies |
| `/details/:id` | Movie detail page |
| `/add` | Add a movie form |

## Screenshots

| Page | Screenshot |

| Home | ![Home](screenshots/home.png) |
| Browse | ![Browse](screenshots/list.png) |
| Details | ![Details](screenshots/details.png) |
| Add Movie | ![Add Movie](screenshots/add.png) |
