const Discord = require("discord.js");
const fileCount = require("file-count");
const bot = new Discord.Client();
const fs = require("fs");
const ownerID = "153244623219851266"
var prefix = "hexa, ";

//this disgusts me
bot.on('ready', () => {
  console.log('I am ready!');
  bot.user.setStatus('online', "docs | hexa, help");
});

bot.on("message", message => {
  if(message.content.startsWith(`${prefix}doclist`)) {
    var args = fs.readdirSync("./docs");
    var m = '';
    for(var a in args) {
        m += args[a].replace(".json", "`, `")
    }
    message.channel.sendMessage("**Current document list (reading from `./docs`)**\n`" + m)
  }
  if (message.content.startsWith(`${prefix}docs `)) {
      var args = message.content.split(`${prefix}docs `).join("");
      try {
        var requireArgs = require(`./docs/${args}.json`);
        message.channel.sendMessage(
"**Function**: __" + requireArgs.functionName + "__\n" +
`**Arguments**: ${requireArgs.functionArguments}\n` +
`**Usage**: bot.${requireArgs.functionName}(${requireArgs.functionArguments})\n` +
`**Description**: ${requireArgs.functionDescription}\n`)
      } catch (e) { message.channel.sendMessage("That document doesnt exist or doesnt correctly influence the documentation template!") && console.log(e) }
  }
  if(message.content === `${prefix}help`) {
    message.channel.sendMessage("Hello! My name is Hexadoc, and I am here to serve you! My current commands are `docs`, followed by the document you want to view, along with `doclist` to view the overall. \n Created by jack ✗#5403")
  }
  if(message.content.startsWith(`${prefix}eval`)) {
    if(message.author.id == (ownerID)) {
      var code = message.content.split(" ").slice(1).join(" ");
      console.log("User has evaluated something!".green)
      message.channel.sendMessage(":diamond_shape_with_a_dot_inside: | **Hexadoc Evaluator**");
      message.channel.sendMessage("Input ```xl\n" +
      code +
      "\n```"
      );

      try {
          var evaled = eval(code);
          if (typeof evaled !== 'string')
            evaled = require('util').inspect(evaled);
          msg.channel.sendMessage("Output```xl\n" +
          clean(evaled) +
          "\n```" +
          "Evaluation Complete! ✅"
          );
      }
      catch(err) {
          msg.channel.sendMessage("🚫 `ERROR` ```xl\n" +
          clean(err) +
          "\n```");
      }
    }
  })
    }
  }
});




bot.login('token');
