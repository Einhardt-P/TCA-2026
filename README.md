```markdown
# TCA-2026

Jogo de RPG em desenvolvimento, com mecânicas inspiradas em **UNDERTALE** e **DELTARUNE**. A aventura acontece no terminal e combina exploração, diálogos e interação com o mundo do jogo.

## Sobre o projeto

O projeto busca criar uma experiência de RPG textual com exploração de mapas, conversas com personagens e sistemas de itens e equipamentos. O progresso pode ser salvo localmente.

Entre os elementos do jogo estão:

- movimentação e exploração de mapas;
- diálogos e interações;
- inventário, itens e equipamentos;
- dados de jogo armazenados em arquivos JSON;
- efeitos sonoros e música.

## Tecnologias

- **JavaScript** com ES Modules;
- **Node.js 18 ou superior**;
- **JSON** para armazenar dados do jogo;
- dependências declaradas: `audio` e `express`.

## Como executar

1. Instale o [Node.js 18 ou superior](https://nodejs.org/).
2. Clone o repositório:

   ```bash
   git clone https://github.com/Einhardt-P/TCA-2026.git
   cd TCA-2026
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Crie a pasta de salvamentos, caso ela ainda não exista:

   ```bash
   mkdir -p arquivos/saves
   ```

5. Execute o jogo:

   ```bash
   npm start
   ```

> O projeto é executado diretamente pelo comando `npm start`, que inicia o arquivo principal `index.js`.

## Controles

- **W / A / S / D** — movimentar-se pelos mapas;
- **W / S** — navegar pelas opções dos menus;
- **Z** — interagir, confirmar uma opção ou avançar o diálogo;
- **X** — completar rapidamente o texto do diálogo;
- **C** — abrir o inventário durante a exploração ou pular o texto do diálogo.

## Estrutura do projeto

- `index.js` — ponto de entrada e lógica principal;
- `funcoes/` — funções auxiliares;
- `arquivos/` — dados do jogo, como mapas, itens, armas e NPCs;
- `sound/` — efeitos sonoros;
- `mus/` — recursos de música.
