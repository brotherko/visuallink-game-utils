import axios from "axios";
import Config from "config.js";

const updateGameScore = (score) => {
  return new Promise((resolve, reject) =>
    axios
      .all([axios.get(`${Config.USER_URL}`), axios.get(`${Config.UNIT_URL}`)])
      .then((res) => {
        let [res_user, res_unit] = res;
        try {
          if (
            res_user.data.result != "success" ||
            res_unit.data.result != "success"
          ) {
            console.log(res_user, res_unit);
            throw Error("Server response but not success");
          } else {
            return {
              userId: res_user.data.userID,
              unitId: res_unit.data.unitid,
            };
          }
        } catch (e) {
          console.log(res_user, res_unit);
          throw Error(`The format from the response is not correct`);
        }
      })
      .then(({ userId, unitId }) => {
        let request_url = GameConfig.SCORE_URL(userId, unitId, score);
        return axios.get(request_url);
      })
      .then((res) => {
        if (res.data.result != "success") {
          console.log(res);
          throw Error("Server response but not success");
        }
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      })
  );
};
export { updateGameScore };
