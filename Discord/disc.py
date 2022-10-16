import discum
import time
bot = discum.Client(token='NjQ5MzY3MzA1OTQzMzg0MDY2.YafxXg.Pn1qRHsGDoX8nItmqcRm5GLIMqg', log={'console':False, 'file':False})
results = []
i = 25

for x in range(4):
    searchResponse = bot.searchMessages(channelID="741408414998986752", authorID="78600305175961600", sortOrder="asc", afterNumResults=i*x)
    results.append(bot.filterSearchResults(searchResponse))
    print(x)
    time.sleep(30)

print('+')
with open('text.json', 'w', encoding='utf-8') as filehandle:
    for listitem in results:
        filehandle.write('%s\n' % listitem)

bot.gateway.run(auto_reconnect=True)