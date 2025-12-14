// ========== ステップ0（条件） ==========
const AREA_LABEL = {
  kanto: "関東",
  kansai: "関西",
  chubu: "中部",
  tohoku: "東北",
  hokkaido: "北海道",
  chugoku: "中国",
  shikoku: "四国",
  kyushu: "九州",
  nationwide: "全国",
};

const LEVEL_LABEL = {
  top: "上位（難関狙い）",
  mid: "中位（標準〜やや上）",
  safe: "基礎固め（安全校重視）",
};

// ========== 学部タイプ（診断の軸） ==========
const TRACKS = [
  {
    key: "biz",
    name: "経営・商・経済タイプ",
    desc:
      "企画・マーケ・マネジメント・会計など「動かして成果を出す」学びと相性が良いです。一般入試なら英語×国社（or数学）で勝てる設計にすると安定しやすいです。",
    tags: ["マーケ", "企画", "会計", "起業", "データ活用"],
    facultyKeywords: ["経営", "商", "経済", "経営情報", "国際経営"],
  },
  {
    key: "it",
    name: "情報・工・データタイプ",
    desc:
      "IT、プログラミング、データ分析、ものづくり系に相性が良いです。一般入試なら数学が武器になると強いです。",
    tags: ["プログラミング", "データ", "開発", "制作", "数理"],
    facultyKeywords: ["情報", "工", "理工", "データサイエンス", "数理"],
  },
  {
    key: "health",
    name: "医療・看護・栄養タイプ",
    desc:
      "人の健康やケアに直結する専門型と相性が良いです。学部によっては実習・資格が絡むのでカリキュラム確認が重要です。",
    tags: ["実習", "資格", "人体", "専門職", "ケア"],
    facultyKeywords: ["看護", "医療", "栄養", "保健", "リハビリ"],
  },
  {
    key: "law",
    name: "法・政治・政策タイプ",
    desc:
      "制度・ルール・社会の仕組みを論理で扱う学びと相性が良いです。一般入試なら読解×論理の土台が効きます。",
    tags: ["法律", "政策", "公務員", "論理", "社会制度"],
    facultyKeywords: ["法", "政治", "政策", "公共", "行政"],
  },
  {
    key: "intl",
    name: "国際・国際教養タイプ",
    desc:
      "語学や多文化理解、国際課題に関わる学びと相性が良いです。一般入試でも英語の比重が高いことが多いので英語強化が王道です。",
    tags: ["語学", "留学", "多文化", "国際課題", "英語"],
    facultyKeywords: ["国際", "国際教養", "国際関係", "グローバル", "地域研究"],
  },
  {
    key: "hum",
    name: "文学・文化・外国語タイプ",
    desc:
      "言語・文章・文化・表現を深掘りする学びと相性が良いです。一般入試なら英語＋国語で伸びやすいタイプです。",
    tags: ["文章", "語学", "研究", "編集", "表現"],
    facultyKeywords: ["文", "文学", "外国語", "文化", "人文"],
  },
  {
    key: "psycho",
    name: "心理・福祉タイプ",
    desc:
      "人の心や行動、支援・福祉領域の学びと相性が良いです。一般入試なら英語＋国語（＋社会）で取りやすいことが多いです。",
    tags: ["心理", "支援", "福祉", "相談", "人間理解"],
    facultyKeywords: ["心理", "福祉", "人間科学", "社会福祉", "臨床"],
  },
  {
    key: "edu",
    name: "教育・子ども支援タイプ",
    desc:
      "教育・発達・学習支援の学びと相性が良いです。教職を視野に入れるなら教員免許の対応状況もチェックです。",
    tags: ["教育", "発達", "教職", "子ども", "支援"],
    facultyKeywords: ["教育", "教職", "発達", "児童", "学習支援"],
  },
];

