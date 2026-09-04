import json, os, re, sys, time, urllib.request, urllib.parse, unicodedata

API = "https://commons.wikimedia.org/w/api.php"
UA = {"User-Agent": "OrtoPievebovigliana/1.0 (sito orto personale; contatto via GitHub lorenzosciallato)"}
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.makedirs(BASE+"/img/piante", exist_ok=True)
os.makedirs(BASE+"/img/ricette", exist_ok=True)
FIORI_OK = False
CRED = {}
if os.path.exists(BASE+"/strumenti/crediti.json"):
    CRED = json.load(open(BASE+"/strumenti/crediti.json"))

def slug(s):
    s = unicodedata.normalize("NFD", s).encode("ascii", "ignore").decode()
    s = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
    return s[:60]

def cerca(q, n=12):
    p = {"action": "query", "generator": "search", "gsrsearch": q + " filetype:bitmap", "gsrnamespace": "6",
         "gsrlimit": str(n), "prop": "imageinfo", "iiprop": "url|extmetadata|size|mime", 
         "format": "json"}
    r = urllib.request.Request(API + "?" + urllib.parse.urlencode(p), headers=UA)
    d = json.load(urllib.request.urlopen(r, timeout=40))
    pages = d.get("query", {}).get("pages", {})
    out = []
    for pg in sorted(pages.values(), key=lambda x: x.get("index", 99)):
        ii = pg.get("imageinfo", [{}])[0]
        if ii.get("mime") != "image/jpeg": continue
        if ii.get("width", 0) < 700 or ii.get("height", 0) < 450: continue
        w, h = ii["width"], ii["height"]
        if w / h > 2.2 or h / w > 1.6: continue
        t = pg["title"].lower()
        if ii.get("size",0) > 14_000_000: continue
        if any(x in t for x in ["map", "diagram", "drawing", "illustration", "logo", "seed packet", "label", "chart", "herbarium", "sketch", "painting", "disease", "albugo", "virus", "mildew", "rust", "aphid", "larva", "beetle", "moth", "museum", "market", "supermarket", "shop", "packag", "can ", "tin ", "seeds ", "seed.", "pollen", "microscop", "flower", "blossom", "bloom", "inflorescence"] if not (x in ("flower","blossom","bloom","inflorescence") and FIORI_OK)): continue
        m = ii.get("extmetadata", {})
        out.append({"titolo": pg["title"], "url": ii["url"], "pagina": ii["descriptionurl"],
                    "autore": re.sub("<[^>]+>", "", m.get("Artist", {}).get("value", "")).strip()[:80],
                    "licenza": m.get("LicenseShortName", {}).get("value", "")})
    return out

def scarica(url, dest):
    from PIL import Image, ImageOps
    import io
    r = urllib.request.Request(url, headers=UA)
    data = None
    for attesa in (0, 620, 620):
        time.sleep(attesa)
        try:
            data = urllib.request.urlopen(r, timeout=120).read(); break
        except urllib.error.HTTPError as e:
            if e.code != 429: raise
            print('429 download, aspetto 10 minuti', flush=True)
    if data is None: raise Exception("429 persistente")
    im = ImageOps.exif_transpose(Image.open(io.BytesIO(data))).convert("RGB")
    im.thumbnail((900, 900))
    im.save(dest, "JPEG", quality=82, optimize=True)

def wiki_img(title):
    lang="en"
    if title.startswith("it:"): lang, title = "it", title[3:]
    p = {"action":"query","prop":"pageimages","piprop":"original|name","titles":title,"format":"json","redirects":1}
    r = urllib.request.Request(f"https://{lang}.wikipedia.org/w/api.php?"+urllib.parse.urlencode(p), headers=UA)
    d = json.load(urllib.request.urlopen(r, timeout=40))
    pg = list(d["query"]["pages"].values())[0]
    name, o = pg.get("pageimage"), pg.get("original")
    if not name or not o: return None
    if not name.lower().endswith((".jpg",".jpeg")) or "missing" in name.lower(): return None
    if o["width"] < 600 or o["height"] < 400: return None
    # metadata for credits
    p2 = {"action":"query","prop":"imageinfo","iiprop":"extmetadata|url|size","titles":"File:"+name,"format":"json"}
    r2 = urllib.request.Request(f"https://{lang}.wikipedia.org/w/api.php?"+urllib.parse.urlencode(p2), headers=UA)
    d2 = json.load(urllib.request.urlopen(r2, timeout=40))
    ii = list(d2["query"]["pages"].values())[0].get("imageinfo",[{}])[0]
    m = ii.get("extmetadata", {})
    if ii.get("size",0) > 14_000_000: return None
    return {"titolo":"File:"+name, "url": o["source"], "pagina": ii.get("descriptionurl","https://commons.wikimedia.org/wiki/File:"+name.replace(" ","_")),
            "autore": re.sub("<[^>]+>","",m.get("Artist",{}).get("value","")).strip()[:80],
            "licenza": m.get("LicenseShortName",{}).get("value","")}

