const fs = require('fs/promises')

async function fetchData() {
  const en = JSON.parse(await fs.readFile('./Data/i18n_en.json'))
  const fr = JSON.parse(await fs.readFile('./Data/i18n_fr.json'))
  const quest = JSON.parse(await fs.readFile('./Data/Quests.json'))
  const stequest = JSON.parse(await fs.readFile('./Data/QuestSteps.json'))
  const rewquest = JSON.parse(await fs.readFile('./Data/QuestStepRewards.json'))
  const objquest = JSON.parse(await fs.readFile('./Data/QuestObjectives.json'))
  const catquest = JSON.parse(await fs.readFile('./Data/QuestCategory.json'))
  const almc = JSON.parse(await fs.readFile('./Data/AlmanaxCalendars.json'))
  const ite = JSON.parse(await fs.readFile('./Data/Items.json')) // Replace "tooltipExpirationDate": NaN to "tooltipExpirationDate": "NaN"
  const obj = { almanax: [] }
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
      BEN: `**${en.texts[bonus.nameId]}:** ${en.texts[bonus.descId].replaceAll('<b>', '').replaceAll('</b>', '')}`,
      BFR: `**${fr.texts[bonus.nameId]}:** ${fr.texts[bonus.descId].replaceAll('<b>', '').replaceAll('</b>', '')}`,
      I: `https://static.ankama.com/dofus/www/game/items/200/${item.iconId}.png`
    })
  })
  try {
    await fs.writeFile('Almanax.json', JSON.stringify(obj.almanax), 'utf8')
    console.log('+')
  } catch (err) {
    console.error(err)
  }
}

fetchData()