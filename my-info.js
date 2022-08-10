const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('my-info')
		.setDescription('/my-info | 자신의 정보를 확인합니다.'),
	async execute(interaction) {
		console.log(`${interaction.user.tag}님이 my-info 명령어를 사용하셨습니다. (${interaction.user.id})`)
		var bot;
		bot = `${interaction.user.bot}`

		if (bot === 'true') {
			var ckbot = '🤖 로봇';
		}else if (bot === 'false') {
			var ckbot = '😀 인간';
		}else {
			var ckbot = '🚫 감지 실패';
		}
		const embed = new MessageEmbed().setColor('7FFFD4')
		embed.setAuthor("개인정보보호 겸으로 비공개 처리되었습니다.")
        embed.setTitle(`"${interaction.user.username}"님의 정보`)
		embed.setDescription("**```❓ 주요 정보만 불러왔습니다.```**")
		embed.addField("유저 태그", `${interaction.user.tag}`, true)
        embed.addField("유저 ID", `${interaction.user.id}`, true)
        embed.addField("유저 구분", ckbot, true)
        embed.addField("유저 가입 시간", `${interaction.user.createdAt}`)
        embed.setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp`)
		embed.setTimestamp()
		embed.setFooter({ text: `${interaction.user.tag}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp` })
		return interaction.reply({embeds: [embed], ephemeral: true});
	},
};