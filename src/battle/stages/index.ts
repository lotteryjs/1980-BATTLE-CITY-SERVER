import { List } from 'immutable';
import * as requireContext from 'require-context';
import StageConfig from '../types/StageConfig';
import { DEV } from '../devConfig';

const requireStage = requireContext(__dirname, true, /\.json/);
const filenames = List<string>(requireStage.keys());

let defaultStages = filenames
  .map(requireStage)
  .map(StageConfig.fromRawStageConfig)
  // 按照关卡数字顺序排序
  .sortBy(s => Number(s.name));

if (DEV.TEST_STAGE) {
  defaultStages = defaultStages.unshift(
    StageConfig.fromRawStageConfig({
      name: 'test',
      custom: false,
      difficulty: 1,
      map: [
        'X  X  X  X  X  X  X  X  X  X  X  X  X  ',
        'X  X  X  X  X  X  X  X  X  X  X  X  X  ',
        'X  X  X  X  X  X  X  X  X  X  X  X  X  ',
        'X  X  X  X  X  X  X  X  X  X  X  X  X  ',
        'X  X  X  X  X  X  X  X  X  X  X  X  X  ',
        'X  X  X  X  X  X  X  X  X  X  X  X  X  ',
        'X  X  X  X  X  X  X  X  X  X  X  X  X  ',
        'X  X  X  X  X  X  X  X  X  X  X  X  X  ',
        'X  X  X  X  X  X  X  X  X  X  X  X  X  ',
        'X  X  X  X  X  X  X  X  X  X  X  X  X  ',
        'X  X  X  X  X  X  X  X  X  X  X  X  X  ',
        'X  X  X  X  X  Xf Tf Tf X  X  X  X  X  ',
        'X  X  X  X  X  X  E  Tf X  X  X  X  X  ',
      ],
      bots: ['1*basic'],
    }),
  );
}

export const firstStageName = defaultStages.first().name;

export default defaultStages;
