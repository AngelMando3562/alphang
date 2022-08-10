const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random')
        .setDescription('/random | 고양이 또는 강아지의 이미지를 랜덤으로 불러옵니다.')
        .addSubcommand(subcommand =>
            subcommand
                .setName("cat")
                .setDescription("/random cat | 랜덤한 고양이 이미지를 불러옵니다."))
        .addSubcommand(subcommand =>
            subcommand
                .setName("dog")
                .setDescription("/random dog | 랜덤한 강아지 이미지를 불러옵니다.")),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === "cat") {
            console.log(`${interaction.user.tag}님이 random cat 명령어를 사용하셨습니다. (${interaction.user.id})`)
            const apiKey = "258cf474-4e7f-4b15-b45d-6aec6ad191c3";
            await interaction.deferReply().catch(_ => { });

            const fetchAPI = async () => {
                const response = await fetch(`https://api.thecatapi.com/v1/images/search`, {
                    method: "GET",
                    headers: { "x-api-key": apiKey }
                })

                const jsonresp = await response.json();
                return await jsonresp[0].url;
            }

            const embed = new MessageEmbed().setColor('7FFFD4');
            embed.setTitle(":cat: 랜덤 고양이 이미지")
            embed.setFooter({ text: `${interaction.user.tag}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp` })
            embed.setTimestamp()
            embed.setImage(await fetchAPI())
            await interaction.editReply({ embeds: [embed] })
        } else if (interaction.options.getSubcommand() === "dog") {
            console.log(`${interaction.user.tag}님이 random dog 명령어를 사용하셨습니다. (${interaction.user.id})`)
            const apiKey = "849b9fc9-6b91-4496-a471-bda3b9a0bdec";
            await interaction.deferReply().catch(_ => { });

            const fetchAPI = async () => {
                const response = await fetch(`https://api.thedogapi.com/v1/images/search`, {
                    method: "GET",
                    headers: { "x-api-key": apiKey }
                })

                const jsonresp = await response.json();
                return await jsonresp[0].url;
            }

            const embed = new MessageEmbed().setColor('7FFFD4');
            embed.setTitle(":dog: 랜덤 강아지 이미지")
            embed.setFooter({ text: `${interaction.user.tag}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp` })
            embed.setTimestamp()
            embed.setImage(await fetchAPI())
            await interaction.editReply({ embeds: [embed] })
        }
    },
};