# Strumenti

`scarica_foto.py` scarica da Wikipedia/Wikimedia Commons una foto per ogni pianta (`piante.json`) e per ogni ricetta (`ricette.json`), la ridimensiona a 900 px, la salva in `img/piante/` o `img/ricette/` e annota autore e licenza in `crediti.json`; `python strumenti/scarica_foto.py crediti` rigenera `crediti.html`.

Non serve farlo dal computer: su GitHub, scheda **Actions → "Scarica foto" → Run workflow**. Le foto già presenti vengono saltate, quindi si può rilanciare quante volte si vuole. Per cambiare una foto brutta: cancella il file in `img/...` e rilancia.
