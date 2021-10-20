# DiscordBot

Linguagem sugerida: Kotlin/JVM
Linguagem usada: Typescript/Node

## Uso:

`dev`: Roda o codigo typescript de uma vez, sem a necessidade de gerar arquivos de compilação
`build`: Compila o codigo typescript em javascript e armazena na pasta `build`, para executar basta rodar `node build/index.js` assumindo que você esteja no diretorio raiz
`lint`: Aponta erros de digitação/más praticas de escrita de codigo, e corrige altomaticamente o que for possivel
`test`: (Não implementado ainda!) executa os testes automatizados e exibe se o codigo está executando normalmente

## Configurações:

Arquivo de configurações: `configs.js`

Variaveis do ambiente:
- DiscordToken: 'Token do bot adquirido pelo painel do discord'
- Enviroment: 'Ambiente do bot (production - para produção, qualquer outro valor para desenvolvimento)'