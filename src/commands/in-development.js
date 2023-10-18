export async function indicateDevelopment(interaction) {
    try {
        if (verifyReady(interaction) === "true") {
            await reply(interaction);
            renameThread(interaction);
            // updateStatusInExcel();
        } else if (verifyReady(interaction) === "declined") {
            interaction.reply('Can\'t develop request that has been declined');
        } else {
            interaction.reply({content: 'Error: I was not able to validate whether this post has been approved yet. Remember, use /fixing for bugs', ephemeral: true});
        }
    } catch (error) {
        console.error(error);
    }
}

function verifyReady(interaction) {
    const forumPost = interaction.channel;
    const forumPostName = forumPost.name;
    const titlePrefix = forumPostName.slice(0, 9);
    if (titlePrefix === '✅ [vtop-F' || titlePrefix === '✅ [vtop-I') {
        return "true";
    } else if (titlePrefix === '❌ [vtop-F' || titlePrefix === '❌ [vtop-I') {
        return "declined"
    } else {
        return false;
    }
}

function renameThread(interaction) {
    const forumPost = interaction.channel;
    const forumPostName = forumPost.name;
    const truePostName = forumPostName.slice(2)
    const newPostName = "🛠️ " + truePostName;
    forumPost.setName(newPostName);
}

function reply(interaction) {
    const reporter = interaction.options.getUser('reporter');
    const forumPost = interaction.channel;
    const forumPostName = forumPost.name;
    const titlePrefix = forumPostName.slice(0, 9);
    let type;
    if (titlePrefix === "✅ [vtop-F") {
        type = 'feature request';
    } else if (titlePrefix === "✅ [vtop-I") {
        type = 'improvement request';
    } else if (titlePrefix === "🪳 [vtop-") {
        type = 'bug report';
    }
    interaction.reply(`${reporter}, vtop developers have begun development on your ${type}. You can expect to see it live in the next release.`);
}

function updateStatusInExcel() {
    // needs code
}