// ========== 質問 ==========
const QUESTIONS = [
  {
    id: "interest",
    title: "興味が強いのはどれ？",
    desc: "一番ワクワクするものを選んでください。",
    options: [
      { label: "人の心・行動を理解したい", sub: "心理 / 教育 / 福祉 など", score: { psycho: 3, edu: 2 } },
      { label: "社会の仕組みや制度が気になる", sub: "法 / 政治 / 政策 など", score: { law: 4 } },
      { label: "お金・ビジネス・マーケに興味", sub: "経営 / 経済 / 商 など", score: { biz: 4 } },
      { label: "IT・データ・ものづくりが好き", sub: "情報 / 工 / 数理 など", score: { it: 4 } },
      { label: "体・健康・医療に関わりたい", sub: "看護 / 栄養 / 医療系 など", score: { health: 4 } },
      { label: "文章・言語・文化を深掘りしたい", sub: "文 / 外国語 / 文化 など", score: { hum: 4, intl: 1 } },
      { label: "海外・国際の話題が好き", sub: "国際 / 国際教養 など", score: { intl: 4 } },
    ],
  },
  {
    id: "strength",
    title: "自分の強みはどれに近い？",
    desc: "得意な感じを選んでください。",
    options: [
      { label: "共感して聴く・寄り添える", sub: "対人支援に強い", score: { psycho: 3, edu: 2, health: 1 } },
      { label: "論理的に考えて説明できる", sub: "議論・分析が得意", score: { law: 3, biz: 2 } },
      { label: "数字・データが苦じゃない", sub: "検証・改善が得意", score: { it: 3, biz: 2, health: 1 } },
      { label: "企画して動かすのが好き", sub: "推進・調整が得意", score: { biz: 3, intl: 1 } },
      { label: "コツコツ積み上げるのが得意", sub: "専門・資格と相性", score: { health: 3, it: 1, hum: 1 } },
    ],
  },
  {
    id: "studyStyle",
    title: "学び方の好みは？",
    desc: "大学の授業イメージに近いものを選んでください。",
    options: [
      { label: "座学×レポート中心がいい", sub: "読む・書く・考える", score: { hum: 2, law: 2, intl: 1 } },
      { label: "演習・ディスカッション多めがいい", sub: "発表・議論・ワーク", score: { biz: 2, intl: 2, edu: 1 } },
      { label: "実験・制作・実習がしたい", sub: "手を動かして学ぶ", score: { it: 2, health: 2 } },
      { label: "バランス型がいい", sub: "混ざってると飽きない", score: { biz: 1, it: 1, hum: 1, intl: 1 } },
    ],
  },
  {
    id: "math",
    title: "数学への耐性は？（一般入試に直結）",
    desc: "得意不得意というより、抵抗感でOKです。",
    options: [
      { label: "好き・得意", sub: "数学で差をつけたい", score: { it: 3, biz: 1, health: 1 } },
      { label: "普通（必要なら頑張れる）", sub: "科目としては対応できる", score: { it: 1, biz: 1, health: 1, law: 1 } },
      { label: "苦手（できれば避けたい）", sub: "英語・国語・社会寄りが安心", score: { hum: 2, law: 2, intl: 1, edu: 1, psycho: 1 } },
    ],
  },
  {
    id: "writing",
    title: "文章（国語・論述）は？",
    desc: "レポート・論述・長文処理の相性です。",
    options: [
      { label: "得意・好き", sub: "読解・論述で勝てる", score: { hum: 3, law: 2, intl: 2 } },
      { label: "普通", sub: "慣れればいける", score: { biz: 1, edu: 1, intl: 1 } },
      { label: "苦手（短い方がいい）", sub: "実習・制作系が楽", score: { it: 2, health: 2 } },
    ],
  },
  {
    id: "future",
    title: "将来のイメージに近いのは？",
    desc: "今の憧れでOKです。",
    options: [
      { label: "企業で企画・マーケ・経営", sub: "ビジネス職", score: { biz: 4 } },
      { label: "エンジニア・データ・IT職", sub: "開発・分析", score: { it: 4 } },
      { label: "医療・健康・ケアの専門職", sub: "看護・栄養・医療系", score: { health: 4 } },
      { label: "公務員・制度・法律の仕事", sub: "行政・法務", score: { law: 4 } },
      { label: "海外・国際領域", sub: "国際協力・外資など", score: { intl: 4 } },
      { label: "心理・相談・支援職", sub: "心理・福祉", score: { psycho: 4 } },
      { label: "教育・子どもに関わる", sub: "教職・教育支援", score: { edu: 4 } },
      { label: "編集・広報・言語・文化", sub: "表現・語学", score: { hum: 4 } },
    ],
  },
];

