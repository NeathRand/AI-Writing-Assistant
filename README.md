# AI Writing Assistant

This project is an AI-powered writing assistant with a React frontend and a Python (Flask) backend. It offers features like sentence restructuring, tone adjustment, and mock plagiarism detection.

## Project Structure

```
.
├── backend/        # Python Flask backend
│   ├── app.py      # Main Flask application
│   ├── requirements.txt
│   ├── .env.example
│   ├── .gitignore
│   └── README.md   # Backend specific instructions
├── frontend/       # React frontend
│   ├── public/
│   ├── src/
│   │   ├── App.js  # Main React component
│   │   └── ...
│   ├── package.json
│   ├── .gitignore
│   └── README.md   # Frontend specific instructions
├── AGENTS.md       # Instructions for AI development on this project
└── README.md       # This file (main project README)
```

## Core Features

*   **Sentence Restructuring:** Improves clarity and flow of sentences.
*   **Tone Adjustments:** Modifies the text to different tones (e.g., formal, casual, confident).
*   **Plagiarism Detection (Mock):** Simulates checking for plagiarism against online sources.

## Setup and Running

Detailed setup and running instructions are available in the respective `README.md` files for each part of the application:

*   **Backend Setup:** See [backend/README.md](./backend/README.md)
*   **Frontend Setup:** See [frontend/README.md](./frontend/README.md)

**General Steps:**

1.  **Clone the repository.**
2.  **Set up the Backend:**
    *   Navigate to the `backend` directory.
    *   Follow instructions in `backend/README.md` (create virtual environment, install dependencies, set up `.env` with OpenAI API key).
    *   Run the backend server (typically `python app.py`). It usually runs on `http://localhost:5001`.
3.  **Set up the Frontend:**
    *   Navigate to the `frontend` directory.
    *   Follow instructions in `frontend/README.md` (install dependencies using `npm install` or `yarn install`).
    *   Run the frontend development server (typically `npm start` or `yarn start`). It usually runs on `http://localhost:3000`.
4.  **Access the application:** Open your browser and go to `http://localhost:3000`.

## Prerequisites

*   Python 3.8+
*   Node.js and npm (or yarn)
*   An OpenAI API Key (for backend functionality)

## Future Enhancements
*   Implement real plagiarism detection using a dedicated API.
*   Add user authentication.
*   Improve error handling and user feedback.
*   Expand NLP capabilities (e.g., grammar checking, summarization).
*   Write comprehensive automated tests.
*   Containerize the application (e.g., using Docker).
