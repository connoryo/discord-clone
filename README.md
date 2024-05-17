# Discord Clone

An end-to-end fullstack and real-time discord clone with servers, channels, video calls, audio calls, editing and deleting messages, and member roles.

Key Features:

- Real-time messaging using Socket.io
- Send attachments as messages using UploadThing
- Delete & Edit messages in real time for all users
- Create Text, Audio and Video call Channels
- 1:1 conversation between members
- 1:1 video calls between members
- Member management (Kick, Role change Guest / Moderator)
- Unique invite link generation & full working invite system
- Infinite loading for messages in batches of 10 (@tanstack/query)
- Server creation and customization
- Beautiful UI using TailwindCSS and ShadcnUI
- Full responsivity and mobile UI
- Light / Dark mode
- Websocket fallback: Polling with alerts 
- ORM using Prisma
- MySQL database using Planetscale
- Authentication with Clerk

## Getting Started

### Clone the repo

```bash
git clone git@github.com:connoryo/discord-clone.git
```

### Install dependencies

```bash
npm install
```

### Setup .env file

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=

DATABASE_URL=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
NEXT_PUBLIC_LIVEKIT_URL=
```

### Setup Prisma

```bash
npx prisma generate
npx prisma db push
```

### Start the app

```bash
npm run dev
```

# Personal notes from the Tutorial

* shadcn/ui provides modular, installable UI components. Install them one-by-one from the [docs page](https://ui.shadcn.com/docs).
* Folders with () are organizational folders; they don't show up in the URL
* Folders with [[]] are catch-all segments; for example, sign-in/[[sign-in]] will catch any URLs of the form localhost/sign-in/*
* Instead of using PlanetScale, we're using a local MySQL database (localhost:3306), so make sure this is started on WSL.
* Start database with `sudo service mysql start`
* Also, TODO: don't hardcode in the database URL. Use env() instead
* Prisma is used for database connections; schema is in `prisma/schema.prisma`; no SQL commands were used to generate the database
* To regenerate the database: `npx prisma generate && npx prisma db push`
* To run the app: `npx run dev`
* GUI for modifying database: `npx prisma studio`
* For imports, if the files are in the same folder, no needs to replace ./ with @/
* When making sweeping changes to the database, it's a good idea to reset all data using `npx prisma migrate reset`, then regenerate and push as above
* Always put checks into the backend API; don't assume that just because it can't be called from the frontend that it cannot be called at all
* We can't deploy with Vercel since Vercel is serverless, and we are using web sockets. Therefore, we use Railway instead.

# Program Structure

* Initialize MySQL DB singleton connection upon app startup
* Use Clerk to log in a user
* If they have a Profile in the SQL table, load it. If not, create one.
* If the user has a server, load it on the homepage. Otherwise, show the "Create Server" UI.
* For server creation: upload image with UploadThing, pass the resulting URL + server name to the API using Axios
* When a 1-on-1 conversation is clicked: check if a conversation already exists. If not, create one from the current profile to the recipient

### Credit

Created using a tutorial from [Code with Antonio](https://www.youtube.com/watch?v=ZbX4Ok9YX94).