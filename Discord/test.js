const { Console } = require('console');
const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./data.json'))
const obj = {
	baules: [],
    users: []
}
data.forEach(d => {
    let url = ''
    let multiCount = 0
    let rougeCount = 0
    let orangeCount = 0
    let jauneCount = 0
    let verteCount = 0
    let bleueCount = 0
    let violetteCount = 0
    let roseCount = 0
    let blancheCount = 0
    let pelucheCount = 0
    let carteCount = 0
    let perlequinCount = 0
    let ballonCount = 0
    let bougieCount = 0
    let multi = 0
    let rouge = 0
    let orange = 0
    let jaune = 0
    let verte = 0
    let bleue = 0
    let violette = 0
    let rose = 0
    let blanche = 0
    let peluche = 0
    let carte = 0
    let perlequin = 0
    let ballon = 0
    let bougie = 0
    if (d.embeds[0].thumbnail) {
        url += d.embeds[0].thumbnail.url.match('(?=\\C)(.*?)(?=\.png)')[0]
        d.embeds[0].fields.forEach(f => {
            let ff = f.name + f.value
            if (ff.replaceAll('🔶 ', '').replaceAll('🔸 ', '').replaceAll('🔹 ', '').replaceAll('**-** ', '').replaceAll('** ** ', '').replaceAll('** **', '').match('^([0-9]+).*') != null) {
                ff.replaceAll('🔶 ', '').replaceAll('🔸 ', '').replaceAll('🔹 ', '').replaceAll('**-** ', '').replaceAll('** ** ', '').replaceAll('** **', '').replaceAll('x ', 'x').toString().split('\n').forEach(q => {
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'boule_multi')              {multiCount += 1,      multi += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'boule_de_nowel_rouge')     {rougeCount += 1,      rouge += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'boule_de_nowel_orange')    {orangeCount += 1,     orange += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'boule_de_nowel_jaune')     {jauneCount += 1,      jaune += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'boule_de_nowel_verte')     {verteCount += 1,      verte += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'boule_de_nowel_bleue')     {bleueCount += 1,      bleue += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'boule_de_nowel_violette')  {violetteCount += 1,   violette += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'boule_de_nowel_rose')      {roseCount += 1,       rose += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'boule_de_nowel_blanche')   {blancheCount += 1,    blanche += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'peluche')                  {pelucheCount += 1,    peluche += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'carte')                    {carteCount += 1,      carte += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'Perlequin')                {perlequinCount += 1,  perlequin += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'Ballon')                   {ballonCount += 1,     ballon += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'Bougie')                   {bougieCount += 1,     bougie += Number(q.split('x')[0])}
                })
            }
        })
    }
    obj.baules.push({
        Gift: url.replaceAll('_', ' '),
        Total: multi+rouge+orange+jaune+verte+bleue+violette+rose+blanche+peluche+carte+perlequin+ballon+bougie,
        TotalCount: 1,
        Multi:      multi,     MultiCount:     multiCount,
        Rouge:      rouge,     RougeCount:     rougeCount,
        Orange:     orange,    OrangeCount:    orangeCount,
        Jaune:      jaune,     JauneCount:     jauneCount,
        Verte:      verte,     VerteCount:     verteCount,
        Bleue:      bleue,     BleueCount:     bleueCount,
        Violette:   violette,  VioletteCount:  violetteCount,
        Rose:       rose,      RoseCount:      roseCount,
        Blanche:    blanche,   BlancheCount:   blancheCount,
        Peluche:    peluche,   PelucheCount:   pelucheCount,
        Carte:      carte,     CarteCount:     carteCount,
        Perlequin:  perlequin, PerlequinCount: perlequinCount,
        Ballon:     ballon,    BallonCount:    ballonCount,
        Bougie:     bougie,    BougieCount:    bougieCount
    })
});

