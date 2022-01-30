import { FC, useState } from 'react'
import { useQuery } from 'react-query'
import { InfinitePageProps } from '../../interfaces/shared'
import Button from '../../components/Button/Button'
import styles from './ExchangeForm.module.css'
import Input from '../../components/Input/Input'
import Select from '../../components/Select/Select'

interface ExchangeFormProps {
  isLoggedIn: boolean
}

const fetchAssets = () => {
  return fetch('https://data.messari.io/api/v2/assets?fields=id,name,symbol,metrics/market_data/price_usd')
    .then(res => res.json())
}

const ExchangeForm: FC<ExchangeFormProps> = ({isLoggedIn}) => {
  const [assetSelected, setAssetSelected] = useState('Bitcoin')
  const [assetValue, setAssetValue] = useState('')
  const [fiatValue, setFiatValue] = useState('')
  const [firstInputOrder, setFirstInputOrder] = useState(0)
  const {isLoading, error, data} = useQuery<InfinitePageProps, Error>('allAssets', fetchAssets)

  const getAssetToExchangeValue = (assetSelectedName: string) => {
    const assetsToExchange = data?.data.filter(asset => asset.name === assetSelectedName)[0]
    return assetsToExchange?.metrics.market_data.price_usd
  }

  const convertAssetToFiat = (
    insertedAssetValue: string,
    assetSelectedName = assetSelected
  ) => {
    const assetValue = getAssetToExchangeValue(assetSelectedName)
    
    if (assetValue) {
      const assetToFiat = (Number(insertedAssetValue) * assetValue).toString()
      setFiatValue(assetToFiat !== '0' ? assetToFiat : '')
    }
  }

  const convertFiatToAsset = (
    insertedFiatValue: string,
    assetSelectedName = assetSelected
  ) => {
    const assetValue = getAssetToExchangeValue(assetSelectedName)
    
    if (assetValue) {
      const fiatToAsset  = (Number(insertedFiatValue) / assetValue).toString()
      setAssetValue(fiatToAsset !== '0' ? fiatToAsset : '')
    }
  }

  const assetInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const insertedValue = e.target.value
    setAssetValue(insertedValue)
    convertAssetToFiat(insertedValue)
  }

  const assetOptionChangeHandler = (selectedValue: string) => {
    setAssetSelected(selectedValue)
    convertAssetToFiat(assetValue, selectedValue)
  }

  const fiatInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiatValue(e.target.value)
    convertFiatToAsset(e.target.value)
  }

  /* if (isLoading) {
    assetsToRender = <p>Loading...</p>
  } 
  else if (error) {
    assetsToRender = <p>Something went wrong</p>
  } */

  let formToRender = <p className={styles.authAlert}>Please Login to be able to Trade</p>

  if (isLoggedIn) {
    formToRender = (
      <div className={styles.form}>
        <div className={styles.inputContainer} style={{order: `${firstInputOrder}`}}>
          <Input
            className={styles.exchangeInput}
            type='number'
            min='0'
            value={assetValue}
            placeholder='0.0'
            onChange={assetInputChangeHandler}
          />

        {data?.data && (
          <Select
            className={styles.inputCurrency}
            options={data?.data.map(asset => asset.name)}
            onChange={assetOptionChangeHandler}
            hasImages
          />
        )} 
        </div>

        <div className={styles.inputContainer}>
          <Input
            className={styles.exchangeInput}
            type='number'
            min='0'
            value={fiatValue}
            placeholder='0.0'
            onChange={fiatInputChangeHandler}
          />
          <div className={styles.inputCurrency}>
            USD
          </div>
        </div>

        <Button
          className={styles.swapButton}
          variant='secondary'
          onClick={() => setFirstInputOrder(firstInputOrder === 0 ? 1 : 0)}
        >
          ↓
        </Button>
      </div>
    )
  }

  return (
    <div className={styles.exchangeForm}>
      <div className={styles.exchangeBox}>
        <h1 className={styles.title}>Trade</h1>
        {formToRender}
      </div>
    </div>
  )
}

export default ExchangeForm