const fs = require('fs')
const en = JSON.parse(fs.readFileSync('./Data/i18n_en.json'))
const ite = JSON.parse(fs.readFileSync('./Data/Items.json')) // Replace "tooltipExpirationDate": NaN to "NaN"
const ach = JSON.parse(fs.readFileSync('./Data/Achievements.json'))
const achr = JSON.parse(fs.readFileSync('./Data/AchievementRewards.json'))
const achb = JSON.parse(fs.readFileSync('./Data/AchievementObjectives.json'))
const achp = JSON.parse(fs.readFileSync('./Data/AchievementProgressSteps.json'))
const achc = JSON.parse(fs.readFileSync('./Data/AchievementCategories.json'))
const obj = {
  ach: [],
}
const bjo = {
  ach: [],
}

achc.forEach(a => {
  if (a.visibilityCriterion !== 'SC=5') return
  a.achievementIds.forEach(ac => {
    if (ach.find(a => ac === a.id).rewardIds.length === 0) return
    ach.find(a => ac === a.id).rewardIds.forEach(r => {
      if (!achr.find(ac => r === ac.id).itemsReward.includes('20763')) return
    })
    let ob = ''
    ach.find(a => ac === a.id).objectiveIds.forEach(o => {
      ob += `<br/>${achb.find(ab => o === ab.id) ? en.texts[achb.find(ab => o === ab.id).nameId] : ''}`
    })
    obj.ach.push({
      Tempokens: achr.find(a => ac === a.achievementId).itemsQuantityReward ? achr.find(a => ac === a.achievementId).itemsQuantityReward.toString() : '~',
      Name: `${en.texts[ach.find(a => ac === a.id).nameId]} (${ac})`,
      Objective: `${en.texts[ach.find(a => ac === a.id).descriptionId]}<br/>${ob}`,
    })
  })
})
obj.ach.sort((a, b) => {
  return b.Tempokens - a.Tempokens
})
const dat = JSON.stringify(obj.ach)
fs.writeFile('TemporisAchievements.json', dat, 'utf8', (err) => {
  if (err) throw err
  console.log('+')
})
/*achp.forEach(ap => {
  if (ap.progressId === 5) {
    let ob = ''
    let obd = ''
    ach.find(a => ap.achievementId === a.id).rewardIds.forEach(o => {
      ob += `${achr.find(ab => o === ab.id).itemsQuantityReward[0]} ${en.texts[ite.find(i => achr.find(ab => o === ab.id).itemsReward[0] === i.id).nameId]} (${ite.find(i => achr.find(ab => o === ab.id).itemsReward[0] === i.id).id})`
      obd += en.texts[ite.find(i => achr.find(ab => o === ab.id).itemsReward[0] === i.id).descriptionId]
    })
    bjo.ach.push({
      Tempokens: ap.score,
      Reward: ob,
      Description: obd,
    })
  }
})

const datt = JSON.stringify(bjo.ach)
fs.writeFile('TemporisTempokens.json', datt, 'utf8', (err) => {
  if (err) throw err
  console.log('+')
})*/