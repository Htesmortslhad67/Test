
const VERSION = 1;
const SLOT_COUNT = 5;

const defaultState = () => ({
  version: VERSION,
  playerName: "Player",
  node: "start",
  chapter: 1,
  playMinutes: 0,
  flags: {
    mikuMagicAwakened: false,
    ninoMagicAwakened: false,
    metRem: false,
    metRevan: false,
    metThanos: false
  },
  relation: { rem:0, miku:0, nino:0, max:0, revan:0, thanos:0 },
  morality: { mercy:0, power:0, selfishness:0, loyalty:0 },
  revanAlignment: 75,
  history: []
});

const story = {
  start:{
    speaker:"Narrator",
    text:"Rain hits broken asphalt. You wake beneath a sky split by two different sets of stars. Half the road ahead looks like modern Japan; the other half becomes ancient stone.",
    choices:[
      {text:"Get up and investigate the sound nearby.", next:"car", fx:s=>{s.morality.loyalty+=1}},
      {text:"Stay hidden and watch first.", next:"observe", fx:s=>{s.morality.selfishness+=1}}
    ]
  },
  observe:{
    speaker:"Narrator",
    text:"You remain still long enough to see someone climb from a damaged racing car. He looks as confused as you feel.",
    choices:[
      {text:"Approach carefully.", next:"maxIntro", fx:s=>{s.relation.max+=1}},
      {text:"Circle around and inspect the area first.", next:"car", fx:s=>{s.morality.power+=1}}
    ]
  },
  car:{
    speaker:"Narrator",
    text:"A racing car sits at an impossible angle across the road, scratched but recognisable. A man is checking it for damage while repeatedly looking at the fractured skyline.",
    choices:[
      {text:"Ask if he is okay.", next:"maxIntro", fx:s=>{s.relation.max+=2;s.morality.mercy+=1}},
      {text:"Ask what happened here.", next:"maxIntro", fx:s=>{s.relation.max+=1}}
    ]
  },
  maxIntro:{
    speaker:"Max",
    text:"“I was driving. Then there was a flash, and now... this.” He glances at the medieval street where the circuit should be. “I’m Max.”",
    choices:[
      {text:"Tell him your name and stick together.", next:"sisters", fx:s=>{s.relation.max+=2;s.morality.loyalty+=1}},
      {text:"Tell him you work better alone.", next:"sisters", fx:s=>{s.relation.max-=1;s.morality.selfishness+=2}}
    ]
  },
  sisters:{
    speaker:"Narrator",
    text:"A crash echoes from a nearby building. Inside, two young women are arguing over which way they came in. Neither appears to understand the strange symbols glowing faintly across the walls.",
    choices:[
      {text:"Speak to the quieter sister first.", next:"mikuIntro", fx:s=>{s.relation.miku+=2}},
      {text:"Speak to the more confrontational sister first.", next:"ninoIntro", fx:s=>{s.relation.nino+=2}},
      {text:"Check the glowing symbols before speaking.", next:"rune", fx:s=>{s.morality.power+=1}}
    ]
  },
  mikuIntro:{
    speaker:"Miku",
    text:"She introduces herself as Miku Nakano. She keeps glancing at the unfamiliar architecture, clearly trying to make sense of it without panicking.",
    choices:[
      {text:"Reassure her that you will figure this out together.", next:"attack", fx:s=>{s.relation.miku+=2;s.morality.mercy+=1}},
      {text:"Ask what she remembers before arriving.", next:"attack", fx:s=>{s.relation.miku+=1}}
    ]
  },
  ninoIntro:{
    speaker:"Nino",
    text:"Nino Nakano demands to know where you brought them. When she realises you are just as lost, her suspicion shifts toward the ruined building instead.",
    choices:[
      {text:"Stay calm and answer honestly.", next:"attack", fx:s=>{s.relation.nino+=2}},
      {text:"Tell her she can trust you or leave.", next:"attack", fx:s=>{s.relation.nino-=1;s.morality.power+=1}}
    ]
  },
  rune:{
    speaker:"Narrator",
    text:"The symbols pulse when you get close. For a moment, two of them flare in response to Miku and Nino—then vanish before anyone can understand why.",
    choices:[
      {text:"Warn them what you saw.", next:"attack", fx:s=>{s.relation.miku+=1;s.relation.nino+=1;s.morality.loyalty+=1}},
      {text:"Keep it to yourself.", next:"attack", fx:s=>{s.morality.power+=2}}
    ]
  },
  attack:{
    speaker:"Narrator",
    text:"The wall explodes inward. A creature made from mismatched pieces of several worlds lunges into the room. Everyone moves at once.",
    choices:[
      {text:"Move to protect Miku.", next:"mikuAwaken", fx:s=>{s.relation.miku+=3;s.morality.mercy+=1}},
      {text:"Move to protect Nino.", next:"ninoAwaken", fx:s=>{s.relation.nino+=3;s.morality.mercy+=1}},
      {text:"Pull Max toward cover.", next:"doubleAwaken", fx:s=>{s.relation.max+=3;s.morality.loyalty+=1}},
      {text:"Grab the strange glowing fragment on the floor.", next:"powerChoice", fx:s=>{s.morality.power+=3;s.morality.selfishness+=1}}
    ]
  },
  mikuAwaken:{
    speaker:"Narrator",
    text:"Before the creature reaches you, cold bursts through the room. Frost races across the floor from Miku's hands. She stares at them in disbelief. Whatever just happened, she did not have this ability before the Merge.",
    choices:[
      {text:"Help Miku stay calm.", next:"ninoSecond", fx:s=>{s.flags.mikuMagicAwakened=true;s.relation.miku+=3}},
      {text:"Tell her to use it again.", next:"ninoSecond", fx:s=>{s.flags.mikuMagicAwakened=true;s.morality.power+=2}}
    ]
  },
  ninoAwaken:{
    speaker:"Narrator",
    text:"A violent spark tears through the air. Nino throws up her hands and a blast of heat and electricity drives the creature backward. She looks more shocked than anyone else. This power is new.",
    choices:[
      {text:"Check that Nino is okay.", next:"mikuSecond", fx:s=>{s.flags.ninoMagicAwakened=true;s.relation.nino+=3}},
      {text:"Tell her to finish the creature.", next:"mikuSecond", fx:s=>{s.flags.ninoMagicAwakened=true;s.morality.power+=2}}
    ]
  },
  doubleAwaken:{
    speaker:"Narrator",
    text:"As you pull Max clear, the creature charges the sisters. Miku freezes part of the floor on instinct. Nino answers with a burst of crackling heat. Both stare at their hands afterward—neither had powers before today.",
    choices:[
      {text:"Tell them nobody uses those powers again until you understand them.", next:"afterFight", fx:s=>{s.flags.mikuMagicAwakened=true;s.flags.ninoMagicAwakened=true;s.morality.mercy+=1}},
      {text:"Tell them those powers may be the only reason you survive.", next:"afterFight", fx:s=>{s.flags.mikuMagicAwakened=true;s.flags.ninoMagicAwakened=true;s.morality.power+=1}}
    ]
  },
  powerChoice:{
    speaker:"Narrator",
    text:"You seize the fragment. Energy flashes across the room. Miku and Nino both react to it at once: frost spreads beneath Miku while sparks dance around Nino. The creature recoils.",
    choices:[
      {text:"Drop the fragment and help them.", next:"afterFight", fx:s=>{s.flags.mikuMagicAwakened=true;s.flags.ninoMagicAwakened=true;s.morality.mercy+=1}},
      {text:"Keep the fragment.", next:"afterFight", fx:s=>{s.flags.mikuMagicAwakened=true;s.flags.ninoMagicAwakened=true;s.morality.power+=3}}
    ]
  },
  ninoSecond:{
    speaker:"Narrator",
    text:"Nino's fear turns into anger. Lightning snaps across the room and forces the creature away from Miku. Her power has awakened too.",
    choices:[
      {text:"Regroup before chasing it.", next:"afterFight", fx:s=>{s.flags.ninoMagicAwakened=true;s.morality.mercy+=1}},
      {text:"Attack while it is weakened.", next:"afterFight", fx:s=>{s.flags.ninoMagicAwakened=true;s.morality.power+=1}}
    ]
  },
  mikuSecond:{
    speaker:"Narrator",
    text:"Miku reaches toward Nino. Ice forms across the creature's legs, locking it in place. Her power has awakened as well.",
    choices:[
      {text:"Get everyone out safely.", next:"afterFight", fx:s=>{s.flags.mikuMagicAwakened=true;s.morality.loyalty+=1}},
      {text:"Search the creature for clues.", next:"afterFight", fx:s=>{s.flags.mikuMagicAwakened=true;s.morality.power+=1}}
    ]
  },
  afterFight:{
    speaker:"Narrator",
    text:"The immediate danger passes, but the city shifts around you. In the distance, a blue-haired figure carrying a weapon appears between ruined buildings while something metallic descends from the clouds.",
    choices:[
      {text:"Head toward the blue-haired stranger.", next:"chapterEnd", fx:s=>{s.flags.metRem=true;s.relation.rem+=1}},
      {text:"Investigate the object descending from the sky.", next:"chapterEnd", fx:s=>{s.flags.metRevan=true;s.relation.revan+=1}},
      {text:"Find shelter and make a plan first.", next:"chapterEnd", fx:s=>{s.morality.mercy+=1}}
    ]
  },
  chapterEnd:{
    speaker:"Narrator",
    text:"Chapter 1 has begun to split into different possibilities. Your next decisions will determine who trusts you, what the sisters become, and what kind of person Revan sees when your paths finally cross.",
    choices:[
      {text:"Continue into Chapter 2 preview.", next:"preview", fx:s=>{s.chapter=2}},
      {text:"Return to menu and save this route.", next:"__menu", fx:s=>{}}
    ]
  },
  preview:{
    speaker:"System",
    text:"Vertical-slice endpoint. The engine, save system, branching variables, magic awakenings, relationship tracking, morality tracking and Revan alignment are working. The full story will extend from here without changing your save format.",
    choices:[
      {text:"Return to main menu.", next:"__menu", fx:s=>{}}
    ]
  }
};

