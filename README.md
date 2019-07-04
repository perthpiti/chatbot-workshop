# Chatbot-workshop

### Prerequisite

1. Install Node.js Stable (or Latest)

   Visit [Node.js Website](https://nodejs.org/en/) or type nodejs.org in browser url bar

   - Checking node.js installed by typing this command in Command Prompt, PowerShell (Windows) or Terminal (Unix)

     `node -v`

2. Install Text Editor or IDE

   Recommended - [Visual Studio Code](https://nodejs.org/en/)

---

### Guide 1 - Installing tools

1. Install nodemon for auto-reloading server after we change code during development.

   Run:  
   `npm install -g nodemon`

2. Install localtunnel for exposing our local server to the internet.

   Run:  
   `npm install -g localtunnel`

---

### Guide 2 - Starting server

1. In CommandPrompt or Terminal, change directory into example... folder

   Run:  
   `cd example1_echobot`

2. Install dependencies

   Run:  
   `npm install`

3. Start auto-reloading local server

   Run:  
   `npm start`

4. Open another window for CommandPrompt, then start localtunnel and get the URL for accessing server

   Run:  
   `lt --port 3000`

5. Try open the URL given by localtunnel, and start editing.
