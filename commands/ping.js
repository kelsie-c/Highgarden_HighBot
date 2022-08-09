module.exports = {
    category: 'Testing',
    description: 'Replies with pong',
    
    callback: ({ message, interaction }) => {
      const reply = 'Pong!'
  
      if (message) {
        message.reply({
          content: reply
        })
        return
      }
    
      return {
        content: reply
      }
    },
  }