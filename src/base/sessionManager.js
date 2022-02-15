import { v4 as uuidv4 } from "uuid";

class SessionManager {
  constructor() {
    this.sessions = new Map();
  }

  sessionExists(id) {
    return this.sessions.has(id);
  }

  findSessionById(id) {
    return this.sessions.get(id);
  }

  createNewSession(username) {
    console.log("skapar session");
    const id = uuidv4();
    this.sessions.set(id, { id, username });
    return this.findSessionById(id);
  }
}

export default new SessionManager();
