"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("tag", [
      {
        name: "エコツーリズム ",
        description: "自然環境を保護しながら楽しむ持続可能な旅行",
      },
      {
        name: "文化旅行",
        description: "地域の伝統や文化を体験する旅行",
      },
      {
        name: "リゾート",
        description: "快適な施設でリラックスできる贅沢な旅行",
      },
      {
        name: "レクリエーション ",
        description: "ストレス解消や楽しみを目的とした軽い旅行",
      },
      {
        name: "スポーツ",
        description: "スポーツ活動を中心に楽しむ旅行",
      },
      {
        name: "探検",
        description: "未知の場所や自然を探索する冒険的な旅行",
      },
      {
        name: "冒険",
        description: "スリルや挑戦を求めるアクティブな旅行",
      },
      {
        name: "コンビネーション",
        description: "複数の旅行スタイルを組み合わせた旅行",
      },
      {
        name: "家族旅行",
        description: "家族全員で楽しむ思い出作りのための旅行",
      },
      {
        name: "団体旅行",
        description: "グループで一緒に楽しむ計画的な旅行",
      },
      {
        name: "個人旅行",
        description: "自由な計画で自分のペースで楽しむ旅行",
      },
      {
        name: "ビーチ",
        description: "海辺でのんびり過ごすリフレッシュ旅行",
      },
      {
        name: "山",
        description: "山岳地帯で自然を楽しむ旅行",
      },
      {
        name: "都市",
        description: "都市の観光地やショッピングを楽しむ旅行",
      },
      {
        name: "田舎",
        description: "静かで自然豊かな農村地域を訪れる旅行",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("tag", null, {});
  },
};