// ========== 大学候補（例リスト） ==========
const UNI_DB = {
  nationwide: {
    top: {
      biz: ["早稲田", "慶應", "一橋（国立）", "大阪（国立）", "神戸（国立）"],
      it: ["東京（国立）", "東京科学（国立）", "東北（国立）", "大阪（国立）", "早稲田"],
      law: ["東京（国立）", "早稲田", "慶應", "一橋（国立）", "京都（国立）"],
      intl: ["上智", "ICU", "早稲田", "立命館", "神戸（国立）"],
      hum: ["東京（国立）", "早稲田", "慶應", "京都（国立）", "上智"],
      psycho: ["早稲田", "慶應", "上智", "立命館", "筑波（国立）"],
      edu: ["東京学芸（国立）", "筑波（国立）", "早稲田", "北海道（国立）", "広島（国立）"],
      health: ["千葉（国立）", "名古屋（国立）", "大阪（国立）", "順天堂", "慶應"],
    },
    mid: {
      biz: ["明治", "青山学院", "立教", "中央", "関西", "関西学院", "同志社", "立命館"],
      it: ["東京理科", "明治", "立命館", "関西", "名城", "芝浦工業"],
      law: ["中央", "明治", "立教", "法政", "同志社", "関西"],
      intl: ["上智", "立教", "青山学院", "関西学院", "立命館"],
      hum: ["立教", "明治", "青山学院", "同志社", "立命館"],
      psycho: ["立教", "明治", "青山学院", "同志社", "関西学院"],
      edu: ["学習院", "國學院", "東京学芸（国立）", "関西学院", "立命館"],
      health: ["日本", "東邦", "東京医科", "近畿", "関西医科"],
    },
    safe: {
      biz: ["東洋", "駒澤", "専修", "近畿", "甲南", "西南学院"],
      it: ["工学院", "千葉工業", "東京電機", "近畿", "福岡"],
      law: ["専修", "東洋", "國學院", "近畿", "龍谷"],
      intl: ["東洋", "武蔵", "神奈川", "近畿", "西南学院"],
      hum: ["國學院", "東洋", "武蔵", "龍谷", "福岡"],
      psycho: ["東洋", "駒澤", "武蔵野", "近畿", "西南学院"],
      edu: ["文教", "玉川", "武蔵野", "佛教", "福岡"],
      health: ["東京家政", "女子栄養", "神奈川", "福岡", "近畿"],
    },
  },

  kanto: {
    top: {
      biz: ["早稲田", "慶應", "一橋（国立）"],
      it: ["東京（国立）", "東京科学（国立）", "早稲田", "東京理科"],
      law: ["東京（国立）", "早稲田", "慶應", "一橋（国立）"],
      intl: ["上智", "ICU", "早稲田"],
      hum: ["早稲田", "慶應", "上智"],
      psycho: ["早稲田", "慶應", "上智"],
      edu: ["東京学芸（国立）", "筑波（国立）"],
      health: ["千葉（国立）", "順天堂", "慶應"],
    },
    mid: {
      biz: ["明治", "青山学院", "立教", "中央", "法政"],
      it: ["東京理科", "明治", "芝浦工業"],
      law: ["中央", "明治", "法政"],
      intl: ["立教", "青山学院", "明治"],
      hum: ["立教", "青山学院", "明治"],
      psycho: ["立教", "青山学院", "明治"],
      edu: ["学習院", "國學院"],
      health: ["日本", "東邦", "東京医科"],
    },
    safe: {
      biz: ["東洋", "駒澤", "専修"],
      it: ["工学院", "千葉工業", "東京電機"],
      law: ["専修", "東洋", "國學院"],
      intl: ["東洋", "武蔵", "神奈川"],
      hum: ["國學院", "東洋", "武蔵"],
      psycho: ["東洋", "駒澤", "武蔵野"],
      edu: ["文教", "玉川", "武蔵野"],
      health: ["東京家政", "女子栄養", "神奈川"],
    },
  },

  kansai: {
    top: {
      biz: ["京都（国立）", "大阪（国立）", "神戸（国立）", "同志社"],
      it: ["大阪（国立）", "京都（国立）", "神戸（国立）", "立命館"],
      law: ["京都（国立）", "大阪（国立）", "神戸（国立）", "同志社"],
      intl: ["立命館", "関西学院", "同志社"],
      hum: ["京都（国立）", "同志社", "立命館"],
      psycho: ["同志社", "関西学院", "立命館"],
      edu: ["大阪教育（国立）", "神戸（国立）"],
      health: ["大阪（国立）", "関西医科", "近畿"],
    },
    mid: {
      biz: ["関西", "関西学院", "同志社", "立命館"],
      it: ["立命館", "関西", "近畿"],
      law: ["同志社", "関西", "立命館"],
      intl: ["関西学院", "立命館", "関西"],
      hum: ["同志社", "立命館", "関西学院"],
      psycho: ["関西学院", "同志社", "立命館"],
      edu: ["関西学院", "立命館"],
      health: ["近畿", "関西医科"],
    },
    safe: {
      biz: ["近畿", "甲南", "龍谷"],
      it: ["近畿", "大阪工業", "京都産業"],
      law: ["龍谷", "甲南", "近畿"],
      intl: ["京都産業", "龍谷", "近畿"],
      hum: ["龍谷", "京都産業", "近畿"],
      psycho: ["近畿", "甲南", "龍谷"],
      edu: ["佛教", "京都橘", "近畿"],
      health: ["近畿", "大阪医科薬科", "森ノ宮医療"],
    },
  },
};

