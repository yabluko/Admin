# [AdminPanel]()

This is admin site for your business purposes.In this web-application you can create your business system of who would be the employee, manager , admin and write task for each of them.

# Stack ⚙️

[NodeJs](https://nodejs.org/en) - A server-side JavaScript runtime designed for scalable network applications.

[Express](https://expressjs.com/) - A fast, minimalist web framework for Node.js, simplifying the process of building robust web applications.

[React](https://react.dev/) - A JavaScript library for constructing interactive user interfaces, enabling the creation of dynamic and responsive front-end components.

[React Router v6.4](https://reactrouter.com/en/main) - A declarative routing library for React, facilitating the navigation and organization of components in a React application.

[RTK Query](https://redux-toolkit.js.org/rtk-query/overview) - A toolkit for Redux that streamlines data fetching, state management, and API integration in React applications.

[MongoDB](https://www.mongodb.com/it-it) - A NoSQL database providing a flexible and scalable solution for storing and retrieving data, particularly well-suited for handling large amounts of unstructured data.

[Mongosee](https://mongoosejs.com/) - An Object Data Modeling (ODM) library for MongoDB and Node.js, simplifying interactions with the MongoDB database through a straightforward schema-based approach.

# Installation and Configuration 🛠️

To download this full-stack project you should do next steps:

1. Install NodeJs on your computer [if it is not already installed](https://nodejs.org/en).

2. Clone my repository by command `git clone https://github.com/yabluko/Admin.git`

3.Open folder server and write command `npm i ` do the same with client folder

# Usage 🚀

After installation and configuration to run my application you just need in terminal write next command

1. Start the Express server by executing the following command: `npm run dev`.

2. Start the React server by executing the following command: `npm start`.

3. Login - testAdmin password - 122212 for log in as admin

4. Login - testUser password - 122212 for log in as admin

# Decomposition of Tasks 📝:

1. ## Authentication

- [x] Provide a login ,logout option
- [x] Backend auth service(jsonwebtoken)
  - [x] Refresh token access
  - [x] Access token access
- [x] Require users to login at least once per week

2. ## Functionality

- [x] Crud operations with notes and users
- [x] Users can be Employees, Managers, or Admins
- [x] Provide a way to remove user access asap if needed
- [x] Add an employee login to the notes app
- [x] Employees can only view and edit their assigned
- [x] Anyone can create a note (when customer checks-in)
- [x] Managers and Admins can view, edit, and delete all notes they can only acces User Settings and create new users

3. ## Database

- [x] MongoDb Cluster
- [x] Mongosee schemas

4. ## Deplyoment

- [x] Render
- [ ] CI/CD

5. ## Tests

- [ ] Jest
- [x] Postman

# Contact me 📱

[Telegram](https://t.me/zhushchonka)