let state = defaultState();
let activeSlot = null;
let startedAt = Date.now();

const $ = s => document.querySelector(s);
const mainMenu = $("#mainMenu");
const savesScreen = $("#savesScreen");
const gameScreen = $("#gameScreen");
const speakerEl = $("#speaker");
const textEl = $("#storyText");
const choicesEl = $("#choices");
const chapterEl = $("#chapterLabel");
const autosaveLabel = $("#autosaveLabel");
const modal = $("#nameModal");
const slotNameInput = $("#slotNameInput");
const modalTitle = $("#modalTitle");
let pendingSlot = null;
let pendingMode = null;

function slotKey(i){ return `convergence_slot_${i}`; }
function autosaveKey(){ return "convergence_autosave"; }

function readSlot(i){
  try { return JSON.parse(localStorage.getItem(slotKey(i))); } catch { return null; }
}
function writeSlot(i, payload){ localStorage.setItem(slotKey(i), JSON.stringify(payload)); }
function deleteSlot(i){ localStorage.removeItem(slotKey(i)); }
function saveAuto(){
  const payload = {name: activeSlot ? (readSlot(activeSlot)?.name || "Autosave") : "Autosave", savedAt: Date.now(), state};
  localStorage.setItem(autosaveKey(), JSON.stringify(payload));
  autosaveLabel.textContent = "Autosaved";
  setTimeout(()=>autosaveLabel.textContent="",1200);
}
function readAuto(){ try{return JSON.parse(localStorage.getItem(autosaveKey()));}catch{return null;} }

