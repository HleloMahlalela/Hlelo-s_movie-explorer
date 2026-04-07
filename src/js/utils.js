// Shared helper functions used across the app.

// Extract 4-digit year from a date string
export const formatYear = (dateString) => {
    if (!dateString) return 'N/A' //returns N/A if if no date is provided
    return dateString.slice(0, 4)
}

// Format a rating to one decimal place
export const formatRating = (rating) => {
    if (!rating) return 'N/A'
    return rating.toFixed(1)
}

// Build a full TMDB poster image URL
export const getPosterUrl = (posterPath) => {
    if (!posterPath) return null
    return `https://image.tmdb.org/t/p/w500${posterPath}`
}

// Build a full TMDB backdrop image URL
export const getBackdropUrl = (backdropPath) => {
    if (!backdropPath) return null
    return `https://image.tmdb.org/t/p/w280${backdropPath}`
}