# Formato24 · casa su GitHub

Profilo pubblico e linee guida comuni di **Formato24**, uno studio che progetta e sviluppa siti web, app per iPhone e Android e l'infrastruttura che li fa funzionare.

[Profilo dell'organizzazione](profile/README.md) · [Sito](https://www.formato24.com) · [Notizie](https://www.formato24.com/notizie) · [TikTok](https://www.tiktok.com/@formato24.com) · [Segnalazioni](https://github.com/formato24-os/.github/issues/new/choose)

## Direzione attuale

Il lavoro pubblico di Formato24 è il software per i clienti: siti web, app e i loro server. Cocosite, la nostra applicazione desktop per homelab, non ha più un sito pubblico né una pagina di registrazione dal 27 ottobre 2026; le sue [note di prodotto](docs/COCOSITE.md) restano qui come traccia del suo perimetro. L'organizzazione resta `formato24-os`; il nome di un repository non decide la licenza di un prodotto.

Questo repository pubblica documentazione, regole della community, moduli per le segnalazioni e script di validazione. Non distribuisce codice dei clienti, binari delle applicazioni, credenziali o servizi operativi.

## 📚 Guida al repository

| Documento | A cosa serve |
| --- | --- |
| [Profilo dell'organizzazione](profile/README.md) | La presentazione pubblica mostrata su GitHub. |
| [Cocosite](docs/COCOSITE.md) | Perimetro del prodotto, stato alpha e confini dei dati. |
| [Piano dei repository](docs/REPOSITORY_PLAN.md) | Repository pubblico attuale e condizioni per quelli futuri. |
| [Contribuire](CONTRIBUTING.md) | Commenti, modifiche alla documentazione e contributi nel rispetto delle licenze. |
| [Codice di condotta](CODE_OF_CONDUCT.md) | Regole di partecipazione e vie di segnalazione. |
| [Sicurezza](SECURITY.md) | Segnalazione privata delle vulnerabilità. |
| [Supporto](SUPPORT.md) | Domande sui prodotti, commenti sull'alpha e problemi con l'account. |
| [Governance](GOVERNANCE.md) | Responsabilità dei manutentori e decisioni di prodotto. |
| [Validazione](docs/validation.md) | Controlli locali e validazione automatica dei contenuti. |
| [Sicurezza del repository](docs/repository-security.md) | Impostazioni di sicurezza e protezione dei rami. |
| [Verifica delle fondamenta](docs/foundation-audit.md) | Registro storico della struttura precedente. |

## Impostazioni comuni di GitHub

Questo repository pubblico `.github` fornisce i documenti predefiniti su contributi, condotta, sicurezza e supporto agli altri repository dell'organizzazione che non ne hanno uno proprio. Fornisce anche i [moduli per le segnalazioni](.github/ISSUE_TEMPLATE) e un [modello per le pull request](.github/PULL_REQUEST_TEMPLATE.md).

Le regole di un singolo repository hanno la precedenza. Questi file non danno accesso a codice privato, non fissano la licenza di un prodotto e non costituiscono un contratto di assistenza. Governance e stato dei prodotti sono collegati in modo esplicito, non ereditati. Vedi la [documentazione di GitHub sui file predefiniti della community](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file).

## Manutenzione

Scrivi in un italiano chiaro, usa poche emoji utili e collega solo risorse davvero disponibili. I moduli comuni devono funzionare senza etichette, team o tipi di segnalazione propri di un repository.

Con Node.js 24 o successivo:

```sh
npm ci --ignore-scripts
npm run check
npm run check:links
```

Questo repository non ha una fase di build. Vedi [validazione e manutenzione](docs/validation.md) per copertura e limiti di rete.

## Contatti

Email `info@formato24.com` · Telefono `081 0910353` · [WhatsApp](https://wa.me/390810910353) · [Sito](https://www.formato24.com)

## Licenza

La [licenza MIT](LICENSE) esistente continua a coprire i documenti originali della community e gli script di validazione di questo repository. Gli [schemi di SchemaStore](scripts/schemas/README.md) inclusi mantengono i termini della Apache License 2.0. Cocosite ha termini proprietari separati: pubblicarne la descrizione qui non concede licenza sul suo codice o sui suoi binari. I diritti già concessi e le note di terze parti restano validi.
