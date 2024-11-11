# DB Rank AI

## Project Overview
DB Rank AI offers users real-time data from Google Trends to compare various Database Management Systems (DBMS) such as Oracle, SQLite, MongoDB, MySQL, and more. The platform allows vendors to claim their DBMS and update its profile with key information. Users can explore rankings, scores, and detailed profiles of each DBMS, compare different systems, and utilize AI-powered tools (via OpenAI's API) to enhance their comparisons.

This project was developed using Laravel for the backend and React for the frontend. We also implemented Inertia for server-side rendering (SSR) to enhance SEO.

---

## Installation and Setup

### Prerequisites
- PHP >= 8.2
- Composer
- Node.js >= 20.16.0, NPM >= 10.8.1
- Laravel 11
- MySQL database
- OpenAI API Key (for AI-powered features)

### Setting Up the Project Locally

1. **Clone the Repository**
    ```bash
    git clone https://github.com/GodHad/db-rank-ai-seo.git
    ```

2. **Install Backend (Laravel)**

    - Install PHP dependencies:
        ```bash
        composer install
        ```

    - Set up the environment variables:
        ```bash
        cp .env.example .env
        ```
      Then, configure the `.env` file with your database credentials and OpenAI API key.

    - Run database migrations:
        ```bash
        php artisan migrate
        ```

3. **Install Frontend**

    - Install Node.js dependencies:
        ```bash
        npm install
        ```

4. **Run the Development Server**

    - Start the Laravel backend:
        ```bash
        php artisan serve
        ```

    - Start the React frontend:
        ```bash
        npm run dev
        ```

    - Start the Laravel queue worker for background jobs:
        ```bash
        php artisan queue:work
        ```

5. **Set up Weekly Trends Data Fetch**

    - To schedule weekly updates for trends data, set up a cron job as follows:
        ```bash
        0 12 * * 1 php artisan fetch:trends --all
        ```

6. **Run Inertia SSR Server**

    - Start the Inertia SSR server:
        ```bash
        php artisan inertia:start-ssr
        ```

---

That’s it! Your DB Rank AI platform is now set up and ready to go. Enjoy exploring and comparing different database systems!
