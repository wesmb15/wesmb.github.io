const objection = document.getElementById("objection");
const coachBtn = document.getElementById("coachBtn");
const empty = document.getElementById("empty");
const coaching = document.getElementById("coaching");

const examples = [
  "I already have internet and I'm happy with it.",
  "Your price is too high.",
  "I need to think about it.",
  "I don't need another bill."
];

const playbook = [
  {
    keys:["already have","current provider","happy with","have internet"],
    title:"Already have internet",
    opportunity:"Discovery opportunity",
    question:"What do you like most about your current internet service?",
    why:"You are not fighting the customer's current provider. You're opening a discovery conversation that can uncover price, reliability, speed, or service gaps.",
    signal:"They mention a pain point, price, outages, slow speeds, too many fees, or something they'd change.",
    transition:"If you could improve that one thing without making the overall experience worse, would you be open to comparing the options?",
    pushback:"Totally fair. What would have to be different for switching to actually be worth considering?",
    objective:"Find one measurable pain point and quantify it."
  },
  {
    keys:["price","expensive","cost","high"],
    title:"Price objection",
    opportunity:"Price discovery",
    question:"What are you currently paying each month for your service?",
    why:"You need to understand the customer's actual baseline before defending price. Specific numbers create something you can compare.",
    signal:"They reveal their bill, fees, or frustration with what they receive for the price.",
    transition:"If I could show you a comparable option at a better overall value, would you want to see the difference?",
    pushback:"Besides the monthly price, what matters most to you when choosing your internet service?",
    objective:"Quantify the current bill, then connect value to the customer's priority."
  },
  {
    keys:["think","consider","talk to","later"],
    title:"I need to think about it",
    opportunity:"Hidden objection",
    question:"Absolutely. What part would you like to think over the most?",
    why:"'Think about it' is often a placeholder for a concern. Asking what specifically needs consideration helps you uncover the real objection without pressure.",
    signal:"They name a specific concern such as price, reliability, contract, installation, or timing.",
    transition:"That makes sense. If we could clear that concern up, would you feel comfortable making a decision today?",
    pushback:"No problem. Is there anything else that would keep you from moving forward?",
    objective:"Identify the real unresolved concern."
  },
  {
    keys:["don't need","dont need","another bill","need it"],
    title:"I don't need it",
    opportunity:"Needs discovery",
    question:"What are you currently using for internet at home?",
    why:"You cannot establish need until you understand the customer's current setup and how it fits their household.",
    signal:"They reveal multiple users, streaming, gaming, work-from-home needs, reliability issues, or an expensive current setup.",
    transition:"How well does that setup handle everything your household needs today?",
    pushback:"If it is working well, what would you want to improve about it, if anything?",
    objective:"Understand current usage and uncover a gap."
  }
];

function getPlaybook(text){
  const t = text.toLowerCase();
  return playbook.find(p => p.keys.some(k => t.includes(k))) || {
    title:"General objection",
    opportunity:"Discovery opportunity",
    question:"What is the biggest reason you feel that way?",
    why:"Before responding with a pitch, uncover the reason behind the objection. The answer gives you the next direction.",
    signal:"They explain a specific concern, need, or desired outcome.",
    transition:"If we could address that concern, would you be open to looking at an option that fits what you need?",
    pushback:"What would need to be different for this to make sense for you?",
    objective:"Uncover the real objection before presenting a solution."
  };
}

function coach(text){
  if(!text.trim()){ objection.focus(); return; }
  const p = getPlaybook(text);
  document.getElementById("objectionTitle").textContent = text.length > 92 ? text.slice(0,92) + "…" : text;
  document.getElementById("opportunity").textContent = p.opportunity;
  document.getElementById("bestQuestion").textContent = p.question;
  document.getElementById("why").textContent = p.why;
  document.getElementById("signal").textContent = p.signal;
  document.getElementById("transition").textContent = p.transition;
  document.getElementById("pushback").textContent = p.pushback;
  document.getElementById("objective").textContent = p.objective;
  empty.classList.add("hidden");
  coaching.classList.remove("hidden");
  document.getElementById("results").scrollIntoView({behavior:"smooth", block:"start"});
}

coachBtn.addEventListener("click",()=>coach(objection.value));
document.getElementById("exampleBtn").addEventListener("click",()=>{
  objection.value = examples[Math.floor(Math.random()*examples.length)];
  coach(objection.value);
});
document.querySelectorAll(".chip,.library-card").forEach(el=>{
  el.addEventListener("click",()=>{
    objection.value = el.dataset.text;
    coach(objection.value);
  });
});
document.querySelectorAll(".copy").forEach(btn=>{
  btn.addEventListener("click", async ()=>{
    const text = document.getElementById(btn.dataset.copy).textContent;
    try{ await navigator.clipboard.writeText(text); btn.textContent="Copied"; setTimeout(()=>btn.textContent="Copy",1000); }
    catch(e){}
  });
});
objection.addEventListener("keydown",e=>{
  if((e.metaKey||e.ctrlKey)&&e.key==="Enter") coach(objection.value);
});