function getUniCandidates(areaKey, levelKey, trackKey) {
  const areaDB = UNI_DB[areaKey] || UNI_DB["nationwide"];
  const lvlDB = areaDB[levelKey] || (UNI_DB["nationwide"][levelKey] || {});
  return (lvlDB[trackKey] || UNI_DB["nationwide"][levelKey]?.[trackKey] || []).slice(0, 8);
}

// ========== アプリ状態 ==========
const STORAGE_KEY = "univ_major_quiz_v2";
const state = {
  area: "kanto",
  level: "top",
  step: 0,
  answers: {},
  scores: {},
};

const el = (id) => document.getElementById(id);

const screenProfile = el("screen-profile");
const screenQuiz = el("screen-quiz");
const screenResult = el("screen-result");

const areaSelect = el("areaSelect");
const levelSelect = el("levelSelect");
const startBtn = el("startBtn");

const qTitle = el("qTitle");
const qDesc = el("qDesc");
const qForm = el("qForm");

const backBtn = el("backBtn");
const nextBtn = el("nextBtn");
const resetBtn = el("resetBtn");

const retryBtn = el("retryBtn");
const shareBtn = el("shareBtn");

const progressBar = el("progressBar");
const stepText = el("stepText");
const hintText = el("hintText");

const resultMeta = el("resultMeta");
const resultList = el("resultList");
const uniList = el("uniList");

function initScores() {
  state.scores = {};
  for (const t of TRACKS) state.scores[t.key] = 0;
}

function recalcScores() {
  initScores();
  for (const q of QUESTIONS) {
    const idx = state.answers[q.id];
    if (idx === undefined) continue;
    const opt = q.options[idx];
    const sc = opt.score || {};
    for (const [k, v] of Object.entries(sc)) {
      if (state.scores[k] === undefined) state.scores[k] = 0;
      state.scores[k] += Number(v) || 0;
    }
  }
}

function save() {
  const data = { area: state.area, level: state.level, step: state.step, answers: state.answers };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function load() {
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return false;
    const data = JSON.parse(raw);
    if(!data) return false;

    state.area = data.area || "kanto";
    state.level = data.level || "top";
    state.step = Number.isInteger(data.step) ? data.step : 0;
    state.answers = data.answers && typeof data.answers === "object" ? data.answers : {};

    areaSelect.value = state.area;
    levelSelect.value = state.level;

    recalcScores();
    return true;
  }catch{
    return false;
  }
}

