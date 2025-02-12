// 20250212010101-demo-user.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Добавление тестовых данных
    await queryInterface.bulkInsert("companies", [
      { name: "daf" },
      { name: "ford" },
      { name: "iveco" },
      { name: "man" },
      { name: "mercedes-benz" },
      { name: "renault" },
      { name: "scania" },
      { name: "uaz" },
      { name: "volvo" },
    ]);

    await queryInterface.bulkInsert("mattress_types", [
      { type_name: "Ортопедический" },
      { type_name: "Пружинный" },
    ]);

    // Добавляем формы матрасов
    await queryInterface.bulkInsert("mattress_shapes", [
      {
        shape_name: "Квадратный",
        image:
          "https://avatars.mds.yandex.net/i?id=60249d907595756d7ea90223d06c62ede7d578769ed84a9e-11931026-images-thumbs&n=13",
      },
      {
        shape_name: "Круглый",
        image: "https://m.media-amazon.com/images/I/21bxmGySsbS._UY550_.jpg",
      },
    ]);

    // Добавляем матрасы
    await queryInterface.bulkInsert("mattresses", [
      {
        name: "Матрас 1",
        colors: ["Белый", "Серый"],
        material: "Пена",
        description: "Описание матраса 1",
        price: "10000",
        width: "90",
        length: "200",
        thickness: "20",
        rigidity: "Средняя",
        pictures_count: 3,
        company_id: 1,
        matress_type_id: 1,
        mattress_shape_id: 1,
      },
      {
        name: "Матрас 2",
        colors: ["Белый", "Серый"],
        material: "Пена",
        description: "Описание матраса 2",
        price: "100990",
        width: "90",
        length: "200",
        thickness: "20",
        rigidity: "Средняя",
        pictures_count: 2,
        company_id: 1,
        matress_type_id: 1,
        mattress_shape_id: 1,
      },
    ]);

    // Добавляем заказы
    await queryInterface.bulkInsert("orders", [
      {
        customer_name: "Петр Иванов",
        customer_phone: "+79001234567",
        customer_email: "petr@example.com",
        order_date: new Date(),
        quantity: 1,
        matress_id: 1,
      },
    ]);

    // Добавляем цвета к заказам
    await queryInterface.bulkInsert("order_colors", [
      { order_id: 1, matress_id: 1, color: "Белый" },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Удаление данных при откате сидера
    await queryInterface.bulkDelete("companies", null, {});
    await queryInterface.bulkDelete("mattress_types", null, {});
    await queryInterface.bulkDelete("mattress_shapes", null, {});
    await queryInterface.bulkDelete("mattresses", null, {});
    await queryInterface.bulkDelete("orders", null, {});
    await queryInterface.bulkDelete("order_colors", null, {});
  },
};
