import { Transaction } from "ethereumjs-tx";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Web3 from "web3";

// const Web3: Web3 = require("web3")

export const SendUSDC = () => {
    //@ts-ignore



    const {register, handleSubmit, watch} = useForm()
    const [msg, setMsg] = useState<any>('')
    



    const getUsdc = async () => {
        setMsg('')
        const privateKey = watch('privKey') // Genesis private key

        const wallet = new ethers.Wallet(privateKey);
        const address = wallet.address;
        const web3 = new Web3('https://alien-quaint-thunder.ethereum-goerli.discover.quiknode.pro/14191b401f7502238a019e909890d6779a4ce5b9/');
        const usdcAbi =  [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
       //@ts-ignore
       const usdcContractAddress = '0xC2C527C0CACF457746Bd31B2a698Fe89de2b6d49';
         //@ts-ignore
       const toAddress = watch('addressTo')
       //@ts-ignore
       const usdcContract = new web3.eth.Contract(usdcAbi, usdcContractAddress);

        web3.eth.getTransactionCount(address, 'pending', async (err, nonce) => {
            if (err) {
              console.log(err);
              return;
            }
          
            // Создать объект транзакции
            const txObject = usdcContract.methods.transfer(toAddress, 1000);
            const txData = txObject.encodeABI();
            const gasPrice = web3.utils.toWei('10', 'gwei');
            const gasLimit = 200000;
            const txFee = +gasPrice * gasLimit;
            const txValue = 0;
          
            const tx = {
              nonce: +web3.utils.toHex(nonce),
              gasPrice: web3.utils.toHex(gasPrice),
              gasLimit: web3.utils.toHex(gasLimit),
              to: usdcContractAddress,
              value: web3.utils.toHex(txValue),
              data: txData,
              chainId: 5 // Ropsten network ID
            };
          
            // Подписать транзакцию
            //@ts-ignore
            try {
            const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

            // Отправить транзакцию в сеть Ethereum
            signedTx.rawTransaction && await web3.eth.sendSignedTransaction(signedTx.rawTransaction, (err, txHash) => {
              if (err) {
                setMsg('Неудача')
                console.log(err);
                return;
              }
              setMsg(<div><div>Как будто успех даже</div>
              <a href={`https://goerli.etherscan.io/tx/${txHash}`}>Транзакция на etherscan</a>
              </div>)

              console.log('Transaction sent:', txHash);
            });
        }
        catch(e) {
            setMsg('Неудача')

            console.log(e)
        }
        })}
    

return (
    <form onSubmit={handleSubmit(getUsdc)}>
    <div className="wrapper">
    <h2 className="send-money-input-description">
    Отправить USDT
    </h2>
    <div className="send-money">
    <div className="send-money-inputs">
    <div className="send-money-input">
    <input type="text" placeholder="Введите ваш приватный ключ" {...register('privKey')} />
    <div className="send-money-input-description">
    Никогда не оставляйте свой приватный ключ на рандомных сайтах
    </div>
    </div>
    <div className="send-money-input">
    <input type="text" placeholder="Введите адрес получателя" {...register('addressTo')} />
    </div>
    </div>
    <button type="submit">Отправить очень много денег</button>
    <div className="send-money-input-description">
    {msg}
    </div>
    </div>
    </div>
    </form>
    );
}