const memes = [
  "https://i.imgur.com/a1Jz4.jpg",
  "https://i.imgur.com/bC2T3.jpg",
  "https://i.imgur.com/c3Q6f.jpg",
  "https://i.imgur.com/d4Z1g.jpg",
];

module.exports = {
  name: "meme",
  description: "Send a random meme.",
  execute(client, message) {
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    message.channel.send(`Aquí tienes un meme: ${randomMeme}`);
  },
};
