const fs = require('fs')
const en = JSON.parse(fs.readFileSync('./PyDofus/Data/i18n_en.json'))
const fr = JSON.parse(fs.readFileSync('./PyDofus/Data/i18n_fr.json'))
const quest = JSON.parse(fs.readFileSync('./PyDofus/Data/Quests.json'))
const stequest = JSON.parse(fs.readFileSync('./PyDofus/Data/QuestSteps.json'))
const rewquest = JSON.parse(fs.readFileSync('./PyDofus/Data/QuestStepRewards.json'))
const objquest = JSON.parse(fs.readFileSync('./PyDofus/Data/QuestObjectives.json'))
const catquest = JSON.parse(fs.readFileSync('./PyDofus/Data/QuestCategory.json'))
const almc = JSON.parse(fs.readFileSync('./PyDofus/Data/AlmanaxCalendars.json'))
const ite = JSON.parse(fs.readFileSync('./PyDofus/Data/Items.json')) // Replace "tooltipExpirationDate": NaN to "NaN"
const obj = {
  almanax: []
}
let i = 0
catquest.find(q => 31 === q.id).questIds.forEach(id => {
  let q = quest.find(q => q.id === id)
  if (!en.texts[q.nameId].startsWith('Offering')) return
  i++
  let step = stequest.find(s => q.stepIds[0] === s.id)
  let objective = objquest.find(o => step.objectiveIds[0] === o.id).parameters
  let item = ite.find(i => objective.parameter1 === i.id)
  let reward = rewquest.find(r => step.rewardsIds[0] === r.id).kamasRatio
  let objnpc = objquest.find(o => step.objectiveIds[2] === o.id).parameters
  let bonus = almc.find(n => objnpc.parameter0 === n.npcId)
  obj.almanax.push({
    N: en.texts[q.nameId].replace('Offering for ', ''),
    R: `${Math.trunc(43980 * reward).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Kamas`,
    IEN: `${objective.parameter2} ${en.texts[item.nameId]}`,
    IFR: `${objective.parameter2} ${fr.texts[item.nameId]}`,
    BEN: `**${en.texts[bonus.nameId]}:** ${en.texts[bonus.descId]}`,
    BFR: `**${fr.texts[bonus.nameId]}:** ${fr.texts[bonus.descId]}`,
    I: `https://static.ankama.com/dofus/www/game/items/200/${item.iconId}.png`
  })
})
const dat = JSON.stringify(obj.almanax)
fs.writeFile('almanax.json', dat, 'utf8', (err) => {
  if (err) throw err
  console.log('+')
})