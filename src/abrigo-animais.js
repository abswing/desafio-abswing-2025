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
