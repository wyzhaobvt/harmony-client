# Harmony

This is the client repo for the Harmony app built for Bay Valley Tech.

### Features
- Team management
- Team file management
- Video and audio chat
- Team text chat
- Person to person text chat
- Calendar sync with Google Calendar


## Setup

Run `npm install`

### Environment Config

- If maintaining this project, copy contents of `.env.local.example` to a new file named `.env.local`. Don't delete `.env.local.example`

- If cloning this project, you can rename `.env.local.example` to `.env.local` or follow the previous option

`VITE_SIGNALING_SERVER_ORIGIN` is only used when `import.meta.env.MODE !== "production"`. Used for connecting to a server not hosted on your machine.

```env
VITE_SERVER_ORIGIN="http://localhost:5000"
VITE_SIGNALING_SERVER_ORIGIN="https://example.com/signaling"
```

### Server

Setup [server](https://github.com/Sillor/harmony-server)

## Running

Run `npm run dev`

By default the server runs on http://localhost:5173

## Building

Run `npm run build -- --outDir {your_server_directory}/dist`



## Maintaining

