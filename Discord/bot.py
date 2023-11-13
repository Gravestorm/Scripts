import discum
import random
import time
from discum.utils.button import Buttoner
bot = discum.Client(token='', log={'console':False, 'file':False})
emoj = [
    '<:pepeWow:590594278515015710>',
    '<:stonks:743998876523954218>',
    '<:FeelsCrocMan:322746430706155520>',
    '<:Doggo:431665649476042752>',
    '<:Ayy:422087450479820802>',
    '<:PogJelly:472511170830401548>',
    '<:MoonChamp:322741962253926400>',
    '<:pepeTurq:590594254917861376>',
    '<:Toot:422087450651918336>',
    '<:Derp:422087450085556226>'
    ]
@bot.gateway.command
def helloworld(resp):
    if resp.event.message:
        m = resp.parsed.auto()
        if m['author']['id'] == '78600305175961600' and m['content'] == '.del':
            bot.deleteMessage(m['channel_id'], m['id'])
            time.sleep(1)
            bot.sendMessage('590904233650552833', '!d 1')
        if m['author']['id'] == '78600305175961600' and m['content'][0:4] == '.msg':
            bot.sendMessage('756090171296055321', '<' + bot.getMessage('756090171296055321', m['content'][5:]).json()[0]['attachments'][0]['url'] + '>')
            bot.deleteMessage(m['channel_id'], m['id'])
        if m['author']['id'] == '915322858257920021':
            guildID = '78581046714572800'
            channelID = m['channel_id']
            messageID = m['id']
            message = bot.getMessage(channelID, messageID)
            data = message.json()[0]
            buts = Buttoner(data['components'])
            print(m)
            random_value = random.random()
            print(random_value)
            if 'Madame_Kyper' in m['embeds'][0]['thumbnail']['url']:
                print('PLUSHE!!!')
                #bot.sendMessage(m['channel_id'], random.choice(emoj))
                bot.click(
                    data['author']['id'],
                    channelID=data['channel_id'],
                    guildID=guildID,
                    messageID=data['id'],
                    messageFlags=data['flags'],
                    data=buts.getButton(row=0, column=0)
                )
            elif m['channel_id'] == '78581046714572800' or m['channel_id'] == '364081918116888576' or m['channel_id'] == '626165608010088449' or m['channel_id'] == '626165637252907045':
                print('Channel')
                time.sleep(3)
                bot.click(
                    data['author']['id'],
                    channelID=data['channel_id'],
                    guildID=guildID,
                    messageID=data['id'],
                    messageFlags=data['flags'],
                    data=buts.getButton(row=0, column=0)
                )
            elif random_value < 1:
                print('Random')
                time.sleep(3)
                bot.click(
                    data['author']['id'],
                    channelID=data['channel_id'],
                    guildID=guildID,
                    messageID=data['id'],
                    messageFlags=data['flags'],
                    data=buts.getButton(row=0, column=0)
                )
            else:
                print('NoN')
bot.gateway.run(auto_reconnect=True)

