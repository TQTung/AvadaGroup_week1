import fs from "fs";
import { pathToFileProductJson } from "../constant/path.js";

const getDataFromDatabase = () => {
  const dataProductJson = fs.readFileSync(pathToFileProductJson, "utf8");
  const dataProductParser = JSON.parse(dataProductJson);
  return dataProductParser.data;
};

const saveDataIntoDatabase = (datas) => {
  fs.writeFileSync(
    pathToFileProductJson,
    JSON.stringify({
      data: datas,
    })
  );
};

export { getDataFromDatabase, saveDataIntoDatabase };
