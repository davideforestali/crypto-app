import { getAssetLogoUrl } from '../../helpers'
import { AssetsProps } from '../../interfaces/shared'
import AssetLogo from '../AssetLogo/AssetLogo'
import Button from '../Button/Button'
import styles from './Asset.module.css'

interface AssetComponentProps {
  asset: AssetsProps
}

const Asset: React.FC<AssetComponentProps> = ({asset}) => {

  const assetLogoUrl = getAssetLogoUrl(asset.name)

  return (
    <>
      <div className={styles.assetNameContainer}>
        <AssetLogo url={assetLogoUrl} assetName={asset.name} />
        <span>{asset.name} </span>
      </div>
      <span>$ {Math.round(asset.metrics.market_data.price_usd * 1000000) / 1000000}</span>
      <div className={styles.assetActionsContainer}>
        <Button variant='secondary'>Buy / Sell</Button>
      </div>
    </>
  )
}

export default Asset