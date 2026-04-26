import { bridgeNodes } from '@/lib/bridge-data-new'

export default function TestBridgePage() {
  // 直接在服务端渲染，不使用客户端状态
  const length = bridgeNodes?.length || 0
  const firstItem = bridgeNodes?.[0]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">桥梁数据测试（服务端渲染）</h1>
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <div>
          <p className="text-lg">bridgeNodes存在: {bridgeNodes ? '是' : '否'}</p>
          <p className="text-lg">类型: <span className="font-bold">{typeof bridgeNodes}</span></p>
          <p className="text-lg">是数组: <span className="font-bold">{Array.isArray(bridgeNodes) ? '是' : '否'}</span></p>
          <p className="text-lg">长度: <span className="font-bold text-green-600">{length}</span></p>
        </div>

        {firstItem && (
          <div className="mt-4">
            <h2 className="font-semibold mb-2">第一个元素:</h2>
            <pre className="bg-gray-100 p-2 rounded text-sm">
              {JSON.stringify(firstItem, null, 2)}
            </pre>
          </div>
        )}

        {length > 0 && (
          <div className="mt-4">
            <h2 className="font-semibold mb-2">前5座桥梁:</h2>
            <ul className="list-disc pl-5">
              {bridgeNodes.slice(0, 5).map((bridge) => (
                <li key={bridge.id}>
                  {bridge.name} - {bridge.year}年 - {bridge.river}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