function clear() {
  localStorage.removeItem(STORAGE_KEY);
}

function setProgress(mode) {
  const total = QUESTIONS.length;

  if (mode === "profile") {
    progressBar.style.width = `0%`;
    stepText.textContent = `0 / ${total}`;
    return;
  }
  if (mode === "quiz") {
    const current = Math.min(state.step + 1, total);
    const pct = Math.round((current - 1) / total * 100);
    progressBar.style.width = `${pct}%`;
    stepText.textContent = `${current} / ${total}`;
    return;
  }
  if (mode === "result") {
    progressBar.style.width = `100%`;
    stepText.textContent = `${total} / ${total}`;
    return;
  }
}

function showScreen(which) {
  screenProfile.classList.remove("active");
  screenQuiz.classList.remove("active");
  screenResult.classList.remove("active");

  if (which === "profile") { screenProfile.classList.add("active"); setProgress("profile"); }
  if (which === "quiz") { screenQuiz.classList.add("active"); setProgress("quiz"); }
  if (which === "result") { screenResult.classList.add("active"); setProgress("result"); }
}

function renderQuestion() {
  setProgress("quiz");

  const q = QUESTIONS[state.step];
  qTitle.textContent = q.title;
  qDesc.textContent = q.desc || "";

  qForm.innerHTML = "";
  const picked = state.answers[q.id];

  q.options.forEach((opt, idx) => {
    const label = document.createElement("label");
    label.className = "choice";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "choice";
    input.value = String(idx);
    input.checked = picked === idx;

    input.addEventListener("change", () => {
      state.answers[q.id] = idx;
      recalcScores();
      save();
      nextBtn.disabled = false;
    });

    const ctxt = document.createElement("div");
    ctxt.className = "ctxt";
    const b = document.createElement("b");
    b.textContent = opt.label;
    const s = document.createElement("span");
    s.textContent = opt.sub || "";
    ctxt.appendChild(b);
    ctxt.appendChild(s);

    label.appendChild(input);
    label.appendChild(ctxt);
    qForm.appendChild(label);
  });

  backBtn.disabled = state.step === 0;
  nextBtn.textContent = state.step === QUESTIONS.length - 1 ? "結果を見る" : "次へ";
  nextBtn.disabled = (picked === undefined);
  hintText.textContent = "※ 直感でOK。あとで変更できます。";
}

function getTopTracks(n = 3) {
  const entries = TRACKS
    .map(t => ({ ...t, score: state.scores[t.key] || 0 }))
    .sort((a,b) => b.score - a.score);

  if ((entries[0]?.score ?? 0) === 0) return entries.slice(0, n);
  return entries.slice(0, n);
}

function renderResult() {
  const top = getTopTracks(3);

  resultMeta.textContent = `条件：${AREA_LABEL[state.area]} / ${LEVEL_LABEL[state.level]} / 一般入試`;

  resultList.innerHTML = "";
  top.forEach((t, i) => {
    const card = document.createElement("div");
    card.className = "resultCard";

    const rank = document.createElement("div");
    rank.className = "rank";

    const badge = document.createElement("div");
    badge.className = "badge";
    badge.textContent = `おすすめ ${i+1}位`;

    const score = document.createElement("div");
    score.className = "score";
    score.textContent = `Score: ${t.score}`;

    rank.appendChild(badge);
    rank.appendChild(score);

    const h = document.createElement("h3");
    h.textContent = t.name;

    const p = document.createElement("p");
    p.textContent = t.desc;

    const tags = document.createElement("div");
    tags.className = "tags";
    (t.tags || []).forEach(tag => {
      const chip = document.createElement("span");
      chip.className = "tag";
      chip.textContent = tag;
      tags.appendChild(chip);
    });

    const kws = document.createElement("div");
    kws.className = "tags";
    (t.facultyKeywords || []).slice(0, 6).forEach(k => {
      const chip = document.createElement("span");
      chip.className = "tag";
      chip.textContent = `学部キーワード：${k}`;
      kws.appendChild(chip);
    });

    card.appendChild(rank);
    card.appendChild(h);
    card.appendChild(p);
    card.appendChild(tags);
    card.appendChild(kws);

    resultList.appendChild(card);
  });

  uniList.innerHTML = "";
  top.forEach((t, i) => {
    const block = document.createElement("div");
    block.className = "uniBlock";

    const h = document.createElement("h4");
    h.textContent = `${i+1}位：${t.name} の大学候補（例）`;

    const items = document.createElement("div");
    items.className = "uniItems";

    const unis = getUniCandidates(state.area, state.level, t.key);
    if (unis.length === 0) {
      const none = document.createElement("div");
      none.className = "help";
      none.textContent = "この条件の例リストがまだありません（DBに追加できます）。";
      block.appendChild(h);
      block.appendChild(none);
      uniList.appendChild(block);
      return;
    }

    unis.forEach(u => {
      const chip = document.createElement("span");
      chip.className = "uni";
      chip.textContent = u;
      items.appendChild(chip);
    });

    block.appendChild(h);
    block.appendChild(items);
    uniList.appendChild(block);
  });
}

