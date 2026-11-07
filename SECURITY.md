# Politica di sicurezza

Segnala in privato le possibili vulnerabilità. Non inserire vulnerabilità non ancora rese pubbliche, credenziali o dettagli privati dell'homelab in segnalazioni o pull request pubbliche.

## Segnalazione privata

Usa **Security → Report a vulnerability** nel repository interessato, quando è disponibile. Per Cocosite o per ciò che non ha un repository pubblico adatto usa il [modulo privato in `.github`](https://github.com/formato24-os/.github/security/advisories/new). La segnalazione privata è attiva qui; serve un account GitHub.

Indica prodotto, versione o commit, componente coinvolto, prerequisiti, impatto probabile e una riproduzione minima e sicura. Oscura password, codici di verifica, link di ripristino, cookie di sessione, token, indirizzi di database, dati personali e indirizzi di rete privati. I manutentori possono chiedere altri dettagli nel filo privato della segnalazione.

## Confini sensibili

Per Cocosite sono confini sensibili: verifica dell'account, gestione delle sessioni, proprietà degli spazi di lavoro, credenziali del backend, esportazioni e la futura registrazione dei dispositivi. L'archivio locale dei progetti appartiene oggi al profilo Windows ed è condiviso dagli account Cocosite che usano quel profilo; gli account online non isolano i progetti locali. Vedi la [panoramica del prodotto](https://github.com/formato24-os/.github/blob/main/docs/COCOSITE.md) per i limiti attuali.

Prova solo sistemi e account che sei autorizzato a valutare. Non accedere ai dati di altri, non scansionare reti estranee, non interrompere servizi e non cancellare dischi per dimostrare una segnalazione. Gli identificativi di prodotti e repository non sono credenziali.

## Versioni e coordinamento

Questa politica comune non stabilisce un supporto a lungo termine né garantisce una correzione per ogni build alpha o storica. Indica la versione esatta, così i manutentori possono valutarla. La licenza proprietaria non impedisce una segnalazione privata in buona fede da questa via.

I manutentori valutano le segnalazioni secondo disponibilità. Qui non sono previsti tempi di risposta garantiti, ricompense o un servizio di sicurezza a pagamento. Coordina la divulgazione prima di pubblicare dettagli; gli avvisi, quando serve, descrivono versioni coinvolte, impatto e rimedi. Il credito a chi segnala richiede il suo consenso.

Errori ordinari, problemi di consegna e domande sull'uso vanno nel [supporto](https://github.com/formato24-os/.github/blob/main/SUPPORT.md).
