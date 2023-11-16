const fs = require('fs')
const Name = JSON.parse(fs.readFileSync('./Data/i18n_en.json'))
const Effects = JSON.parse(fs.readFileSync('./Data/Effects.json'))
const Items = JSON.parse(fs.readFileSync('./Data/Items.json')) // Replace "tooltipExpirationDate": NaN to "NaN"
const ItemSets = JSON.parse(fs.readFileSync('./Data/ItemSets.json'))
// const NameBeta = JSON.parse(fs.readFileSync('./DataBeta/i18n_en.json'))
// const ItemsBeta = JSON.parse(fs.readFileSync('./DataBeta/Items.json')) // Replace "tooltipExpirationDate": NaN to "NaN"
// const ItemSetsBeta = JSON.parse(fs.readFileSync('./DataBeta/ItemSets.json'))
const obj = {
  sets: []
}
const ignore = [45]

ItemSets.forEach((Set, setIndex) => {
  try {
    // Skip Champion Set and Sets without SetBonus (mostly Ceremonial Sets)
    if (ignore.includes(Set.id) || !Set.effects[0]) return

    const setBonuses = Set.effects.map((SetEffects, index) => {
      const setOutput = SetEffects.reduce((accumulator, SetEffect) => {
        if (SetEffect === null) return accumulator
        const effectDescription = Name.texts[Effects.find(Effect => Effect.id === SetEffect.effectId).descriptionId]
          .replace('#1{~1~2', SetEffect.diceNum).replace('}#2', SetEffect.diceSide).replace(' to -0', '')
          .replace(' to 0', '').replace('{~p}{~z}', '').replace('{~ps}{~zs}', '').replace('#1', SetEffect.diceNum)
          .replace('#2', SetEffect.value).replace('#3', SetEffect.value).replace(' to ', '~')
        accumulator.push(effectDescription.trim())
        return accumulator
      }, [])

      return {
        [`SetBonus${index + 1}`]: setOutput
      }
    })

    const itemStats = Set.items.map(SetItem => {
      const item = Items.find(Item => SetItem === Item.id)
      const itemName = Name.texts[item.nameId]
      const itemEffects = item.possibleEffects.map(ItemEffect => {
        return Name.texts[Effects.find(Effect => Effect.id === ItemEffect.effectId).descriptionId]
          .replace('#1{~1~2', ItemEffect.diceNum).replace('}#2', ItemEffect.diceSide).replace(' to -0', '')
          .replace(' to 0', '').replace('{~p}{~z}', '').replace('{~ps}{~zs}', '').replace('#1', ItemEffect.diceNum)
          .replace('#2', ItemEffect.value).replace('#3', ItemEffect.value).replace(' to ', '~').trim()
      })

      return {
        ItemName: itemName,
        Effects: itemEffects
      }
    })

    obj.sets.push({
      Set: Name.texts[Set.nameId],
      SetBonuses: setBonuses.reduce((acc, bonus) => ({ ...acc, ...bonus }), {}),
      Items: itemStats
    })
  } catch (error) {
    console.error(`Error processing Set ${Set}:\n`, error.message)
  }
})

fs.writeFile('ItemComparison.json', JSON.stringify(obj.sets, null, 2), 'utf8', (err) => {
  if (err) throw err
  console.log('+')
})