const sum = obj.baules.reduce((a,c)=>{
    let x = a.find(e=>e.Gift===c.Gift)
    if(!x) a.push(Object.assign({},c))
    else {
        x.Total +=      c.Total,        x.TotalCount +=         1
        x.Multi +=      c.Multi,        x.MultiCount +=         c.MultiCount
        x.Rouge +=      c.Rouge,        x.RougeCount +=         c.RougeCount
        x.Orange +=     c.Orange,       x.OrangeCount +=        c.OrangeCount
        x.Jaune +=      c.Jaune,        x.JauneCount +=         c.JauneCount
        x.Verte +=      c.Verte,        x.VerteCount +=         c.VerteCount
        x.Bleue +=      c.Bleue,        x.BleueCount +=         c.BleueCount
        x.Violette +=   c.Violette,     x.VioletteCount +=      c.VioletteCount
        x.Rose +=       c.Rose,         x.RoseCount +=          c.RoseCount
        x.Blanche +=    c.Blanche,      x.BlancheCount +=       c.BlancheCount
        x.Peluche +=    c.Peluche,      x.PelucheCount +=       c.PelucheCount
        x.Carte +=      c.Carte,        x.CarteCount +=         c.CarteCount
        x.Perlequin +=  c.Perlequin,    x.PerlequinCount +=     c.PerlequinCount
        x.Ballon +=     c.Ballon,       x.BallonCount +=        c.BallonCount
        x.Bougie +=     c.Bougie,       x.BougieCount +=        c.BougieCount
    }
    return a
},[])
sum.sort((a, b) => {
	return b.Total - a.Total
})
sum.forEach(ob => {
    ob.Total =      getNumber(ob.Total),         ob.Gift +=      ` (x${ob.TotalCount})`,         delete ob.TotalCount
    ob.Multi =      getNumber(ob.Multi),         ob.Multi +=     ` (x${ob.MultiCount})`,         delete ob.MultiCount
    ob.Rouge =      getNumber(ob.Rouge),         ob.Rouge +=     ` (x${ob.RougeCount})`,         delete ob.RougeCount
    ob.Orange =     getNumber(ob.Orange),        ob.Orange +=    ` (x${ob.OrangeCount})`,        delete ob.OrangeCount
    ob.Jaune =      getNumber(ob.Jaune),         ob.Jaune +=     ` (x${ob.JauneCount})`,         delete ob.JauneCount
    ob.Verte =      getNumber(ob.Verte),         ob.Verte +=     ` (x${ob.VerteCount})`,         delete ob.VerteCount
    ob.Bleue =      getNumber(ob.Bleue),         ob.Bleue +=     ` (x${ob.BleueCount})`,         delete ob.BleueCount
    ob.Violette =   getNumber(ob.Violette),      ob.Violette +=  ` (x${ob.VioletteCount})`,      delete ob.VioletteCount
    ob.Rose =       getNumber(ob.Rose),          ob.Rose +=      ` (x${ob.RoseCount})`,          delete ob.RoseCount
    ob.Blanche =    getNumber(ob.Blanche),       ob.Blanche +=   ` (x${ob.BlancheCount})`,       delete ob.BlancheCount
    ob.Peluche =    getNumber(ob.Peluche),       ob.Peluche +=   ` (x${ob.PelucheCount})`,       delete ob.PelucheCount
    ob.Carte =      getNumber(ob.Carte),         ob.Carte +=     ` (x${ob.CarteCount})`,         delete ob.CarteCount
    ob.Perlequin =  getNumber(ob.Perlequin),     ob.Perlequin += ` (x${ob.PerlequinCount})`,     delete ob.PerlequinCount
    ob.Ballon =     getNumber(ob.Ballon),        ob.Ballon +=    ` (x${ob.BallonCount})`,        delete ob.BallonCount
    ob.Bougie =     getNumber(ob.Bougie),        ob.Bougie +=    ` (x${ob.BougieCount})`,        delete ob.BougieCount
})


