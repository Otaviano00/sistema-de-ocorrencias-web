# Alvos do front-end. O ambiente Docker (db + api + web) é controlado pelo
# Makefile da API: up/down/logs/reset/seed apenas delegam para ele.
# `make` (ou `make help`) lista os alvos.
.DEFAULT_GOAL := help
.NOTPARALLEL:
.PHONY: help up down logs reset seed install tdd refactor build-pages

API_DIR ?= ../sistema-de-ocorrencias-api
COMPOSE := docker compose -f $(API_DIR)/docker-compose.yml

# Arquivos gerados nos bind mounts ficam com o dono do usuário do host.
export HOST_UID := $(shell id -u)
export HOST_GID := $(shell id -g)

# Sem terminal (CI, scripts), desliga a alocação de TTY do docker compose.
TTY := $(shell [ -t 0 ] || echo -T)

# Roda no container 'web' em execução; se parado, num container efêmero isolado.
web_exec = $(if $(shell $(COMPOSE) ps -q --status running web 2>/dev/null),$(COMPOSE) exec $(TTY) web,$(COMPOSE) run --rm --no-deps $(TTY) web)

help: ## Lista os alvos disponíveis
	@grep -E '^[a-z -]+:.*## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*## "}; {printf "  \033[36m%-9s\033[0m %s\n", $$1, $$2}'

up down logs reset seed: ## Delegam para o Makefile da API (ambiente completo)
	@$(MAKE) --no-print-directory -C $(API_DIR) $@

install: ## Instala pacotes no container web (evita Node do host): make install PKG="zod" [DEV=1]
	@test -n "$(PKG)" || { echo 'Uso: make install PKG="<pacote> [...]" [DEV=1 para devDependency]'; exit 1; }
	$(web_exec) npm install $(if $(DEV),--save-dev) $(PKG)

tdd: ## Vitest (ng test) em modo watch, sem cobertura (ciclo Red/Green)
	$(web_exec) npm run test:watch

refactor: ## Prettier + ESLint --fix (gts + angular-eslint) + Vitest com cobertura
	$(web_exec) sh -c 'npm run format && npm run lint:fix && npm run test:cov'

build-pages: ## Gera o artefato estático usado pelo GitHub Pages, dentro do Docker
	$(web_exec) sh -c 'npm run build -- --base-href / --deploy-url / && cp dist/sistema-de-ocorrencias-web/browser/index.html dist/sistema-de-ocorrencias-web/browser/404.html'
	@test -f dist/sistema-de-ocorrencias-web/browser/CNAME
