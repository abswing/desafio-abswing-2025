import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  //// testes adicionados

    test('Deve impedir adoção de mais de 3 animais por pessoa', () => {
    const abrigo = new AbrigoAnimais();
    const res = abrigo.encontraPessoas(
      'RATO,BOLA,LASER,CAIXA,NOVELO,SKATE',
      'RATO,BOLA,LASER,CAIXA,NOVELO,SKATE',
      'Rex,Bola,Bebe,Mimi,Fofo,Zero,Loco'
    );
    const adotados1 = res.lista.filter(l => l.endsWith('pessoa 1')).length;
    const adotados2 = res.lista.filter(l => l.endsWith('pessoa 2')).length;
    expect(adotados1).toBeLessThanOrEqual(3);
    expect(adotados2).toBeLessThanOrEqual(3);
  });

  test('Deve aplicar regra especial do Loco (precisa de companhia)', () => {
    const abrigo = new AbrigoAnimais();
    const res = abrigo.encontraPessoas(
      'SKATE,RATO',
      'SKATE,RATO',
      'Loco'
    );
    expect(res.lista).toEqual(['Loco - abrigo']);
  });

  test('Deve permitir adoção do Loco se já tiver outro animal', () => {
    const abrigo = new AbrigoAnimais();
    const res = abrigo.encontraPessoas(
      'RATO,BOLA,SKATE',
      'SKATE,RATO',
      'Rex,Loco'
    );
    expect(res.lista).toEqual(['Loco - pessoa 1', 'Rex - pessoa 1']);
  });

  test('Deve rejeitar brinquedo duplicado', () => {
    const abrigo = new AbrigoAnimais();
    const res = abrigo.encontraPessoas(
      'RATO,RATO,BOLA',
      'BOLA,CAIXA',
      'Rex'
    );
    expect(res).toEqual({ erro: 'Brinquedo inválido' });
  });

  test('Deve rejeitar animal duplicado', () => {
    const abrigo = new AbrigoAnimais();
    const res = abrigo.encontraPessoas(
      'RATO,BOLA',
      'BOLA,CAIXA',
      'Rex,Rex'
    );
    expect(res).toEqual({ erro: 'Animal inválido' });
  });

  test('Gato não pode ser adotado se ambos podem', () => {
    const abrigo = new AbrigoAnimais();
    const res = abrigo.encontraPessoas(
      'BOLA,LASER',
      'BOLA,LASER',
      'Mimi'
    );
    expect(res.lista).toEqual(['Mimi - abrigo']);
  });

});