// IMPORTANDO AS DEPENDÊNCIAS
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

// DEFININDO A REDE
// OBS1: 'bitcoin.networks.bitcoin' = rede principal - mainnet
// OBS2: 'bitcoin.networks.testnet' = rede de teste - testnet
const network = bitcoin.networks.testnet;

// DERIVAÇÃO DE CARTEIRAS HD (Hierarchical Deterministic)
// OBS1: `m/49'/1'/0'/0` = testnet
// OBS1: `m/49'/0'/0'/0` = mainnet
const path = `m/49'/1'/0'/0`;

// CRIANDO O MNEMONIC PARA A SEED (PALVRAS DE SENHA)
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// CRIANDO A RAIZ DA CARTEIRA HD
let root = bip32.fromSeed(seed, network);

// CRIANDO UMA CONTA - PAR DE PVD/PBC KEYS
let account = root.derivePath(path);
let node = account.derive(0).derive(0);


let btcAdress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address;

console.log("Carteira gerada!");
console.log(`Endereço: ${btcAdress}`);
console.log(`Chave Privada: ${node.toWIF()}`);
console.log(`Seed: ${mnemonic}`);
