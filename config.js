require("dotenv").config();

export default {
  USER_URL: process.env.APP_URL + "/api/getUserInfo.php",
  UNIT_URL: process.env.APP_URL + "/api/getUnitInfo.php",
  SCORE_URL: (userId, unitId, score) =>
    `${process.env.APP_URL}/api/updateGameResult.php?type=html5game&uid=${userId}&unitid=${unitId}&qid=1&aid=${score}`,
  END_GAME_URL: (unitId) => `${process.env.APP_URL}/subui.php?id=${unitId}`,
};
