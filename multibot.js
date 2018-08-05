const Discord = require("discord.js");
const  client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
   console.log("Estoy listo!");
   client.user.setGame(`mb.help | ${client.guilds.size} servidores`);
});
var prefix = config.prefix;

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

client.on("message", (message) => {
  if (!message.content.startsWith(config.prefix)) return;
  if (message.author.bot) return;
  

  //mb.ping


  if (message.content.startsWith(prefix + "ping")) {

    let mensajes = Date.now() - message.createdTimestamp;
    let ping = Math.floor(message.client.ping);
    
    message.channel.send(":ping_pong: Pong!")
      .then(m => {

          m.edit(`:incoming_envelope: Ping respuesta: \`${Math.floor(mensajes/100)} ms\`\n:satellite_orbital: Ping DiscordAPI: \`${ping} ms\``);
      
      });
    
  }

    /////////////////////////////////////////////////////////////////////////////

    //mb.help

  if(message.content.startsWith(prefix + 'help')){

    message.channel.send('**'+message.author.username+'**, mira tus mensajes privados.');
    message.author.send({embed: {
      color: 3447003,
      author: {
          name: "MultiBot Help",
          icon_url: client.user.avatarURL
      },
      fields: [{
          name: "**mb.ping**",
          value: "*Muestra el tiempo de respuesta del bot.*"
        },
        {
          name: "**mb.help**",
          value: "*Muestra este menú.*"
        },
        {
          name: "**mb.server**",
          value: "Muestra las estadísticas del servidor."
        },
        {
          name: "**mb.avatar [usuario]**",
          value: "*Muestra la foto de perfil de un usuario.*"
        },
        {
          name: "**mb.join**",
          value: "*Entra al canal de voz en el que estés.*"
        },
        {
          name: "**mb.leave**",
          value: "*Sale del canal de voz.*"
        },
        {
          name: "**mb.ytplay [URL]**",
          value: "*Reproduce una URL de YouTube.*"
        },
        {
          name: "**mb.say [mensaje]**",
          value: "*Dice el mensaje que le indiques.*"
        },
        {
          name: "**mb.addrole [usuario] [nombre del role]**",
          value: "*Añade un role a un usuario específico.*"
        },
        {
          name: "**mb.rolemembers [nombre del role]**",
          value: "*Muestra los usuarios pertenecientes a un rol específico.*"
        },
        {
          name: "**mb.radio**",
          value: "*Reproduce una radio aleatoria.*"
        },
        {
          name: "**mb.embed [mensaje]**",
          value: "*Genera un emblema con el mensaje que le indiques.*"
        },
        {
          name: "**mb.user [usuario]**",
          value: "*Muestra información sobre un usuario en específico.*"
        },

      ],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "MultiBot by ErbuRB5"
      }
    }
});
}


if(message.content.startsWith(prefix + 'server')){

    var server = message.guild;
  
    const embed = new Discord.RichEmbed()
    .setThumbnail(server.iconURL)
    .setAuthor(server.name, server.iconURL)
    .addField('ID', server.id, true)
    .addField('Region', server.region, true)
    .addField('Creado el', server.joinedAt.toDateString(), true)
    .addField('Dueño del Servidor', server.owner.user.username+'#'+server.owner.user.discriminator+' ('+server.owner.user.id +')', true)
    .addField('Miembros', server.memberCount, true)
    .addField('Roles', server.roles.size, true)
    .setColor(0x66b3ff)
    
   message.channel.send({ embed });

  }

  if(message.content.startsWith(prefix + 'avatar')){

      let img = message.mentions.users.first()
      if (!img) {

          const embed = new Discord.RichEmbed()
          .setImage(`${message.author.avatarURL}`)
          .setColor(0x66b3ff)
          .setFooter(`Avatar de ${message.author.username}#${message.author.discriminator}`);
          message.channel.send({ embed });

      } else if (img.avatarURL === null) {

          message.channel.sendMessage("El usuario ("+ img.username +") no tiene avatar!");

      } else {

          const embed = new Discord.RichEmbed()
          .setImage(`${img.avatarURL}`)
          .setColor(0x66b3ff)
          .setFooter(`Avatar de ${img.username}#${img.discriminator}`);
          message.channel.send({ embed });

      };

  }


  /////////////////////////////////////////////////////////////////////////////

  //mb.join

if (message.content. startsWith(prefix + 'join')) { 
    let Canalvoz = message.member.voiceChannel;
    if (!Canalvoz || Canalvoz.type !== 'voice') {
    message.channel.send('¡Necesitas unirte a un canal de voz primero!.').catch(error => message.channel.send(error));
    } else if (message.guild.voiceConnection) {
    message.channel.send('Ya estoy conectado en un canal de voz.');
    } else {
     message.channel.send('Conectando...').then(m => {
          Canalvoz.join().then(() => {
               m.edit(':white_check_mark: | Conectado exitosamente.').catch(error => message.channel.send(error));
         }).catch(error => message.channel.send(error));
     }).catch(error => message.channel.send(error));
    }


}

  /////////////////////////////////////////////////////////////////////////////
  
  //mb.leave

  if (message.content.startsWith(prefix + 'leave')) { 
    let Canalvoz = message.member.voiceChannel;
    if (!Canalvoz) {
        message.channel.send('No estoy en un canal de voz.');
    } else {
        message.channel.send('Dejando el canal de voz.').then(() => {
        Canalvoz.leave();
        }).catch(error => message.channel.send(error));
    }   
}

  /////////////////////////////////////////////////////////////////////////////

  // mb.ytplay

  if (message.content.startsWith(prefix + 'ytplay')) {
    const ytdl = require('ytdl-core');

    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
    if(!args) return message.channel.send('Ingrese un enlace de youtube para poder reproducirlo.');
    voiceChannel.join()
      .then(connection => {
        const url = ytdl(args, { filter : 'audioonly' });
        const dispatcher = connection.playStream(url);
        message.channel.send('Reproduciendo ahora: '+ args);
        message.delete();
      })
      .catch(console.error);
  }

  /////////////////////////////////////////////////////////////////////////////

  // mb.say

  if(message.content.startsWith(prefix + 'say')){
    const content = message.content.split(' ').slice(1);
    const args = content.join(' ');
    if(!args) return message.channel.send(`¿Qué digo?`);
    message.channel.send(`${args}`);

  }

      /////////////////////////////////////////////////////////////////////////////

      // mb.addrol

  if(message.content.startsWith(prefix + 'addrol')){

    const content = message.content.split(' ').slice(1);
    const args = content.join(' ');

    let miembro = message.mentions.members.first();
    let nombrerol = args.split(' ').slice(1).join(' ');

    let role = message.guild.roles.find("name", nombrerol);
    let perms = message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS");

    if(!perms) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
     
    if(message.mentions.users.size < 1) return message.reply('Debe mencionar a un miembro.').catch(console.error);
    if(!nombrerol) return message.channel.send('Escriba el nombre del rol a agregar, `-addrol @username [rol]`');
    if(!role) return message.channel.send('Rol no encontrado en el servidor.');
    
    miembro.addRole(role).catch(console.error);
    message.channel.send(`El rol **${role.name}** fue agregado correctamente a **${miembro.user.username}**.`);
  }

    /////////////////////////////////////////////////////////////////////////////

    // mb.user

    if(message.content.startsWith(prefix + 'user')){
    let userm = message.mentions.users.first()
    if(!userm){
      var user = message.author;
      
        const embed = new Discord.RichEmbed()
        .setThumbnail(user.avatarURL)
        .setAuthor(user.username+'#'+user.discriminator, user.avatarURL)
        .addField('Jugando a', user.presence.game != null ? user.presence.game.name : "Nada", true)
        .addField('ID', user.id, true)
        .addField('Estado', user.presence.status, true)
        .addField('Apodo', message.member.nickname, true)
        .addField('Cuenta Creada', user.createdAt.toDateString(), true)
        .addField('Fecha de Ingreso', message.member.joinedAt.toDateString())
        .addField('Roles', message.member.roles.map(roles => `\`${roles.name}\``).join(', '))
        .setColor(0x66b3ff)
        
       message.channel.send({ embed });
    }else{
      const embed = new Discord.RichEmbed()
      .setThumbnail(userm.avatarURL)
      .setAuthor(userm.username+'#'+userm.discriminator, userm.avatarURL)
      .addField('Jugando a', userm.presence.game != null ? userm.presence.game.name : "Nada", true)
      .addField('ID', userm.id, true)
      .addField('Estado', userm.presence.status, true)
      .addField('Cuenta Creada', userm.createdAt.toDateString(), true)
      .setColor(0x66b3ff)
      
     message.channel.send({ embed });
    }
    
  }

  /////////////////////////////////////////////////////////////////////////////
  if (message.content.startsWith(prefix +"setGame")) {
  const content = message.content.split(' ').slice(1);
  const args = content.join(' ');
  client.user.setGame(`${args}`);
  message.channel.send(`:white_check_mark: | Mi estado ha sido cambiado a **${args}**.`);

}
     

    //mb.hola

  if (message.content.startsWith(prefix +"hola")) {
    message.channel.send("Hola que tal?");
  }

    /////////////////////////////////////////////////////////////////////////////
     
     // mb.rolemembers
    if(message.content.startsWith(prefix + 'rolemembers')){
    const content = message.content.split(' ').slice(1);
    const args = content.join(' ');
    if(!args) return message.channel.send('Ingrese nombre del rol.');
    let rol = message.guild.roles.find("name", args);
    if(!rol) return message.channel.send('Rol no encontrado en el servidor.');
    let miembroroles = message.guild.roles.get(rol.id).members;
    message.channel.send(`Tienes a **${miembroroles.size}** miembro(s) con el rol **${args}**.`);
    
  }

 if (message.content.startsWith(prefix + 'radio')) {
    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!');
        voiceChannel.join().then(conexion =>{
        conexion.playStream('http://stream.electroradio.fm:80/192k/;');
        message.channel.send('Radio electro activado.')
        return;
      })
      .catch(console.error);
  }
 /////////////////////////////////////////////////////////////////////////////

    //mb.embed

  if (message.content.startsWith(prefix +"embed")){
    const content = message.content.split(' ').slice(1);
    const args = content.join(' ');
    message.channel.send({embed: {
      color: 3447003,
      description: `${args}`
    }});

      /////////////////////////////////////////////////////////////////////////////



}

});

client.login(config.token);     