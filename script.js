/* Algemene styling */
*, *::before, *::after { box-sizing: border-box; }
body { margin:0; font-family:sans-serif; background:#f0f0f0; }

/* Header */
.site-header {
    background:#333; color:white; padding:10px 0; box-shadow:0 2px 5px rgba(0,0,0,0.2);
}
.header-content {
    max-width:1200px; margin:0 auto; padding:0 20px;
    display:flex; justify-content:space-between; align-items:center;
}
.logo { font-size:1.5em; font-weight:bold; }
.site-header button { padding:8px 16px; border:none; border-radius:6px; background:#4f46e5; color:white; cursor:pointer; }
.site-header button:hover { background:#3730a3; }

/* Sidebar */
#sidebar {
    position: fixed;
    top: 0; left: -280px;
    width: 280px; height: 100%;
    display:flex; flex-direction:column; justify-content:flex-start;
    background: linear-gradient(180deg,#2563eb,#1e40af);
    color:white; padding:30px 20px;
    border-top-right-radius:20px; border-bottom-right-radius:20px;
    box-shadow:4px 0 15px rgba(0,0,0,0.3);
    transition:left 0.4s ease;
    z-index:1000;
}
#sidebar.open { left:0; }

#overlay {
    position:fixed; top:0; left:0; width:100%; height:100%;
    background:rgba(0,0,0,0.3); display:none; z-index:900;
}
#overlay.active { display:block; }

/* Home sectie */
main { max-width:1200px; margin:0 auto; text-align:center; }
.page-center-container { display:flex; align-items:center; justify-content:center; padding:20px; }
.button-box { background:white; border-radius:10px; box-shadow:0 5px 20px rgba(0,0,0,0.1);
    width:100%; max-width:400px; padding:30px; display:flex; flex-direction:column; gap:30px; }
.box-title { font-weight:bold; color:#555; margin-bottom:0; }
.button-row { display: flex; justify-content: center; gap: 20px; width: 100%; }
.button { background:#007BFF; color:white; border-radius:5px; cursor:pointer;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    gap:10px; font-weight:bold; text-align:center; border:none;
    transition: background 0.3s, transform 0.2s;
}
.button:hover { background:#0056b3; transform:translateY(-2px); }
.button.main-btn { flex:1; padding:20px; font-size:1em; }
.button.sub-btn { flex:1; padding:18px; font-size:0.9em; }

/* Flashcards */
.hidden { display:none !important; }
.flashcard-container { display:flex; flex-direction:column; align-items:center; margin-top:40px; }
.flashcard { width:420px; height:260px; perspective:1000px; cursor:pointer; }
.card-inner { width:100%; height:100%; transition:transform 0.6s; transform-style:preserve-3d; position:relative; }
.flashcard.flipped .card-inner { transform:rotateY(180deg); }
.card-face {
    position:absolute; width:100%; height:100%; background:#2563eb; color:white; border-radius:16px;
    display:flex; align-items:center; justify-content:center; font-size:32px; font-weight:bold;
    backface-visibility:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.2); padding:20px; text-align:center;
}
.card-back { background:#1e40af; transform:rotateY(180deg); }

/* Juist/Fout knoppen */
.actions { margin-top:30px; display:flex; gap:24px; justify-content:center; }
button.primary, button.danger { padding:18px 28px; font-size:20px; font-weight:bold; border-radius:10px; cursor:pointer; border:none; }
button.primary { background:#16a34a; color:white; }
button.primary:hover { background:#15803d; }
button.danger { background:#dc2626; color:white; }
button.danger:hover { background:#b91c1c; }

/* Foute woorden lijst */
#result { display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:60vh; text-align:center; padding:20px; }
#wrongList { list-style:none; padding:0; margin:20px 0; display:flex; flex-direction:column; gap:6px; width:90%; max-width:500px; }
#wrongList li { font-size:20px; background:#fef3c7; color:#b45309; padding:8px 16px; border-radius:10px; box-shadow:0 3px 8px rgba(0,0,0,0.12); transition:transform 0.2s, box-shadow 0.2s; }
#wrongList li:hover { transform:translateY(-1px); box-shadow:0 4px 12px rgba(0,0,0,0.15); }
#repeatWrongBtn, #repeatAllBtn { margin-bottom:12px; }

/* Planning sectie */
#planning { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px; min-height:60vh; }
#planning img { max-width:90%; height:auto; border-radius:12px; box-shadow:0 5px 15px rgba(0,0,0,0.2); }

/* Responsive */
@media (max-width:768px){
    .flashcard { width:90%; height:240px; }
    .card-face { font-size:24px; }
    .actions { flex-direction:column; width:100%; }
    .actions button { width:100%; }
    #sidebar { width:80%; }
    .button-row { flex-direction:column; gap:12px; }
}
