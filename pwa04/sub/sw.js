"use strict";

self.addEventListener("install", function (e) {
	// Nenhuma preparação durante a instalação...
});

self.addEventListener("fetch", function (e) {
	// Apenas para identificar qual Service Worker está tratando a requisição (nos primeiros exemplos)
	console.log("SW04 SUB");

	// Nada de especial... Apenas deixa o navegador tratar a requisição do jeito dele!
});
