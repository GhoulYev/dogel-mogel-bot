# DOGEL MOGEL BOT FOR TELEGRAM

#### Telegram bot to monitor dogel-mogel gift on tonnel

The first step is to clone this repository to your machine

```
$ git clone https://github.com/ghoulyev/dogel-mogel-bot
```

After that, open the project directory

```
$ cd dogel-mogel-bot
```

Then execute the command

```
$ npm install && npm install typescript
```

Open data.json and fill in the `TELEGRAM_TOKEN` and `auth` fields

`TELEGRAM_TOKEN` - Your Telegram bot token
`auth` - Authorization token on tonnel. It should be taken from the request in the request inspector

After all this is done, run the following command

```
$ npx run build
```

Have fun. [For questions (Telegram)](https://t.me/qothboi "open telegram").
