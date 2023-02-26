import { useState } from "react"
import Accounts from "web3-eth-accounts"

export const AccountCreator = () => {

    const [newAcc, setNewAcc] = useState<any>()
    const [anotherAcc, setAnotherAcc] = useState<any>()
//@ts-ignore
const account = new Accounts()
    console.log(newAcc)
    

    const createAcc = () => {

        setNewAcc(account.create())
        setAnotherAcc(account.create())
    }


    return <div>
        <button type='button' onClick={createAcc}>Сгенерировать ключ</button>
        <div style={{display: 'flex', flexDirection:'column', padding: '20px', gap: '40px'}}>
        <div>
        {newAcc?.privateKey && 'Адрес кошелька1:'}
        <div>{newAcc?.privateKey}</div> 

            <div>{newAcc?.address}</div> 
        </div>
        <div>
        {anotherAcc?.privateKey && 'Адрес кошелька2:'}
        <div>{anotherAcc?.privateKey}</div> 

            <div>{anotherAcc?.address}</div> 
        </div>
        </div>
    </div>
}