const fs = require('fs')
const en = JSON.parse(fs.readFileSync('./Data/i18n_en.json'))
const fspell = JSON.parse(fs.readFileSync('./Data/ForgettableSpells.json'))
const spell = JSON.parse(fs.readFileSync('./Data/Spells.json'))
const lspell = JSON.parse(fs.readFileSync('./Data/SpellLevels.json'))
const eff = JSON.parse(fs.readFileSync('./Data/Effects.json'))
const mon = JSON.parse(fs.readFileSync('./Data/Monsters.json'))
const rec = JSON.parse(fs.readFileSync('./Data/Recipes.json')) // Replace NaN to "NaN"
const ite = JSON.parse(fs.readFileSync('./Data/Items.json')) // Replace "tooltipExpirationDate": NaN to "NaN"
const obj = {
  spells: [],
}
fspell.forEach(sp => {
  let i = 0
  let dmg = ''
  let chdmg = ''
  let dr = ''
  let re = ''
  let ra = ''
  if (lspell.find(spl => sp.id === spl.spellId).range !== 0) ra = `~${lspell.find(spl => sp.id === spl.spellId).range}`
  lspell.find(spl => sp.id === spl.spellId).effects.forEach(ef => {
    if (ef.effectId === 181) {
      if (dmg !== '') dmg += '\n\n'
      dmg += `Summons ${en.texts[mon.find(mo => ef.diceNum === mo.id).nameId]}:\nHP: ${mon.find(mo => ef.diceNum === mo.id).grades[0].lifePoints} AP: ${mon.find(mo => ef.diceNum === mo.id).grades[0].actionPoints} MP: ${mon.find(mo => ef.diceNum === mo.id).grades[0].movementPoints}`
      mon.find(mo => ef.diceNum === mo.id).spells.forEach(ms => {
        if (spell.find(s => ms === s.id)) {
          if (lspell.find(spl => ms === spl.spellId).range !== 0) ra = `~${lspell.find(spl => ms === spl.spellId).range}`
          dmg += `\n\n${en.texts[spell.find(s => ms === s.id).nameId]}: (${ms}) AP: ${lspell.find(spl => ms === spl.spellId).apCost} RA: ${lspell.find(spl => ms === spl.spellId).minRange}${ra}\n${en.texts[spell.find(s => ms === s.id).descriptionId]}\n`
          if (lspell.find(spl => ms === spl.spellId)) {
            lspell.find(spl => ms === spl.spellId).effects.forEach(me => {
              dmg += `\n${en.texts[eff.find(fe => fe.id === me.effectId).descriptionId].replace('#1{~1~2', me.diceNum).replace('}#2', me.diceSide).replace(' to -0', '').replace(' to 0', '').replace('{~p}{~z}', '').replace('{~ps}{~zs}', '').replace('#1', me.diceNum).replace('#2', me.value).replace('#3', me.value)}`

              if (me.duration === 0) dmg += ''
              else if (me.duration === 1) dmg += ` (${me.duration} turn)`
              else dmg += ` (${me.duration} turns)`

              if (me.delay === 0) dmg += ''
              else if (me.delay === 1) dmg += ` (in ${me.delay} turn)`
              else dmg += ` (in ${me.delay} turns)`
            })
          }
        }
      })
    }
    else if (dmg !== '') { dmg += `\n${en.texts[eff.find(fe => fe.id === ef.effectId).descriptionId].replace('#1{~1~2', ef.diceNum).replace('}#2', ef.diceSide).replace(' to -0', '').replace(' to 0', '').replace('{~p}{~z}', '').replace('{~ps}{~zs}', '').replace('#1', ef.diceNum).replace('#2', ef.value).replace('#3', ef.value)}` }
    else { dmg += `${en.texts[eff.find(fe => fe.id === ef.effectId).descriptionId].replace('#1{~1~2', ef.diceNum).replace('}#2', ef.diceSide).replace(' to -0', '').replace(' to 0', '').replace('{~p}{~z}', '').replace('{~ps}{~zs}', '').replace('#1', ef.diceNum).replace('#2', ef.value).replace('#3', ef.value)}` }

    if (ef.duration === 0) dmg += ''
    else if (ef.duration === 1) dmg += ` (${ef.duration} turn)`
    else dmg += ` (${ef.duration} turns)`

    if (ef.delay === 0) dmg += ''
    else if (ef.delay === 1) dmg += ` (in ${ef.delay} turn)`
    else dmg += ` (in ${ef.delay} turns)`
  })
  lspell.find(spl => sp.id === spl.spellId).criticalEffect.forEach(ef => {
    chdmg += `\n${en.texts[eff.find(fe => fe.id === ef.effectId).descriptionId].replace('#1{~1~2', ef.diceNum).replace('}#2', ef.diceSide).replace(' to -0', '').replace(' to 0', '').replace('{~p}{~z}', '').replace('{~ps}{~zs}', '').replace('#1', ef.diceNum).replace('#2', ef.value).replace('#3', ef.value)}`

    if (ef.duration === 0) chdmg += ''
    else if (ef.duration === 1) chdmg += ` (${ef.duration} turn)`
    else chdmg += ` (${ef.duration} turns)`

    if (ef.delay === 0) chdmg += ''
    else if (ef.delay === 1) chdmg += ` (in ${ef.delay} turn)`
    else chdmg += ` (in ${ef.delay} turns)`
  })
  ite.find(it => sp.itemId === it.id).dropTemporisMonsterIds.forEach(mob => {
    dr += `\n${en.texts[mon.find(mo => mob === mo.id).nameId]}`
  })
  rec.find(re => sp.itemId === re.resultId) ? rec.find(re => sp.itemId === re.resultId).ingredientIds.forEach(ing => {
    re += `\n${rec.find(re => sp.itemId === re.resultId).quantities[i]} ${en.texts[ite.find(it => it.id === ing).nameId]}`
    i++
  }) : ''
  obj.spells.push({
    Lv: lspell.find(spl => sp.id === spl.spellId).minPlayerLevel ? lspell.find(spl => sp.id === spl.spellId).minPlayerLevel : 0,
    Name: `${en.texts[spell.find(s => sp.id === s.id).nameId]}\n(${sp.id})`,
    Description: en.texts[spell.find(s => sp.id === s.id).descriptionId],
    Effects: chdmg ? `Normal:\n${dmg}\n\nCritical:${chdmg}` : dmg,
    Stats: `AP: ${lspell.find(spl => sp.id === spl.spellId).apCost}\nRA: ${lspell.find(spl => sp.id === spl.spellId).minRange}${ra}\nCH: ${chdmg ? lspell.find(spl => sp.id === spl.spellId).criticalHitProbability : '-'}`,
    CD: `Regular: ${lspell.find(spl => sp.id === spl.spellId).minCastInterval.toString().replace('0', '-')}\nGlobal: ${lspell.find(spl => sp.id === spl.spellId).globalCooldown.toString().replace('0', '-').replace('-1', lspell.find(spl => sp.id === spl.spellId).minCastInterval)}\nInitial: ${lspell.find(spl => sp.id === spl.spellId).initialCooldown.toString().replace('0', '-')}`,
    Casts: `Turn: ${lspell.find(spl => sp.id === spl.spellId).maxCastPerTurn.toString().replace('0', '-')}\nTarget: ${lspell.find(spl => sp.id === spl.spellId).maxCastPerTarget.toString().replace('0', '-')}\nStacks: ${lspell.find(spl => sp.id === spl.spellId).maxStack.toString().replace('0', '-').replace('-1', '-')}`,
    Other: `Linear: ${lspell.find(spl => sp.id === spl.spellId).castInLine.toString().replace('false', 'No').replace('true', 'Yes')}\nDiagonal: ${lspell.find(spl => sp.id === spl.spellId).castInDiagonal.toString().replace('false', 'No').replace('true', 'Yes')}\nLoS: ${lspell.find(spl => sp.id === spl.spellId).castTestLos.toString().replace('false', 'No').replace('true', 'Yes')}\nModifiable Range: ${lspell.find(spl => sp.id === spl.spellId).rangeCanBeBoosted.toString().replace('false', 'No').replace('true', 'Yes')}`,
    Obtaining: dr ? `Dropped: (${mon.find(mo => ite.find(it => sp.itemId === it.id).dropTemporisMonsterIds[0] === mo.id).temporisDrops.find(drop => ite.find(it => sp.itemId === it.id).id === drop.objectId).percentDropForGrade1.toFixed(2)}%)${dr}` : re ? `Crafted:${re}` : '',
  })
})
obj.spells.sort((a, b) => {
  return a.Lv - b.Lv
})
const dat = JSON.stringify(obj.spells)
fs.writeFile('TemporisSpells.json', dat, 'utf8', (err) => {
  if (err) throw err
  console.log('+')
})