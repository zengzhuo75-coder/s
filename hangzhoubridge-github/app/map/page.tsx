import { MapClient } from './map-client'
import { bridgeNodes } from '@/lib/bridge-data-new'

export default function MapPage() {
  // 在服务器端获取数据
  const initialBridges = bridgeNodes

  return <MapClient initialBridges={initialBridges} />
}
