## Offline-First React App

### This is still work in progress. I want to implement the following features

- [x] React-query managed state
- [x] Backend using telefunc
- [x] Diffing logic
- [x] Create
- [x] Delete
- [ ] Update
- [ ] Proper database
- [ ] Styling
- [ ] Electron application?
- [ ] Add versions for updates?
- [ ] Possibility to see older versions
- [ ] Diff view

### Technologies used

- [Vike](https://vike.dev) for full-stack setup with one command
- [React](https://reactjs.org/)
- [React Query](https://react-query.tanstack.com/) to handle data fetching

### How the state diffing is handled?

The server and client talk to each other using actions. These actions are of the following structure:

```typescript
type Action =
  | { type: "update" | "create"; text: string; id: string }
  | { type: "delete"; id: string };
```

To get the state of the application, client runs the actions in order and calculates the current state.

If multiple users write to the server at the same time, then the actions are simply merged. With two caviates:

- Item existance should start with creation
- You cannot write to item that was deleted

So if person A, edits the item, while person B deletes it. And both commit two the server no matter the order. After sync with the server the item will be deleted.

### Downsides with the approach

- We are storing redundant data (even though it can be a nice feature if you want version control).
- All calculations are left to be done by the front-end.
  - This can be improved by having backend calculate the last state and calculating further states by updating from that point instead of beggining.
- As with all offline-first application the client needs to download all data (doesn't matter in this simple example)
- Ids are generated on client.
- As updates are not versioned, with the situtation described above, the edits will get deleted if person A syncs after person B. I am aiming to solve this later.

## Getting started

```bash
 $ pnpm install
 $ pnpm run dev
```

This will start the server and the client on http://localhost:3000
