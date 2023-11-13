const fs = require('fs')
const MSR = require('./ecosystem.js')
const MR = require('./breed.js')
const M = require('./monster.js')
const MA = require('./mobs.js')
const I = require('./items.js')
const IT = require('./itemtypes.js')
const IS = require('./sets.js')
const obj = {
  mobs: [],
  items: []
}
let l1 = [], l2 = [], l3 = [], l4 = [], l5 = [], l6 = [], l7 = [], l8 = [], l9 = [], l10 = [], l11 = [], l12 = [], l13 = []
for (let i = 0; i < 12000; i++) {
  if (I[i] != undefined && I[i].s === undefined && I[i].et === undefined && I[i].ce === undefined && I[i].fm === true && I[i].n != '' && I[i].wd === false &&
    ['Amulet', 'Belt', 'Boots', 'Cloak', 'Backpack', 'Hat', 'Ring', 'Axe', 'Bow', 'Dagger', 'Hammer', 'Shovel', 'Staff', 'Sword', 'Wand'].includes(IT[I[i].t].n)) {
    if (I[i].l <= 9) l1.push(                     `${I[i].n} ${I[i].wd} (${i})`)
    if (I[i].l <= 19 && I[i].l >= 10) l2.push(    `${I[i].n} ${I[i].wd} (${i})`)
    if (I[i].l <= 29 && I[i].l >= 20) l3.push(    `${I[i].n} ${I[i].wd} (${i})`)
    if (I[i].l <= 39 && I[i].l >= 30) l4.push(    `${I[i].n} ${I[i].wd} (${i})`)
    if (I[i].l <= 49 && I[i].l >= 40) l5.push(    `${I[i].n} ${I[i].wd} (${i})`)
    if (I[i].l <= 59 && I[i].l >= 50) l6.push(    `${I[i].n} ${I[i].wd} (${i})`)
    if (I[i].l <= 69 && I[i].l >= 60) l7.push(    `${I[i].n} ${I[i].wd} (${i})`)
    if (I[i].l <= 79 && I[i].l >= 70) l8.push(    `${I[i].n} ${I[i].wd} (${i})`)
    if (I[i].l <= 89 && I[i].l >= 80) l9.push(    `${I[i].n} ${I[i].wd} (${i})`)
    if (I[i].l <= 99 && I[i].l >= 90) l10.push(   `${I[i].n} ${I[i].wd} (${i})`)
    if (I[i].l <= 119 && I[i].l >= 100) l11.push( `${I[i].n} ${I[i].wd} (${i})`)
    if (I[i].l <= 139 && I[i].l >= 120) l12.push( `${I[i].n} ${I[i].wd} (${i})`)
    if (I[i].l >= 140) l13.push(                  `${I[i].n} ${I[i].wd} (${i})`)
  }
}
obj.items.push({
  "1~9": l1,
  "10~19": l2,
  "20~29": l3,
  "30~39": l4,
  "40~49": l5,
  "50~59": l6,
  "60~69": l7,
  "70~79": l8,
  "80~89": l9,
  "90~99": l10,
  "100~119": l11,
  "120~139": l12,
  "140~200": l13
})
for (let i = 0; i < 3000; i++) {
  if (M[i] != undefined) {
    if (M[i].g10) {
      obj.mobs.push({
        ID: i,
        Name: M[i].n,
        Ecosystem: MSR[MR[M[i].b].s].n,
        Breed: MR[M[i].b].n,
        Lv1: {
          LV: M[i].g1.l,
          HP: MA[i] ? MA[i][8].split('|').length > 1 ? Number(MA[i][8].split('|')[0]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 1 ? Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 1 ? Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g1.r[0], Str: M[i].g1.r[1], Int: M[i].g1.r[2], Cha: M[i].g1.r[3], Agi: M[i].g1.r[4], APR: M[i].g1.r[5], MPR: M[i].g1.r[6]
        },
        Lv2: {
          LV: M[i].g2.l,
          HP: MA[i] ? MA[i][8].split('|').length > 2 ? Number(MA[i][8].split('|')[1]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 2 ? Number(MA[i][9].split('|')[1].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 2 ? Number(MA[i][9].split('|')[1].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g2.r[0], Str: M[i].g2.r[1], Int: M[i].g2.r[2], Cha: M[i].g2.r[3], Agi: M[i].g2.r[4], APR: M[i].g2.r[5], MPR: M[i].g2.r[6]
        },
        Lv3: {
          LV: M[i].g3.l,
          HP: MA[i] ? MA[i][8].split('|').length > 3 ? Number(MA[i][8].split('|')[2]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 3 ? Number(MA[i][9].split('|')[2].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 3 ? Number(MA[i][9].split('|')[2].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g3.r[0], Str: M[i].g3.r[1], Int: M[i].g3.r[2], Cha: M[i].g3.r[3], Agi: M[i].g3.r[4], APR: M[i].g3.r[5], MPR: M[i].g3.r[6]
        },
        Lv4: {
          LV: M[i].g4.l,
          HP: MA[i] ? MA[i][8].split('|').length > 4 ? Number(MA[i][8].split('|')[3]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[3].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[3].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g4.r[0], Str: M[i].g4.r[1], Int: M[i].g4.r[2], Cha: M[i].g4.r[3], Agi: M[i].g4.r[4], APR: M[i].g4.r[5], MPR: M[i].g4.r[6]
        },
        Lv5: {
          LV: M[i].g5.l,
          HP: MA[i] ? MA[i][8].split('|').length > 4 ? Number(MA[i][8].split('|')[4]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[4].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[4].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g5.r[0], Str: M[i].g5.r[1], Int: M[i].g5.r[2], Cha: M[i].g5.r[3], Agi: M[i].g5.r[4], APR: M[i].g5.r[5], MPR: M[i].g5.r[6]
        },
        Lv6: {
          LV: M[i].g6.l,
          HP: MA[i] ? MA[i][8].split('|').length > 5 ? Number(MA[i][8].split('|')[5]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 5 ? Number(MA[i][9].split('|')[5].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 5 ? Number(MA[i][9].split('|')[5].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g6.r[0], Str: M[i].g6.r[1], Int: M[i].g6.r[2], Cha: M[i].g6.r[3], Agi: M[i].g6.r[4], APR: M[i].g6.r[5], MPR: M[i].g6.r[6]
        },
        Lv7: {
          LV: M[i].g7.l,
          HP: MA[i] ? MA[i][8].split('|').length > 6 ? Number(MA[i][8].split('|')[6]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 6 ? Number(MA[i][9].split('|')[6].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 6 ? Number(MA[i][9].split('|')[6].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g7.r[0], Str: M[i].g7.r[1], Int: M[i].g7.r[2], Cha: M[i].g7.r[3], Agi: M[i].g7.r[4], APR: M[i].g7.r[5], MPR: M[i].g7.r[6]
        },
        Lv8: {
          LV: M[i].g8.l,
          HP: MA[i] ? MA[i][8].split('|').length > 7 ? Number(MA[i][8].split('|')[7]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 7 ? Number(MA[i][9].split('|')[7].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 7 ? Number(MA[i][9].split('|')[7].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g8.r[0], Str: M[i].g8.r[1], Int: M[i].g8.r[2], Cha: M[i].g8.r[3], Agi: M[i].g8.r[4], APR: M[i].g8.r[5], MPR: M[i].g8.r[6]
        },
        Lv9: {
          LV: M[i].g9.l,
          HP: MA[i] ? MA[i][8].split('|').length > 8 ? Number(MA[i][8].split('|')[8]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 8 ? Number(MA[i][9].split('|')[8].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 8 ? Number(MA[i][9].split('|')[8].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g9.r[0], Str: M[i].g9.r[1], Int: M[i].g9.r[2], Cha: M[i].g9.r[3], Agi: M[i].g9.r[4], APR: M[i].g9.r[5], MPR: M[i].g9.r[6]
        },
        Lv10: {
          LV: M[i].g10.l,
          HP: MA[i] ? MA[i][8].split('|').length > 9 ? Number(MA[i][8].split('|')[9]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 9 ? Number(MA[i][9].split('|')[9].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 9 ? Number(MA[i][9].split('|')[9].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g10.r[0], Str: M[i].g10.r[1], Int: M[i].g10.r[2], Cha: M[i].g10.r[3], Agi: M[i].g10.r[4], APR: M[i].g10.r[5], MPR: M[i].g10.r[6]
        },
        Drops: 0
      })
    } else if (M[i].g9) {
      obj.mobs.push({
        ID: i,
        Name: M[i].n,
        Ecosystem: MSR[MR[M[i].b].s].n,
        Breed: MR[M[i].b].n,
        Lv1: {
          LV: M[i].g1.l,
          HP: MA[i] ? MA[i][8].split('|').length > 1 ? Number(MA[i][8].split('|')[0]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 1 ? Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 1 ? Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g1.r[0], Str: M[i].g1.r[1], Int: M[i].g1.r[2], Cha: M[i].g1.r[3], Agi: M[i].g1.r[4], APR: M[i].g1.r[5], MPR: M[i].g1.r[6]
        },
        Lv2: {
          LV: M[i].g2.l,
          HP: MA[i] ? MA[i][8].split('|').length > 2 ? Number(MA[i][8].split('|')[1]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 2 ? Number(MA[i][9].split('|')[1].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 2 ? Number(MA[i][9].split('|')[1].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g2.r[0], Str: M[i].g2.r[1], Int: M[i].g2.r[2], Cha: M[i].g2.r[3], Agi: M[i].g2.r[4], APR: M[i].g2.r[5], MPR: M[i].g2.r[6]
        },
        Lv3: {
          LV: M[i].g3.l,
          HP: MA[i] ? MA[i][8].split('|').length > 3 ? Number(MA[i][8].split('|')[2]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 3 ? Number(MA[i][9].split('|')[2].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 3 ? Number(MA[i][9].split('|')[2].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g3.r[0], Str: M[i].g3.r[1], Int: M[i].g3.r[2], Cha: M[i].g3.r[3], Agi: M[i].g3.r[4], APR: M[i].g3.r[5], MPR: M[i].g3.r[6]
        },
        Lv4: {
          LV: M[i].g4.l,
          HP: MA[i] ? MA[i][8].split('|').length > 4 ? Number(MA[i][8].split('|')[3]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[3].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[3].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g4.r[0], Str: M[i].g4.r[1], Int: M[i].g4.r[2], Cha: M[i].g4.r[3], Agi: M[i].g4.r[4], APR: M[i].g4.r[5], MPR: M[i].g4.r[6]
        },
        Lv5: {
          LV: M[i].g5.l,
          HP: MA[i] ? MA[i][8].split('|').length > 4 ? Number(MA[i][8].split('|')[4]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[4].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[4].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g5.r[0], Str: M[i].g5.r[1], Int: M[i].g5.r[2], Cha: M[i].g5.r[3], Agi: M[i].g5.r[4], APR: M[i].g5.r[5], MPR: M[i].g5.r[6]
        },
        Lv6: {
          LV: M[i].g6.l,
          HP: MA[i] ? MA[i][8].split('|').length > 5 ? Number(MA[i][8].split('|')[5]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 5 ? Number(MA[i][9].split('|')[5].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 5 ? Number(MA[i][9].split('|')[5].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g6.r[0], Str: M[i].g6.r[1], Int: M[i].g6.r[2], Cha: M[i].g6.r[3], Agi: M[i].g6.r[4], APR: M[i].g6.r[5], MPR: M[i].g6.r[6]
        },
        Lv7: {
          LV: M[i].g7.l,
          HP: MA[i] ? MA[i][8].split('|').length > 6 ? Number(MA[i][8].split('|')[6]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 6 ? Number(MA[i][9].split('|')[6].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 6 ? Number(MA[i][9].split('|')[6].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g7.r[0], Str: M[i].g7.r[1], Int: M[i].g7.r[2], Cha: M[i].g7.r[3], Agi: M[i].g7.r[4], APR: M[i].g7.r[5], MPR: M[i].g7.r[6]
        },
        Lv8: {
          LV: M[i].g8.l,
          HP: MA[i] ? MA[i][8].split('|').length > 7 ? Number(MA[i][8].split('|')[7]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 7 ? Number(MA[i][9].split('|')[7].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 7 ? Number(MA[i][9].split('|')[7].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g8.r[0], Str: M[i].g8.r[1], Int: M[i].g8.r[2], Cha: M[i].g8.r[3], Agi: M[i].g8.r[4], APR: M[i].g8.r[5], MPR: M[i].g8.r[6]
        },
        Lv9: {
          LV: M[i].g9.l,
          HP: MA[i] ? MA[i][8].split('|').length > 8 ? Number(MA[i][8].split('|')[8]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 8 ? Number(MA[i][9].split('|')[8].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 8 ? Number(MA[i][9].split('|')[8].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g9.r[0], Str: M[i].g9.r[1], Int: M[i].g9.r[2], Cha: M[i].g9.r[3], Agi: M[i].g9.r[4], APR: M[i].g9.r[5], MPR: M[i].g9.r[6]
        },
        Drops: 0
      })
    } else if (M[i].g8) {
      obj.mobs.push({
        ID: i,
        Name: M[i].n,
        Ecosystem: MSR[MR[M[i].b].s].n,
        Breed: MR[M[i].b].n,
        Lv1: {
          LV: M[i].g1.l,
          HP: MA[i] ? MA[i][8].split('|').length > 1 ? Number(MA[i][8].split('|')[0]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 1 ? Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 1 ? Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g1.r[0], Str: M[i].g1.r[1], Int: M[i].g1.r[2], Cha: M[i].g1.r[3], Agi: M[i].g1.r[4], APR: M[i].g1.r[5], MPR: M[i].g1.r[6]
        },
        Lv2: {
          LV: M[i].g2.l,
          HP: MA[i] ? MA[i][8].split('|').length > 2 ? Number(MA[i][8].split('|')[1]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 2 ? Number(MA[i][9].split('|')[1].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 2 ? Number(MA[i][9].split('|')[1].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g2.r[0], Str: M[i].g2.r[1], Int: M[i].g2.r[2], Cha: M[i].g2.r[3], Agi: M[i].g2.r[4], APR: M[i].g2.r[5], MPR: M[i].g2.r[6]
        },
        Lv3: {
          LV: M[i].g3.l,
          HP: MA[i] ? MA[i][8].split('|').length > 3 ? Number(MA[i][8].split('|')[2]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 3 ? Number(MA[i][9].split('|')[2].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 3 ? Number(MA[i][9].split('|')[2].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g3.r[0], Str: M[i].g3.r[1], Int: M[i].g3.r[2], Cha: M[i].g3.r[3], Agi: M[i].g3.r[4], APR: M[i].g3.r[5], MPR: M[i].g3.r[6]
        },
        Lv4: {
          LV: M[i].g4.l,
          HP: MA[i] ? MA[i][8].split('|').length > 4 ? Number(MA[i][8].split('|')[3]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[3].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[3].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g4.r[0], Str: M[i].g4.r[1], Int: M[i].g4.r[2], Cha: M[i].g4.r[3], Agi: M[i].g4.r[4], APR: M[i].g4.r[5], MPR: M[i].g4.r[6]
        },
        Lv5: {
          LV: M[i].g5.l,
          HP: MA[i] ? MA[i][8].split('|').length > 4 ? Number(MA[i][8].split('|')[4]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[4].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[4].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g5.r[0], Str: M[i].g5.r[1], Int: M[i].g5.r[2], Cha: M[i].g5.r[3], Agi: M[i].g5.r[4], APR: M[i].g5.r[5], MPR: M[i].g5.r[6]
        },
        Lv6: {
          LV: M[i].g6.l,
          HP: MA[i] ? MA[i][8].split('|').length > 5 ? Number(MA[i][8].split('|')[5]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 5 ? Number(MA[i][9].split('|')[5].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 5 ? Number(MA[i][9].split('|')[5].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g6.r[0], Str: M[i].g6.r[1], Int: M[i].g6.r[2], Cha: M[i].g6.r[3], Agi: M[i].g6.r[4], APR: M[i].g6.r[5], MPR: M[i].g6.r[6]
        },
        Lv7: {
          LV: M[i].g7.l,
          HP: MA[i] ? MA[i][8].split('|').length > 6 ? Number(MA[i][8].split('|')[6]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 6 ? Number(MA[i][9].split('|')[6].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 6 ? Number(MA[i][9].split('|')[6].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g7.r[0], Str: M[i].g7.r[1], Int: M[i].g7.r[2], Cha: M[i].g7.r[3], Agi: M[i].g7.r[4], APR: M[i].g7.r[5], MPR: M[i].g7.r[6]
        },
        Lv8: {
          LV: M[i].g8.l,
          HP: MA[i] ? MA[i][8].split('|').length > 7 ? Number(MA[i][8].split('|')[7]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 7 ? Number(MA[i][9].split('|')[7].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 7 ? Number(MA[i][9].split('|')[7].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g8.r[0], Str: M[i].g8.r[1], Int: M[i].g8.r[2], Cha: M[i].g8.r[3], Agi: M[i].g8.r[4], APR: M[i].g8.r[5], MPR: M[i].g8.r[6]
        },
        Drops: 0
      })
    } else if (M[i].g7) {
      obj.mobs.push({
        ID: i,
        Name: M[i].n,
        Ecosystem: MSR[MR[M[i].b].s].n,
        Breed: MR[M[i].b].n,
        Lv1: {
          LV: M[i].g1.l,
          HP: MA[i] ? MA[i][8].split('|').length > 1 ? Number(MA[i][8].split('|')[0]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 1 ? Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 1 ? Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g1.r[0], Str: M[i].g1.r[1], Int: M[i].g1.r[2], Cha: M[i].g1.r[3], Agi: M[i].g1.r[4], APR: M[i].g1.r[5], MPR: M[i].g1.r[6]
        },
        Lv2: {
          LV: M[i].g2.l,
          HP: MA[i] ? MA[i][8].split('|').length > 2 ? Number(MA[i][8].split('|')[1]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 2 ? Number(MA[i][9].split('|')[1].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 2 ? Number(MA[i][9].split('|')[1].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g2.r[0], Str: M[i].g2.r[1], Int: M[i].g2.r[2], Cha: M[i].g2.r[3], Agi: M[i].g2.r[4], APR: M[i].g2.r[5], MPR: M[i].g2.r[6]
        },
        Lv3: {
          LV: M[i].g3.l,
          HP: MA[i] ? MA[i][8].split('|').length > 3 ? Number(MA[i][8].split('|')[2]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 3 ? Number(MA[i][9].split('|')[2].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 3 ? Number(MA[i][9].split('|')[2].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g3.r[0], Str: M[i].g3.r[1], Int: M[i].g3.r[2], Cha: M[i].g3.r[3], Agi: M[i].g3.r[4], APR: M[i].g3.r[5], MPR: M[i].g3.r[6]
        },
        Lv4: {
          LV: M[i].g4.l,
          HP: MA[i] ? MA[i][8].split('|').length > 4 ? Number(MA[i][8].split('|')[3]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[3].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[3].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g4.r[0], Str: M[i].g4.r[1], Int: M[i].g4.r[2], Cha: M[i].g4.r[3], Agi: M[i].g4.r[4], APR: M[i].g4.r[5], MPR: M[i].g4.r[6]
        },
        Lv5: {
          LV: M[i].g5.l,
          HP: MA[i] ? MA[i][8].split('|').length > 4 ? Number(MA[i][8].split('|')[4]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[4].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[4].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g5.r[0], Str: M[i].g5.r[1], Int: M[i].g5.r[2], Cha: M[i].g5.r[3], Agi: M[i].g5.r[4], APR: M[i].g5.r[5], MPR: M[i].g5.r[6]
        },
        Lv6: {
          LV: M[i].g6.l,
          HP: MA[i] ? MA[i][8].split('|').length > 5 ? Number(MA[i][8].split('|')[5]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 5 ? Number(MA[i][9].split('|')[5].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 5 ? Number(MA[i][9].split('|')[5].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g6.r[0], Str: M[i].g6.r[1], Int: M[i].g6.r[2], Cha: M[i].g6.r[3], Agi: M[i].g6.r[4], APR: M[i].g6.r[5], MPR: M[i].g6.r[6]
        },
        Lv7: {
          LV: M[i].g7.l,
          HP: MA[i] ? MA[i][8].split('|').length > 6 ? Number(MA[i][8].split('|')[6]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 6 ? Number(MA[i][9].split('|')[6].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 6 ? Number(MA[i][9].split('|')[6].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g7.r[0], Str: M[i].g7.r[1], Int: M[i].g7.r[2], Cha: M[i].g7.r[3], Agi: M[i].g7.r[4], APR: M[i].g7.r[5], MPR: M[i].g7.r[6]
        },
        Drops: 0
      })
    } else if (M[i].g6) {
      obj.mobs.push({
        ID: i,
        Name: M[i].n,
        Ecosystem: MSR[MR[M[i].b].s].n,
        Breed: MR[M[i].b].n,
        Lv1: {
          LV: M[i].g1.l,
          HP: MA[i] ? MA[i][8].split('|').length > 1 ? Number(MA[i][8].split('|')[0]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 1 ? Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 1 ? Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g1.r[0], Str: M[i].g1.r[1], Int: M[i].g1.r[2], Cha: M[i].g1.r[3], Agi: M[i].g1.r[4], APR: M[i].g1.r[5], MPR: M[i].g1.r[6]
        },
        Lv2: {
          LV: M[i].g2.l,
          HP: MA[i] ? MA[i][8].split('|').length > 2 ? Number(MA[i][8].split('|')[1]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 2 ? Number(MA[i][9].split('|')[1].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 2 ? Number(MA[i][9].split('|')[1].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g2.r[0], Str: M[i].g2.r[1], Int: M[i].g2.r[2], Cha: M[i].g2.r[3], Agi: M[i].g2.r[4], APR: M[i].g2.r[5], MPR: M[i].g2.r[6]
        },
        Lv3: {
          LV: M[i].g3.l,
          HP: MA[i] ? MA[i][8].split('|').length > 3 ? Number(MA[i][8].split('|')[2]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 3 ? Number(MA[i][9].split('|')[2].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 3 ? Number(MA[i][9].split('|')[2].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g3.r[0], Str: M[i].g3.r[1], Int: M[i].g3.r[2], Cha: M[i].g3.r[3], Agi: M[i].g3.r[4], APR: M[i].g3.r[5], MPR: M[i].g3.r[6]
        },
        Lv4: {
          LV: M[i].g4.l,
          HP: MA[i] ? MA[i][8].split('|').length > 4 ? Number(MA[i][8].split('|')[3]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[3].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[3].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g4.r[0], Str: M[i].g4.r[1], Int: M[i].g4.r[2], Cha: M[i].g4.r[3], Agi: M[i].g4.r[4], APR: M[i].g4.r[5], MPR: M[i].g4.r[6]
        },
        Lv5: {
          LV: M[i].g5.l,
          HP: MA[i] ? MA[i][8].split('|').length > 4 ? Number(MA[i][8].split('|')[4]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[4].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[4].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g5.r[0], Str: M[i].g5.r[1], Int: M[i].g5.r[2], Cha: M[i].g5.r[3], Agi: M[i].g5.r[4], APR: M[i].g5.r[5], MPR: M[i].g5.r[6]
        },
        Lv6: {
          LV: M[i].g6.l,
          HP: MA[i] ? MA[i][8].split('|').length > 5 ? Number(MA[i][8].split('|')[5]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 5 ? Number(MA[i][9].split('|')[5].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 5 ? Number(MA[i][9].split('|')[5].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g6.r[0], Str: M[i].g6.r[1], Int: M[i].g6.r[2], Cha: M[i].g6.r[3], Agi: M[i].g6.r[4], APR: M[i].g6.r[5], MPR: M[i].g6.r[6]
        },
        Drops: 0
      })
    } else if (M[i].g5) {
      obj.mobs.push({
        ID: i,
        Name: M[i].n,
        Ecosystem: MSR[MR[M[i].b].s].n,
        Breed: MR[M[i].b].n,
        Lv1: {
          LV: M[i].g1.l,
          HP: MA[i] ? MA[i][8].split('|').length > 1 ? Number(MA[i][8].split('|')[0]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 1 ? Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 1 ? Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g1.r[0], Str: M[i].g1.r[1], Int: M[i].g1.r[2], Cha: M[i].g1.r[3], Agi: M[i].g1.r[4], APR: M[i].g1.r[5], MPR: M[i].g1.r[6]
        },
        Lv2: {
          LV: M[i].g2.l,
          HP: MA[i] ? MA[i][8].split('|').length > 2 ? Number(MA[i][8].split('|')[1]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 2 ? Number(MA[i][9].split('|')[1].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 2 ? Number(MA[i][9].split('|')[1].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g2.r[0], Str: M[i].g2.r[1], Int: M[i].g2.r[2], Cha: M[i].g2.r[3], Agi: M[i].g2.r[4], APR: M[i].g2.r[5], MPR: M[i].g2.r[6]
        },
        Lv3: {
          LV: M[i].g3.l,
          HP: MA[i] ? MA[i][8].split('|').length > 3 ? Number(MA[i][8].split('|')[2]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 3 ? Number(MA[i][9].split('|')[2].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 3 ? Number(MA[i][9].split('|')[2].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g3.r[0], Str: M[i].g3.r[1], Int: M[i].g3.r[2], Cha: M[i].g3.r[3], Agi: M[i].g3.r[4], APR: M[i].g3.r[5], MPR: M[i].g3.r[6]
        },
        Lv4: {
          LV: M[i].g4.l,
          HP: MA[i] ? MA[i][8].split('|').length > 4 ? Number(MA[i][8].split('|')[3]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[3].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[3].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g4.r[0], Str: M[i].g4.r[1], Int: M[i].g4.r[2], Cha: M[i].g4.r[3], Agi: M[i].g4.r[4], APR: M[i].g4.r[5], MPR: M[i].g4.r[6]
        },
        Lv5: {
          LV: M[i].g5.l,
          HP: MA[i] ? MA[i][8].split('|').length > 4 ? Number(MA[i][8].split('|')[4]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[4].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[4].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g5.r[0], Str: M[i].g5.r[1], Int: M[i].g5.r[2], Cha: M[i].g5.r[3], Agi: M[i].g5.r[4], APR: M[i].g5.r[5], MPR: M[i].g5.r[6]
        },
        Drops: 0
      })
    } else if (M[i].g4) {
      obj.mobs.push({
        ID: i,
        Name: M[i].n,
        Ecosystem: MSR[MR[M[i].b].s].n,
        Breed: MR[M[i].b].n,
        Lv1: {
          LV: M[i].g1.l,
          HP: MA[i] ? MA[i][8].split('|').length > 1 ? Number(MA[i][8].split('|')[0]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 1 ? Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 1 ? Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g1.r[0], Str: M[i].g1.r[1], Int: M[i].g1.r[2], Cha: M[i].g1.r[3], Agi: M[i].g1.r[4], APR: M[i].g1.r[5], MPR: M[i].g1.r[6]
        },
        Lv2: {
          LV: M[i].g2.l,
          HP: MA[i] ? MA[i][8].split('|').length > 2 ? Number(MA[i][8].split('|')[1]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 2 ? Number(MA[i][9].split('|')[1].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 2 ? Number(MA[i][9].split('|')[1].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g2.r[0], Str: M[i].g2.r[1], Int: M[i].g2.r[2], Cha: M[i].g2.r[3], Agi: M[i].g2.r[4], APR: M[i].g2.r[5], MPR: M[i].g2.r[6]
        },
        Lv3: {
          LV: M[i].g3.l,
          HP: MA[i] ? MA[i][8].split('|').length > 3 ? Number(MA[i][8].split('|')[2]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 3 ? Number(MA[i][9].split('|')[2].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 3 ? Number(MA[i][9].split('|')[2].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g3.r[0], Str: M[i].g3.r[1], Int: M[i].g3.r[2], Cha: M[i].g3.r[3], Agi: M[i].g3.r[4], APR: M[i].g3.r[5], MPR: M[i].g3.r[6]
        },
        Lv4: {
          LV: M[i].g4.l,
          HP: MA[i] ? MA[i][8].split('|').length > 4 ? Number(MA[i][8].split('|')[3]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[3].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 4 ? Number(MA[i][9].split('|')[3].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g4.r[0], Str: M[i].g4.r[1], Int: M[i].g4.r[2], Cha: M[i].g4.r[3], Agi: M[i].g4.r[4], APR: M[i].g4.r[5], MPR: M[i].g4.r[6]
        },
        Drops: 0
      })
    } else if (M[i].g3) {
      obj.mobs.push({
        ID: i,
        Name: M[i].n,
        Ecosystem: MSR[MR[M[i].b].s].n,
        Breed: MR[M[i].b].n,
        Lv1: {
          LV: M[i].g1.l,
          HP: MA[i] ? MA[i][8].split('|').length > 1 ? Number(MA[i][8].split('|')[0]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 1 ? Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 1 ? Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g1.r[0], Str: M[i].g1.r[1], Int: M[i].g1.r[2], Cha: M[i].g1.r[3], Agi: M[i].g1.r[4], APR: M[i].g1.r[5], MPR: M[i].g1.r[6]
        },
        Lv2: {
          LV: M[i].g2.l,
          HP: MA[i] ? MA[i][8].split('|').length > 2 ? Number(MA[i][8].split('|')[1]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 2 ? Number(MA[i][9].split('|')[1].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 2 ? Number(MA[i][9].split('|')[1].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g2.r[0], Str: M[i].g2.r[1], Int: M[i].g2.r[2], Cha: M[i].g2.r[3], Agi: M[i].g2.r[4], APR: M[i].g2.r[5], MPR: M[i].g2.r[6]
        },
        Lv3: {
          LV: M[i].g3.l,
          HP: MA[i] ? MA[i][8].split('|').length > 3 ? Number(MA[i][8].split('|')[2]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 3 ? Number(MA[i][9].split('|')[2].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 3 ? Number(MA[i][9].split('|')[2].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g3.r[0], Str: M[i].g3.r[1], Int: M[i].g3.r[2], Cha: M[i].g3.r[3], Agi: M[i].g3.r[4], APR: M[i].g3.r[5], MPR: M[i].g3.r[6]
        },
        Drops: 0
      })
    } else if (M[i].g2) {
      obj.mobs.push({
        ID: i,
        Name: M[i].n,
        Ecosystem: MSR[MR[M[i].b].s].n,
        Breed: MR[M[i].b].n,
        Lv1: {
          LV: M[i].g1.l,
          HP: MA[i] ? MA[i][8].split('|').length > 1 ? Number(MA[i][8].split('|')[0]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 1 ? Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 1 ? Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g1.r[0], Str: M[i].g1.r[1], Int: M[i].g1.r[2], Cha: M[i].g1.r[3], Agi: M[i].g1.r[4], APR: M[i].g1.r[5], MPR: M[i].g1.r[6]
        },
        Lv2: {
          LV: M[i].g2.l,
          HP: MA[i] ? MA[i][8].split('|').length > 2 ? Number(MA[i][8].split('|')[1]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 2 ? Number(MA[i][9].split('|')[1].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 2 ? Number(MA[i][9].split('|')[1].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g2.r[0], Str: M[i].g2.r[1], Int: M[i].g2.r[2], Cha: M[i].g2.r[3], Agi: M[i].g2.r[4], APR: M[i].g2.r[5], MPR: M[i].g2.r[6]
        },
        Drops: 0
      })
    } else if (M[i].g1) {
      obj.mobs.push({
        ID: i,
        Name: M[i].n,
        Ecosystem: MSR[MR[M[i].b].s].n,
        Breed: MR[M[i].b].n,
        Lv1: {
          LV: M[i].g1.l,
          HP: MA[i] ? MA[i][8].split('|').length > 1 ? Number(MA[i][8].split('|')[0]) : Number(MA[i][8].split('|')[0]) : '?',
          AP: MA[i] ? MA[i][9].split('|').length > 1 ? Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : Number(MA[i][9].split('|')[0].match('[^;]*')[0]) : '?',
          MP: MA[i] ? MA[i][9].split('|').length > 1 ? Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : Number(MA[i][9].split('|')[0].match('\;(.*)')[1]) : '?',
          Neu: M[i].g1.r[0], Str: M[i].g1.r[1], Int: M[i].g1.r[2], Cha: M[i].g1.r[3], Agi: M[i].g1.r[4], APR: M[i].g1.r[5], MPR: M[i].g1.r[6]
        },
        Drops: 0
      })
    }
  }
}
const dat = JSON.stringify(obj.mobs)
fs.writeFile('MonsterData.json', dat, 'utf8', (err) => {
  if (err) throw err
  return console.log('+')
})
const datt = JSON.stringify(obj.items)
fs.writeFile('ItemData.json', datt, 'utf8', (err) => {
  if (err) throw err
  return console.log('+')
})