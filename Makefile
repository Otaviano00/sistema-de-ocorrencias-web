# Alvos do front-end. O ambiente Docker (db + api + web) é controlado pelo
# Makefile da API: up/down/logs/reset/seed apenas delegam para ele.
# `make` (ou `make help`) lista os alvos.
.DEFAULT_GOAL := help
.NOTPARALLEL:
.PHONY: help up down logs reset seed install tdd refactor sonar

API_DIR ?= ../sistema-de-ocorrencias-api
COMPOSE := docker compose -f $(API_DIR)/docker-compose.yml
SONAR_IMAGE := sonarsource/sonar-scanner-cli:12.4.0.4321_8.4.0

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

refactor: ## Prettier + ESLint --fix (gts + angular-eslint) + Vitest com cobertura + sonar-scanner
	$(web_exec) sh -c 'npm run format && npm run lint:fix && npm run test:cov'
	@$(MAKE) --no-print-directory sonar

sonar: ## Roda o sonar-scanner (binário local, ou via Docker se SONAR_TOKEN existir)
	@if command -v sonar-scanner >/dev/null 2>&1; then \
		sonar-scanner; \
	elif [ -n "$${SONAR_TOKEN:-}" ]; then \
		docker run --rm -e SONAR_HOST_URL -e SONAR_TOKEN -v "$(CURDIR):/usr/src" $(SONAR_IMAGE); \
	else \
		echo "sonar-scanner indisponível (instale-o ou exporte SONAR_TOKEN/SONAR_HOST_URL): análise ignorada."; \
	fi
