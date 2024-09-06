# Angular Task Management Application

This project is an Angular-based task management application that demonstrates various Angular features and best practices.

## Table of Contents
- [Angular Specifics](#angular-specifics)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Angular Specifics

- **[Components](src/app/components/)**: Reusable UI elements with their own logic and styling.
  - [Task List Component](src/app/components/task-list/task-list.component.ts)
  - [Task Form Component](src/app/components/task-form/task-form.component.ts)

- **[Services](src/app/services/)**: Singleton objects for sharing data and functionality.
  - [Task Service](src/app/services/task.service.ts)
  - [Auth Service](src/app/services/auth.service.ts)

- **[Directives](src/app/directives/)**: Custom attributes and elements that extend HTML.
  - [Task Status Directive](src/app/directives/task-status.directive.ts)

- **[Pipes](src/app/pipes/)**: Functions to transform display values in templates.
  - [Task Filter Pipe](src/app/pipes/task-filter.pipe.ts)

- **[Guards](src/app/guards/)**: Route guards for protecting authenticated routes.
  - [Auth Guard](src/app/guards/auth.guard.ts)

- **[Interceptors](src/app/interceptors/)**: HTTP request/response handlers.
  - [Auth Interceptor](src/app/interceptors/auth.interceptor.ts)

- **[Models](src/app/models/)**: TypeScript interfaces for type checking.
  - [Task Model](src/app/models/task.model.ts)

- **[Routing](src/app/app-routing.module.ts)**: Navigation configuration for the application.

- **[Main Module](src/app/app.module.ts)**: The root module that tells Angular how to assemble the application.

- **Template-Driven Forms**: Used for task input and editing, showcasing two-way data binding and form validation. See [task-form.component.html](src/app/components/task-form/task-form.component.html).

- **Angular Material**: Utilized for consistent and responsive UI components. Configuration in [app.module.ts](src/app/app.module.ts).

- **Lazy Loading**: Implemented for optimized module loading. Configuration in [app-routing.module.ts](src/app/app-routing.module.ts).

## Features

- Task creation, editing, and deletion
- Task list view with filtering options
- User authentication and authorization
- Responsive design for mobile and desktop
- Template-driven forms for task input
- Angular Material components for UI

## Technologies Used

- Angular 15+
- Angular Material
- RxJS for reactive programming
- NgRx for state management
- Template-driven forms
- Angular Router for navigation
- Jasmine and Karma for unit testing

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RuslanLabza/angular-template-driven-form.git
   ```
2. Navigate to the project directory:
   ```bash
   cd angular-task-management
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the development server:
   ```bash
   ng serve
   ```
2. Open your browser and navigate to `http://localhost:4200`

## Testing

This project uses Jasmine and Karma for unit testing. Template-driven forms are used for testing purposes, demonstrating form validation and data binding in a simpler context.

To run the tests:
   ```bash
   ng test
   ```

## Project Structure

angular-task-management/
├── src/
│ ├── app/
│ │ ├── components/
│ │ │ ├── task-list/
│ │ │ │ ├── task-list.component.ts
│ │ │ │ ├── task-list.component.html
│ │ │ │ └── task-list.component.scss
│ │ │ ├── task-form/
│ │ │ │ ├── task-form.component.ts
│ │ │ │ ├── task-form.component.html
│ │ │ │ └── task-form.component.scss
│ │ │ └── ...
│ │ ├── services/
│ │ │ ├── task.service.ts
│ │ │ └── auth.service.ts
│ │ ├── directives/
│ │ │ └── task-status.directive.ts
│ │ ├── pipes/
│ │ │ └── task-filter.pipe.ts
│ │ ├── guards/
│ │ │ └── auth.guard.ts
│ │ ├── interceptors/
│ │ │ └── auth.interceptor.ts
│ │ ├── models/
│ │ │ └── task.model.ts
│ │ ├── app.component.ts
│ │ ├── app.component.html
│ │ ├── app.component.scss
│ │ └── app.module.ts
│ ├── assets/
│ ├── environments/
│ ├── index.html
│ └── main.ts
├── angular.json
├── package.json
├── tsconfig.json
└── README.md

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Create a new Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

Ruslan Labza - [LinkedIn](https://www.linkedin.com/in/ruslanlabza)

Project Link: [https://github.com/RuslanLabza/react-meta-capstone-project](https://github.com/RuslanLabza/react-meta-capstone-project)
