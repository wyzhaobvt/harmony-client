# Harmony

This is the client repo for the Harmony app built for Bay Valley Tech.

### Features
- Team management
- Team file management
- Team text chat
- Person to person text chat
- Video and audio chat
- Calendar sync with Google Calendar


## Setup

Run `npm install`

### Environment Config

- If maintaining this project, copy contents of `.env.local.example` to a new file named `.env.local`. Don't delete `.env.local.example`

- If cloning this project, you can rename `.env.local.example` to `.env.local` or follow the previous option

`VITE_SIGNALING_SERVER_ORIGIN` is only used when `import.meta.env.MODE !== "production"`. Used for connecting to a server not hosted on your machine. It should be the same as `VITE_SERVER_ORIGIN`, unless you want to connect to an external server.

```env
VITE_SERVER_ORIGIN="http://localhost:5000"
VITE_SIGNALING_SERVER_ORIGIN="http://localhost:5000"
```

### Server

Setup [server](https://github.com/Sillor/harmony-server)

## Running

Run `npm run dev` and open http://localhost:5173

## Building

Run `npm run build -- --outDir {your/server/directory}/dist`



## Maintaining

## Future

- Integrate Monaco Editor
  - file editing / viewing
- Dropdown menu on "Dashboard" button in sidebar
  - Lists all teams with chat and call buttons next their team name
- More customization options
  - theme editor
  - team background images
- Team project boards (kanban)
- Additions to profile page
- Video Call background blur
- Audio Call background noise cancellation
- Adjust users' audio volume in calls
- Calendar