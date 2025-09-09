class AbrigoAnimais {

  constructor() {
    this.animais = [
      { nome: 'Rex', tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
      { nome: 'Mimi', tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
      { nome: 'Fofo', tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      { nome: 'Zero', tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
      { nome: 'Bola', tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      { nome: 'Bebe', tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      { nome: 'Loco', tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
    ];
    this.brinquedosValidos = ['RATO', 'BOLA', 'LASER', 'NOVELO', 'CAIXA', 'SKATE'];
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const listarBrinquedosPessoa1 = brinquedosPessoa1.split(',').map(b => b.trim());
    const listarBrinquedosPessoa2 = brinquedosPessoa2.split(',').map(b => b.trim());
    if(
      this.temDuplicados(listarBrinquedosPessoa1) ||
      this.temDuplicados(listarBrinquedosPessoa2) ||
      !listarBrinquedosPessoa1.every(b => this.brinquedosValidos.includes(b)) ||
      !listarBrinquedosPessoa2.every(b => this.brinquedosValidos.includes(b))
    ) {
      return { erro: 'Brinquedo inválido' };
    }

    const ListaOrdemAnimais = ordemAnimais.split(',').map(a => a.trim());
    if(
      this.temDuplicados(ListaOrdemAnimais) ||
      !ListaOrdemAnimais.every(a => this.animais.some(animal => animal.nome === a))
    ) {
      return { erro: 'Animal inválido' };
    }

    let adotados1 = 0, adotados2 = 0;
    let resultado = [];

    for (const nomeAnimal of ListaOrdemAnimais){
      const animal = this.animais.find(a => a.nome === nomeAnimal);

      let p1 = false, p2 = false;
      if(animal.nome === 'Loco') {
        if ((adotados1 > 0) && this.podeAdotarLoco(listarBrinquedosPessoa1, animal)) p1 = true;
        if ((adotados2 > 0) && this.podeAdotarLoco(listarBrinquedosPessoa2, animal)) p2 = true;
      } else {
        p1 = this.podeAdotar(listarBrinquedosPessoa1, animal) && adotados1 < 3;
        p2 = this.podeAdotar(listarBrinquedosPessoa2, animal) && adotados2 < 3;
      }

      if (animal.tipo === 'gato' && p1 && p2) {
        resultado.push(`${animal.nome} - abrigo`);
        continue;
      }

      if(p1 && !p2 && adotados1 < 3) {
        resultado.push(`${animal.nome} - pessoa 1`);
        adotados1++;
      } else if(!p1 && p2 && adotados2 < 3) {
        resultado.push(`${animal.nome} - pessoa 2`);
        adotados2++;
      } else {
        resultado.push(`${animal.nome} - abrigo`);
      }
    }

    resultado.sort();

    return {lista: resultado};
  }

  podeAdotar(brinquedosPessoa, animal) {
    let idx = 0;
    for (let b of brinquedosPessoa){
      if(b === animal.brinquedos[idx]) idx++;
      if(idx === animal.brinquedos.length) return true;
    }
    return idx === animal.brinquedos.length;
  }

  podeAdotarLoco(brinquedosPessoa, animal) {
    return animal.brinquedos.every(b => brinquedosPessoa.includes(b));
  }

  temDuplicados(arr) {
    return new Set(arr).size !== arr.length;
  }
}

export { AbrigoAnimais as AbrigoAnimais };


// class AbrigoAnimais {

//   constructor() {
//     this.animais = [
//       { nome: 'Rex', tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
//       { nome: 'Mimi', tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
//       { nome: 'Fofo', tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
//       { nome: 'Zero', tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
//       { nome: 'Bola', tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
//       { nome: 'Bebe', tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
//       { nome: 'Loco', tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
//     ];
//     this.brinquedosValidos = ['RATO', 'BOLA', 'LASER', 'NOVELO', 'CAIXA', 'SKATE'];
//   }

//   encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
//     // Separar brinquedos das pessoas
//     var lista1 = [];
//     var temp1 = '';
//     for (var i = 0; i < brinquedosPessoa1.length; i++) {
//       if (brinquedosPessoa1[i] === ',') {
//         lista1.push(temp1.trim());
//         temp1 = '';
//       } else {
//         temp1 += brinquedosPessoa1[i];
//       }
//     }
//     if (temp1.length > 0) lista1.push(temp1.trim());

//     var lista2 = [];
//     var temp2 = '';
//     for (var i = 0; i < brinquedosPessoa2.length; i++) {
//       if (brinquedosPessoa2[i] === ',') {
//         lista2.push(temp2.trim());
//         temp2 = '';
//       } else {
//         temp2 += brinquedosPessoa2[i];
//       }
//     }
//     if (temp2.length > 0) lista2.push(temp2.trim());

//     // Validar brinquedos
//     for (var i = 0; i < lista1.length; i++) {
//       var valido = false;
//       for (var j = 0; j < this.brinquedosValidos.length; j++) {
//         if (lista1[i] === this.brinquedosValidos[j]) {
//           valido = true;
//         }
//       }
//       if (!valido) {
//         return { erro: 'Brinquedo inválido' };
//       }
//       // Checar duplicados
//       for (var k = i + 1; k < lista1.length; k++) {
//         if (lista1[i] === lista1[k]) {
//           return { erro: 'Brinquedo inválido' };
//         }
//       }
//     }
//     for (var i = 0; i < lista2.length; i++) {
//       var valido2 = false;
//       for (var j = 0; j < this.brinquedosValidos.length; j++) {
//         if (lista2[i] === this.brinquedosValidos[j]) {
//           valido2 = true;
//         }
//       }
//       if (!valido2) {
//         return { erro: 'Brinquedo inválido' };
//       }
//       // Checar duplicados
//       for (var k = i + 1; k < lista2.length; k++) {
//         if (lista2[i] === lista2[k]) {
//           return { erro: 'Brinquedo inválido' };
//         }
//       }
//     }

//     // Separar ordem dos animais
//     var ordem = [];
//     var temp3 = '';
//     for (var i = 0; i < ordemAnimais.length; i++) {
//       if (ordemAnimais[i] === ',') {
//         ordem.push(temp3.trim());
//         temp3 = '';
//       } else {
//         temp3 += ordemAnimais[i];
//       }
//     }
//     if (temp3.length > 0) ordem.push(temp3.trim());

//     // Validar ordem dos animais
//     for (var i = 0; i < ordem.length; i++) {
//       var existe = false;
//       for (var j = 0; j < this.animais.length; j++) {
//         if (ordem[i] === this.animais[j].nome) {
//           existe = true;
//         }
//       }
//       if (!existe) {
//         return { erro: 'Animal inválido' };
//       }
//       // Checar duplicados
//       for (var k = i + 1; k < ordem.length; k++) {
//         if (ordem[i] === ordem[k]) {
//           return { erro: 'Animal inválido' };
//         }
//       }
//     }

//     var adotados1 = 0;
//     var adotados2 = 0;
//     var resultado = [];

//     for (var i = 0; i < ordem.length; i++) {
//       var nomeAnimal = ordem[i];
//       var animal = null;
//       for (var j = 0; j < this.animais.length; j++) {
//         if (this.animais[j].nome === nomeAnimal) {
//           animal = this.animais[j];
//         }
//       }

//       var p1 = false;
//       var p2 = false;

//       // Lógica para Loco
//       if (animal.nome === 'Loco') {
//         if (adotados1 > 0) {
//           var todos1 = true;
//           for (var b = 0; b < animal.brinquedos.length; b++) {
//             var achou1 = false;
//             for (var c = 0; c < lista1.length; c++) {
//               if (animal.brinquedos[b] === lista1[c]) {
//                 achou1 = true;
//               }
//             }
//             if (!achou1) {
//               todos1 = false;
//             }
//           }
//           if (todos1) p1 = true;
//         }
//         if (adotados2 > 0) {
//           var todos2 = true;
//           for (var b = 0; b < animal.brinquedos.length; b++) {
//             var achou2 = false;
//             for (var c = 0; c < lista2.length; c++) {
//               if (animal.brinquedos[b] === lista2[c]) {
//                 achou2 = true;
//               }
//             }
//             if (!achou2) {
//               todos2 = false;
//             }
//           }
//           if (todos2) p2 = true;
//         }
//       } else {
//         // Lógica normal
//         if (adotados1 < 3) {
//           var idx1 = 0;
//           for (var b = 0; b < lista1.length; b++) {
//             if (lista1[b] === animal.brinquedos[idx1]) {
//               idx1++;
//             }
//             if (idx1 === animal.brinquedos.length) {
//               p1 = true;
//               break;
//             }
//           }
//         }
//         if (adotados2 < 3) {
//           var idx2 = 0;
//           for (var b = 0; b < lista2.length; b++) {
//             if (lista2[b] === animal.brinquedos[idx2]) {
//               idx2++;
//             }
//             if (idx2 === animal.brinquedos.length) {
//               p2 = true;
//               break;
//             }
//           }
//         }
//       }

//       // Gato empate
//       if (animal.tipo === 'gato' && p1 && p2) {
//         resultado.push(animal.nome + ' - abrigo');
//       } else if (p1 && !p2 && adotados1 < 3) {
//         resultado.push(animal.nome + ' - pessoa 1');
//         adotados1++;
//       } else if (!p1 && p2 && adotados2 < 3) {
//         resultado.push(animal.nome + ' - pessoa 2');
//         adotados2++;
//       } else {
//         resultado.push(animal.nome + ' - abrigo');
//       }
//     }

//     // Ordenar resultado
//     for (var i = 0; i < resultado.length; i++) {
//       for (var j = i + 1; j < resultado.length; j++) {
//         if (resultado[i] > resultado[j]) {
//           var aux = resultado[i];
//           resultado[i] = resultado[j];
//           resultado[j] = aux;
//         }
//       }
//     }

//     return { lista: resultado };
//   }
// }

// export { AbrigoAnimais as AbrigoAnimais };