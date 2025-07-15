
const API = "http://20.244.56.144/evaluation-service/logs";

const STACKS = ["backend", "frontend"];
const LEVELS = ["debug", "info", "warn", "error", "fatal"];
const MODULES = [
  "auth", "config", "middleware", "utils"
];

async function sendLog(a, b, c, d, token) {
  const valid =
    STACKS.indexOf(a) > -1 &&
    LEVELS.indexOf(b) > -1 &&
    MODULES.indexOf(c) > -1;

  if (!valid) return;

  const payload = { stack: a, level: b, package: c, message: d };

  try {
    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "log failed");
  } catch (e) {}
}

module.exports = sendLog;
