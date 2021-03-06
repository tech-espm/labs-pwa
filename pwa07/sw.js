﻿"use strict";

self.addEventListener("install", function (e) {
	// Se existisse alguma preparação, ela deveria ocorrer na forma de uma Promise,
	// e precisaríamos utilizar o método waitUntil(), para que o navegador entendesse
	// que a instalação ainda está ocorrendo:
	//
	//e.waitUntil( Promise );
});

self.addEventListener("activate", function (e) {
	// Se existisse alguma preparação, ela deveria ocorrer na forma de uma Promise,
	// e precisaríamos utilizar o método waitUntil(), para que o navegador entendesse
	// que a instalação ainda está ocorrendo:
	//
	//e.waitUntil( Promise );

	// Para assumir o controle até mesmo das páginas que já foram abertas, basta executar
	// a linha abaixo, dentro ou fora da Promise passada para o método waitUntil().
	//
	//clients.claim();
});

self.addEventListener("fetch", function (e) {
	if (e.request.url.endsWith(".jpg")) {
		let array = new Uint8Array([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x80, 0x08, 0x00, 0x00, 0x00, 0x00, 0xC1, 0xDE, 0xE8, 0xD6, 0x00, 0x00, 0x00, 0x75, 0x49, 0x44, 0x41, 0x54, 0x78, 0xDA, 0xED, 0xD0, 0x31, 0x01, 0x00, 0x00, 0x04, 0x00, 0x30, 0xFD, 0x43, 0xE3, 0x55, 0x01, 0x5B, 0x84, 0x45, 0x3D, 0x17, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0xE0, 0x42, 0x40, 0x4E, 0x1F, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0xF5, 0x1A, 0x44, 0x11, 0xC3, 0xA5, 0x7C, 0x0D, 0x66, 0x4B, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82 ]);
		let blob = new Blob([array], { type: "image/png" });
		e.respondWith(new Response(blob));
	}
});
