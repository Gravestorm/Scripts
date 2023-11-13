import discum
import time
bot = discum.Client(token='', log={'console':False, 'file':False})
results = []
i = 25

for x in range(25):
    searchResponse = bot.searchMessages(guildID='78581046714572800', authorID='915322858257920021', afterNumResults=i*x)
    results.append(bot.filterSearchResults(searchResponse))
    print(x)
    time.sleep(30)

print('+')
with open('data.json', 'w', encoding='utf-8') as filehandle:
    for listitem in results:
        filehandle.write('%s\n' % listitem)

bot.gateway.run(auto_reconnect=True)