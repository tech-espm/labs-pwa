# Palavras Iniciais

No que diz respeito a PWA (Progressive Web App), assim como *(quase)* tudo em programação, existem diversas formas para se chegar a um resultado final. Poderíamos criar um PWA utilizando **qualquer** linguagem / API / framework / biblioteca / [*insira seu termo favorito aqui*] de back-end! Mesmo porque, o grande trunfo de um PWA está no front-end 😁.

Claro que a utilização do back-end é essencial para configurar cache, controlar permissões e acessos, configurar cabeçalhos HTTP personalizados etc... Porém, como nosso objetivo é entender e criar um PWA, decidi focar no que é mais importante para o assunto, minimizando a quantidade de conteúdos secundários.

Por exemplo, para servir um arquivo estático simples utilizando Node.js, .Net Core, Python, Java, PHP, Ruby on Rails ou qualquer outra, é necessário instalar um ou mais SDK's (opcionalmente com sua IDE), criar uma aplicação, configurar a aplicação e, por fim, executar a aplicação! 😱😱😱

Além disso, para aqueles que estiverem lendo esse material como uma referência futura, não quero que pensem *"Ahhhhh! Entendi! Para criar um PWA preciso usar a linguagem X!"*.

Assim, todos os exemplos utilizam apenas imagens e arquivos HTML, JS e CSS (para sairmos do preto-e-branco com fonte serifada 😉).

Os exemplos não utilizam qualquer biblioteca JS, pois aqui não precisamos de velocidade de codificação, desempenho na execução, quaisquer *polyfills* e afins. Vamos apenas ver como a coisa toda acontece, de maneira simples.

Contudo, não será possível experimentar o PWA na maioria dos navegadores modernos, se abrirmos os arquivos HTML direto do disco, como `file://caminho/pasta/arquivo.html`. É necessário acessar os arquivos a partir de um servidor local, como `http://localhost/caminho/arquivo.html`.

