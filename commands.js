const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('commands')
		.setDescription('/commands | "알팡 ALPHANG" 봇의 개발자를 확인합니다.'),
	async execute(interaction) {
		console.log(`${interaction.user.tag}님이 commands 명령어를 사용하셨습니다. (${interaction.user.id})`)
		interaction.reply({ content: `**천사만두 #4731**\n*<@${interaction.user.id}>*`, ephemeral: true })
	},
};