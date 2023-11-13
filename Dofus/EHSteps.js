import fs from 'fs'
const en = JSON.parse(fs.readFileSync('./Data/i18n_en.json'))
const quest = JSON.parse(fs.readFileSync('./Data/Quests.json'))
const stequest = JSON.parse(fs.readFileSync('./Data/QuestSteps.json'))
const objquest = JSON.parse(fs.readFileSync('./Data/QuestObjectives.json'))
const mon = JSON.parse(fs.readFileSync('./Data/Monsters.json'))
const obj = {
  quests: [],
}

quest.find(q => 439 === q.id).stepIds.forEach(si => {
  let n = ''
  if (si !== 881) {
    stequest.find(sq => si === sq.id).objectiveIds.forEach(oi => {
      n += `${en.texts[mon.find(m => objquest.find(oq => oi === oq.id).parameters.parameter1 === m.id).nameId]} (${mon.find(m => objquest.find(oq => oi === oq.id).parameters.parameter1 === m.id).grades[0].level} - ${mon.find(m => objquest.find(oq => oi === oq.id).parameters.parameter1 === m.id).grades[0].level < 51 ? 'Small' : mon.find(m => objquest.find(oq => oi === oq.id).parameters.parameter1 === m.id).grades[0].level < 101 ? 'Average' : mon.find(m => objquest.find(oq => oi === oq.id).parameters.parameter1 === m.id).grades[0].level < 151 ? 'Big' : 'Gigantic'})<br/>`
    })
    obj.quests.push({
      Step: si - 846,
      Monster: n,
    })
  }
})

const dat = JSON.stringify(obj.quests)
fs.writeFile('Quest.json', dat, 'utf8', (err) => {
  if (err) throw err
  console.log('+')
})