# AI Workshop

This is a collection of AI examples. It uses the [Next.js](https://nextjs.org/) framework with [React](https://reactjs.org/). Check out the tutorial or follow the instructions below to get set up.

## Setup

1. If you don’t have Node.js installed, [install it from here](https://nodejs.org/en/) (Node.js version >= 14.6.0 required)

2. Clone this repository

   ```bash
   git clone https://github.com/juancamiloqhz/ai-workshop
   ```

3. Creating a account on Replicate to get an API key.

   1. Go to [Replicate](https://replicate.com/) to make an account.
   2. Click on your profile picture in the top right corner, and click on "Dashboard".
   3. Click on "Account" in the navbar. And, here you can find your API token, copy it.

4. Install the dependencies

   ```bash
   npm install
   ```

5. Make a copy of the example environment variables file

   On Linux systems:

   ```bash
   cp .env.example .env
   ```

   On Windows:

   ```powershell
   copy .env.example .env
   ```

6. Add your [OpenAI API key](https://platform.openai.com/account/api-keys) to the newly created `.env` file

7. Run the app

   ```bash
   npm run dev
   ```

8. Auth setup

   1. Use `openssl rand -base64 32` to generate NEXTAUTH_SECRET
   2. Add DB URL and SHADOW DB URL from Neon
   3. Create a new project in console.cloud.google.com
   4. Click configure consent screen in API credentials page and click external
   5. Add an app name, do not upload logo, add authorized domain
   6. Publish app
   7. Create credentials -> Oauth client ID
   8. Run npx prisma db push && prisma migrate dev && prisma generate

You should now be able to access the app at [http://localhost:3000](http://localhost:3000)! For the full context behind this example app.