function newGame(){
  state = defaultState();
  activeSlot = null;
  startedAt = Date.now();
  showGame();
  renderNode();
  saveAuto();
}
function loadPayload(payload, slot=null){
  if(!payload || !payload.state) return;
  state = payload.state;
  activeSlot = slot;
  startedAt = Date.now();
  showGame();
  renderNode();
}
function continueGame(){
  const a = readAuto();
  if(a) loadPayload(a, null); else showSaves();
}
function show(el){
  [mainMenu,savesScreen,gameScreen].forEach(x=>x.classList.add("hidden"));
  el.classList.remove("hidden");
}
function showMenu(){ show(mainMenu); refreshContinue(); }
function showSaves(){ show(savesScreen); renderSlots(); }
function showGame(){ show(gameScreen); }
function refreshContinue(){ $("#continueBtn").disabled = !readAuto(); }

function applyChoice(c){
  if(c.fx) c.fx(state);
  state.history.push({from:state.node, choice:c.text, at:Date.now()});
  if(c.next==="__menu"){ saveAuto(); showMenu(); return; }
  state.node = c.next;
  saveAuto();
  renderNode();
}
function renderNode(){
  const node = story[state.node] || story.preview;
  speakerEl.textContent = node.speaker;
  textEl.textContent = node.text;
  chapterEl.textContent = `Chapter ${state.chapter}`;
  choicesEl.innerHTML = "";
  node.choices.forEach(c=>{
    const b=document.createElement("button");
    b.className="choice";
    b.type="button";
    b.textContent=c.text;
    b.addEventListener("click",()=>applyChoice(c));
    choicesEl.appendChild(b);
  });
}

