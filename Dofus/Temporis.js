const fs = require('fs')
const en = JSON.parse(fs.readFileSync('./Data/i18n_en.json'))
const mod = JSON.parse(fs.readFileSync('./Data/Modsters.json'))
const spell = JSON.parse(fs.readFileSync('./Data/Spells.json'))
const lspell = JSON.parse(fs.readFileSync('./Data/SpellLevels.json'))
const eff = JSON.parse(fs.readFileSync('./Data/Effects.json'))
const mon = JSON.parse(fs.readFileSync('./Data/Monsters.json'))
const rec = JSON.parse(fs.readFileSync('./Data/Recipes.json')) // Replace NaN to "NaN"
const ite = JSON.parse(fs.readFileSync('./Data/Items.json')) // Replace "tooltipExpirationDate": NaN to "NaN"
const obj = {
  spells: []
}

mod.forEach(m => {
  m.modsterActiveSpells.forEach(a => {
    let dmg = ''
    let chdmg = ''
    let ra = ''
    if (lspell.find(spl => a === spl.spellId).range !== 0) ra = `~${lspell.find(spl => a === spl.spellId).range}`
    lspell.find(spl => a === spl.spellId).effects.forEach(ef => {
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

      let n1 = ef.rawZone.split(',')[0].split('')[0]
      let n2 = Number(ef.rawZone.split(',')[0].substring(1))
      if (n1 !== 'P') dmg += ` (AoE: ${n1 === 'L' ? `${n2 + 1} Linear` : n1 === 'Q' ? `${n2} Cross` : n1 === 'C' ? `${n2} Circle` : n1 === 'T' ? `${n2} T-Shape` : n1 === 'G' ? `${n2} Square` : n1 === '#' ? `${n2} Star without center cell` : n1 === '*' ? `${n2} Star` : n1 === 'a' ? 'Whole Map' : n1 === 'A' ? 'Whole Map' : n1 === 'V' ? `${n2} Cone` : n1 === 'X' ? `${n2} Cross` : n1 === '+' ? `${n2} Star` : n1 === 'l' ? `${n2} Linear` : n1})`
    })
    lspell.find(spl => a === spl.spellId).criticalEffect.forEach(ef => {
      chdmg += `\n${en.texts[eff.find(fe => fe.id === ef.effectId).descriptionId].replace('#1{~1~2', ef.diceNum).replace('}#2', ef.diceSide).replace(' to -0', '').replace(' to 0', '').replace('{~p}{~z}', '').replace('{~ps}{~zs}', '').replace('#1', ef.diceNum).replace('#2', ef.value).replace('#3', ef.value)}`

      if (ef.duration === 0) chdmg += ''
      else if (ef.duration === 1) chdmg += ` (${ef.duration} turn)`
      else chdmg += ` (${ef.duration} turns)`

      if (ef.delay === 0) chdmg += ''
      else if (ef.delay === 1) chdmg += ` (in ${ef.delay} turn)`
      else chdmg += ` (in ${ef.delay} turns)`

      let n1 = ef.rawZone.split(',')[0].split('')[0]
      let n2 = Number(ef.rawZone.split(',')[0].substring(1))
      if (n1 !== 'P') chdmg += ` (AoE: ${n1 === 'L' ? `${n2 + 1} Linear` : n1 === 'Q' ? `${n2} Cross` : n1 === 'C' ? `${n2} Circle` : n1 === 'T' ? `${n2} T-Shape` : n1 === 'G' ? `${n2} Square` : n1 === '#' ? `${n2} Star without center cell` : n1 === '*' ? `${n2} Star` : n1 === 'a' ? 'Whole Map' : n1 === 'A' ? 'Whole Map' : n1 === 'V' ? `${n2} Cone` : n1 === 'X' ? `${n2} Cross` : n1 === '+' ? `${n2} Star` : n1 === 'l' ? `${n2} Linear` : n1})`
    })
    obj.spells.push({
      Modster: `${en.texts[mon.find(mo => m.modsterId === mo.id).nameId]}\n(${m.modsterId})`,
      Spell: `${en.texts[spell.find(s => a === s.id).nameId]} (${a})\n(Regular Spell)`,
      Description: en.texts[spell.find(s => a === s.id).descriptionId],
      Effects: chdmg ? `Normal:\n${dmg}\n\nCritical:${chdmg}` : dmg,
      Stats: `AP: ${lspell.find(spl => a === spl.spellId).apCost}\nRA: ${lspell.find(spl => a === spl.spellId).minRange}${ra}\nCH: ${chdmg ? lspell.find(spl => a === spl.spellId).criticalHitProbability : '-'}`,
      CD: `Regular: ${lspell.find(spl => a === spl.spellId).minCastInterval.toString().replace('0', '-')}\nGlobal: ${lspell.find(spl => a === spl.spellId).globalCooldown.toString().replace('0', '-').replace('-1', lspell.find(spl => a === spl.spellId).minCastInterval)}\nInitial: ${lspell.find(spl => a === spl.spellId).initialCooldown.toString().replace('0', '-')}`,
      Casts: `Turn: ${lspell.find(spl => a === spl.spellId).maxCastPerTurn.toString().replace('0', '-')}\nTarget: ${lspell.find(spl => a === spl.spellId).maxCastPerTarget.toString().replace('0', '-')}\nStacks: ${lspell.find(spl => a === spl.spellId).maxStack.toString().replace('0', '-').replace('-1', '-')}`,
      Other: `Linear: ${lspell.find(spl => a === spl.spellId).castInLine.toString().replace('false', 'No').replace('true', 'Yes')}\nDiagonal: ${lspell.find(spl => a === spl.spellId).castInDiagonal.toString().replace('false', 'No').replace('true', 'Yes')}\nLoS: ${lspell.find(spl => a === spl.spellId).castTestLos.toString().replace('false', 'No').replace('true', 'Yes')}\nModifiable Range: ${lspell.find(spl => a === spl.spellId).rangeCanBeBoosted.toString().replace('false', 'No').replace('true', 'Yes')}`,
    })
  })
  m.modsterPassiveSpells.forEach(a => {
    let dmg = ''
    let chdmg = ''
    let ra = ''
    if (lspell.find(spl => a === spl.spellId).range !== 0) ra = `~${lspell.find(spl => a === spl.spellId).range}`
    lspell.find(spl => a === spl.spellId).effects.forEach(ef => {
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

      let n1 = ef.rawZone.split(',')[0].split('')[0]
      let n2 = Number(ef.rawZone.split(',')[0].substring(1))
      if (n1 !== 'P') dmg += ` (AoE: ${n1 === 'L' ? `${n2 + 1} Linear` : n1 === 'Q' ? `${n2} Cross` : n1 === 'C' ? `${n2} Circle` : n1 === 'T' ? `${n2} T-Shape` : n1 === 'G' ? `${n2} Square` : n1 === '#' ? `${n2} Star without center cell` : n1 === '*' ? `${n2} Star` : n1 === 'a' ? 'Whole Map' : n1 === 'A' ? 'Whole Map' : n1 === 'V' ? `${n2} Cone` : n1 === 'X' ? `${n2} Cross` : n1 === '+' ? `${n2} Star` : n1 === 'l' ? `${n2} Linear` : n1})`
    })
    lspell.find(spl => a === spl.spellId).criticalEffect.forEach(ef => {
      chdmg += `\n${en.texts[eff.find(fe => fe.id === ef.effectId).descriptionId].replace('#1{~1~2', ef.diceNum).replace('}#2', ef.diceSide).replace(' to -0', '').replace(' to 0', '').replace('{~p}{~z}', '').replace('{~ps}{~zs}', '').replace('#1', ef.diceNum).replace('#2', ef.value).replace('#3', ef.value)}`

      if (ef.duration === 0) chdmg += ''
      else if (ef.duration === 1) chdmg += ` (${ef.duration} turn)`
      else chdmg += ` (${ef.duration} turns)`

      if (ef.delay === 0) chdmg += ''
      else if (ef.delay === 1) chdmg += ` (in ${ef.delay} turn)`
      else chdmg += ` (in ${ef.delay} turns)`

      let n1 = ef.rawZone.split(',')[0].split('')[0]
      let n2 = Number(ef.rawZone.split(',')[0].substring(1))
      if (n1 !== 'P') chdmg += ` (AoE: ${n1 === 'L' ? `${n2 + 1} Linear` : n1 === 'Q' ? `${n2} Cross` : n1 === 'C' ? `${n2} Circle` : n1 === 'T' ? `${n2} T-Shape` : n1 === 'G' ? `${n2} Square` : n1 === '#' ? `${n2} Star without center cell` : n1 === '*' ? `${n2} Star` : n1 === 'a' ? 'Whole Map' : n1 === 'A' ? 'Whole Map' : n1 === 'V' ? `${n2} Cone` : n1 === 'X' ? `${n2} Cross` : n1 === '+' ? `${n2} Star` : n1 === 'l' ? `${n2} Linear` : n1})`
    })
    obj.spells.push({
      Modster: `${en.texts[mon.find(mo => m.modsterId === mo.id).nameId]}\n(${m.modsterId})`,
      Spell: `${en.texts[spell.find(s => a === s.id).nameId]} (${a})\n(Passive Spell)`,
      Description: en.texts[spell.find(s => a === s.id).descriptionId],
      Effects: chdmg ? `Normal:\n${dmg}\n\nCritical:${chdmg}` : dmg,
      Stats: `AP: ${lspell.find(spl => a === spl.spellId).apCost}\nRA: ${lspell.find(spl => a === spl.spellId).minRange}${ra}\nCH: ${chdmg ? lspell.find(spl => a === spl.spellId).criticalHitProbability : '-'}`,
      CD: `Regular: ${lspell.find(spl => a === spl.spellId).minCastInterval.toString().replace('0', '-')}\nGlobal: ${lspell.find(spl => a === spl.spellId).globalCooldown.toString().replace('0', '-').replace('-1', lspell.find(spl => a === spl.spellId).minCastInterval)}\nInitial: ${lspell.find(spl => a === spl.spellId).initialCooldown.toString().replace('0', '-')}`,
      Casts: `Turn: ${lspell.find(spl => a === spl.spellId).maxCastPerTurn.toString().replace('0', '-')}\nTarget: ${lspell.find(spl => a === spl.spellId).maxCastPerTarget.toString().replace('0', '-')}\nStacks: ${lspell.find(spl => a === spl.spellId).maxStack.toString().replace('0', '-').replace('-1', '-')}`,
      Other: `Linear: ${lspell.find(spl => a === spl.spellId).castInLine.toString().replace('false', 'No').replace('true', 'Yes')}\nDiagonal: ${lspell.find(spl => a === spl.spellId).castInDiagonal.toString().replace('false', 'No').replace('true', 'Yes')}\nLoS: ${lspell.find(spl => a === spl.spellId).castTestLos.toString().replace('false', 'No').replace('true', 'Yes')}\nModifiable Range: ${lspell.find(spl => a === spl.spellId).rangeCanBeBoosted.toString().replace('false', 'No').replace('true', 'Yes')}`,
    })
  })
})
const dat = JSON.stringify(obj.spells)
fs.writeFile('TemporisSpells.json', dat, 'utf8', (err) => {
  if (err) throw err
  console.log('+')
})