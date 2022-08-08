const { Client, Intents, MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const cron = require('cron');

const testSchema = require('./test-schema');

const WOKCommands = require('wokcommands');
const path = require('path');

const intentList = new Intents();
intentList.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);

const client = new Client({ intents: intentList });

client.once('ready', async () => {
    await mongoose.connect(
        process.env.URI,
        {
            keepAlive: true
        })

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),

    })

    .setDefaultPrefix('hb!')

    console.log('Your bot is running.');

    const guildID = '855189657804472351'
    const guild = client.guilds.cache.get(guildID)

    /* Channels */
    const staminaChannel = guild.channels.cache.get('910002180545736804')
    const coopChannel = guild.channels.cache.get('866807787971149854')
    const competitionChannel = guild.channels.cache.get('857400272132636692')
    const materialsChannel = guild.channels.cache.get('910002180545736804')
    const eventChannel = guild.channels.cache.get('901312356049621012')
    const testChannel = guild.channels.cache.get('901312356049621012')


    /* Defining Embeds */
    const staminaEmbed = new MessageEmbed()
        .setTitle("<a:hg_heart:900579889651015751>  It's time to collect stamina! <a:hg_heart:900579889651015751>")
        .setColor(0xc4e7fe)

    const coopEmbed = new MessageEmbed()
        .setTitle ("<a:hg_heart:900579889651015751> Co-op in five minutes! See you there! <a:hg_heart:900579889651015751>")
        .setColor(0xc4e7fe)
    
    const coopEmbed2 = new MessageEmbed()
        .setTitle ("<a:hg_heart:900579889651015751> 15 minutes until co-op ends! Come join if you haven't already! <a:hg_heart:900579889651015751>")
        .setColor(0xc4e7fe)
    
    const competitionEmbed = new MessageEmbed() 
        .setTitle ("<a:hg_heart:900579889651015751> Happy Friday! <a:hg_heart:900579889651015751>")
        .setDescription ("Don't forget, today is the last day to submit an entry for this week's competition!")
        .setColor(0xc4e7fe)
    
    const materialsEmbed = new MessageEmbed()
        .setTitle ("<a:hg_heart:900579889651015751> Happy Monday! <a:hg_heart:900579889651015751>")
        .setDescription ("Don't forget to retrieve materials today if you missed co-op!")
        .setColor(0xc4e7fe)

    /* Stamina messages send once a day at 2:00 and 9:00 */
  const staminaMessage1 = new cron.CronJob('00 59 19 * * *', () => {
    staminaChannel.send({
      content: "<@&900585421682147328>", 
      embeds: [staminaEmbed],
      })
    })
  
    const staminaMessage2 = new cron.CronJob('00 59 2 * * *', () => {
    staminaChannel.send({
      content: "<@&900585421682147328>", 
      embeds: [staminaEmbed],
      })
    })
  
    /* Co-op messages send on Saturday and Sunday at 1:25 */
    const coopMessage1 = new cron.CronJob('00 24 20 * * 6', () => {
    coopChannel.send({
      content: "<@&879999904225828864>", 
      embeds: [coopEmbed],
      })
    })
  
    const coopMessage2 = new cron.CronJob('00 24 20 * * 0', () => {
    coopChannel.send({
      content: "<@&879999904225828864>", 
      embeds: [coopEmbed],
      })
    })
  
    /* Second co-op messages send on Saturday and Sunday at 2:15 */
    const coopMessage3 = new cron.CronJob('00 14 21 * * 6', () => {
    coopChannel.send({
      content: "<@&879999904225828864>", 
      embeds: [coopEmbed2],
      })
    })
  
    const coopMessage4 = new cron.CronJob('00 14 21 * * 0', () => {
    coopChannel.send({
      content: "<@&879999904225828864>", 
      embeds: [coopEmbed2],
      })
    })
    
  
    /* Material message sends at 8:30 on Mondays */
    const materialsMessage = new cron.CronJob('00 29 15 * * 1', () => {
    materialsChannel.send({
      content: "<@&900833950392541265>",
      embeds: [materialsEmbed],
      })
    })
  
    /* Weekly competition message sends at 8:30 on Fridays */
    const competitionMessage = new cron.CronJob('00 29 16 * * 5', () => {
    competitionChannel.send({
      content: "<@&879999907279278100>", 
      embeds: [competitionEmbed],
      })
    })

    staminaMessage1.start()
    staminaMessage2.start()
    coopMessage1.start()
    coopMessage2.start()
    coopMessage3.start()
    coopMessage4.start()
    materialsMessage.start()
    competitionMessage.start()

});

client.login(process.env.TOKEN);