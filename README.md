# Forest Focus App 🌲
A productivity and focus app inspired by the “forest planting” concept. Users can stay focused during work/study sessions, earn virtual coins and trees, and track their progress over time.

---

## ✨ Features
* **User Authentication**: Sign up and log in using either email & password or Google OAuth, with secure JWT-based sessions.
* **Focus Sessions**: Start timed sessions and earn virtual coins and trees upon completion. Interrupt a session, and the tree is "burned," which you can remove later by spending coins.
* **Dashboard**: View your total trees planted and coins earned, see burned trees, and manage them.
* **Responsive UI**: A user-friendly interface that works well on all devices.

---

## 💻 Tech Stack
* **Frontend**: Next.js (App Router), React, Tailwind CSS
* **Authentication**: NextAuth v15, Google OAuth, Credentials
* **Database**: PostgreSQL, Prisma ORM
* **Security**: bcrypt for password hashing
* **Hosting**: Vercel (optional)

---

## 🚀 Installation
1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/yourusername/forest-focus-app.git](https://github.com/yourusername/forest-focus-app.git)
    cd forest-focus-app
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Create your `.env` file** with the following variables:
    ```
    DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    NEXTAUTH_SECRET=your_nextauth_secret
    ```
4.  **Run Prisma migrations**:
    ```bash
    npx prisma migrate dev --name init
    ```
5.  **Start the development server**:
    ```bash
    npm run dev
    ```
6.  Open your browser and navigate to `http://localhost:3000` to see the app.

---

## 🎨 Usage
1.  Go to the `/signup` or `/login` page.
2.  Create an account with your email and password or use Google.
3.  Start a focus session from the dashboard.
4.  Complete the session to earn coins and plant virtual trees.
5.  Track your progress, manage burned trees, and continue building your forest! 

---

## 📂 Folder Structure
forest-focus-app/
│
├─ app/
│  ├─ dashboard/        # Protected dashboard page
│  ├─ login/            # Login page
│  ├─ signup/           # Signup page
│  └─ api/auth/         # NextAuth route
│
├─ prisma/
│  └─ schema.prisma      # Database schema
│
├─ components/          # Reusable UI components
├─ public/              # Static assets
├─ styles/              # Tailwind / global styles
└─ package.json


---

## 📄 License
This project is open-source and free to use under the **MIT License**.
