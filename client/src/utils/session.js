// utils/session.js
function getSessionId() {
  let sessionId = localStorage.getItem("session_id");
  if (!sessionId) {
    sessionId = "guest_" + Date.now(); // or uuid
    localStorage.setItem("session_id", sessionId);
  }
  return sessionId;
}
export default getSessionId;
