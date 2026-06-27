// カフェ日記 トロフィー定義（index.html と trophy.html で共用）
(function(){
  const GENRES=['ドリップコーヒー','エスプレッソ','カフェラテ','カプチーノ','抹茶ラテ','紅茶','チャイ','ココア','スムージー','フラペチーノ','ソーダ/エード','パンケーキ','トースト','ケーキ']

  // デビュー(1杯)・マニア(10杯)・極み(30杯) の称号名（無ければ自動生成）
  const DEBUT={
    'ドリップコーヒー':'コーヒー一杯目','エスプレッソ':'エスプレッソデビュー','カフェラテ':'ラテはじめ','カプチーノ':'カプチーノデビュー',
    '抹茶ラテ':'抹茶デビュー','紅茶':'ティータイム入門','チャイ':'スパイス開眼','ココア':'ほっとひといき',
    'スムージー':'ヘルシー宣言','フラペチーノ':'フラペデビュー','ソーダ/エード':'シュワっと初体験','パンケーキ':'パンケーキ女子',
    'トースト':'モーニング派','ケーキ':'別腹デビュー'
  }
  const MANIA={
    'ドリップコーヒー':'コーヒー通','エスプレッソ':'バリスタ気分','カフェラテ':'ラテマニア','カプチーノ':'泡マスター',
    '抹茶ラテ':'抹茶マニア','紅茶':'紅茶通','チャイ':'スパイス中毒','ココア':'ココア党',
    'スムージー':'スムージー職人','フラペチーノ':'フラペ中毒','ソーダ/エード':'映えドリンカー','パンケーキ':'パンケーキ職人',
    'トースト':'トースト名人','ケーキ':'スイーツ女子'
  }
  const MASTER={ 'ドリップコーヒー':'珈琲の達人','カフェラテ':'ラテ仙人','抹茶ラテ':'茶人','ケーキ':'スイーツの王' }

  // 連続記録(ストリーク)を計算: {current, longest, days}
  function streakInfo(records){
    const set=new Set(records.map(r=>r.date).filter(Boolean))
    const toISO=dt=>`${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`
    const add=(d,n)=>{const z=new Date(d+'T00:00:00');z.setDate(z.getDate()+n);return toISO(z)}
    const sorted=[...set].sort()
    let longest=0,run=0,prev=null
    for(const d of sorted){ run=(prev&&add(prev,1)===d)?run+1:1; longest=Math.max(longest,run); prev=d }
    const today=toISO(new Date())
    let c = set.has(today)?today : (set.has(add(today,-1))?add(today,-1):null)
    let cur=0
    while(c && set.has(c)){cur++; c=add(c,-1)}
    return {current:cur,longest,days:set.size}
  }

  function computeAchievements(records){
    const list=[]
    const gc=g=>records.filter(r=>r.type===g).length
    const add=(id,group,title,desc,have,target)=>list.push({
      id,group,title,desc,raw:have,have:Math.min(have,target),target,
      earned:have>=target, pct:Math.max(0,Math.min(1,target?have/target:0))
    })
    GENRES.forEach(g=>{
      const c=gc(g)
      add('debut:'+g,'ジャンル', DEBUT[g]||(g+'デビュー'), g+'を1杯', c,1)
      add('mania:'+g,'ジャンル', MANIA[g]||(g+'マニア'), g+'を10杯', c,10)
      add('master:'+g,'ジャンル', MASTER[g]||(g+'の極み'), g+'を30杯', c,30)
    })
    const total=records.length
    add('total10','総合','カフェ活はじめ','合計10杯',total,10)
    add('total50','総合','カフェの道','合計50杯',total,50)
    add('total100','総合','百杯の極み','合計100杯',total,100)
    const variety=new Set(records.map(r=>r.type).filter(Boolean)).size
    add('var5','総合','いろいろ飲み','5ジャンル制覇',variety,5)
    add('var10','総合','ドリンク探求者','10ジャンル制覇',variety,10)
    add('var16','総合','全ドリンク制覇','全'+GENRES.length+'ジャンル制覇',variety,GENRES.length)
    add('star3','総合','殿堂コレクター','★5を3杯',records.filter(r=>r.stars===5).length,3)
    add('photo10','総合','カフェフォトグラファー','写真つき10件',records.filter(r=>(r.photos||0)>0||r.photo).length,10)
    const byday={}; records.forEach(r=>{if(r.date)byday[r.date]=(byday[r.date]||0)+1})
    add('double','総合','ダブルカフェ','1日に2杯',Math.max(0,...Object.values(byday),0),2)
    const st=streakInfo(records)
    add('streak3','総合','3日連続 カフェ活','3日連続で記録',st.longest,3)
    add('streak7','総合','一週間 カフェ活','7日連続で記録',st.longest,7)
    add('streak30','総合','カフェ活マスター','30日連続で記録',st.longest,30)
    return list
  }
  window.computeAchievements=computeAchievements
  window.computeStreak=streakInfo
  window.MENCHO_GENRES=GENRES
})();
