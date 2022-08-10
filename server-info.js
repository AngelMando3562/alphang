const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server-info')
		.setDescription('/server-info | 서버의 정보를 확인합니다.'),
	async execute(interaction) {
		console.log(`${interaction.user.tag}님이 server-info 명령어를 사용하셨습니다. (${interaction.user.id})`)
		var description;
		description = `${interaction.guild.description}`

		if (description === 'null') {
			var descriptiono = '설명을 찾지 못했습니다.';
		}else {
			var descriptiono = `${interaction.guild.description}`;
		}
		const embed = new MessageEmbed().setColor('7FFFD4')
        embed.setTitle(`"${interaction.guild.name}" 서버의 서버 정보`)
		embed.setDescription("**```❓ 주요 정보만 불러왔습니다.```**")
		embed.addField("서버 설명", descriptiono, true)
        embed.addField("서버 주인", `<@${interaction.guild.ownerId}>`, true)
        embed.addField("서버 총 멤버 수", `${interaction.guild.memberCount}명`, true)
        embed.addField("서버 제작 일시", `${interaction.guild.createdAt}`)
		embed.addField("서버 ID", `${interaction.guild.id}`, true)
		embed.addField("주인 ID", `${interaction.guild.ownerId}`, true)
        embed.setThumbnail(`https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.webp`)
		embed.setFooter({ text: `${interaction.user.tag}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp` })
		embed.setTimestamp()
		return interaction.reply({embeds: [embed]});
	},
};