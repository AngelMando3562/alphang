const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Collection, Collector } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('link')
		.setDescription('/link <링크> | 버튼을 제작해 배포합니다.')
        .addStringOption(option => option.setName('이름').setDescription('버튼의 이름을 설정해주세요.').setRequired(true))
        .addStringOption(option => option.setName('링크').setDescription('누를 시 이동될 링크를 설정해주세요.').setRequired(true)),
	async execute(interaction) {
		try {
			console.log(`${interaction.user.tag}님이 link 명령어를 사용하셨습니다. (${interaction.user.id})`)
        	const args = interaction.options._hoistedOptions;
        	console.log(args);
			let titles = args[0];
			let links = args[1];
			const link = links.value;
			const title = titles.value;
        	const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setURL(link)
						.setLabel(title)
						.setStyle('LINK'),
				);
			
			const embed = new MessageEmbed().setColor('7FFFD4')
			embed.setTitle("**:tools: 주문하신 버튼 나왔습니다!**")
			embed.setDescription("**```❗ 본 버튼은 반품 · 반송이 불가합니다.```**")
			embed.addField("인식된 이름", title, true)
			embed.addField("인식된 링크", link, true)
			embed.setFooter({ text: `${interaction.user.tag}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp` })
			embed.setTimestamp()

			await interaction.reply({ embeds: [embed], components: [row] });
		} catch (error) {
			const args = interaction.options._hoistedOptions;
        	console.log(args);
			let titles = args[0];
			let links = args[1];
			const link = links.value;
			const title = titles.value;
			console.error(error);
			const embed = new MessageEmbed().setColor("RED")
			embed.setTitle("에러 발생")
			embed.setDescription("**:exclamation: 에러가 발생하였습니다.**")
			embed.addField("왜 에러가 발생했나요?", "주로 링크를 잘못 입력하셔서 에러가 발생합니다.")
			embed.addField("올바른 링크 형식", "**http://**나 **https://**로 시작하는 링크\n예: *http://www.example.com* · *https://example.net*")
			embed.addField("인식된 이름", title, true)
			embed.addField("인식된 링크", link, true)
			embed.setFooter({ text: `${interaction.user.tag}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp` })
			embed.setTimestamp()
			return interaction.reply({embeds: [embed], ephemeral: true});
		}
	},
};