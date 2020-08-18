const Discord = require('discord.js');
const bot  = new Discord.Client();
const ms = require('ms');

const token = 'NzQ0OTY3ODg4NjQ5MzIyNTY4.Xzq7aQ.OCHDsV3AmgNPW_z6uK3J9YCN2Iw';

const PREFIX = '!';
var version = '1.0.0';

bot.on('ready',() => {
	console.log('Bot online');
});

bot.on('message', message=> {

	let args = message.content.substring(PREFIX.length).split(' ');

	switch( args[0] ) {
		case 'mute':
			let person = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]))
			if(!person) return message.reply('Não encontrei este membro');

			let mainrole = message.guild.roles.cache.find(role => role.name === 'newbie');
			let muterole = message.guild.roles.cache.find(role => role.name === 'mute');

			if(!muterole) return message.reply('Não encontrei esse grupo "mute"');

			let time = args[2];
			if(!time) {
				return message.reply('Não foi especificado um tempo para o mute');
			}

			person.roles.remove(mainrole.id);
			person.roles.add(muterole.id);

			message.channel.send(`@${person.user.tag} foi silenciado por ${ms(ms(time))}`);

			setTimeout(function(){
                person.roles.add(mainrole.id)
                person.roles.remove(muterole.id)
                message.channel.send(`@${person.user.tag} was unmuted`)
            }, ms(time));

 


		break;
	}
});

bot.login( token );