import discum
import random
import time
from discum.utils.button import Buttoner
abot = discum.Client(token='', log={'console':False, 'file':False}) #SantaD
@abot.gateway.command
def helloworld(resp):
    if resp.event.message:
        m = resp.parsed.auto()
        if m['author']['id'] == '915322858257920021':
            guildID = '78581046714572800'
            channelID = m['channel_id']
            messageID = m['id']
            message = abot.getMessage(channelID, messageID)
            data = message.json()[0]
            buts = Buttoner(data['components'])
            print(m)
            random_value = random.random()
            print(random_value)
            if 'Madame_Kyper' in m['embeds'][0]['thumbnail']['url']:
                print('1PLUSHE!!!')
                time.sleep(4)
                abot.click(
                    data['author']['id'],
                    channelID=data['channel_id'],
                    guildID=guildID,
                    messageID=data['id'],
                    messageFlags=data['flags'],
                    data=buts.getButton(row=0, column=0)
                )
            elif random_value < 0.6 and m['channel_id'] == '78581046714572800' or m['channel_id'] == '364081918116888576' or m['channel_id'] == '626165608010088449':
                print('1Channel')
                time.sleep(4)
                abot.click(
                    data['author']['id'],
                    channelID=data['channel_id'],
                    guildID=guildID,
                    messageID=data['id'],
                    messageFlags=data['flags'],
                    data=buts.getButton(row=0, column=0)
                )
            elif random_value < 0.1:
                print('1Random')
                time.sleep(4)
                abot.click(
                    data['author']['id'],
                    channelID=data['channel_id'],
                    guildID=guildID,
                    messageID=data['id'],
                    messageFlags=data['flags'],
                    data=buts.getButton(row=0, column=0)
                )
            else:
                print('1NoN')
abot.gateway.run(auto_reconnect=True)

