const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('/help | "알팡 ALPHANG" 봇의 도움말을 확인합니다.'),
	async execute(interaction, client) {
		console.log(`${interaction.user.tag}님이 help 명령어를 사용하셨습니다. (${interaction.user.id})`)
		const embed = new MessageEmbed().setColor('7FFFD4')
		embed.setTitle('**❓ "알팡 ALPHANG" 봇 도움말**')
		embed.setDescription("**```주요 명령어 소개```**")
		embed.addField("/commands", '"알팡 ALPHANG" 봇의 개발자를 확인합니다.', true)
		embed.addField("/help", '"알팡 ALPHANG" 봇의 도움말을 확인합니다.', true)
		embed.addField("/link", "버튼을 제작해 배포합니다.", true)
		embed.addField("/my-info", "자신의 정보를 확인합니다.", true)
        embed.addField("/ping", "봇의 상태 및 핑을 확인합니다.", true)
		embed.addField("/random", "고양이 또는 강아지의 이미지를 랜덤으로 불러옵니다.", true)
        embed.addField("/server-info", "서버의 정보를 확인합니다.", true)
		embed.addField("/setnick", '상대방 또는 자신의 닉네임을 변경합니다.\n>>> 이 명령어는 매우 불안정하며 봇의 권한 중 "별명 변경하기" 권한을 삭제하시는 것을 추천드립니다.', true)
		embed.addField("/say", "설정한 말을 봇이 복창합니다.", true)
        embed.setThumbnail("https://cdn.discordapp.com/app-icons/962596559743254549/b7841fa9cb9be2f6333ee7ff3ed04e6b.png")
		embed.setFooter({ text: `${interaction.user.tag}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp` })
		embed.setTimestamp()
		return interaction.reply({embeds: [embed]});
	},
};