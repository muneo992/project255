<template>
  <div>
    <h1>Manufacturer Page</h1>
    <p>This is the page for: {{ manufacturer }}</p>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  // 動的ルートのパラメータを取得
  async asyncData({ params }) {
    // メーカーごとのデータ
    const manufacturers = {
      toyota: "Toyota is a Japanese automotive manufacturer.",
      honda: "Honda is known for its cars and motorcycles.",
    };

    // URL パラメータを取得
    const manufacturer = params.manufacturer;

    // データが存在しない場合は 404 エラーをスロー
    if (!manufacturers[manufacturer]) {
      throw new Error("Manufacturer not found");
    }

    // データを返す
    return {
      manufacturer,
      description: manufacturers[manufacturer],
    };
  },
};
</script>

