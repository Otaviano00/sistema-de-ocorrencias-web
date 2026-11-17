# sistema-de-ocorrencias-web

Front-end (Angular) do **Sistema de Registro e Acompanhamento de Ocorrências**, projeto da disciplina de Técnicas de Programação 2 (2/2026) da UnB. A API fica no repositório irmão [`sistema-de-ocorrencias-api`](../sistema-de-ocorrencias-api).

## Ambiente de desenvolvimento e fluxo de qualidade (DX)

Todo o ambiente (banco, API e este front-end) roda em **Docker** e é controlado por comandos `make`. Você **não precisa** instalar Node.js na sua máquina.

### Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) com o Docker Compose v2 (comando `docker compose`)
- `make`
- Os dois repositórios clonados **lado a lado**, na mesma pasta:

```text
sistema-de-ocorrencias/
├── sistema-de-ocorrencias-api/   ← docker-compose.yml e Makefile principal
└── sistema-de-ocorrencias-web/   ← este repositório
```

> O `docker-compose.yml` fica no repositório da API. Os comandos de ambiente deste Makefile (`up`, `down`, `logs`, `reset`, `seed`) só repassam a chamada para o Makefile da API, então você pode rodá-los de qualquer um dos dois repositórios.

### Subir, parar, resetar e popular o banco

| Comando      | O que faz |
| ------------ | --------- |
| `make up`    | Sobe banco, API e front-end em segundo plano (faz o build quando precisa). Migrations e seed da API rodam automaticamente. |
| `make logs`  | Mostra os logs da API e do front-end em tempo real (`Ctrl+C` para sair). |
| `make down`  | Para e remove os containers. **Os dados do banco são mantidos.** |
| `make reset` | Apaga containers **e o banco**, e recria tudo do zero (migrations + seed). |
| `make seed`  | Roda a seed da API manualmente. Não duplica dados. Use `make seed FORCE=1` para apagar e recriar os dados de exemplo. |
| `make help`  | Lista todos os comandos disponíveis. |

Depois do `make up`, abra <http://localhost:4200>. A API responde em <http://localhost:3000> e já aceita requisições do front-end (CORS liberado para `http://localhost:4200`).

**Hot-reload:** salve qualquer arquivo em `src/` e o navegador atualiza sozinho.

### Instalar pacotes com segurança

Use o `make install`, que roda o `npm install` **dentro do container** do front-end, com a versão certa do Node:

```bash
make install PKG="leaflet"                 # dependência normal
make install PKG="@types/leaflet" DEV=1    # devDependency
make install PKG="pacote-a pacote-b"       # vários de uma vez
```

O `package.json` e o `package-lock.json` são atualizados na sua máquina. Faça commit dos dois.

> Quando alguém do time adicionar dependências (você vê `package.json` alterado após um `git pull`), rode `make up` de novo: a imagem é reconstruída com os pacotes novos.

### Fluxo de TDD: Red → Green → Refactor

1. **Red:** rode `make tdd` e escreva um teste (`*.spec.ts`) que falha. O `ng test` (que usa o Vitest) fica em modo watch e roda os testes de novo a cada arquivo salvo (sem cobertura, para ser o mais rápido possível).
2. **Green:** escreva o código mínimo para o teste passar e veja ele ficar verde no terminal do `make tdd`.
3. **Refactor:** com os testes verdes, melhore o código e rode `make refactor`, que executa em sequência:
   1. **Prettier**: formata `.ts`, `.html` e `.scss` no padrão Google.
   2. **ESLint** com `--fix`: regras do Google e do Angular. Corrige o que dá automaticamente e falha se sobrar algum erro.
   3. **Vitest com cobertura**: roda todos os testes e gera `coverage/lcov.info` (abra `coverage/lcov-report/index.html` no navegador para ver o relatório).

   Se uma etapa falhar, as seguintes não rodam. Corrija e rode de novo.

`make tdd` e `make refactor` usam o container do front-end se ele estiver no ar. Se o ambiente estiver parado, eles criam um container temporário só para isso.

### Integração contínua (GitHub Actions)

O workflow `.github/workflows/ci.yml` roda a cada push na `main` ou na `dev` e em todo pull request para a `main` ou a `dev`. Se você enviar um novo commit, a execução anterior do mesmo PR é cancelada. O CI **só verifica**: ele não formata nem corrige nada. Por isso, rode `make refactor` antes de dar push.

Ele usa o Node da versão em `.nvmrc` e confere, nesta ordem:

1. `npm ci`: instala as dependências exatamente como estão no `package-lock.json`.
2. **Prettier** (`--check`): falha se algum arquivo não estiver formatado.
3. **ESLint**: falha com qualquer erro **ou aviso** das regras do Google e do Angular.
4. **Build de produção** (`npm run build`): falha se houver erro de tipo ou de template.
5. **Testes unitários com cobertura** (`coverage/lcov.info`, que fica disponível como artefato `coverage` na página da execução por 7 dias).

### Onde fica cada configuração

| Ferramenta | Arquivo | Observação |
| ---------- | ------- | ---------- |
| Google TypeScript Style | `eslint.config.mjs` | Regras do pacote `gts`, mantido pelo Google. |
| ESLint | `eslint.config.mjs` | `gts` + `angular-eslint` (inclusive acessibilidade nos templates). Inclui `eslint-config-prettier`, então não conflita com o Prettier. |
| Prettier | `.prettierrc`, `.prettierignore` | Aspas simples, vírgula no final, sem espaço dentro de `{}`. HTML formatado com o parser do Angular. |
| Vitest + cobertura | `angular.json` (alvo `test`), `vitest.config.mts` | O `ng test` roda o Vitest. A cobertura sai em `coverage/lcov.info`. |
| Docker (dev) | `Dockerfile.dev` | Orquestrado pelo `docker-compose.yml` do repositório da API. |
| CI | `.github/workflows/ci.yml` | Verificações de todo PR (veja acima). |
| Versão do Node | `.nvmrc`, `engines` no `package.json` | Node 24.22.3 (mesma versão da imagem Docker). |

### Por que usar `make` em vez de `npm` direto na máquina?

- **Mesma versão do Node para todo mundo.** O projeto exige Node 24 (`engine-strict`). Com outra versão instalada, `npm install` falha ou gera um `package-lock.json` diferente do resto do time.
- **Mesmo ambiente para todos.** Front-end, API e banco sobem juntos e iguais em qualquer máquina, sem "na minha funciona".
- **Sem conflito de binários.** Pacotes com partes nativas (esbuild, por exemplo) são instalados para o Linux do container, não para o seu sistema.
- **Sem problema de permissão.** Os arquivos gerados pelos containers (`.angular/`, `coverage/`) ficam com o seu usuário, não com o `root`.

> **Dica para o editor (opcional):** para o VS Code entender os tipos, você pode instalar as dependências também na sua máquina com Node 24 (`nvm install && nvm use && npm ci`). Esse `node_modules` local é usado só pelo editor. Os comandos do dia a dia continuam sendo os `make`.
