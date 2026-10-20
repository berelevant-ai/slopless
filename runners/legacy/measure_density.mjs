// Measure llm-vocabulary-density FP (human, esp. jargon-dense registers) vs TP (AI)
// after expanding the word set. Uses the real CLI.
import { execFileSync } from "node:child_process";
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
const C = "datasets/corpus";
function walk(d){ if(!existsSync(d))return[]; const o=[]; for(const e of readdirSync(d,{withFileTypes:true})){const p=join(d,e.name); if(e.isDirectory())o.push(...walk(p)); else if(e.name.endsWith(".md")&&e.name!=="LICENSE.md")o.push(p);} return o; }
const samp=(a,k)=>{const s=Math.max(1,Math.floor(a.length/k));return a.filter((_,i)=>i%s===0).slice(0,k);};
const run=(files,label)=>{
  let fired=0; const samples=[];
  for(const f of files){
    let out=""; try{out=execFileSync("node",["dist/cli.js",f],{encoding:"utf8",maxBuffer:5e7});}catch(e){out=e.stdout?e.stdout.toString():"";}
    let a; try{a=JSON.parse(out);}catch{continue;}
    let hit=false; for(const e of a)for(const m of e.messages||[])if(/llm-vocabulary-density/.test(m.ruleId))hit=true;
    if(hit){fired++; if(samples.length<6)samples.push(f.split("/").slice(-2).join("/"));}
  }
  console.log(`${label}: ${files.length} docs, ${fired} fired (${(100*fired/files.length).toFixed(1)}%)`);
  for(const s of samples)console.log("   "+s);
};
// jargon-dense human (highest FP risk) + general human
run([...walk(`${C}/human/science`), ...walk(`${C}/human/medical`), ...walk(`${C}/human/tech`), ...walk(`${C}/human/business`)], "HUMAN dense (science/medical/tech/business)");
run([...samp(walk(`${C}/human/reference/wikipedia`),400), ...samp(walk(`${C}/human/literary/gutenberg`),300), ...walk(`${C}/human/gov`), ...samp(walk(`${C}/human`).filter(f=>f.includes("/stackexchange/")),800), ...walk(`${C}/human/news`), ...walk(`${C}/human/motivational`), ...walk(`${C}/human/food`)], "HUMAN general");
run(walk(`${C}/ai-generated`), "AI-generated (TP)");
run(samp(walk(`${C}/ai-suspected`),400), "AI-suspected devto (TP)");
