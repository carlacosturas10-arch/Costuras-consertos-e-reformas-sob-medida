# 🚀 Carla Costureira - Site Profissional Completo (Versão Blindada)

Site estático de alta performance, otimizado para SEO local, conversão e conformidade rigorosa com a LGPD. Desenvolvido com HTML5, CSS3 e JavaScript puro (ES6+), sem dependências de frameworks.

## ✨ Melhorias de Elite Implementadas nesta Versão
1. **WhatsApp Dinâmico por Serviço:** Ao clicar em "Orçar" em um card de serviço específico, a mensagem do WhatsApp já vai preenchida com o nome daquele serviço (ex: "gostaria de um orçamento para: *Barra de Calça/Saia*").
2. **Acessibilidade (WCAG AA):** Adicionados `scroll-padding-top` (para o menu fixo não cobrir títulos), anéis de foco visíveis (`:focus-visible`) para navegação por teclado, e atributos `aria` em todos os elementos interativos.
3. **SEO Técnico Avançado:** Schema.org `LocalBusiness` enriquecido com coordenadas `geo` e `openingHours`. Hierarquia de headings perfeita e prevenção total de CLS com dimensões explícitas em imagens.
4. **LGPD & WhatsApp Business:** A Política de Privacidade agora inclui cláusula específica sobre o tratamento de dados via WhatsApp Business API, atendendo às exigências mais recentes de fiscalização.
5. **Performance:** Intersection Observer com `unobserve` após animação (economiza CPU) e debounce no evento de scroll do botão "Voltar ao Topo".

---

## 📋 Checklist de Pré-Lançamento

1. **Substituir Placeholders de Marketing**:
   - Abra `index.html` e busque por `[INSIRA SEU ... AQUI]`.
   - Substitua pelos seus IDs reais do GA4, Google Ads, GTM e Meta Pixel.
   - Atualize a tag `<link rel="canonical" href="...">` com o domínio final.

2. **Configurar Links de Redes Sociais**:
   - Adicione os links reais do Instagram/Facebook no rodapé (se aplicável).

3. **Imagens**:
   - As imagens atuais são placeholders do Unsplash otimizados (`?w=800&q=80`). Substitua pelas fotos reais do ateliê para maior autenticidade.

4. **Hospedagem**:
   - Faça upload dos 5 arquivos para qualquer hospedagem estática (Netlify, Vercel, GitHub Pages ou Hostgator).

---

## ⚙️ Guia de Configuração de Marketing

### 1. Google Tag Manager (GTM)
- Crie uma conta em [tagmanager.google.com](https://tagmanager.google.com/).
- Substitua `[INSIRA SEU GTM ID AQUI]` no `<head>` e no `<body>` do `index.html`.
- Dentro do GTM, configure as tags do GA4 e Meta Pixel para disparar apenas quando a variável de consentimento (ou evento de cookie) for ativada.

### 2. Google Analytics 4 (GA4)
- Crie uma propriedade no GA4.
- Copie o "ID da Métrica" (ex: `G-XXXXXXXXXX`) e cole no bloco 2 do `<head>`.

### 3. Google Meu Negócio (GMN)
- Reivindique ou crie o perfil "Carla Costureira" no Google Maps.
- Adicione o link deste site no perfil.
- Use o mesmo endereço (Estrada Santa Mônica, 100) e telefone (11 96338-2485) para consistência de NAP (Name, Address, Phone), crucial para SEO Local.

---

## 🧪 Testes Obrigatórios

1. **Teste do Botão WhatsApp Dinâmico (Crucial)**:
   - Vá até a seção "Serviços".
   - Clique no botão "Orçar este serviço" dentro do card "Troca de Zíper".
   - Verifique se o WhatsApp abre com a mensagem: *"Olá, Carla! Vim pelo site e gostaria de um orçamento para: **Troca de Zíper**."*

2. **Teste de UTM Persistente**:
   - Abra o site no navegador e adicione à URL: `?utm_source=instagram_ads`
   - Clique em qualquer botão do WhatsApp.
   - Verifique se a mensagem inclui: *"Vim pelo site (anúncio: instagram_ads)"*.
   - Feche o navegador, abra novamente (sem a UTM na URL). O rastreamento do Instagram ainda deve estar ativo (graças ao `localStorage`).

3. **Teste de Acessibilidade**:
   - Pressione a tecla `Tab` no teclado. Verifique se um anel dourado (`outline`) aparece claramente ao redor de cada link e botão focado.

4. **Teste do Formulário**:
   - Preencha parcialmente e feche a aba. Reabra. Os dados devem estar salvos (rascunho).
   - Envie. Deve abrir o WhatsApp com os dados formatados com emojis e negrito (`*texto*`).

---

## 📈 Plano de Ação de Marketing Local (8 Semanas)

- **Semana 1**: Publicação do site e verificação no Google Search Console.
- **Semana 2**: Criação/Otimização do Perfil da Empresa no Google (GMN) com 10 fotos reais do ateliê e horários atualizados.
- **Semana 3**: Solicitar avaliações no Google para 5 clientes fiéis antigos (fornecer o link direto do GMN).
- **Semana 4**: Lançamento de campanha de tráfego pago no Meta Ads (Instagram/Facebook) com raio de 5km do endereço, usando o criativo "Barra de Calça a partir de R$ 40" com link direto para o card de serviço específico.
- **Semana 5**: Implementação de posts no Instagram mostrando o "Antes e Depois" de reformas (com permissão do cliente).
- **Semana 6**: Parceria com 2 brechós ou lojas de roupas locais para indicação mútua de clientes.
- **Semana 7**: Análise dos dados no GA4: qual página tem maior taxa de rejeição? Otimizar o texto ou as imagens dessa seção.
- **Semana 8**: Lançamento de promoção sazonal (ex: "Mês da Noiva" ou "Preparação para o Inverno") com link direto para o WhatsApp com UTM específico para medir o ROI.