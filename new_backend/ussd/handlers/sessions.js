// ------------------- SESSION HANDLING -------------------
const sessions = {};
function getSession(sessionId) {
  if (!sessions[sessionId])
    sessions[sessionId] = { step: "welcome", history: [] };
  return sessions[sessionId];
}
function goBack(session) {
  if (session.history.length > 0) session.step = session.history.pop();
}
function saveStep(session, step) {
  session.history.push(session.step);
  session.step = step;
}
function deleteSession(sessionId) {
  delete sessions[sessionId];
}

module.exports = { sessions, getSession, goBack, saveStep, deleteSession };
