// ------------------- SESSION HANDLING -------------------
const sessions = {};
function getSession(sessionId) {
  if (!sessions[sessionId])
    sessions[sessionId] = { step: "authMenu", history: [] };
  return sessions[sessionId];
}

function goBack(session) {
  if (session.history && session.history.length > 1) {
    // remove current step
    session.history.pop();
    // set step to previous
    session.step = session.history[session.history.length - 1];
  }
}

function saveStep(session, step) {
  if (!session.history) session.history = [];
  if (session.step) session.history.push(session.step); // push current step
  session.step = step; // update to new step
}
function deleteSession(sessionId) {
  delete sessions[sessionId];
}

module.exports = { sessions, getSession, goBack, saveStep, deleteSession };
