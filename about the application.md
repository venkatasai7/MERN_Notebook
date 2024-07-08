# MERN Notebook Application

## Overview

This repository contains a MERN (MongoDB, Express.js, React, Node.js) stack-based Notebook application. It allows users to create, edit, delete, and organize notes through a user-friendly web interface.

## Features

- **Authentication**: Users can sign up and log in securely to manage their notes.
- **CRUD Operations**: Create, Read, Update, and Delete notes.
- **Context Management**: Utilizes React Context API for state management across components.
- **Responsive Design**: Designed to be responsive and accessible on various devices.
- **Backend API**: Handles backend operations using Express.js and interacts with MongoDB for data storage.

## Technologies Used

- **Frontend**: React, React Router DOM
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: React Context API
- **Authentication**: JSON Web Tokens (JWT)

## Files and Code Explanation

### `/Backend`

This directory contains the Node.js backend server that handles API requests and interacts with the MongoDB database.

- **`server.js`**: Entry point for the backend server. Sets up middleware, connects to MongoDB, and defines API routes.
- **`routes/auth.js`**: Handles user authentication routes (signup, login).
- **`routes/notes.js`**: Manages CRUD operations for notes (create, read, update, delete).
- **`models/User.js`**: Defines the MongoDB schema for user data.
- **`models/Note.js`**: Defines the MongoDB schema for note data.
- **`middleware/auth.js`**: Middleware for verifying JWT tokens and authenticating users.

### `/frontend`

This directory contains the React frontend components and context for managing the application state.

- **`src/components/`**: Contains React components used throughout the application.
  - **`AddNote.js`**: Component for adding new notes.
  - **`NoteItem.js`**: Component for displaying individual notes.
  - **`Notes.js`**: Main component displaying all notes, including CRUD operations.
  - **`Signup.js`**: Component for user signup with form validation and authentication.
  - **`Login.js`**: Component for user login with authentication and token management.
- **`src/context/`**: Contains React Context API setup for managing global state.
  - **`NoteContext.js`**: Defines the context for managing notes across components.
  - **`NoteState.js`**: Implements the context provider with functions for adding, editing, and deleting notes.
- **`src/App.js`**: Main application component where routing and global state providers are configured.
- **`src/index.js`**: Entry point of the React application where the app is rendered to the DOM.

### Usage

- Register a new account or log in with existing credentials.
- Create new notes with a title, description, and optional tags.
- View, edit, or delete existing notes.
- Log out from the application using the navbar.

## Folder Structure

```
MERN_Notebook/
├── Backend/          # Backend Node.js & Express server
└── frontend/         # React frontend components
    ├── public/
    └── src/
        ├── components/     # React components
        ├── context/        # Context API for state management
        ├── App.js          # Main application component
        ├── index.js        # Entry point
        └── ...
```