def prendi(chiave, cartella, queries, indice=0, forza=False):
    dest = f"{BASE}/img/{cartella}/{chiave}.jpg"
    if os.path.exists(dest) and not forza: return "ok"
    for q in queries:
        if q.startswith("w:"):
            r = None
            for attesa in (1, 620):
                time.sleep(attesa)
                try:
                    r = wiki_img(q[2:]); break
                except Exception as e:
                    print("ERR wiki", chiave, q, e)
            if not r: continue
            try:
                scarica(r["url"], dest)
            except Exception as e:
                print("ERR dl", chiave, e); continue
            CRED[f"{cartella}/{chiave}"] = {"file": r["titolo"], "pagina": r["pagina"], "autore": r["autore"], "licenza": r["licenza"], "q": q}
            json.dump(CRED, open(BASE+"/strumenti/crediti.json", "w"), ensure_ascii=False, indent=1)
            return "nuova"
        ris = None
        for attesa in (1, 620):
            time.sleep(attesa)
            try:
                ris = cerca(q); break
            except Exception as e:
                print("ERR", chiave, q, e)
        if ris is None: continue
        if len(ris) > indice:
            r = ris[indice]
            try:
                scarica(r["url"], dest)
            except Exception as e:
                print("ERR dl", chiave, e); continue
            CRED[f"{cartella}/{chiave}"] = {"file": r["titolo"], "pagina": r["pagina"], "autore": r["autore"], "licenza": r["licenza"], "q": q}
            json.dump(CRED, open(BASE+"/strumenti/crediti.json", "w"), ensure_ascii=False, indent=1)
            return "nuova"
    print("NIENTE", chiave, queries)
    return "niente"

def crediti_html():
    C = json.load(open(BASE+"/strumenti/crediti.json"))
    righe = []
    for k in sorted(C):
        v = C[k]; cart, nome = k.split("/")
        righe.append(f'<li><b>{cart}/{nome}.jpg</b> — <a href="{v["pagina"]}" target="_blank" rel="noopener">{v["file"].replace("File:","")}</a>, {v["autore"] or "autore non indicato"}, {v["licenza"] or "licenza vedi pagina"}</li>')
    html = f'''<!DOCTYPE html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Orto — crediti delle fotografie</title><link rel="stylesheet" href="css/stile.css"><style>body{{padding:1.5rem;max-width:900px;margin:auto}}li{{margin:.4rem 0;font-size:.9rem}}</style></head><body>
<h1>Crediti delle fotografie</h1><p>Le immagini di piante e piatti provengono da <a href="https://commons.wikimedia.org">Wikimedia Commons</a> e da Wikipedia, con licenze libere (Creative Commons o pubblico dominio). Per ognuna: file originale, autore, licenza. <a href="index.html">Torna a Orto</a>.</p>
<ul>{"".join(righe)}</ul></body></html>'''
    open(BASE+"/crediti.html","w",encoding="utf-8").write(html)

if __name__ == "__main__":
    if sys.argv[1] == "crediti":
        crediti_html(); print("crediti.html aggiornato"); sys.exit()
    piano = json.load(open(sys.argv[1]))   # {"cartella":..., "voci":{chiave:[query,...]}}
    globals()["FIORI_OK"] = piano.get("fiori", False)
    for k, qs in piano["voci"].items():
        print(k, prendi(k, piano["cartella"], qs), flush=True)
        time.sleep(3)
    crediti_html()
