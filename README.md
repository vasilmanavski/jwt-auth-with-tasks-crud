### Setup Steps
1. **Clone the Repository**
   Clone and enter the directory:
   git clone https://github.com/vasilmanavski/challenge.git

   Remove .idea if you are not using Intellij - it will be redundant.

3. **Backend Setup (Nest js)**
    - Navigate to the backend directory:
      ```
      cd backend
      ```
      npm install
      ```
      make sure that you have correct database properties for your local db (db.config.ts)

4. **Frontend Setup (React with Vite)**
    - Navigate to the frontend directory and install dependencies:
      ```sh
      cd frontend
      npm install  
      ```
    - Set up Prettier and ESLint configurations.

5. **Run the Application**
    - **Backend:**
        - nest start:

    - **Frontend:**
        - Ensure you are in the frontend directory, then start the development server:
          ```sh
          npm run dev  
