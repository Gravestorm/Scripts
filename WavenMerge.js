const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const path = require('path')
const inputDir = 'C:\\Media\\Waven\\Audio'
const outputDir = 'C:\\Media\\Waven\\Music'
const songs = [
  {
    name: 'Canine_01_Wetland_Astrub',
    instruments: [
      { name: 'MUS_Bonta_Canine_Voice_01', weight: 2.5 },
      { name: 'MUS_Bonta_Canine_Bass_01', weight: 2 },
      { name: 'MUS_Bonta_Canine_Drum_01', weight: 2 },
      { name: 'MUS_Bonta_Canine_Keys_01', weight: 2 },
    ],
  },
  {
    name: 'Canine_02_Fire_Astrub',
    instruments: [
      { name: 'MUS_Bonta_Canine_Voice_02', weight: 2.5 },
      { name: 'MUS_Bonta_Canine_Bass_02', weight: 2 },
      { name: 'MUS_Bonta_Canine_Drum_02', weight: 2 },
      { name: 'MUS_Bonta_Canine_Keys_02', weight: 2 },
      { name: 'MUS_Bonta_Canine_Piano_02', weight: 2 },
    ],
  },
  {
    name: 'Canine_03_Interlude_Astrub',
    instruments: [
      { name: 'MUS_Bonta_Canine_Voice_03', weight: 2.5 },
      { name: 'MUS_Bonta_Canine_Bass_03', weight: 2 },
      { name: 'MUS_Bonta_Canine_Drum_03', weight: 2 },
      { name: 'MUS_Bonta_Canine_Keys_03', weight: 2 },
      { name: 'MUS_Bonta_Canine_Piano_03', weight: 2 },
    ],
  },
  {
    name: 'Canine_04_Nature_Astrub',
    instruments: [
      { name: 'MUS_Bonta_Canine_Voice_04', weight: 2.5 },
      { name: 'MUS_Bonta_Canine_Voice_04_01', weight: 2.5 },
      { name: 'MUS_Bonta_Canine_Voice_04_02', weight: 2.5 },
      { name: 'MUS_Bonta_Canine_Bass_04', weight: 2 },
      { name: 'MUS_Bonta_Canine_Drum_04', weight: 2 },
      { name: 'MUS_Bonta_Canine_Keys_04', weight: 2 },
      { name: 'MUS_Bonta_Canine_Piano_04', weight: 2 },
    ],
  },
  {
    name: 'Mermonte_01_Telesphorine_Bonta',
    instruments: [
      { name: 'MUS_Bonta_Mermonte_Basse_02', weight: 1 },
      { name: 'MUS_Bonta_Mermonte_Drum_02', weight: 1 },
      { name: 'MUS_Bonta_Mermonte_Transition_01', weight: 1 },
      { name: 'MUS_Bonta_Mermonte_Guitare_01', weight: 1 },
      { name: 'MUS_Bonta_Mermonte_Piano_01', weight: 1 },
      { name: 'MUS_Bonta_Mermonte_Vibraphone_01', weight: 1 },
    ],
  },
  {
    name: 'Mermonte_02_Telesphorine_Bonta',
    instruments: [
      { name: 'MUS_Bonta_Mermonte_Voice_02', weight: 1 },
      { name: 'MUS_Bonta_Mermonte_Basse_03', weight: 1 },
      { name: 'MUS_Bonta_Mermonte_Drum_03', weight: 1 },
      { name: 'MUS_Bonta_Mermonte_Guitare_02', weight: 1 },
      { name: 'MUS_Bonta_Mermonte_Piano_02', weight: 1 },
      { name: 'MUS_Bonta_Mermonte_Vibraphone_02', weight: 1 },
    ],
  },
  {
    name: 'Mermonte2_01_Telesphorine_Bonta',
    instruments: [
      { name: 'MUS_Bonta_Mermonte2_Voice_01', weight: 1 },
      { name: 'MUS_Bonta_Mermonte2_Base_01', weight: 1 },
      { name: 'MUS_Bonta_Mermonte2_Drum_01', weight: 1 },
      { name: 'MUS_Bonta_Mermonte2_Guitar_01', weight: 1 },
      { name: 'MUS_Bonta_Mermonte2_Piano_01', weight: 1 },
      { name: 'MUS_Bonta_Mermonte2_Vibraphone_01', weight: 1 },
    ],
  },
  {
    name: 'Mermonte2_02_Telesphorine_Bonta',
    instruments: [
      { name: 'MUS_Bonta_Mermonte2_Bass_01', weight: 1 },
      { name: 'MUS_Bonta_Mermonte2_Drum_02', weight: 1 },
      { name: 'MUS_Bonta_Mermonte2_Guitar_02', weight: 1 },
      { name: 'MUS_Bonta_Mermonte2_Piano_02', weight: 1 },
      { name: 'MUS_Bonta_Mermonte2_Vibraphone_02', weight: 1 },
    ],
  },
  {
    name: 'Stems_01_DeathParade_Amakna',
    instruments: [
      { name: 'WAVEN_STEMS_DEATHPARADE_VOICEMAIN', weight: 1 },
      { name: 'WAVEN_STEMS_DEATHPARADE_BEATMAIN', weight: 1 },
      { name: 'WAVEN_STEMS_DEATHPARADE_MUSICMAIN', weight: 1 },
    ],
  },
  {
    name: 'Stems_02_DeathParade_Amakna',
    instruments: [
      { name: 'WAVEN_STEMS_DEATHPARADE_VOICEMAIN', weight: 1 },
      { name: 'WAVEN_STEMS_DEATHPARADE_BEATROCK', weight: 1 },
      { name: 'WAVEN_STEMS_DEATHPARADE_MUSICROCK', weight: 1 },
    ],
  },
  {
    name: 'Stems_03_IFearNothing_Amakna',
    instruments: [
      { name: 'WAVEN_STEMS_I_FEAR_NOTHING_VOCALS_MAIN', weight: 1 },
      { name: 'WAVEN_STEMS_I_FEAR_NOTHING_DRUMS_MAIN', weight: 1 },
      { name: 'WAVEN_STEMS_I_FEAR_NOTHING_MUSIC_MAIN', weight: 1 },
    ],
  },
  {
    name: 'Stems_04_IFearNothing_Amakna',
    instruments: [
      { name: 'WAVEN_STEMS_I_FEAR_NOTHING_VOCALS_MAIN', weight: 1 },
      { name: 'WAVEN_STEMS_I_FEAR_NOTHING_BEAT_CHILL', weight: 1 },
      { name: 'WAVEN_STEMS_I_FEAR_NOTHING_MUSIC_CHILL', weight: 1 },
    ],
  },
  {
    name: 'Stems_05_Interlude_Amakna',
    instruments: [{ name: 'WAVEN_STEMS_INTERLUDE' }],
  },
  {
    name: 'Stems_06_Interlude_Amakna',
    instruments: [{ name: 'WAVEN_STEMS_INTERLUDE_2' }],
  },
  {
    name: 'Taure_01_Mandhal_Minotoror',
    instruments: [
      { name: 'MUS_Fight_Taure_A_00', weight: 1 },
      { name: 'MUS_Fight_Taure_A_01', weight: 1 },
      { name: 'MUS_Fight_Taure_A_02', weight: 1 },
      { name: 'MUS_Fight_Taure_A_03', weight: 1 },
    ],
  },
  {
    name: 'Taure_02_MandhalsSons_MinotororIsland',
    instruments: [
      { name: 'MUS_Fight_Taure_B_02', weight: 1 },
      { name: 'MUS_Fight_Taure_B_03', weight: 1 },
      { name: 'MUS_Fight_Taure_B_04', weight: 1 },
    ],
  },
  {
    name: 'Taure_03_GhostSong_MinotororIsland',
    instruments: [
      { name: 'MUS_Fight_Taure_C_02', weight: 1 },
      { name: 'MUS_Fight_Taure_C_03', weight: 1 },
      { name: 'MUS_Fight_Taure_C_04', weight: 1 },
    ],
  },
  {
    name: 'Chafer_01_ChateauDArn_ChaferIsland',
    instruments: [
      { name: 'MUS_Donjon_Chafer_Colombe_01', weight: 1 },
      { name: 'MUS_Donjon_Chafer_Colombe_01', weight: 1 },
    ],
  },
  {
    name: 'Cochon_01_DragonPig_PigIsland',
    instruments: [
      { name: 'MUS_Fight_Cochon_01', weight: 1 },
      { name: 'MUS_Fight_Cochon_02', weight: 1 },
    ],
  },
  {
    name: 'Cochon_02_EmpereurGuemene_PigIsland',
    instruments: [
      { name: 'MUS_Fight_Cochon_03', weight: 1 },
      { name: 'MUS_Fight_Cochon_04', weight: 1 },
    ],
  },
  {
    name: 'Bukowski_01_TheNightOfTheGoat_Brakmar',
    instruments: [{ name: 'MUS_Bonta_Bukowski_MAIN_01' }],
  },
  {
    name: 'Bukowski_02_BlackClouds_Brakmar',
    instruments: [{ name: 'MUS_Bonta_Bukowski_MAIN_02' }],
  },
  {
    name: 'Bukowski_03_AboutYou_Brakmar',
    instruments: [{ name: 'MUS_Bonta_Bukowski_MAIN_03' }],
  },
  {
    name: 'Tofu_01_Flight_TofuIsland',
    instruments: [{ name: 'MUS_Fight_Tofu_D_01' }],
  },
]
songs.forEach((song) => {
  const { name: name, instruments: instruments } = song
  if (instruments.length === 1) {
    fs.copyFile(
      path.join(inputDir, `${instruments[0].name}.wav`),
      path.join(outputDir, `${name}.wav`),
      (err) =>
        err
          ? console.log(`Error copying file for ${name}: ${err}`)
          : console.log(`Copying for ${name} finished`)
    )
  } else {
    const merge = ffmpeg()
    instruments
      .map((instrument) => path.join(inputDir, `${instrument.name}.wav`))
      .forEach((file) => {
        merge.input(file)
      })
    merge
      .complexFilter([
        {
          filter: 'amix',
          options: {
            inputs: instruments.length,
            duration: 'longest',
            normalize: 0,
            dropout_transition: 0,
            weights: instruments
              .map((instrument) => instrument.weight)
              .join(' '),
          },
        },
      ])
      .on('end', () => {
        console.log(`Merging for ${name} finished`)
      })
      .on('error', (err) => {
        console.error(`Error merging for ${name}: ${err}`)
      })
      .saveToFile(path.join(outputDir, `${name}.wav`), outputDir)
  }
})
