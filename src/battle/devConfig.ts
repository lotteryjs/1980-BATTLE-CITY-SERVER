// 参数 dev 表示是否为开发环境
const dev = true;
export const DEV = {
  // 是否打印 AI 的日志
  LOG_AI: false,
  // 是否启用 console.assert
  ASSERT: dev,
  // 是否显示 <SpotGraph />
  SPOT_GRAPH: false,
  // 是否显示 <TankPath />
  TANK_PATH: false,
  // 是否显示 <RestrictedAreaLayer /> 与「坦克的转弯保留位置指示器」
  RESTRICTED_AREA: dev,
  // 是否加快游戏过程
  FAST: false,
  // 是否使用测试关卡
  TEST_STAGE: false,
  // 是否显示 About 信息
  HIDE_ABOUT: dev,
  // 是否启用 <Inspector />
  INSPECTOR: false,
  // 是否打印游戏日志
  LOG: dev,
  // 是否打印游戏性能相关日志
  LOG_PERF: false,
  // 是否跳过关卡选择
  SKIP_CHOOSE_STAGE: true
}
