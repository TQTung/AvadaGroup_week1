import { faker } from "@faker-js/faker";
import path from "path";
import fs from "fs";

const generateRandomData = (count) => {
  const data = [];
  for (let i = 1; i <= count; i++) {
    data.push({
      id: +i,
      name: faker.commerce.product(),
      product: faker.commerce.productMaterial(),
      image: faker.image.imageUrl(),
      color: faker.color.human(),
      price: +faker.commerce.price(),
      description: faker.commerce.productDescription(),
      createdAt: faker.date.anytime(),
    });
  }
  return data;
};

const saveDataToFile = (data, filename) => {
  const jsonContent = JSON.stringify({ data: data }, null, 2);
  const filePath = path.join("./src", "database", filename);

  fs.writeFileSync(filePath, jsonContent, "utf8");
};

if (!fs.existsSync(path.join("./src", "database"))) {
  fs.mkdirSync(path.join("./src/database", "database"));
}

const randomData = generateRandomData(1000);
saveDataToFile(randomData, "products.json");
