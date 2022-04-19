# GPL Task Manager

## Running the project

Clone the project, inside the project directory copy the ".env.example" file and remane the copy to ".env"
Then inside the project directory run:

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

![Dashboard](https://i.ibb.co/27rK1xb/Dashboard.png)

#### Create Task

![Create task modal](https://i.ibb.co/7RZ08x1/create-task-modal.png)
![Create task modal](https://i.ibb.co/25vwhk3/create-task-modal-form.png)
![Create task message](https://i.ibb.co/9rmLBC2/create-task-message.png)

#### Edit Task

![Edit task modal](https://i.ibb.co/GTj5qkH/edit-task-modal.png)
![Edit task modal](https://i.ibb.co/vZfysLn/edit-task-modal-forms.png)
![Edit task message](https://i.ibb.co/xSBTmvk/task-updated-message.png)

#### User Profile

![User Profile](https://i.ibb.co/9hH8BBs/user-profile.png)

### Project Libraries

- Typescript
- React
- React router
- React avatar
- Ant Design (craco for custom theming)
- Moment JS
- React hook form
- GraphQL
- Apollo client
- Styled components

<br/>
I used a simple project structure separating them by functionality, I decided to use the API Context for certain shared data like the Modal status and the UI theme, for the backend data retrieval I used Apollo client, cache update and optimistic response, overall the biggest challenge was the time, as there is still room for a lot of improvements.
