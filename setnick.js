const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Interaction, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setnick')
        .setDescription('/setnick <유저> <닉네임> | 입력한 유저의 닉네임을 변경합니다.')
        .addUserOption(option => option.setName('유저').setDescription('유저를 선택해주세요.').setRequired(true))
        .addStringOption(option => option.setName('닉네임').setDescription('닉네임을 설정해주세요.').setRequired(true)),
    async execute(interaction) {
        console.log(`${interaction.user.tag}님이 setnick 명령어를 사용하셨습니다. (${interaction.user.id})`)
        const args = interaction.options._hoistedOptions;

        const user = args.find(x => x.name === "유저");
        const nickname = args.find(x => x.name === "닉네임");

        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES)) {
            const embed = new MessageEmbed().setColor("RED")
            embed.setTitle("**:x: 권한 없음**")
			embed.setDescription(`**${user.member.toString()}님의 닉네임을 변경하실 권한이 없습니다.**`)
			embed.setFooter({ text: `${interaction.user.tag}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp` })
			embed.setTimestamp()
            return interaction.reply({ embeds: [embed] })
        }
        const embed = new MessageEmbed().setColor('7FFFD4')

        const oldNick = user.member.nickname ? user.member.nickname : user.member.user.username;

        await user.member.setNickname(nickname.value);

        embed.setTitle("**:white_check_mark: 닉네임 변경 완료**")
        embed.setDescription(`**${user.member.toString()}님의 닉네임이 성공적으로 변경되었습니다.**`)
        embed.addField("이전 닉네임", oldNick, true)
        embed.addField("현재 닉네임", nickname.value, true)
        embed.setFooter({ text: `${interaction.user.tag}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp` })
        embed.setTimestamp()
        await interaction.reply({ embeds: [embed] });
    },
};