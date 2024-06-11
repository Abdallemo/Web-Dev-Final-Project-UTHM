# Tutorial Website

[![Project Status: Stable](https://img.shields.io/badge/Project%20Status-Stable-brightgreen)](https://github.com/Abdallemo/Web-Dev-Final-Project-UTHM)

Welcome to our Tutorial Website project! This project aims to create a platform where users can share tutorials on various topics, such as programming, cooking, DIY projects, and more. Users can sign up, log in, submit tutorials, and view tutorials submitted by others. Additionally, users can upload their tutorials in Markdown format, making it easy to format and style their content.

## Project Overview

The Tutorial Website project is a dynamic web application developed as part of our web development course final project. It fulfills the requirements outlined by our instructor and provides a user-friendly platform for sharing and accessing tutorials.

## Features

- **User Authentication:** Users can sign up and log in to the website.
- **Tutorial Submission:** Logged-in users can submit tutorials, including images or videos, and a description.
- **Tutorial Viewing:** Users can view tutorials submitted by other users.
- **CRUD Operations:** Users can create tutorials, view tutorials, and delete their own tutorials.
- **Security Measures:** Basic security measures are implemented to protect user data and prevent unauthorized access to tutorial editing or deletion.

## Requirements

The Tutorial Website project fulfills the following requirements:

1. - [x] **Page Count and Content:**
   - The website contains multiple pages, including login/signup, tutorial submission, and tutorial viewing pages.

2. - [ ] **Frontend Development:**
   - Developed using HTML, CSS, and JavaScript to ensure a cohesive visual appearance.

3. - [x] **Backend Development:**
   - Backend functionality is implemented using Node.js to handle user authentication and tutorial submission.

4. - [x] **Database Integration:**
   - MongoDB is used as the database to store user information and tutorials.

5. - [x] **CRUD Operations Support:**
   - Users can create, read, and delete tutorials. Editing tutorials is restricted to the tutorial owner.

6. - [x] **Security Measures:**
   - Basic security measures are implemented, including user authentication, to protect user data.

7. - [ ] **Navigation and Organization:**
   - The website has a clear menu structure and intuitive navigation elements.

8. - [ ] **Readability and Accessibility:**
   - Text readability, high contrast, and appropriate font sizes are ensured for optimal accessibility.

9. - [ ] **Multimedia Content:**
   - Users can upload images or videos as part of their tutorial submissions.

10. - [ ] **Responsive Design:**
    - The website is responsive and provides a seamless user experience across various devices.

### Early Directory Tree structure

<img src="https://github.com/Abdallemo/Web-Dev-Final-Project-UTHM/blob/main/readmeImags/dir_files_early_.png" >

## Getting Started

To get started with the Tutorial Website project, follow these steps:

### Prerequisites

- Node.js (version 14.x or higher recommended)
- npm (Node Package Manager)

### Installation

1. **Clone the repository**:

    ```sh
    git clone https://github.com/Abdallemo/Web-Dev-Final-Project-UTHM.git
    ```

2. **Navigate to the project directory**:

    ```sh
    cd Web-Dev-Final-Project-UTHM
    ```

3. **Install the dependencies**:

    ```sh
    npm i bcryptjs@^2.4.3 dompurify@^3.1.5 dotenv@^16.4.5 ejs@^3.1.10 express@^4.19.2 express-session@^1.18.0 highlight.js@^11.9.0 jsdom@^24.1.0 marked@^1.2.0 method-override@^3.0.0 mongoose@^8.4.1 node@^20.14.0 passport@^0.7.0 passport-local@^1.0.0 slugify@^1.6.6
    ```

    This command installs all the required npm packages listed in the `package.json` file.
   4. Install Mongodb you can use the MongoDBCompass 

5. **Start the application**:

    ```sh
    npm run dev
    ```

6. **Access the website** locally in your browser at `http://localhost:3000`.

## Libraries and Tools Used

- **bcryptjs**: ^2.4.3
- **dompurify**: ^3.1.5
- **dotenv**: ^16.4.5
- **ejs**: ^3.1.10
- **express**: ^4.19.2
- **express-session**: ^1.18.0
- **highlight.js**: ^11.9.0
- **jsdom**: ^24.1.0
- **marked**: ^1.2.0
- **method-override**: ^3.0.0
- **mongoose**: ^8.4.1
- **node**: ^20.14.0
- **passport**: ^0.7.0
- **passport-local**: ^1.0.0
- **slugify**: ^1.6.6

## Contributing

We welcome contributions to the Tutorial Website project! If you'd like to contribute, please fork the repository, make your changes, and submit a pull request. Make sure to follow our [contributing guidelines](CONTRIBUTING.md).

<div align="center">
  <h2>Our Contributors ❤️</h2>
  <h3>Thank you for contributing to our repository</h3>

<a href="https://github.com/Abdallemo/Web-Dev-Final-Project-UTHM/graphs/contributors">
<!-- it links to the "contributors" page of the Web-Dev-Final-Project-UTHM- repository. This page shows a graph of contributors and their contributions to the repository. -->
<img src="https://contributors-img.web.app/image?repo=Abdallemo/Web-Dev-Final-Project-UTHM" />

  </a>

### Show some ❤️ by starring this awesome repository!

</div>

## License

The Tutorial Website project is licensed under the [MIT License](LICENSE).