function renderSlots(){
  const wrap=$("#slots");
  wrap.innerHTML="";
  for(let i=1;i<=SLOT_COUNT;i++){
    const data=readSlot(i);
    const card=document.createElement("div");
    card.className="panel slot";
    const title=document.createElement("div"); title.className="slotname";
    title.textContent=data?.name || `Save Slot ${i}`;
    const meta=document.createElement("div"); meta.className="meta";
    if(data){
      const d=new Date(data.savedAt);
      meta.textContent=`Chapter ${data.state.chapter} • ${d.toLocaleString()}`;
    }else meta.textContent="Empty";
    const acts=document.createElement("div"); acts.className="slot-actions";

    const primary=document.createElement("button"); primary.className="btn primary"; primary.type="button";
    primary.textContent=data?"Load":"New Game";
    primary.addEventListener("click",()=>data?loadPayload(data,i):openNameModal(i,"new"));
    acts.appendChild(primary);

    if(data){
      const rename=document.createElement("button"); rename.className="btn"; rename.type="button"; rename.textContent="Rename";
      rename.addEventListener("click",()=>openNameModal(i,"rename"));
      const del=document.createElement("button"); del.className="btn danger"; del.type="button"; del.textContent="Delete";
      del.addEventListener("click",()=>{ if(confirm(`Delete "${data.name}"?`)){deleteSlot(i);renderSlots();} });
      acts.append(rename,del);
    }
    card.append(title,meta,acts); wrap.appendChild(card);
  }
}

function openNameModal(i,mode){
  pendingSlot=i; pendingMode=mode;
  const data=readSlot(i);
  modalTitle.textContent=mode==="new"?`Name Save Slot ${i}`:"Rename Save";
  slotNameInput.value=data?.name || `Route ${i}`;
  modal.classList.remove("hidden");
  setTimeout(()=>slotNameInput.focus(),0);
}
function closeModal(){ modal.classList.add("hidden"); pendingSlot=null; pendingMode=null; }
$("#nameForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=slotNameInput.value.trim().slice(0,32) || `Route ${pendingSlot}`;
  if(pendingMode==="new"){
    state=defaultState(); activeSlot=pendingSlot; startedAt=Date.now();
    writeSlot(pendingSlot,{name,savedAt:Date.now(),state});
    saveAuto(); closeModal(); showGame(); renderNode();
  }else if(pendingMode==="rename"){
    const data=readSlot(pendingSlot); if(data){data.name=name;data.savedAt=Date.now();writeSlot(pendingSlot,data);}
    closeModal(); renderSlots();
  }
});
$("#cancelModal").addEventListener("click",closeModal);

$("#newBtn").addEventListener("click",()=>showSaves());
$("#continueBtn").addEventListener("click",continueGame);
$("#savesBtn").addEventListener("click",showSaves);
$("#backFromSaves").addEventListener("click",showMenu);
$("#menuBtn").addEventListener("click",()=>{saveAuto();showMenu();});
$("#saveBtn").addEventListener("click",()=>{
  if(activeSlot){
    const data=readSlot(activeSlot) || {name:`Route ${activeSlot}`};
    writeSlot(activeSlot,{name:data.name,savedAt:Date.now(),state});
    saveAuto();
    $("#saveBtn").textContent="Saved ✓";
    setTimeout(()=>$("#saveBtn").textContent="Save",1000);
  }else{
    showSaves();
  }
});

window.addEventListener("beforeunload",()=>{ try{saveAuto();}catch{} });
setInterval(()=>{ if(!gameScreen.classList.contains("hidden")) saveAuto(); }, 30000);

if("serviceWorker" in navigator){ navigator.serviceWorker.register("./sw.js").catch(()=>{}); }
refreshContinue();
