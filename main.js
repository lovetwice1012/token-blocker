// マルチプロセス
const { exec } = require('child_process');

// ファイルの読み込み
const config = require("./config.json");

// configの読み込み
const token = config.token;
const URL = config.reportWebHook;

// Discord bot パッケージの読み込み
const discord = require("discord.js");

// client のインスタンス作成
const client = new discord.Client({ ws: { intents: discord.Intents.ALL } });
// version profile
client.on("ready", () => {
  client.user.setActivity(
    `トークンを使用した荒らしに特化した対策ボットです`
  );
  console.log(`${client.user.tag} にログインしました。`)
});


// コマンド
client.on("message", async message => {
  // Tokenを検知して削除
  if (message.content.match(/[\w\W]{24}.[\w\W]{6}.[\w\W]{27}/)) {
    console.log(`${message.channel.name}(${message.guild.name})に${message.author.tag}(${message.author.id})がトークンを送信しました。`);
    message.delete();
    exec("node ./report.js "+config.URL+" "+message.author.tag+" "+message.author.avatarURL()+" "+message.channel.name)
  }
});

// Tokenがセットされているか確認
if (token == undefined) {
  console.log("please set config:token");
  process.exit(0);
}

client.login(token)