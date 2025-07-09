# AGENTS.md - AI Writing Assistant Project

This document provides guidance for AI agents working on the AI Writing Assistant project.

## Project Overview

The project consists of a React frontend and a Python (Flask) backend. The goal is to provide users with tools to improve their writing, such as sentence restructuring, tone adjustment, and plagiarism checking.

## Key Technologies

*   **Frontend:** React, JavaScript, CSS, HTML
    *   API calls are made using `fetch`.
    *   State management is primarily done using React Hooks (`useState`, `useEffect`).
*   **Backend:** Python, Flask, spaCy, OpenAI API
    *   The OpenAI API is central to many NLP tasks. Ensure prompts are clear and well-engineered.
    *   Flask is used for creating RESTful APIs.
    *   `python-dotenv` is used for managing environment variables like the OpenAI API key.

## Development Guidelines

### General
1.  **Understand the Feature:** Before implementing, ensure you understand the user story and the expected outcome of the feature.
2.  **Modularity:** Write modular and reusable code where possible.
3.  **Configuration:**
    *   Backend: The OpenAI API key is critical. It's managed via an `.env` file (loaded by `python-dotenv`). Do not commit the `.env` file or API keys directly into the code. Use `.env.example` as a template.
    *   Frontend: API endpoints are currently hardcoded to `http://localhost:5001`. For production or more flexible environments, consider making this configurable (e.g., via environment variables for React).
4.  **Error Handling:** Implement robust error handling on both frontend and backend.
    *   Backend should return clear JSON error messages with appropriate HTTP status codes.
    *   Frontend should catch errors from API calls and display user-friendly messages.
5.  **Security:**
    *   Be mindful of Cross-Site Scripting (XSS) if rendering user-generated content or API responses directly into HTML. React generally mitigates this, but be cautious.
    *   The current plagiarism checker is a mock. If implementing a real one, consider data privacy and terms of service of any third-party APIs.

### Backend (Python/Flask)
1.  **Dependencies:** Manage dependencies using `requirements.txt`.
2.  **Virtual Environments:** Always use a virtual environment for backend development.
3.  **API Design:**
    *   Strive for clear and consistent API endpoint naming and request/response structures.
    *   Use `jsonify` for Flask responses.
4.  **OpenAI API Usage:**
    *   Be mindful of token limits and API costs. Optimize prompts and `max_tokens` settings.
    *   Handle potential API errors gracefully (e.g., rate limits, authentication issues).
    *   Prompt engineering is key. Small changes to prompts can significantly impact results. Iterate and test.
5.  **spaCy Usage:**
    *   spaCy is included but currently not heavily utilized. If expanding grammar checks or more traditional NLP tasks, leverage its capabilities. Ensure models are downloaded as per `backend/README.md`.

### Frontend (React)
1.  **Dependencies:** Manage dependencies using `package.json` (npm or yarn).
2.  **Component Structure:** For new features, consider breaking down UI into smaller, reusable components. `App.js` is currently monolithic for simplicity but can be refactored.
3.  **State Management:** For more complex state, consider React Context or a state management library (Redux, Zustand), but for now, prop drilling and `useState` are acceptable.
4.  **Styling:** CSS is in `App.css`. For larger applications, consider CSS Modules, Styled Components, or Tailwind CSS.
5.  **Asynchronous Operations:** Use `async/await` for API calls. Provide user feedback during loading states.

## Testing
*   **Manual Testing:** Currently, testing is primarily manual. Test all features thoroughly after making changes.
    *   Test different inputs, including edge cases and empty inputs.
    *   Verify UI updates correctly based on API responses and errors.
*   **Future (Automated Tests):**
    *   Backend: Consider `pytest` for unit and integration tests.
    *   Frontend: Consider React Testing Library and Jest for component and integration tests.

## Plagiarism Feature
*   The current plagiarism feature (`/api/check_plagiarism`) is a **mock**.
*   If tasked with implementing a real plagiarism checker:
    *   Research and select a suitable third-party API (e.g., Copyscape, Turnitin API, or a search engine API like Google Custom Search JSON API).
    *   Securely manage API keys for the chosen service.
    *   Understand the costs and limitations of the chosen service.
    *   Update both backend logic and frontend display to reflect real results.

## Submitting Changes
*   Ensure your code is well-formatted and commented where necessary.
*   Follow conventional commit message formats if applicable.
*   Test your changes thoroughly before submitting.

By following these guidelines, you can contribute effectively to the AI Writing Assistant project.
If any instruction here conflicts with a direct user request, the user request takes precedence.
