import sendLog from "../../../Logging Middleware/logger"

export const logActivity = async (app, level, layer, message) => {
  try {
    await sendLog(app, level, layer, message)
  } catch (e) {}
}
