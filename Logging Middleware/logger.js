
const LOG_API = "http://20.244.56.144/evaluation-service/logs";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbWFuZGlwdGFpdGlzQGdtYWlsLmNvbSIsImV4cCI6MTc1MjU2MzE2MywiaWF0IjoxNzUyNTYyMjYzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMzI2ZTYyOTYtN2E4Zi00ZjIxLWFmMDMtMGFmYmJiZTc0M2E4IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYW1hbiBkZWVwdGEiLCJzdWIiOiI1ZjI5NjA0NS01NTljLTQxMDUtYjA0Yy02OGQ5MGZkZmQzZjUifSwiZW1haWwiOiJhbWFuZGlwdGFpdGlzQGdtYWlsLmNvbSIsIm5hbWUiOiJhbWFuIGRlZXB0YSIsInJvbGxObyI6IjIyMTgzMDciLCJhY2Nlc3NDb2RlIjoiUUFoRFVyIiwiY2xpZW50SUQiOiI1ZjI5NjA0NS01NTljLTQxMDUtYjA0Yy02OGQ5MGZkZmQzZjUiLCJjbGllbnRTZWNyZXQiOiJ3Q2FEd2RTWGZqZFFHZHhKIn0.jq__Rg_IoGit1NSAbVGiL4ci-7lSWOY-z0ieIW4m4D8";

const STACK_TYPES = ["backend", "frontend"];
const LOG_LEVELS = ["debug", "info", "warn", "error", "fatal"];

const BACKEND_MODULES = [
  "cache", "controller", "cron_job", "db",
  "domain", "handler", "repository", "route", "service"
];
const FRONTEND_MODULES = [
  "api", "component", "hook", "page", "state", "style"
];
const BOTH_MODULES = ["auth", "config", "middleware", "utils"];

function check(stack, mod) {
  if (BOTH_MODULES.includes(mod)) return true;
  if (stack === "backend" && BACKEND_MODULES.includes(mod)) return true;
  if (stack === "frontend" && FRONTEND_MODULES.includes(mod)) return true;
  return false;
}

async function sendLog(stack, level, moduleName, logMessage) {
  const isValidStack = STACK_TYPES.includes(stack);
  const isValidLevel = LOG_LEVELS.includes(level);
  const isValidModule = check(stack, moduleName);

  if (!(isValidStack && isValidLevel && isValidModule)) return;
  const MAX_LENGTH = 48;

  const payload = {
    stack,
    level,
    package: moduleName,
    message: logMessage.slice(0, MAX_LENGTH)
  };

  try {
    const response = await fetch(LOG_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (!response.ok) {
      console.error(`[LOGGING ERROR ${response.status}]: ${JSON.stringify(result)}`);
      throw new Error(result.message || "Logging failed");
    }
  } catch (e) {
    console.error(`[LOGGING ERROR]: ${e.message}`);
  }
}

module.exports = sendLog;
