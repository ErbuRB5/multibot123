/*==========DISCORD.JS===========*/
const Discord = require('discord.js');
const bot = new Discord.Client();
/*==============================*/
const config = bot.config = require('./config.json'); // Global config file
console.log("[!] Starting bot...");
/*==============================*/

// Commands
const commands = {
	"help": {
		process: function (msg, suffix, embed) {
			const list = ["```perl",
			"v.help #Para enviar este mensaje",
			"v.join #Para entrar al canal de voz",
			"v.leave #Para salir del canal de voz",
			"v.play <rap/jazz/dubstep> #Para poner una radio especifica",
			"v.invite #Genera una invitacion para que puedas añadirme a otros servidores```",
			"Hey! Soy **PacmanBot**, un bot simple centrado en musica. Estoy siendo desarrollado por `~SirErbu~#2604`"]
			embed.setDescription(list);
			embed.setAuthor("Lista de comandos!", "https://cdn.discordapp.com/attachments/330739726321713153/451061091322298378/jajajaxdxdxd.png");
			embed.setColor("#b92727");
			msg.channel.send({ embed });
		}
  	},
	"join": {
		process: function (msg, suffix, embed) {
			if (!msg.member.voiceChannel) return msg.channel.send('<:tick:445752370324832256> No estas en un canal de voz.');
			if (!msg.member.voiceChannel.joinable) return msg.channel.send("<:tick:445752370324832256> No puedo reproducir musica en este canal de voz.");
			msg.member.voiceChannel.join().then(() => {
				embed.setDescription("<:tick2:445752599631888384> He entrado correctamente!");
				embed.setColor("#b92727");
				msg.channel.send({ embed });
        		});
		}
	},
	"leave": {
		process: function (msg, suffix) {
			if (!msg.member.hasPermission("MANAGE_GUILD")) return msg.channel.send("<:tick:445752370324832256> No tienes suficientes permisos.");
			msg.member.voiceChannel.leave().then(() => {
				embed.setDescription("<:tick2:445752599631888384> He entrado correctamente!");
				embed.setColor("#b92727");
				msg.channel.send({ embed });
			}).catch(() => "<:tick:445752370324832256> No estoy en un canal de voz.");
		}
	},
	"play": {
		process: function (msg, suffix, embed) {
			if (!msg.member.voiceChannel) return msg.channel.send('<:tick:445752370324832256> No estas en un canal de voz.');
			if (!msg.member.voiceChannel.joinable) return msg.channel.send("<:tick:445752370324832256> No puedo reproducir musica en este canal.");
			if (!suffix) {
				embed.setDescription("• Inserta una radio disponible.\n\n`[-]` **Radios disponibles:** `Rap, jazz & dubstep`");
				embed.setColor("#b92727");
				return msg.channel.send({ embed });
			}
			let radio; // Empty Variable
			if (suffix.toLowerCase() == "rap") {
				radio = "A-RAP-FM-WEB";
			} else if (suffix.toLowerCase() == "jazz") {
				radio = "WineFarmAndTouristradio";
			} else if (suffix.toLowerCase() == "dubstep") {
				radio = "ELECTROPOP-MUSIC";
			} else {
				embed.setDescription("• Inserta una radio disponible.\n\n`[-]` **Radios disponibles:** `Rap, jazz & dubstep`");
				embed.setColor("#b92727");
				return msg.channel.send({ embed });
			}
			msg.member.voiceChannel.join().then(connection => {
				require('http').get("http://streaming.radionomy.com/" + radio, (res) => {
					connection.playStream(res);
					embed.setColor("#b92727");
					embed.setDescription("<:tick2:445752599631888384> Playing correctly!");
					msg.channel.send({ embed });
				});
			}).catch(err => "<:tick:445752370324832256> **Error:** ```\n" + err + "```");
			}
	},
	"invite": {
		process: function (msg, suffix) {
			embed.setDescription("**Link de invitacion:** `https://discordapp.com/api/oauth2/authorize?client_id=357584581530222592&permissions=8&scope=bot");
      			embed.setColor("#b92727");
     			msg.channel.send({ embed });
		}
	}
	"kick": {
process: function(msg,suffic) {
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member.kick('Optional reason that will display in the audit logs').then(() => {
          // We let the message author know we were able to kick the person
          message.reply(`Successfully kicked ${user.tag}`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to kick the member,
          // either due to missing permissions or role hierarchy
          message.reply('I was unable to kick the member');
          // Log the error
          console.error(err);
        }});
      } else {
        // The mentioned user isn't in this guild
        message.reply('That user isn\'t in this guild!');
      }
    // Otherwise, if no user was mentioned
    } else {
      message.reply('You didn\'t mention the user to kick!');
    }
  }
});

};

// Ready Event
bot.on("ready", function () {
	console.log("[*] Estoy en " + bot.guilds.array().length + " servidores!");
	setInterval(function() {
  		bot.user.setActivity(config.prefix + "help | " + bot.guilds.array().length + " servidores!");
  	}, 100000)
});

// Command System
bot.on('message', function (msg) {
	if (msg.content.indexOf(config.prefix) === 0) {
		console.log(`(${msg.guild.name}) ${msg.author.tag}: ${msg.content}`); // Command logger

      		const command = msg.content.split(" ")[0].substring(config.prefix.length); // Command
      		const suffix = msg.content.substring(command.length + config.prefix.length + 1); // Arguments
      		const embed = new Discord.RichEmbed(); // Gets Rich Embed
		const channel = member.guild.channels.find(ch => ch.name === 'member-log');
  // Do nothing if the channel wasn't found on this server
 		 if (!channel) return;
  // Send the message, mentioning the member
 		 channel.send(`Bienvenido al servidor, ${member}`);
      		if (!commands[command]) return; // Return if the command doesn't exists
      		try {
			commands[command].process(msg, suffix, embed); // Execute the command
      		} catch(err) { // Catch an error
        		msg.channel.send({embed: {"description": "<:tick:445752370324832256> **Error:** ```\n" + err + "```", "color": 0xff0000}});
      		}
	}
});

bot.login(config.token);