data.forEach(d => {
    let fff = d.embeds[0].fields[0].name + d.embeds[0].fields[0].value
    fff.replaceAll('🔶 ', '').replaceAll('🔸 ', '').replaceAll('🔹 ', '').replaceAll('**-** ', '').replaceAll('** ** ', '').replaceAll('** **', '').replaceAll(new RegExp('P.*[0-9]\\\)', 'gm'), '').split('\n').forEach(dd => {
        let user = ''
        let umultiCount = 0
        let urougeCount = 0
        let uorangeCount = 0
        let ujauneCount = 0
        let uverteCount = 0
        let ubleueCount = 0
        let uvioletteCount = 0
        let uroseCount = 0
        let ublancheCount = 0
        let upelucheCount = 0
        let ucarteCount = 0
        let uperlequinCount = 0
        let uballonCount = 0
        let ubougieCount = 0
        let umulti = 0
        let urouge = 0
        let uorange = 0
        let ujaune = 0
        let uverte = 0
        let ubleue = 0
        let uviolette = 0
        let urose = 0
        let ublanche = 0
        let upeluche = 0
        let ucarte = 0
        let uperlequin = 0
        let uballon = 0
        let ubougie = 0
        user += dd
        d.embeds[0].fields.forEach(f => {
            let ff = f.name + f.value
            if (ff.replaceAll('🔶 ', '').replaceAll('🔸 ', '').replaceAll('🔹 ', '').replaceAll('**-** ', '').replaceAll('** ** ', '').replaceAll('** **', '').match('^([0-9]+).*') != null) {
                ff.replaceAll('🔶 ', '').replaceAll('🔸 ', '').replaceAll('🔹 ', '').replaceAll('**-** ', '').replaceAll('** ** ', '').replaceAll('** **', '').replaceAll('x ', 'x').toString().split('\n').forEach(q => {
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'boule_multi')              {umultiCount += 1,      umulti += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'boule_de_nowel_rouge')     {urougeCount += 1,      urouge += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'boule_de_nowel_orange')    {uorangeCount += 1,     uorange += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'boule_de_nowel_jaune')     {ujauneCount += 1,      ujaune += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'boule_de_nowel_verte')     {uverteCount += 1,      uverte += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'boule_de_nowel_bleue')     {ubleueCount += 1,      ubleue += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'boule_de_nowel_violette')  {uvioletteCount += 1,   uviolette += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'boule_de_nowel_rose')      {uroseCount += 1,       urose += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'boule_de_nowel_blanche')   {ublancheCount += 1,    ublanche += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'peluche')                  {upelucheCount += 1,    upeluche += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'carte')                    {ucarteCount += 1,      ucarte += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'Perlequin')                {uperlequinCount += 1,  uperlequin += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'Ballon')                   {uballonCount += 1,     uballon += Number(q.split('x')[0])}
                    if (q.split('x')[1].match('(?<=:)(.*)(?=:)')[0] === 'Bougie')                   {ubougieCount += 1,     ubougie += Number(q.split('x')[0])}
                })
            }
        })
        obj.users.push({
            User: user,
            Total: umulti+urouge+uorange+ujaune+uverte+ubleue+uviolette+urose+ublanche+upeluche+ucarte+uperlequin+uballon+ubougie,
            TotalCount: 1,
            Multi:      umulti,     MultiCount:     umultiCount,
            Rouge:      urouge,     RougeCount:     urougeCount,
            Orange:     uorange,    OrangeCount:    uorangeCount,
            Jaune:      ujaune,     JauneCount:     ujauneCount,
            Verte:      uverte,     VerteCount:     uverteCount,
            Bleue:      ubleue,     BleueCount:     ubleueCount,
            Violette:   uviolette,  VioletteCount:  uvioletteCount,
            Rose:       urose,      RoseCount:      uroseCount,
            Blanche:    ublanche,   BlancheCount:   ublancheCount,
            Peluche:    upeluche,   PelucheCount:   upelucheCount,
            Carte:      ucarte,     CarteCount:     ucarteCount,
            Perlequin:  uperlequin, PerlequinCount: uperlequinCount,
            Ballon:     uballon,    BallonCount:    uballonCount,
            Bougie:     ubougie,    BougieCount:    ubougieCount
        })
    })
})

