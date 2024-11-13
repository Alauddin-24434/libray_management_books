# Library Management System Backend

## Live URL: 
[https://libraybooks.vercel.app](https://libraybooks.vercel.app)

---

## Technology Stack & Packages:

### Backend
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web framework for building APIs
- **Prisma ORM**: Database management and query generation
- **PostgreSQL**: Relational database for data storage

### Packages
- `dotenv`: Manage environment variables
- `bcrypt`: Secure password hashing
- `cors`: Handle Cross-Origin Resource Sharing

---

## Setup Instructions:

### Step 1: Clone the Repository
To start, clone the repository using the following commands:

<pre>
git clone https://github.com/Alauddin-24434/libray_management_books.git
cd libray_management_books
</pre>

### 2.Install Dependencies
<pre>
npm install
</pre>

### 3. Configure Environment Variables
 Create a .env file in the root directory.
 Add the following variables:
 <pre>
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/libray_Management?schema=public"
NODE_ENV="development"
</pre>

### 4. Setup the Database
Ensure PostgreSQL is running locally or remotely.
Run Prisma migrations to set up the database schema:
<pre>
npx prisma migrate dev
</pre>
### 5. Generate Prisma Client
<pre>
npx prisma generate
</pre>
### 6. Run the Server:
<pre>
npm run dev
</pre>
The server will be available at http://localhost:5000.

# Key Features & Functionality
### Book Management

Add, view, update, and delete books.
Track available and total copies of each book.
Member Management

### Members.
View member details.

### Borrowing Records

Record book borrow and return dates.
View borrowing history of members.









