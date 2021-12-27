// ファイルの読み込み
const config = require("./config.json");

// configの読み込み
const prefix = config.prefix;
const token = config.token;
const logch = config.logch;

// Discord bot パッケージの読み込み
const discord = require("discord.js");

// client のインスタンス作成
const client = new discord.Client({ ws: { intents: discord.Intents.ALL } });
// version profile
client.on("ready", () => {
  client.user.setActivity(
    `トークン消すよ〜`
  );
  console.log(`${client.user.tag} にログインしました。`)
});


// コマンド
client.on("message", async message => {
  // Tokenを検知して削除
  if (message.content.match(/ODk/)) {
    console.log(`${message.channel.name}(${message.guild.name})に${message.author.tag}(${message.author.id})がトークンを送信しました。`);
    const report = await message.channel.send('Discord Tokenを検知しました。');
    await report.delete({ timeout: 5000 });
    await message.guild.owner.send(`${message.author.tag}が認証トークンを${message.channel.name}に送信しました。`)
    message.delete();
  }
});

// Tokenがセットされているか確認
if (token == undefined) {
  console.log("please set config:token");
  process.exit(0);
}

client.login(token)