const usum = obj.users.reduce((a,c)=>{
    let x = a.find(e=>e.User===c.User)
    if(!x) a.push(Object.assign({},c))
    else {
        x.Total +=      c.Total,        x.TotalCount +=         1
        x.Multi +=      c.Multi,        x.MultiCount +=         c.MultiCount
        x.Rouge +=      c.Rouge,        x.RougeCount +=         c.RougeCount
        x.Orange +=     c.Orange,       x.OrangeCount +=        c.OrangeCount
        x.Jaune +=      c.Jaune,        x.JauneCount +=         c.JauneCount
        x.Verte +=      c.Verte,        x.VerteCount +=         c.VerteCount
        x.Bleue +=      c.Bleue,        x.BleueCount +=         c.BleueCount
        x.Violette +=   c.Violette,     x.VioletteCount +=      c.VioletteCount
        x.Rose +=       c.Rose,         x.RoseCount +=          c.RoseCount
        x.Blanche +=    c.Blanche,      x.BlancheCount +=       c.BlancheCount
        x.Peluche +=    c.Peluche,      x.PelucheCount +=       c.PelucheCount
        x.Carte +=      c.Carte,        x.CarteCount +=         c.CarteCount
        x.Perlequin +=  c.Perlequin,    x.PerlequinCount +=     c.PerlequinCount
        x.Ballon +=     c.Ballon,       x.BallonCount +=        c.BallonCount
        x.Bougie +=     c.Bougie,       x.BougieCount +=        c.BougieCount
    }
    return a
},[])
usum.sort((a, b) => {
	return b.Total - a.Total
})
usum.forEach(ob => {
    ob.Total =      getNumber(ob.Total),         ob.User +=      ` (x${ob.TotalCount})`,         delete ob.TotalCount
    ob.Multi =      getNumber(ob.Multi),         ob.Multi +=     ` (x${ob.MultiCount})`,         delete ob.MultiCount
    ob.Rouge =      getNumber(ob.Rouge),         ob.Rouge +=     ` (x${ob.RougeCount})`,         delete ob.RougeCount
    ob.Orange =     getNumber(ob.Orange),        ob.Orange +=    ` (x${ob.OrangeCount})`,        delete ob.OrangeCount
    ob.Jaune =      getNumber(ob.Jaune),         ob.Jaune +=     ` (x${ob.JauneCount})`,         delete ob.JauneCount
    ob.Verte =      getNumber(ob.Verte),         ob.Verte +=     ` (x${ob.VerteCount})`,         delete ob.VerteCount
    ob.Bleue =      getNumber(ob.Bleue),         ob.Bleue +=     ` (x${ob.BleueCount})`,         delete ob.BleueCount
    ob.Violette =   getNumber(ob.Violette),      ob.Violette +=  ` (x${ob.VioletteCount})`,      delete ob.VioletteCount
    ob.Rose =       getNumber(ob.Rose),          ob.Rose +=      ` (x${ob.RoseCount})`,          delete ob.RoseCount
    ob.Blanche =    getNumber(ob.Blanche),       ob.Blanche +=   ` (x${ob.BlancheCount})`,       delete ob.BlancheCount
    ob.Peluche =    getNumber(ob.Peluche),       ob.Peluche +=   ` (x${ob.PelucheCount})`,       delete ob.PelucheCount
    ob.Carte =      getNumber(ob.Carte),         ob.Carte +=     ` (x${ob.CarteCount})`,         delete ob.CarteCount
    ob.Perlequin =  getNumber(ob.Perlequin),     ob.Perlequin += ` (x${ob.PerlequinCount})`,     delete ob.PerlequinCount
    ob.Ballon =     getNumber(ob.Ballon),        ob.Ballon +=    ` (x${ob.BallonCount})`,        delete ob.BallonCount
    ob.Bougie =     getNumber(ob.Bougie),        ob.Bougie +=    ` (x${ob.BougieCount})`,        delete ob.BougieCount
})
const dat = JSON.stringify(sum)
fs.writeFile('BaulesI.json', dat, 'utf8', (err) => {
	if (err) throw err
	return console.log('+b')
})
const datu = JSON.stringify(usum)
fs.writeFile('BaulesU.json', datu, 'utf8', (err) => {
	if (err) throw err
	return console.log('+u')
})

function getNumber (num) {
    return num;
    /*return Math.abs(Number(num)) >= 1.0e+18
    ? (Math.abs(Number(num)) / 1.0e+18).toFixed(2) + "Qn"
    : Math.abs(Number(num)) >= 1.0e+15
    ? (Math.abs(Number(num)) / 1.0e+15).toFixed(2) + "Qd"
    : Math.abs(Number(num)) >= 1.0e+12
    ? (Math.abs(Number(num)) / 1.0e+12).toFixed(2) + "T"
    : Math.abs(Number(num)) >= 1.0e+9
    ? (Math.abs(Number(num)) / 1.0e+9).toFixed(2) + "B"
    : Math.abs(Number(num)) >= 1.0e+6
    ? (Math.abs(Number(num)) / 1.0e+6).toFixed(2) + "M"
    : Math.abs(Number(num)) >= 1.0e+3
    ? (Math.abs(Number(num)) / 1.0e+3).toFixed(2) + "K"
    : Math.abs(Number(num));*/
}
