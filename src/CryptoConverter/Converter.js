import React, {useState, useEffect} from 'react';
import './main.css'
import USA from '../Assets/united-states.png';
import UK from '../Assets/united-kingdom.png';
import france from '../Assets/france.png'
import axios from 'axios'

// require('dotenv').config()

const Converter = () => {
    const [initialState, setState] = useState({
        fiats: [
            {img: USA, name: 'USD'},
            {img: UK, name: 'GBP'},
            {img: france, name: 'EUR'},
        ],
        tokens: [
            {img: [USA], name: 'BTC'},
            {img: [USA], name: 'ETH'},
            {img: [USA], name: 'SOL'},
        ],
        crypto: "BTC",
        amount: "",
        convertTo: "USD",
        result: "",
        date: "", 


    })

    const {fiats, tokens, crypto, amount, convertTo, result, date} = initialState;

    const baseURL = `http://rest.coinapi.io/v1/exchangerate/${crypto}/${convertTo}`;

    useEffect(() => {
        if(amount === isNaN){
            return
        }
        else{
            const getCryptoPrice = () => {fetch(baseURL, {
                method: 'GET',
                headers: {
                    'X-CoinAPI-Key': '1FCCF07D-BC1C-40BC-B00D-817031BE4EEC'
                }
            }).then(response => response.json())
            .then(response => {
                console.log(response)
                const date = response.time
                const result = (response.rate * amount).toFixed(3);

                setState({
                    ...initialState,
                    date,
                    result
                })
            })

        }
            getCryptoPrice();
        }

        console.log(process.env)
        
    }, [amount, fiats, tokens])

    const onChangeInput = (e) => {
        const data = {
            ...initialState,
            amount: e.target.value,
            result,
            date
        }
        setState(data)
    }


   const handleSelect = (e) => {
        setState({
            ...initialState,
            [e.target.name] : e.target.value,
            result: null
        })
    }

    const handleSubmit = async(e)=> {
        e.preventDefault();
        const data = {
            convertTo: convertTo,
            crypto: crypto,
            amount: amount,
            result: result,
            date: date
        }
        console.log(data);

        await axios.post('http://localhost:8080/record', data).then((res)=>{
            console.log(res.data)
            setState({
                ...initialState,
                date,
                result
            })
        }).catch((error)=>{console.log(error)})
    }

  return (
    <div className="main-container">
        <div className="display-wrapper">
            <h2>Exchange</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-content">
                    <p>Currency from</p>
                    <select
                        name="crypto"
                        value={crypto}
                        onChange={handleSelect}
                    >
                        {tokens.map(token => ( 
                            <option key={token.name}value={token.name}>
                                {token.name}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="form-content">
                    <p>amount</p>
                    <input 
                        type="number"
                        amount={amount}
                        onChange={onChangeInput}
                        defaultValue="1"
                    />
                </div>
                <div className="form-content">
                    <p>Currency to</p>
                    <select
                        name="convertTo"
                        value={convertTo}
                        onChange={handleSelect}
                    >
                        {fiats.map(fiat => ( 
                            <option key={fiat.name}value={fiat.name}>
                                {fiat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-content">
                    <p>amount</p>
                    <input 
                        disabled={true}
                        value={
                          amount === 1
                            ? result
                            : result === null
                            ? "0"
                            : result
                        }
                    />
                </div>
                        {
                            console.log('initial', initialState)
                        }
                <button type='submit'>Save</button>
            </form>
        </div>
    </div>
  )
}

export default Converter