const { AttachmentBuilder } = require('discord.js');

module.exports = {
  textFile: function textFile(reply, name = 'file'){
    const buffer = Buffer.from(reply, 'utf8');
    const txtFile = new AttachmentBuilder(buffer, {
      name: `${name}.txt`,
    });
    
    return txtFile;
  }
}