Para isso, é necessário utilizar alguma IDE ou ambiente que execute um servidor local por nós. Poderíamos utilizar um servidor [Apache](https://www.apache.org/) (sozinho ou através do [XAMPP](https://www.apachefriends.org/pt_br/index.html) ou do [WampServer](http://www.wampserver.com/en/)), o próprio [IIS](https://pt.stackoverflow.com/questions/185603/como-ativar-o-iis-no-windows-10) (para usuários de Windows), ou IDE's como [Brackets](http://brackets.io/), [eclipse](https://www.eclipse.org/downloads/packages/), [VS Code](https://code.visualstudio.com/), [Visual Studio Community](https://visualstudio.microsoft.com/pt-br/downloads/), dentre uma infinidade de outros ambientes e IDE's (impossível enumerar todos aqui, sério! 😱).

Para referência futura, este material foi originalmente publicado em **outubro de 2019** e pode sofrer alterações ao longo do tempo.

Vamos em frente!

# Introdução *(não muito longa)* a PWA

![Logo PWA](https://user-images.githubusercontent.com/3104648/28352004-a055292c-6c4b-11e7-9c6b-a94cdc2a5458.png)
*[Logo por webmaxru](https://github.com/webmaxru/progressive-web-apps-logo)*

O termo PWA foi criado pelo Google em 2015, mas o conceito de executar um aplicativo Web (escrito em HTML, JS e CSS) de forma *nativa* (não através de um navegador) vem de muitos anos antes, com o lançamento do primeiro iPhone em 2007.

Em poucas palavras, um PWA (Progressive Web App) é um aplicativo Web que possui sua própria identidade visual (como nome, ícone, autor, descrição etc.), funciona tanto de forma online como offline e pode ser instalado no dispositivo (celular, tablet, desktop...), sem a necessidade de uma loja de aplicativos específica. Se os usuários conseguem acessar o PWA pelo seu link original (como `https://exemplo.com.br/app`), então conseguem instalar o aplicativo!

O "P" do PWA é de crucial importância para um PWA real. "Melhoria progressiva" é um conceito um pouco antigo para desenvolvedores Web e consiste em fazer com que um código detecte a presença de certas funcionalidades no navegador onde está sendo executado, antes de efetivamente utilizar a funcionalidade, causando um erro em tempo de execução. Por exemplo, durante o cadastro de um usuário, se o dispositivo possuir uma câmera e o navegador disponibilizar acesso à câmera, é possível oferecer ao usuário a oportunidade de tirar uma foto em tempo real para seu cadastro. Caso contrário, o usuário terá que realizar o upload de um arquivo de foto existente no dispositivo.

Claro que há certos limites quanto ao uso das melhorias progressivas. Por exemplo, se o PWA for um jogo 3D, mas o navegador não oferecer nenhum suporte à tecnologia 3D (como [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)), não teremos muito o que fazer... 😢

Por se tratar realmente de um aplicativo Web, tanto a versão como o modelo do sistema operacional não importam, desde esteja instalado ali um navegador capaz de compreender as API's necessárias para fazer um PWA funcionar!

Para um PWA **bem comportado**, a diferença entre acessar o aplicativo através do ícone criado durante a instalação, e acessar o mesmo aplicativo digitando seu endereço no navegador é que o acesso pelo ícone dá ao aplicativo a oportunidade de ocultar elementos visuais, como os botões e barras do navegador, dando ao usuário uma experiência **bem similar** a de uma aplicação nativa.

A comunidade da MDN tem um [material fantástico 🤩 sobre teoria e prática de PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps), incluindo uma explicação bem legal das [oito características esperadas de um PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Advantages).

O pessoal do Google também tem um [laboratório bacana sobre criação de PWA](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp) (o tutorial é longo porque vai além de *exemplos-brinquedo*, e utilizam API's da vida real).

Muito bem! Chega de blah-blah-blah e vamos para o código!!! 😍🤩👩‍💻👨‍💻

# Segurança Primeiro

Um PWA na vida real deve ser servido a partir de uma conexão segura, como `https://exemplo.com.br/app`. Os navegadores acessarão normalmente o aplicativo caso ele esteja em uma conexão não-segura, como `http://exemplo.com.br/app`, mas eles podem se recusar a deixar o usuário instalar o aplicativo. Logo, HTTPS é imprescindível para criar um PWA.

Porém... Para facilitar a vida do desenvolvedor, muitos navegadores aliviam essa restrição quando o aplicativo estiver sendo servido localmente através de endereços como `http://localhost/app` ou `http://127.0.0.l/app`.

Assim, vamos seguir dessa forma, para não precisarmos nos preocupar com certificados de segurança e afins (pelo menos por hora 😁).

# Identifique-se!

Ao longo dos anos foram criadas inúmeras formas para uma página/aplicativo Web se identificar para o mundo. Desde as tradicionais meta tags na `head` da página, passando pelos [cards do Twitter](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started),  até a API [Open Graph](https://ogp.me/) criada pelo [Facebook](https://developers.facebook.com/docs/sharing/webmasters/).

![Exemplo de descrição](https://tech-espm.github.io/labs-pwa/assets/images/descricao.png)
*Exemplo de descrição automática gerada por ferramentas de comunicação*

![Exemplo de descrição](https://tech-espm.github.io/labs-pwa/assets/images/descricao2.png)
*Outro exemplo de descrição automática gerada por ferramentas de comunicação*

Todas essas ferramentas servem para obter, de **maneira estruturada**, ícones, imagens, autor, descrição e todo o tipo de informação extra sobre uma página/aplicativo Web. No caso de aplicativos Web, opções como se ele pode/deve funcionar em tela cheia (útil para jogos) entre outras, também podem ser especificadas na forma de meta tags dentro da `head`.

Isso sem falar no famoso **favicon**, e afins, que parecem ter sido inventados e reinventados por cada fabricante de navegador ao longo dos últimos anos! 😱😱😱😱😱😱😱😱

Por exemplo, existem meta tags específicas para o Safari da Apple, para especificar o [comportamento da página/aplicativo](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html), além de [configurações gerais sobre aparência e afins](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)!

Existem outras meta tags utilizadas em diferentes navegadores para fazer configurar comportamentos específicos, como [comportamento em tela cheia](https://developers.google.com/web/fundamentals/native-hardware/fullscreen/), por exemplo.

Ou ainda, tags para especificar como a página/aplicativo deve se [comportar ou deve aparecer em navegadores da Microsoft](https://technet.microsoft.com/en-us/windows/dn255024%28v=vs.60%29)!

Por se tratar de ferramentas/tags proprietárias ou não padronizadas, é comum ter que especificar a mesma informação diversas vezes, apenas com nomes/prefixos diferentes 😢!

Na Web, há tentativas ([aqui](https://github.com/audreyr/favicon-cheat-sheet), [aqui](https://cwoebker.com/posts/favicon-madness) e em mais diversos lugares) de agrupar esse conhecimento de forma organizada, para servir como um guia rápido, procurando evitar ainda mais visitas ao [Stack Overflow](https://stackoverflow.com/) 😅.

Para os PWA's foi criado um novo padrão, conhecido como Web App Manifest ([muito bem explicado pela comunidade da MDN](https://developer.mozilla.org/en-US/docs/Web/Manifest)).

Ele se trata de um arquivo JSON, descrevendo atributos básicos do aplicativo, tais como ícones (diferentes resoluções), nome, descrição, cor de fundo, cor principal do tema, dentre outros atributos.

```json
{
	"name": "Workshop PWA",
	"short_name": "Workshop PWA",
	"start_url": "/",
	"dir": "ltr",
	"lang": "pt-BR",
	"orientation": "portrait-primary",
	"display": "standalone",
	"background_color": "#3d3d3d",
	"theme_color": "#5a0fc8",
	"description": "Material e exemplos do workshop sobre PWA",
	"icons": [
		{
			"src": "../favicons/favicon-36x36.png",
			"sizes": "36x36",
			"type": "image/png",
			"density": "0.75",
			"purpose": "maskable any"
		},
		... demais ícones omitidos ...
	]
}
```

Sem o manifesto, os navegadores ignoram a possibilidade do site ser um PWA, logo ele é **obrigatório**!

Mesmo já existindo há algum tempo, a tecnologia do manifesto ainda é experimental, e seu comportamento pode variar um pouco entre diferentes navegadores. A especificação da W3C está detalhada [aqui](https://w3c.github.io/manifest/), e é um documento vivo, que sofre alterações com base na comunidade ([questões como formato dos ícones](https://github.com/w3c/manifest/issues/555) vêm sendo discutidas há alguns anos, e ainda [estão sendo ajustadas](https://github.com/w3c/manifest/issues/805)).

É possível utilizar as ferramentas de desenvolvedor do Chrome para inspecionar o manifesto, e saber se estamos indo na direção certa:
![Inspecionando o manifesto de um Web App](https://tech-espm.github.io/labs-pwa/assets/images/manifesto.png)

Existem diversas ferramentas geradoras de favicons na Web. Sempre usei uma ou duas delas, até que resolvi criar a minha algum tempo atrás, e acabei colocando no [GitHub](https://carlosrafaelgn.github.io/favicon/) para o workshop (pensei comigo mesmo "por que não?!" 😁).

Além de gerar o manifesto, a ferramenta também gera os ícones em diversos tamanhos, e um trecho de código para ser colocado na `head` da página, que, apesar de **não ser realmente necessário** para um PWA, é necessário para que outros sites e ferramentas sejam capazes de extrair informações sobre nosso aplicativo (afinal, um PWA **também** é um site como outro qualquer 😉).

> Apesar do conteúdo estar estruturado no formato JSON, a extensão proposta para o arquivo do manifesto é `webmanifest`, como `manifest.webmanifest`. Ainda assim, é comum encontrar/utilizar o nome `manifest.json`.

# A Fronteira Final do PWA: Service Workers

Service Workers são, entre outras coisas, a forma encontrada pelos navegadores para fornecer ao desenvolvedor um meio de conseguir interceptar e tratar as requisições realizadas pela página. Como os Service Workers têm a chance de tratar todas as requisições, além do comportamento padrão de repassar a requisição para o servidor destino, eles podem optar por **não fazer isso**, devolvendo à página uma resposta vinda de outro local, como por exemplo um cache local, ou até mesmo um conteúdo gerado em tempo real, similar a um proxy de rede 🤩!

Por se tratar de um proxy indetectável pela página, e ser capaz de tratar todas as requisições da página, Service Workers são muito perigosos, e envolvem riscos de segurança. Imagine alguém interceptando todas as requisições de sua página apenas para repassar todas as informações, como senhas digitadas, para outro servidor (log) sem que você soubesse! Sei que você não faria isso com seu próprio site, mas, imagine um iframe malicioso, por exemplo...

Por essas e outras razões, Service Workers só podem funcionar via HTTPS (ou localhost, no caso de alguns navegadores que permitem) e possuem um **escopo de atuação muito bem delimitado**, como veremos mais para frente.

Eles funcionam em uma thread separada, logo não têm acesso direto ao DOM, nem é possível fazer com que um Service Worker acesse o código JavaScript de uma página ou vice-versa, a não ser através do envio de [mensagens](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent) (computação paralela), como ocorre com [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API), [Web Sockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) e afins.

Como o assunto é bem extenso, seria muito difícil abordar todos os tópicos relacionados em poucos minutos!!! Assim, estou listando aqui excelentes referências para quem quiser se aprofundar no futuro:

- [Service Workers 101](https://github.com/delapuente/service-workers-101/): Um resumo fantástico em forma de infográfico, criado pelo pessoal da comunidade da MDN.
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API): Documentação sobre a API.
- [Using Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers): Referência sobre Service Workers, incluindo formas de ativá-los em navegadores mais antigos.
- [Cache Storage](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage): Documentação sobre a API.
- [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache): Documentação sobre a API.
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API): Documentação sobre a API.
- [Request API](https://developer.mozilla.org/en-US/docs/Web/API/Request): Documentação sobre a API.
- [Response API](https://developer.mozilla.org/en-US/docs/Web/API/Response): Documentação sobre a API.
- [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise): Documentação sobre Promises, com mais links de referências ao final.

# Exemplos de PWA's Reais

- [Neon](https://carlosrafaelgn.github.io/neon/)
- [Favicon Helper](https://carlosrafaelgn.github.io/favicon/)
- [Editor HTML](https://tech-espm.github.io/labs-editor/)

---

Chega de texto! Vamos aos [códigos de exemplo](https://tech-espm.github.io/labs-pwa/) 🎉😍!!!
