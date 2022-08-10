const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('/ping | 봇의 상태 및 핑을 확인합니다.'),
	async execute(interaction, client) {
		console.log(`${interaction.user.tag}님이 ping 명령어를 사용하셨습니다. (${interaction.user.id})`)
		const loadembed = new MessageEmbed().setColor('7FFFD4')
		loadembed.setTitle("**:ping_pong: 퐁!**")
		loadembed.setDescription("***로딩 중...***")
		loadembed.setFooter({ text: `${interaction.user.tag}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp` })
		loadembed.setTimestamp()
		const sent = await interaction.reply({ embeds: [loadembed], fetchReply: true });
		const embed = new MessageEmbed().setColor('7FFFD4')
		embed.setTitle("**:ping_pong: 퐁!**")
		embed.setDescription("**```봇 반응 속도: Websocket Latency\n메시지 반응 속도: Bot Latency```**")
		embed.addField("봇 반응 속도", `${interaction.client.ws.ping}ms`, true)
		embed.addField("메시지 반응 속도", `${sent.createdTimestamp - interaction.createdTimestamp}ms`, true)
		embed.setFooter({ text: `${interaction.user.tag}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp` })
		embed.setTimestamp()
		return interaction.editReply({embeds: [embed]});
	},
};