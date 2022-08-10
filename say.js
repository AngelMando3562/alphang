const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('/say <말> | 설정한 말을 봇이 복창합니다.')
        .addStringOption(option => option.setName('말').setDescription('봇이 복창할 말을 설정해주세요.').setRequired(true)),
    async execute(interaction) {
        console.log(`${interaction.user.tag}님이 say 명령어를 사용하셨습니다. (${interaction.user.id})`)
        await interaction.deferReply().catch((err) => { });

        const say = interaction.options._hoistedOptions.find((f) => f.name === "말").value;
        
        const embed = new MessageEmbed().setColor('7FFFD4')
		embed.setTitle("**:speech_balloon: 보내는 중...**")
		embed.setDescription("***로딩 중...***")
		embed.setFooter({ text: `${interaction.user.tag}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp` })
		embed.setTimestamp()

        await interaction.editReply({ embeds: [embed] });
        await interaction.deleteReply();

        await interaction.channel.send({ content: say + `\n\n||<@${interaction.user.id}>님의 설정한 메시지||` });
    },
};