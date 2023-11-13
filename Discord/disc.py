import discum
import time
bot = discum.Client(token='', log={'console':False, 'file':False})
results = []
i = 25

for x in range(40):
  if x < 19:
    continue

  searchResponse = bot.searchMessages(channelID="753685966425686067", authorID="78600305175961600", has="link", sortOrder="desc", afterNumResults=i*x)
  print(bot.filterSearchResults(searchResponse)[0]['content'].split('\n'))
  for f in bot.filterSearchResults(searchResponse)[0]['content'].split('\n'):
    results.append(f)
  print(x)
  time.sleep(30)

print('+')
with open('results.js', 'w', encoding='utf-8') as filehandle:
    for listitem in results:
        filehandle.write('%s\n' % listitem)

bot.gateway.run(auto_reconnect=True)

#python -m pip install --user --upgrade git+https://github.com/Merubokkusu/Discord-S.C.U.M.git#egg=discum