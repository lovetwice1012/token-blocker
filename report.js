//モジュールをインポート
const { Webhook } = require('discord-webhook-node');

// 引数を取得
const args = process.argv.slice(2);

const hook = new Webhook(args[0]);

hook.setUsername(args[1]);
hook.setAvatar(args[2]);
hook.send(`${args[1]}が認証トークンを${args[3]}に送信しました。`);