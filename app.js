const sb=window.supabase.createClient(window.SUPABASE_URL,window.SUPABASE_ANON_KEY);
const $=id=>document.getElementById(id);
const fallback={name:"yourname",username:"@yourname",bio:"welcome to my little corner of the internet ♡",avatar_url:"https://placehold.co/180x180/171321/e95bb5?text=♡",accent:"#ea55ad",accent2:"#9a5ce8",show_status:true,music_enabled:false,music_url:"",song_title:"your song",song_artist:"your artist",links:[{icon:"◉",name:"Discord",url:"https://discord.com/"},{icon:"◈",name:"Roblox",url:"https://www.roblox.com/"}],badges:["✦ creator","♡ online"]};
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function render(p,views=0){
 document.documentElement.style.setProperty("--pink",p.accent||fallback.accent);
 document.documentElement.style.setProperty("--purple",p.accent2||fallback.accent2);
 $("name").textContent=p.name||"";
 $("username").textContent=p.username||"";
 $("claimHandle").textContent=(p.username||"yourname").replace(/^@/,"");
 $("bio").textContent=p.bio||"";
 $("avatar").src=p.avatar_url||fallback.avatar_url;
 $("statusDot").style.display=p.show_status===false?"none":"block";
 $("badges").innerHTML=(p.badges||[]).map(x=>`<span>${esc(x)}</span>`).join("");
 $("links").innerHTML=(p.links||[]).filter(x=>x.name&&x.url).map(x=>`<a class="link" href="${esc(x.url)}" target="_blank" rel="noopener"><span class="link-icon">${esc(x.icon||"↗")}</span>${esc(x.name)}</a>`).join("");
 const on=!!(p.music_enabled&&p.music_url);$("music").classList.toggle("hidden",!on);
 if(on){$("songTitle").textContent=p.song_title||"Song";$("songArtist").textContent=p.song_artist||"Artist";$("audio").src=p.music_url}
 $("views").textContent=Number(views).toLocaleString();
}
async function load(){
 if(!window.SUPABASE_URL.startsWith("http"))return render(fallback,0);
 const [{data:p},{data:l},{data:b},{data:s}]=await Promise.all([
  sb.from("profiles").select("*").eq("id",1).maybeSingle(),
  sb.from("links").select("*").eq("profile_id",1).order("sort_order"),
  sb.from("badges").select("*").eq("profile_id",1).order("sort_order"),
  sb.from("site_stats").select("views").eq("id",1).maybeSingle()
 ]);
 const profile={...fallback,...(p||{})};profile.links=l?.length?l:fallback.links;profile.badges=b?.length?b.map(x=>x.label):fallback.badges;render(profile,s?.views||0);await sb.rpc("increment_views");
}
$("playBtn").onclick=async()=>{const a=$("audio");if(a.paused){try{await a.play();$("playBtn").textContent="❚❚";$("music").classList.add("playing")}catch{alert("Use a direct audio file URL.")}}else{a.pause();$("playBtn").textContent="▶";$("music").classList.remove("playing")}};
load();
