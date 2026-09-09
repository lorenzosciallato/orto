# Mette un numero di versione a css/js/dati in index.html e nel service worker, così vecchio e nuovo non si mischiano mai.
import re, sys, time
v = sys.argv[1] if len(sys.argv)>1 else time.strftime("%Y%m%d%H%M")
h=open('index.html',encoding='utf-8').read()
h=re.sub(r'(src|href)="((?:js|css)/[^"?]+)(\?v=[^"]*)?"', lambda m: f'{m.group(1)}="{m.group(2)}?v={v}"', h)
open('index.html','w',encoding='utf-8').write(h)
sw=open('sw.js',encoding='utf-8').read()
sw=re.sub(r'const VERSIONE = "[^"]*";', f'const VERSIONE = "orto-{v}";', sw)
file=re.findall(r'(?:src|href)="((?:js|css)/[^"?]+)\?v=', h)
base='[ "./", "index.html", '+', '.join(f'"{f}?v={v}"' for f in file)+', "manifest.json", "dati/italia.json", "img/icona-192.jpg", "img/icona-512.jpg" ]'
sw=re.sub(r'const BASE = \[.*?\];', 'const BASE = '+base+';', sw, flags=re.S)
open('sw.js','w',encoding='utf-8').write(sw)
print('versione',v,'|',len(file),'file')
