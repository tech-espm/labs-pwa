"use strict";

// Convém darmos um nome que seja único dentro do nosso domínio (para o caso
// de existirem dois ou mais PWA's/caches no mesmo domínio).
const nomeDoCache = "cache-do-exemplo-09-v1";

self.addEventListener("install", function (e) {
	// e.waitUntil() vai esperar pelo término da Promise retornada por caches.open()
	e.waitUntil(
		caches.open(nomeDoCache).then(function (cache) {
			// Lista dos arquivos necessários o aplicativo funcionar offline,
			// relativos ao caminho do Service Worker (poderia utilizar caminhos
			// absolutos, também).
			const arquivosParaAdicionar = [
				// Nosso index.html, como descrito no manifesto
				"./",
				// Em tese, não seria necessário adicionar o manifesto aqui, porque
				// ele já faz parte do PWA instalado. Mas para evitar alguns alertas
				// de 404 em alguns navegadores, eu adiciono ele aqui, também!
				"manifest.json",
				"../assets/css/style.css",
				"../assets/images/fake.jpg",
				// Temos que adicionar todos os favicons do manifesto e alguns do head aqui...
				"../assets/favicons/favicon.ico",
				"../assets/favicons/favicon.png",
				"../assets/favicons/favicon-16x16.png",
				"../assets/favicons/favicon-32x32.png",
				"../assets/favicons/favicon-36x36.png",
				"../assets/favicons/favicon-48x48.png",
				"../assets/favicons/favicon-72x72.png",
				"../assets/favicons/favicon-96x96.png",
				"../assets/favicons/favicon-144x144.png",
				"../assets/favicons/favicon-152x152.png",
				"../assets/favicons/favicon-192x192.png",
				"../assets/favicons/favicon-256x256.png",
				"../assets/favicons/favicon-512x512.png"
			];

			return cache.addAll(arquivosParaAdicionar);
		})
	);
});

self.addEventListener("fetch", function (e) {
	// Vamos responder com uma Promise do cache. O código poderia
	// ser apenas essa linha, mas, nesse caso, tudo que não estivesse
	// no cache causaria um erro, mesmo o usuário estando online!
	// e.respondWith(caches.match(e.request));
	
	e.respondWith(
		caches.match(e.request).then(function (recurso) {
			// Retorna o recurso do cache, ou vai buscar na rede
			// (Se estiver offline, fecth() causará um erro).
			if (recurso) {
				return recurso;
			} else {
				// Diferente do outro exemplo, ao buscar da rede, aproveitamos
				// para armazenar o recurso no cache, para as próximas vezes ;)
				return fetch(e.request).then(function (response) {
					// Assim que o fetch() retornar, abrimos o cache e armazenamos
					// a resposta do fetch() dentro do cache.
					return caches.open(nomeDoCache).then(function (cache) {
						// Um cuidado! É preciso clonar a resposta do fetch(),
						// porque o cache irá consumir toda a resposta. Assim,
						// se a mesma resposta fosse devolvida para o repondWith(),
						// ele produziria um erro, pois a resposta estaria vazia...
						cache.put(e.request, response.clone());
						return response;
					})
				});
			}

			// Fica como exercício escrever o código acima de forma mais "JavaScript" ;)
		})
	);
});
