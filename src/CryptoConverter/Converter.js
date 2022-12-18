import React, {useState, useEffect} from 'react';
import './main.css'
import USA from '../Assets/united-states.png';
import UK from '../Assets/united-kingdom.png';
import france from '../Assets/france.png'

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
                    'X-CoinAPI-Key': '88423308-C70C-466D-89F0-7953A74EA018'
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
    }, [amount, fiats, tokens])

    const onChangeInput = (e) => {
        setState({
            ...initialState,
            amount: e.target.value,
            result: null,
            date: null
        })
    }


   const handleSelect = (e) => {
        setState({
            ...initialState,
            [e.target.name] : e.target.value,
            result: null
        })
    }

  return (
    <div className="main-container">
        <div className="display-wrapper">
            <h2>Exchange</h2>
            <form>
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
                          amount === ""
                            ? "0"
                            : result === null
                            ? "0"
                            : result
                        }
                    />
                </div>

                <button>Save</button>
            </form>
        </div>
    </div>
  )
}

export default Converter