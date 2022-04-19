# GPL Task Manager

## Running the project

Clone the project and inside the project directory run:

### `yarn`

Start the development server with:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Project Description

task management app that allows browsing and add tasks to users, the app is using the provided GraphQL API.

### Screenshots

#### Dashboard

![Dashboard](https://ibb.co/d0vKwFh)

#### Create Task

![Create task modal](https://ibb.co/Gt8rBf5)
![Create task modal](https://ibb.co/R731bDT)
![Create task message](https://ibb.co/ZMRPvkK)

#### Edit Task

![Edit task modal](https://ibb.co/zJw4zb6)
![Edit task modal](https://ibb.co/3BV6fSZ)
![Edit task message](https://ibb.co/PZPHTpL)

#### User Profile

![User Profile](https://ibb.co/bF5WYYz)

### Project Libraries

##### Typescript

##### React

##### React router

##### React avatar

##### Ant Design (craco for custom theming)

##### Moment JS

##### React hook form

##### GraphQL

##### Apollo client

##### Styled components

<br/>
I used a simple project structure separating them by functionality, I decided to use the API Context for certain shared data like the Modal status and the UI theme, for the backend data retrieval I used Apollo client, cache update and optimistic response, overall the biggest challenge was the time, as there is still room for a lot of improvements.