function goNext() {
  const q = QUESTIONS[state.step];
  const picked = state.answers[q.id];
  if (picked === undefined) {
    hintText.textContent = "選択してください。";
    return;
  }

  if (state.step < QUESTIONS.length - 1) {
    state.step += 1;
    save();
    renderQuestion();
  } else {
    save();
    renderResult();
    showScreen("result");
  }
}

function goBack() {
  if (state.step === 0) return;
  state.step -= 1;
  save();
  renderQuestion();
}

function resetAll() {
  state.area = "kanto";
  state.level = "top";
  state.step = 0;
  state.answers = {};
  initScores();
  clear();

  areaSelect.value = state.area;
  levelSelect.value = state.level;

  showScreen("profile");
}

function buildShareText() {
  const top = getTopTracks(3);
  const lines = [];
  lines.push("【大学・学部おすすめ診断】");
  lines.push(`条件：${AREA_LABEL[state.area]} / ${LEVEL_LABEL[state.level]} / 一般入試`);
  top.forEach((t, i) => {
    const unis = getUniCandidates(state.area, state.level, t.key).slice(0, 5);
    lines.push(`${i+1}位：${t.name}（Score ${t.score}）`);
    lines.push(`  学部キーワード：${(t.facultyKeywords||[]).slice(0,5).join(" / ")}`);
    lines.push(`  大学候補（例）：${unis.join(" / ") || "（未登録）"}`);
  });
  lines.push("");
  lines.push("次：上位タイプの学部名で検索→入試科目確認→過去問で相性チェック。");
  return lines.join("\n");
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch {
      document.body.removeChild(ta);
      return false;
    }
  }
}

// ========== イベント ==========
startBtn.addEventListener("click", () => {
  state.area = areaSelect.value;
  state.level = levelSelect.value;
  state.step = 0;
  state.answers = {};
  initScores();
  save();

  showScreen("quiz");
  renderQuestion();
});

areaSelect.addEventListener("change", () => { state.area = areaSelect.value; save(); });
levelSelect.addEventListener("change", () => { state.level = levelSelect.value; save(); });

nextBtn.addEventListener("click", goNext);
backBtn.addEventListener("click", goBack);
resetBtn.addEventListener("click", resetAll);

retryBtn.addEventListener("click", () => {
  state.step = 0;
  state.answers = {};
  initScores();
  save();
  showScreen("profile");
});

shareBtn.addEventListener("click", async () => {
  const text = buildShareText();
  const ok = await copyToClipboard(text);
  shareBtn.textContent = ok ? "コピーしました！" : "コピー失敗…";
  setTimeout(() => (shareBtn.textContent = "結果をコピー"), 1200);
});

// ========== 起動 ==========
(function boot(){
  initScores();
  const loaded = load();
  if (!loaded) {
    areaSelect.value = state.area;
    levelSelect.value = state.level;
  }
  showScreen("profile");
})();
