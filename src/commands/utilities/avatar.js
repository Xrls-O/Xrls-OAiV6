module.exports = {
  name: "avatar",
  description: "Get the avatar of a user.",
  execute(client, message, args) {
    const user = message.mentions.users.first() || message.author;
    const avatarUrl = user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 });
    message.reply(`${user.username}'s avatar: ${avatarUrl}`);
  },
};
