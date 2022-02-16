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
    const time = Date.now();
    this.sessions.set(id, { id, username, time });
    return this.findSessionById(id);
  }

  endSession(id) {
    this.sessions.delete(id);
  }

  isInvalidSession(id) {
    console.log("testar session validitiet");
    const curTime = Date.now();
    const oldTime = this.findSessionById(id).time;
    const timeDiff = (curTime - oldTime) / 1000;
    console.log("timeDiff on session: ", timeDiff);

    if (timeDiff > 10) {
      console.log("invalid, timeDiff: ", timeDiff);
      this.endSession(id);
      console.log("invaliderar session");
    }
    this.findSessionById(id).time = curTime;
    console.log("valid, timeDiff: ", timeDiff);
  }
}

export default new SessionManager();
